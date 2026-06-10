import * as THREE from "three";
import type { ModelDef, PartDef, ViewerFrameCtx } from "@app/shared/r3f/model";
import { makeDieTexture, makeRoutingTexture, makeBrushedMetalTexture } from "@app/shared/r3f/textures";
import { gpuInfo } from "./data";

/**
 * GPU(2.5D 패키지) 모델 — 큰 연산 다이 옆에 HBM 스택들이 인터포저로 붙는 구조.
 * "HBM을 왜 프로세서 바로 옆에 두는가"를 보여준다. 분해는 수직+평면 혼합:
 * 리드 위로 → GPU 다이는 수직, HBM 스택은 바깥쪽 평면으로 분리 → 인터포저 → 기판.
 * HBM 스택은 분해 후반(t>0.6)에 내부 층까지 벌어지는 2단계 분해.
 * 회전·줌·분해·선택·정보패널·환경맵은 공통 <Viewer> 엔진이 처리한다.
 */

const HBM_W = 1.55; // HBM 스택 한 변
const HBM_BASE_H = 0.16; // 스택 베이스(로직) 다이 두께
const HBM_DRAM_H = 0.14; // DRAM 층 두께
const HBM_DRAM_N = 4; // 간략화한 층 수 (상세 적층은 HBM 모델 담당)

// ── 재질 (6면 멀티머티리얼, +y 윗면에 텍스처) ────────────────────
function side(color: number, rough: number, metal: number, env: number) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, envMapIntensity: env });
}
function substrateMats() {
  const tex = makeRoutingTexture("#101b2c", "hsla(215,55%,62%,A)", 420);
  return [
    side(0x16233a, 0.8, 0.18, 0.5),
    side(0x16233a, 0.8, 0.18, 0.5),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, metalness: 0.25, envMapIntensity: 0.6 }),
    side(0x0e1726, 0.85, 0.12, 0.5),
    side(0x16233a, 0.8, 0.18, 0.5),
    side(0x16233a, 0.8, 0.18, 0.5),
  ];
}
function interposerMats() {
  const tex = makeRoutingTexture("#5a6874", "hsla(210,40%,82%,A)", 560);
  return [
    side(0x6a7886, 0.32, 0.7, 1.0),
    side(0x6a7886, 0.32, 0.7, 1.0),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.3, metalness: 0.6, envMapIntensity: 1.0 }),
    side(0x4a5662, 0.45, 0.6, 1.0),
    side(0x6a7886, 0.32, 0.7, 1.0),
    side(0x6a7886, 0.32, 0.7, 1.0),
  ];
}
/** GPU 다이 — 카테고리 블루와 구분되는 청록 포인트색. */
function gpuDieMats() {
  const tex = makeDieTexture(172, ["GPU", "SC100 · 2.5D CoWoS"]);
  return [
    side(0x1f4a44, 0.42, 0.45, 0.95),
    side(0x1f4a44, 0.42, 0.45, 0.95),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.36, metalness: 0.55, envMapIntensity: 1.0 }),
    side(0x122a28, 0.6, 0.3, 0.9),
    side(0x1f4a44, 0.42, 0.45, 0.95),
    side(0x1f4a44, 0.42, 0.45, 0.95),
  ];
}
function hbmBaseMats() {
  return [
    side(0x222d3a, 0.5, 0.35, 0.8),
    side(0x222d3a, 0.5, 0.35, 0.8),
    side(0x2b3848, 0.45, 0.4, 0.85),
    side(0x161d2a, 0.6, 0.3, 0.8),
    side(0x222d3a, 0.5, 0.35, 0.8),
    side(0x222d3a, 0.5, 0.35, 0.8),
  ];
}
function hbmDramMats(i: number, top: boolean) {
  const col = new THREE.Color().setHSL(0.58, 0.5, 0.4 + i * 0.018).getHex();
  const tex = top ? makeDieTexture(212, ["HBM"]) : null;
  const topMat = tex
    ? new THREE.MeshStandardMaterial({ map: tex, roughness: 0.38, metalness: 0.55, envMapIntensity: 0.9 })
    : side(new THREE.Color().setHSL(0.58, 0.45, 0.45 + i * 0.018).getHex(), 0.4, 0.5, 0.9);
  return [side(col, 0.45, 0.4, 0.9), side(col, 0.45, 0.4, 0.9), topMat, side(0x1a2230, 0.6, 0.3, 0.9), side(col, 0.45, 0.4, 0.9), side(col, 0.45, 0.4, 0.9)];
}
function lidMats() {
  const tex = makeBrushedMetalTexture();
  const s = () => side(0xb8bfc9, 0.34, 0.92, 1.25);
  return [
    s(),
    s(),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.3, metalness: 0.9, envMapIntensity: 1.3 }),
    side(0x9aa1ac, 0.4, 0.9, 1.2),
    s(),
    s(),
  ];
}

// ── 빌더 ─────────────────────────────────────────────────────────
function makeBox(w: number, h: number, d: number, mat: THREE.Material | THREE.Material[]) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
}
function addEdges(group: THREE.Group, mesh: THREE.Mesh, color: number, op = 0.5) {
  const e = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: op }),
  );
  e.raycast = () => {}; // 엣지 라인은 장식 — 픽 대상에서 제외
  group.add(e);
}
/** 솔더 볼/범프 격자. pickId가 없으면 클릭이 부모 부품으로 귀속된다. */
function addBallGrid(
  group: THREE.Group,
  n: number,
  w: number,
  yLocal: number,
  radius: number,
  color: number,
  rough: number,
  pickId: string | null,
) {
  const step = w / (n - 1),
    start = -w / 2;
  const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.95, roughness: rough, envMapIntensity: 1.1 });
  const im = new THREE.InstancedMesh(new THREE.SphereGeometry(radius, 12, 12), mat, n * n);
  const mm = new THREE.Matrix4();
  let i = 0;
  for (let a = 0; a < n; a++)
    for (let b = 0; b < n; b++) {
      mm.makeTranslation(start + a * step, yLocal, start + b * step);
      im.setMatrixAt(i++, mm);
    }
  im.instanceMatrix.needsUpdate = true;
  im.frustumCulled = false;
  if (pickId) im.userData.partId = pickId;
  group.add(im);
}

// ── 부품 콘텐츠 그룹 (원점 기준; 위치는 엔진이 잡는다) ──────────────
function buildSubstrate() {
  const g = new THREE.Group();
  const m = makeBox(9, 0.5, 8, substrateMats());
  g.add(m);
  addEdges(g, m, 0x3d5a8a, 0.45);
  addBallGrid(g, 16, 8 * 0.9, -0.5 / 2 - 0.13, 0.13, 0xc6ccd6, 0.3, "bga");
  return g;
}
function buildInterposer() {
  const g = new THREE.Group();
  const m = makeBox(7.8, 0.3, 6.6, interposerMats());
  g.add(m);
  addEdges(g, m, 0xaebfce, 0.55);
  addBallGrid(g, 20, 7.8 * 0.84, -0.3 / 2 - 0.045, 0.04, 0xd9a23c, 0.32, null);
  return g;
}
function buildGpuDie() {
  const g = new THREE.Group();
  const m = makeBox(3.2, 0.42, 3.2, gpuDieMats());
  g.add(m);
  addEdges(g, m, 0x6fd8c8, 0.55);
  addBallGrid(g, 8, 3.2 * 0.78, -0.42 / 2 - 0.045, 0.036, 0xe6b53c, 0.28, null);
  return g;
}

/** HBM 스택 — 베이스 다이 + DRAM 층(간략화). 층 그룹을 모아 두고 2단계 분해 때 벌린다. */
const stackLayers: { obj: THREE.Object3D; baseY: number; idx: number }[] = [];
function buildHbmStack() {
  const g = new THREE.Group(); // 원점 = 스택 바닥
  const base = makeBox(HBM_W, HBM_BASE_H, HBM_W, hbmBaseMats());
  base.position.y = HBM_BASE_H / 2;
  g.add(base);
  addEdges(g, base, 0x6a86a0, 0.55);
  addBallGrid(g, 6, HBM_W * 0.78, -0.04, 0.032, 0xe6b53c, 0.28, null);
  for (let i = 0; i < HBM_DRAM_N; i++) {
    const layer = new THREE.Group();
    const y = HBM_BASE_H + 0.02 + HBM_DRAM_H / 2 + i * (HBM_DRAM_H + 0.02);
    const m = makeBox(HBM_W, HBM_DRAM_H, HBM_W, hbmDramMats(i, i === HBM_DRAM_N - 1));
    layer.add(m);
    addEdges(layer, m, new THREE.Color().setHSL(0.58, 0.7, 0.72).getHex(), 0.5);
    layer.position.y = y;
    g.add(layer);
    stackLayers.push({ obj: layer, baseY: y, idx: i });
  }
  return g;
}
function buildLid() {
  const g = new THREE.Group();
  const m = makeBox(8.4, 0.4, 7.4, lidMats());
  g.add(m);
  addEdges(g, m, 0xdfe5ee, 0.4);
  return g;
}

// ── 부품 조립 (혼합 분해: 리드·다이·기판은 수직, HBM 스택은 바깥 평면으로) ──
const HBM_Y = 0.64; // 인터포저 윗면 + 범프 간격
const HBM_POS: [number, number][] = [
  [-2.5, -1.55],
  [-2.5, 1.55],
  [2.5, -1.55],
  [2.5, 1.55],
];
/** 스택 위치의 바깥 방향으로 펼치고 살짝 들어올린다. */
function hbmExplode(x: number, z: number): [number, number, number] {
  const len = Math.hypot(x, z);
  return [(x / len) * 2.4, 1.8, (z / len) * 2.4];
}

const parts: PartDef[] = [
  { id: "substrate", base: [0, 0, 0], explode: [0, -1.9, 0], order: 0, node: <primitive object={buildSubstrate()} /> },
  { id: "interposer", base: [0, 0.42, 0], explode: [0, 0.6, 0], order: 0.25, node: <primitive object={buildInterposer()} /> },
  { id: "gpudie", base: [0, 0.85, 0], explode: [0, 1.8, 0], order: 0.5, node: <primitive object={buildGpuDie()} /> },
  ...HBM_POS.map(
    ([x, z]): PartDef => ({
      id: "hbm",
      base: [x, HBM_Y, z],
      explode: hbmExplode(x, z),
      order: 0.55,
      node: <primitive object={buildHbmStack()} />,
    }),
  ),
  { id: "lid", base: [0, 1.76, 0], explode: [0, 3.9, 0], order: 1, node: <primitive object={buildLid()} /> },
];

// ── 2단계 분해: 스택이 자리를 잡은 분해 후반에 내부 층이 벌어진다 ──
function update({ t }: ViewerFrameCtx) {
  let sub = Math.max(0, Math.min(1, (t - 0.6) / 0.4));
  sub = sub < 0.5 ? 2 * sub * sub : 1 - Math.pow(-2 * sub + 2, 2) / 2; // easeInOutQuad
  for (const l of stackLayers) l.obj.position.y = l.baseY + (l.idx + 1) * sub * 0.2;
}

export const gpuModel: ModelDef = { parts, info: gpuInfo, update };
export default gpuModel;
