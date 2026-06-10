import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "../state/store";
import type { ModelDef } from "./model";

const HIGHLIGHT = 0x2a4d8f;

/** 절차적 환경맵 — 금속(PBR) 반사용. 창문 같은 밝은 띠로 계측기 느낌의 하이라이트를 만든다. */
function makeEnvTexture(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const x = c.getContext("2d")!;
  const g = x.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, "#9fb4d8");
  g.addColorStop(0.45, "#46506a");
  g.addColorStop(0.5, "#2a3142");
  g.addColorStop(0.55, "#202733");
  g.addColorStop(1, "#0c1018");
  x.fillStyle = g;
  x.fillRect(0, 0, 512, 256);
  x.globalAlpha = 0.5;
  ["#dfe8ff", "#aab8d8", "#8fa0c8"].forEach((col, i) => {
    x.fillStyle = col;
    x.fillRect(60 + i * 150, 30 + i * 12, 70, 16);
  });
  x.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * 공통 3D 엔진의 캔버스 내부 — 분해·카메라·피킹을 한 useFrame에서 처리한다.
 * (바닐라 viewer.ts의 회전·프레이밍·분해·선택 로직을 R3F로 이식. 줌은 분해와 독립.)
 * frameloop="demand"이므로 변할 때만 invalidate()로 렌더를 요청한다.
 */
export function SceneContents({ model }: { model: ModelDef }) {
  const gl = useThree((s) => s.gl);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const invalidate = useThree((s) => s.invalidate);
  const scene = useThree((s) => s.scene);

  // 데맨드 루프를 깨우기 위해 구독 (값 자체는 useFrame에서 getState로 최신을 읽음)
  const explodeT = useAppStore((s) => s.explodeT);
  const zoom = useAppStore((s) => s.zoom);
  const selected = useAppStore((s) => s.selected);
  const resetNonce = useAppStore((s) => s.resetNonce);
  const select = useAppStore((s) => s.select);
  const setZoom = useAppStore((s) => s.setZoom);

  const groupRef = useRef<THREE.Group>(null);
  const partRefs = useRef<(THREE.Group | null)[]>([]);
  const curT = useRef(0);
  const theta = useRef(0.62);
  const phi = useRef(1.12);
  const highlightedMats = useRef<{ mat: THREE.MeshStandardMaterial; hex: number; intensity: number }[]>([]);

  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());
  const box = useRef(new THREE.Box3());
  const sphere = useRef(new THREE.Sphere());

  // 분해값/줌 변경 → 데맨드 루프 깨우기
  useEffect(() => {
    invalidate();
  }, [explodeT, zoom, invalidate]);

  // 초기화 → 카메라 각도 복귀
  useEffect(() => {
    theta.current = 0.62;
    phi.current = 1.12;
    invalidate();
  }, [resetNonce, invalidate]);

  // 선택 해제 → 강조 복원
  useEffect(() => {
    if (!selected && highlightedMats.current.length) {
      restoreHighlight();
      invalidate();
    }
  }, [selected, invalidate]);

  // 언마운트 시 강조 복원 — 재질이 module 싱글톤이라, 복원 안 하면 모델 재방문 때 잔상이 남는다.
  useEffect(() => {
    return () => restoreHighlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 절차적 환경맵(PBR 금속 반사) — 전 모델 공통
  useEffect(() => {
    const env = makeEnvTexture();
    scene.environment = env;
    invalidate();
    return () => {
      scene.environment = null;
      env.dispose();
    };
  }, [scene, invalidate]);

  // 라인 픽 임계값을 작게 — 엣지 라인이 클릭을 가로채지 않도록(모델이 깜빡 안 꺼도 안전).
  useEffect(() => {
    const lineParams = raycaster.current.params.Line;
    if (lineParams) lineParams.threshold = 0.05;
  }, []);

  // 입력: 마우스 드래그=회전, 휠/핀치=줌(독립), 탭=선택
  useEffect(() => {
    const el = gl.domElement;
    let dragging = false,
      lx = 0,
      ly = 0,
      moved = 0,
      downT = 0,
      tapX = 0,
      tapY = 0,
      pinchStart = 0,
      pinchZoom = 1;
    const clampPhi = (p: number) => Math.max(0.16, Math.min(Math.PI - 0.16, p));
    const clampZoom = (z: number) => Math.max(0.42, Math.min(2.4, z));

    const onDown = (e: MouseEvent) => {
      dragging = true;
      lx = e.clientX;
      ly = e.clientY;
      moved = 0;
      downT = performance.now();
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lx,
        dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      theta.current -= dx * 0.005;
      phi.current = clampPhi(phi.current - dy * 0.005);
      invalidate();
    };
    const onUp = (e: MouseEvent) => {
      // 드래그 상태를 먼저 해제(pick에서 예외가 나도 회전 상태로 끼지 않도록)
      const click = dragging && moved < 6 && performance.now() - downT < 350;
      dragging = false;
      if (click) pick(e.clientX, e.clientY);
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom(clampZoom(useAppStore.getState().zoom * (1 + e.deltaY * 0.0012)));
    };

    const tDist = (e: TouchEvent) => {
      const a = e.touches[0],
        b = e.touches[1];
      return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    };
    const onTStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        dragging = true;
        lx = t.clientX;
        ly = t.clientY;
        tapX = t.clientX;
        tapY = t.clientY;
        moved = 0;
        downT = performance.now();
      } else if (e.touches.length === 2) {
        dragging = false;
        pinchStart = tDist(e);
        pinchZoom = useAppStore.getState().zoom;
      }
    };
    const onTMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1 && dragging) {
        const t = e.touches[0];
        const dx = t.clientX - lx,
          dy = t.clientY - ly;
        lx = t.clientX;
        ly = t.clientY;
        moved += Math.abs(dx) + Math.abs(dy);
        theta.current -= dx * 0.005;
        phi.current = clampPhi(phi.current - dy * 0.005);
        invalidate();
      } else if (e.touches.length === 2) {
        const d = tDist(e);
        setZoom(clampZoom(pinchZoom * (pinchStart / Math.max(1, d))));
      }
    };
    const onTEnd = (e: TouchEvent) => {
      const tap = dragging && e.touches.length === 0 && moved < 8 && performance.now() - downT < 350;
      if (e.touches.length === 0) dragging = false;
      if (tap) pick(tapX, tapY);
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTStart, { passive: false });
    el.addEventListener("touchmove", onTMove, { passive: false });
    el.addEventListener("touchend", onTEnd, { passive: false });
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTStart);
      el.removeEventListener("touchmove", onTMove);
      el.removeEventListener("touchend", onTEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, invalidate, setZoom]);

  // 선택한 부품 그룹 아래에서 emissive를 가진 재질만 모은다(엣지 라인 등 비표준 재질은 건너뜀).
  function collectEmissive(root: THREE.Object3D): THREE.MeshStandardMaterial[] {
    const out: THREE.MeshStandardMaterial[] = [];
    root.traverse((o) => {
      const mat = (o as THREE.Mesh).material;
      if (!mat) return;
      for (const m of Array.isArray(mat) ? mat : [mat]) {
        const sm = m as THREE.MeshStandardMaterial;
        if (sm.emissive) out.push(sm);
      }
    });
    return out;
  }
  function restoreHighlight() {
    for (const h of highlightedMats.current) {
      h.mat.emissive.setHex(h.hex);
      h.mat.emissiveIntensity = h.intensity;
    }
    highlightedMats.current = [];
  }
  function highlight(part: THREE.Object3D) {
    restoreHighlight();
    const mats = collectEmissive(part);
    highlightedMats.current = mats.map((mat) => ({
      mat,
      hex: mat.emissive.getHex(),
      intensity: mat.emissiveIntensity,
    }));
    for (const mat of mats) {
      mat.emissive.setHex(HIGHLIGHT);
      mat.emissiveIntensity = 0.85;
    }
  }
  function pick(clientX: number, clientY: number) {
    const grp = groupRef.current;
    if (!grp) return;
    const r = gl.domElement.getBoundingClientRect();
    pointer.current.x = ((clientX - r.left) / r.width) * 2 - 1;
    pointer.current.y = -((clientY - r.top) / r.height) * 2 + 1;
    raycaster.current.setFromCamera(pointer.current, camera);
    const hits = raycaster.current.intersectObject(grp, true);
    // 박스·엣지 라인·인스턴스 무엇을 맞히든, partId를 가진 가장 가까운 조상으로 부품을 찾는다.
    let part: THREE.Object3D | null = null;
    for (const h of hits) {
      let o: THREE.Object3D | null = h.object;
      while (o && o.userData.partId === undefined) o = o.parent;
      if (o) {
        part = o;
        break;
      }
    }
    if (part) {
      select({ id: part.userData.partId as string, layer: part.userData.layer as number | undefined });
      highlight(part);
    } else {
      select(null);
    }
    invalidate();
  }

  useFrame((_, dt) => {
    // 분해값 이징 (슬라이더 targetT → curT)
    const target = useAppStore.getState().explodeT;
    curT.current += (target - curT.current) * 0.12;
    const animating = Math.abs(target - curT.current) > 0.0004;
    if (!animating) curT.current = target;

    // 부품 위치 (순차 전개 + 가감속)
    const parts = model.parts;
    for (let i = 0; i < parts.length; i++) {
      const g = partRefs.current[i];
      if (!g) continue;
      const p = parts[i];
      const start = (p.order ?? 0) * 0.2;
      let lt = (curT.current - start) / (1 - 0.2);
      lt = Math.max(0, Math.min(1, lt));
      lt = lt < 0.5 ? 2 * lt * lt : 1 - Math.pow(-2 * lt + 2, 2) / 2; // easeInOutQuad
      g.position.set(p.base[0] + p.explode[0] * lt, p.base[1] + p.explode[1] * lt, p.base[2] + p.explode[2] * lt);
    }

    // 모델별 프레임 갱신(부품 위치를 잡은 뒤). 예: TSV 길이를 스택 높이에 맞춤.
    model.update?.({ t: curT.current, groups: partRefs.current });

    // 분해 중에는 인스턴스 행렬이 바뀔 수 있으니, 인스턴스 메시의 캐시된 경계구를 무효화한다.
    // (최신 three는 boundingSphere를 캐시 → 안 하면 늘어난 TSV 등 동적 인스턴스가 클릭 적중 실패.
    //  엔진이 일괄 처리하므로 개별 모델이 신경 쓰지 않아도 된다.)
    if (animating) {
      groupRef.current?.traverse((o) => {
        const im = o as THREE.InstancedMesh;
        if (im.isInstancedMesh) im.boundingSphere = null;
      });
    }

    // 카메라 자동 프레이밍 + 독립 줌
    const grp = groupRef.current;
    if (grp) {
      // 방금 바꾼 부품 위치를 즉시 반영(R3F는 useFrame 이후 매트릭스를 갱신하므로 한 프레임 지연 방지)
      grp.updateMatrixWorld(true);
      box.current.setFromObject(grp);
      box.current.getBoundingSphere(sphere.current);
      const c = sphere.current.center;
      const radius = sphere.current.radius || 1;
      const z = useAppStore.getState().zoom;
      const vF = (camera.fov * Math.PI) / 180;
      const hF = 2 * Math.atan(Math.tan(vF / 2) * camera.aspect);
      const dist = (radius / Math.sin(Math.min(vF, hF) / 2)) * 1.15 * z;
      if (useAppStore.getState().autoRotate) theta.current += dt * 0.25;
      const sp = Math.sin(phi.current),
        cp = Math.cos(phi.current);
      camera.position.set(
        c.x + dist * sp * Math.sin(theta.current),
        c.y + dist * cp,
        c.z + dist * sp * Math.cos(theta.current),
      );
      camera.lookAt(c);
    }

    if (animating) invalidate();
  });

  return (
    <>
      <hemisphereLight args={[0xbcd0ff, 0x141821, 0.6]} />
      <directionalLight position={[7, 12, 8]} intensity={2.0} />
      <directionalLight position={[-9, 5, -8]} intensity={0.7} color="#88aaff" />
      <directionalLight position={[3, 2, 10]} intensity={0.35} color="#ffd9b0" />
      <group ref={groupRef}>
        {model.parts.map((p, i) => (
          <group
            key={i}
            ref={(el) => {
              partRefs.current[i] = el;
            }}
            userData={{ partId: p.id, layer: p.layer }}
          >
            {p.node}
          </group>
        ))}
        {model.extras}
      </group>
    </>
  );
}
