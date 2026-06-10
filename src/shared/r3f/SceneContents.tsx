import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "../state/store";
import type { ModelDef } from "./model";

const HIGHLIGHT = 0x2a4d8f;

/**
 * 공통 3D 엔진의 캔버스 내부 — 분해·카메라·피킹을 한 useFrame에서 처리한다.
 * (바닐라 viewer.ts의 회전·프레이밍·분해·선택 로직을 R3F로 이식. 줌은 분해와 독립.)
 * frameloop="demand"이므로 변할 때만 invalidate()로 렌더를 요청한다.
 */
export function SceneContents({ model }: { model: ModelDef }) {
  const gl = useThree((s) => s.gl);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const invalidate = useThree((s) => s.invalidate);

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
  const highlighted = useRef<THREE.Mesh | null>(null);

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
    if (!selected && highlighted.current) {
      restoreEmissive(highlighted.current);
      highlighted.current = null;
      invalidate();
    }
  }, [selected, invalidate]);

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
      if (dragging && moved < 6 && performance.now() - downT < 350) pick(e.clientX, e.clientY);
      dragging = false;
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
      if (dragging && e.touches.length === 0 && moved < 8 && performance.now() - downT < 350) pick(tapX, tapY);
      if (e.touches.length === 0) dragging = false;
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

  function emiOf(m: THREE.Mesh): THREE.MeshStandardMaterial[] {
    return (Array.isArray(m.material) ? m.material : [m.material]) as THREE.MeshStandardMaterial[];
  }
  function highlight(mesh: THREE.Mesh) {
    if (highlighted.current && highlighted.current !== mesh) restoreEmissive(highlighted.current);
    highlighted.current = mesh;
    const mats = emiOf(mesh);
    if (mesh.userData.emi === undefined) {
      mesh.userData.emi = mats.map((m) => m.emissive.getHex());
      mesh.userData.emiI = mats.map((m) => m.emissiveIntensity);
    }
    mats.forEach((m) => {
      m.emissive.setHex(HIGHLIGHT);
      m.emissiveIntensity = 0.85;
    });
  }
  function restoreEmissive(mesh: THREE.Mesh) {
    if (mesh.userData.emi !== undefined) {
      emiOf(mesh).forEach((m, i) => {
        m.emissive.setHex(mesh.userData.emi[i]);
        m.emissiveIntensity = mesh.userData.emiI[i];
      });
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
    if (hits.length) {
      let o: THREE.Object3D | null = hits[0].object;
      while (o && o.userData.partId === undefined) o = o.parent;
      if (o) {
        highlight(hits[0].object as THREE.Mesh);
        select({ id: o.userData.partId as string, layer: o.userData.layer as number | undefined });
      }
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
            key={p.id}
            ref={(el) => {
              partRefs.current[i] = el;
            }}
            userData={{ partId: p.id, layer: p.layer }}
          >
            {p.node}
          </group>
        ))}
      </group>
    </>
  );
}
