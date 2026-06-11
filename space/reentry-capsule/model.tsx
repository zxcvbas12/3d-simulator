import * as THREE from "three";
import type { ModelDef, PartDef } from "@app/shared/r3f/model";
import { makeAblativeTexture, makeFoilTexture, makeBrushedMetalTexture } from "@app/shared/r3f/textures";
import { reentryCapsuleInfo } from "./data";

/**
 * 재진입 캡슐(유인) — 무딘 원뿔(frustum) + 구형 융제 차폐막의 동심(껍질) 구조.
 * 수직 대칭축(Y): 무딘 차폐막이 아래(−Y, 진행 방향), 낙하산·도킹이 위(+Y).
 * 분해는 동심 껍질 벗기기: 차폐막 ↓, 백셸·여압동체 ↑(텔레스코핑), 내부 ↑·앞으로, 낙하산 ↑, 해치·RCS 옆으로.
 * 회전·줌·분해·선택·정보패널·환경맵은 공통 <Viewer> 엔진이 처리한다.
 * 부품 간 재질 인스턴스는 공유하지 않는다(강조 독립). 텍스처 map은 캐시 공유 OK.
 */

// ── 재질 헬퍼 ────────────────────────────────────────────────────
function mat(
  color: number,
  roughness: number,
  metalness: number,
  envMapIntensity: number,
  opts: THREE.MeshStandardMaterialParameters = {},
) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, envMapIntensity, ...opts });
}
/** 융제 차폐막 — 구리/탄화. */
function ablativeMat() {
  return new THREE.MeshStandardMaterial({
    color: 0xb0703a,
    map: makeAblativeTexture(20),
    roughness: 0.62,
    metalness: 0.38,
    envMapIntensity: 0.85,
    side: THREE.DoubleSide,
  });
}
/** 백셸 외피 TPS — 실버/화이트. */
function tpsMat() {
  return new THREE.MeshStandardMaterial({
    color: 0xc7ccd3,
    map: makeBrushedMetalTexture(),
    roughness: 0.5,
    metalness: 0.7,
    envMapIntensity: 1.15,
    side: THREE.DoubleSide,
  });
}
function titaniumMat() {
  return mat(0xb9bfc6, 0.4, 0.72, 1.1, { side: THREE.DoubleSide });
}
function steel(roughness = 0.4) {
  return new THREE.MeshStandardMaterial({
    color: 0xb7bec8,
    map: makeBrushedMetalTexture(),
    roughness,
    metalness: 0.85,
    envMapIntensity: 1.2,
  });
}
function darkSteel() {
  return mat(0x6b7480, 0.45, 0.7, 1.0);
}

// ── 빌더 헬퍼 ────────────────────────────────────────────────────
function addEdges(group: THREE.Group, mesh: THREE.Mesh, color: number, op = 0.4) {
  const e = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: op }),
  );
  e.raycast = () => {};
  e.position.copy(mesh.position);
  e.quaternion.copy(mesh.quaternion);
  e.scale.copy(mesh.scale);
  group.add(e);
}

const R_BASE = 2.5; // 베이스(바닥) 반지름
const R_TOP = 1.0; // 상단 반지름
const H = 2.8; // 원뿔 높이 (중심 y=0)

// ── 부품 (로컬 원점 기준; 위치는 parts[].base가 잡는다) ──────────────
/** 열 차폐막 — 얕은 구형 캡(아래로 볼록). 로컬 원점 = 림 평면(y=0), 중심은 −0.6. */
function buildHeatshield() {
  const g = new THREE.Group();
  const depth = 0.6;
  const pts: THREE.Vector2[] = [];
  const N = 16;
  for (let i = 0; i <= N; i++) {
    const r = (i / N) * R_BASE;
    pts.push(new THREE.Vector2(r, -depth * (1 - (r / R_BASE) * (r / R_BASE))));
  }
  g.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 48), ablativeMat()));
  const rim = new THREE.Mesh(new THREE.TorusGeometry(R_BASE, 0.05, 8, 48), mat(0x6b3f20, 0.6, 0.5, 0.8));
  rim.rotation.x = Math.PI / 2;
  g.add(rim);
  return g;
}
/** 백셸 외피 — 절두 원뿔 + 금박(MLI) 패치 몇 장. 로컬 원점 = 중심(y=0). */
function buildBackshell() {
  const g = new THREE.Group();
  const cone = new THREE.Mesh(new THREE.CylinderGeometry(R_TOP, R_BASE, H, 48, 1, true), tpsMat());
  g.add(cone);
  addEdges(g, cone, 0xaeb6c2, 0.3);
  const foil = () => mat(0xcea23a, 0.5, 0.6, 1.0, { map: makeFoilTexture(42), side: THREE.DoubleSide });
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * Math.PI * 2 + 0.6;
    const y = -0.2 + k * 0.1;
    const frac = (y + H / 2) / H;
    const r = R_BASE + (R_TOP - R_BASE) * frac;
    const patch = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.7), foil());
    patch.position.set(Math.cos(a) * (r + 0.02), y, Math.sin(a) * (r + 0.02));
    patch.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(Math.cos(a), 0, Math.sin(a)));
    g.add(patch);
  }
  return g;
}
/** 여압 동체 — 백셸 안쪽의 더 작은 절두 원뿔(티타늄). 로컬 원점 = 중심. */
function buildPressureVessel() {
  const g = new THREE.Group();
  const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 2.05, 2.4, 40, 1, true), titaniumMat());
  g.add(cone);
  addEdges(g, cone, 0xcdd5e0, 0.3);
  // 윗 뚜껑(여압 상판)
  const cap = new THREE.Mesh(new THREE.CircleGeometry(0.85, 40), titaniumMat());
  cap.position.y = 1.2;
  cap.rotation.x = -Math.PI / 2;
  g.add(cap);
  return g;
}
/** 내부 — 좌석 3 + 항전 박스. 로컬 원점 = 좌석 기준면. */
function buildInterior() {
  const g = new THREE.Group();
  const seat = mat(0x2a2f3a, 0.7, 0.2, 0.5);
  for (let i = 0; i < 3; i++) {
    const x = -0.85 + i * 0.85;
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.16, 1.1), seat);
    base.position.set(x, 0, 0);
    base.rotation.x = -0.22;
    g.add(base);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.16), seat);
    back.position.set(x, 0.34, -0.5);
    back.rotation.x = -0.22;
    g.add(back);
  }
  const av = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.4, 0.5), darkSteel());
  av.position.set(0, 0.62, 0.85);
  g.add(av);
  addEdges(g, av, 0x8a93a0, 0.4);
  return g;
}
/** 자세 제어 추력기 — 외피 둘레 소형 노즐 8개(방사). 로컬 원점 = 중심. */
function buildRCS() {
  const g = new THREE.Group();
  const m = mat(0xc07a3a, 0.45, 0.8, 1.1, { side: THREE.DoubleSide });
  const N = 8,
    y = 0.35;
  const frac = (y + H / 2) / H;
  const r = R_BASE + (R_TOP - R_BASE) * frac;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const noz = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.34, 16, 1, true), m);
    const dir = new THREE.Vector3(Math.cos(a), 0.15, Math.sin(a)).normalize();
    noz.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    noz.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
    g.add(noz);
  }
  return g;
}
/** 낙하산 — 캐니스터 + 캐노피 암시(화이트/오렌지). 로컬 원점 = 캐니스터 바닥. */
function buildParachute() {
  const g = new THREE.Group();
  const can = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.5, 24), steel(0.4));
  can.position.y = 0.25;
  g.add(can);
  addEdges(g, can, 0xcdd5e0, 0.3);
  const canopy = new THREE.Mesh(
    new THREE.ConeGeometry(1.1, 0.9, 24, 1, true),
    mat(0xe8ebf0, 0.6, 0.1, 0.4, { side: THREE.DoubleSide, transparent: true, opacity: 0.88 }),
  );
  canopy.position.y = 1.05;
  g.add(canopy);
  const band = new THREE.Mesh(
    new THREE.ConeGeometry(1.13, 0.3, 24, 1, true),
    mat(0xd9762a, 0.6, 0.1, 0.4, { side: THREE.DoubleSide, transparent: true, opacity: 0.88 }),
  );
  band.position.y = 0.9;
  g.add(band);
  return g;
}
/** 해치 / 도킹 — 상단 도킹 링 + 측면 해치 도어 + 창. 로컬 원점 = 캡슐 중심(y=0). */
function buildHatch() {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.12, 12, 40), steel(0.35));
  ring.position.y = 1.5;
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  addEdges(g, ring, 0xcdd5e0, 0.3);
  const yDoor = 0.2;
  const frac = (yDoor + H / 2) / H;
  const r = R_BASE + (R_TOP - R_BASE) * frac;
  const door = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.1, 28), darkSteel());
  door.position.set(0, yDoor, r);
  door.rotation.x = Math.PI / 2;
  g.add(door);
  addEdges(g, door, 0x9aa3b0, 0.4);
  const win = new THREE.Mesh(
    new THREE.CircleGeometry(0.16, 24),
    mat(0x0a1626, 0.2, 0.4, 1.45, { side: THREE.DoubleSide }),
  );
  win.position.set(0.5, 0.62, r - 0.02);
  win.rotation.x = Math.PI / 2;
  g.add(win);
  return g;
}

// ── 부품 조립 (동심 껍질 벗기기: 수직 텔레스코핑 + 방사) ──────────────
const parts: PartDef[] = [
  { id: "heatshield", base: [0, -1.4, 0], explode: [0, -3.2, 0], order: 0, node: <primitive object={buildHeatshield()} /> },
  { id: "backshell", base: [0, 0, 0], explode: [0, 2.9, 0], order: 0.25, node: <primitive object={buildBackshell()} /> },
  { id: "rcs", base: [0, 0, 0], explode: [-3.0, 0.6, 0], order: 0.4, node: <primitive object={buildRCS()} /> },
  { id: "interior", base: [0, -0.7, 0], explode: [0, 1.4, 2.0], order: 0.55, node: <primitive object={buildInterior()} /> },
  { id: "pressure-vessel", base: [0, 0, 0], explode: [0, 1.0, 0], order: 0.6, node: <primitive object={buildPressureVessel()} /> },
  { id: "parachute", base: [0, 1.0, 0], explode: [0, 3.1, 1.4], order: 0.75, node: <primitive object={buildParachute()} /> },
  { id: "hatch", base: [0, 0, 0], explode: [3.0, 1.0, 0], order: 0.9, node: <primitive object={buildHatch()} /> },
];

export const reentryCapsuleModel: ModelDef = { parts, info: reentryCapsuleInfo };
export default reentryCapsuleModel;
