import * as THREE from "three";
import type { ModelDef, PartDef, ViewerFrameCtx } from "@app/shared/r3f/model";
import { makeDieTexture, makeRoutingTexture, makeBaseTexture } from "@app/shared/r3f/textures";
import { hbmInfo } from "./data";

/**
 * HBM 모델 — hbm-3d-space.html의 형상·절차적 텍스처·PBR·인스턴싱을 R3F ModelDef로 이식.
 * 회전·줌·분해·선택·정보패널·환경맵은 공통 <Viewer> 엔진이 처리한다.
 * 형상은 module 로드 시 THREE 객체로 한 번 빌드하고 <primitive>로 꽂는다(텍스처는 공용 모듈에서 1회 생성).
 *
 * 구조(아래→위): 패키지 기판 · 인터포저 · 베이스(로직) 다이 · DRAM ×8 · TSV(스택 관통) · 마이크로 범프 · BGA 볼.
 */

const CY = 1.55; // 분해 피벗(높이)
const SPREAD = 2.6; // 분해 강도
const DRAM_HALF = 0.15;
const BASE_HALF = 0.21;
const DRAM_N = 8;

// ── 재질 (6면 멀티머티리얼, +y 윗면에 텍스처) ────────────────────
function side(color: number, rough: number, metal: number, env: number) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, envMapIntensity: env });
}
function substrateMats() {
  const tex = makeRoutingTexture("#0e261f", "hsla(150,55%,55%,A)", 360);
  return [
    side(0x123028, 0.82, 0.15, 0.5),
    side(0x123028, 0.82, 0.15, 0.5),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, metalness: 0.25, envMapIntensity: 0.6 }),
    side(0x0d2019, 0.85, 0.1, 0.5),
    side(0x123028, 0.82, 0.15, 0.5),
    side(0x123028, 0.82, 0.15, 0.5),
  ];
}
function interposerMats() {
  const tex = makeRoutingTexture("#5a6874", "hsla(210,40%,82%,A)", 520);
  return [
    side(0x6a7886, 0.32, 0.7, 1.0),
    side(0x6a7886, 0.32, 0.7, 1.0),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.3, metalness: 0.6, envMapIntensity: 1.0 }),
    side(0x4a5662, 0.45, 0.6, 1.0),
    side(0x6a7886, 0.32, 0.7, 1.0),
    side(0x6a7886, 0.32, 0.7, 1.0),
  ];
}
function baseMats() {
  const tex = makeBaseTexture();
  return [
    side(0x222d3a, 0.5, 0.35, 0.8),
    side(0x222d3a, 0.5, 0.35, 0.8),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.42, metalness: 0.4, envMapIntensity: 0.9 }),
    side(0x161d2a, 0.6, 0.3, 0.8),
    side(0x222d3a, 0.5, 0.35, 0.8),
    side(0x222d3a, 0.5, 0.35, 0.8),
  ];
}
function dramMats(hue: number, col: number, topDie: boolean) {
  const tex = makeDieTexture(hue, topDie ? ["HBM", "K4ZAH08 · 8H"] : undefined);
  return [
    side(col, 0.45, 0.4, 0.9),
    side(col, 0.45, 0.4, 0.9),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.38, metalness: 0.55, envMapIntensity: 0.9 }),
    side(0x1a2230, 0.6, 0.3, 0.9),
    side(col, 0.45, 0.4, 0.9),
    side(col, 0.45, 0.4, 0.9),
  ];
}

// ── 빌더 ─────────────────────────────────────────────────────────
function makeBox(w: number, h: number, d: number, mat: THREE.Material[]) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
}
function addEdges(group: THREE.Group, mesh: THREE.Mesh, color: number, op = 0.5) {
  const e = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: op }),
  );
  e.raycast = () => {}; // 엣지 라인은 장식 — 클릭을 가로채지 않도록 픽 대상에서 제외
  group.add(e);
}
function addBumps(group: THREE.Group, w: number, dieHalfH: number) {
  const n = 7,
    span = w * 0.78,
    step = span / (n - 1),
    start = -span / 2;
  const mat = new THREE.MeshStandardMaterial({ color: 0xe6b53c, metalness: 1.0, roughness: 0.28, envMapIntensity: 1.1 });
  const im = new THREE.InstancedMesh(new THREE.SphereGeometry(0.036, 10, 10), mat, n * n);
  const mm = new THREE.Matrix4();
  let i = 0;
  for (let a = 0; a < n; a++)
    for (let b = 0; b < n; b++) {
      mm.makeTranslation(start + a * step, -dieHalfH - 0.045, start + b * step);
      im.setMatrixAt(i++, mm);
    }
  im.instanceMatrix.needsUpdate = true;
  im.frustumCulled = false;
  im.userData.partId = "microbump";
  group.add(im);
}
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
  const m = makeBox(7, 0.5, 7, substrateMats());
  g.add(m);
  addEdges(g, m, 0x2f6f5e, 0.5);
  addBallGrid(g, 14, 7 * 0.88, -0.5 / 2 - 0.12, 0.12, 0xc6ccd6, 0.3, "bga");
  return g;
}
function buildInterposer() {
  const g = new THREE.Group();
  const m = makeBox(6.4, 0.3, 5.6, interposerMats());
  g.add(m);
  addEdges(g, m, 0xaebfce, 0.55);
  addBallGrid(g, 18, 6.4 * 0.82, -0.3 / 2 - 0.045, 0.04, 0xd9a23c, 0.32, null);
  return g;
}
function buildBase() {
  const g = new THREE.Group();
  const m = makeBox(3.2, 0.42, 3.2, baseMats());
  g.add(m);
  addEdges(g, m, 0x6a86a0, 0.6);
  addBumps(g, 3.2, 0.42 / 2);
  return g;
}
function buildDram(i: number) {
  const g = new THREE.Group();
  const col = new THREE.Color().setHSL(0.58, 0.5, 0.4 + i * 0.012).getHex();
  const edge = new THREE.Color().setHSL(0.58, 0.7, 0.72).getHex();
  const m = makeBox(3.2, 0.3, 3.2, dramMats(212, col, i === DRAM_N - 1));
  g.add(m);
  addEdges(g, m, edge, 0.5);
  addBumps(g, 3.2, 0.3 / 2);
  return g;
}

// ── 부품 조립 ────────────────────────────────────────────────────
const offset = (cy: number): [number, number, number] => [0, (cy - CY) * SPREAD, 0];
const MAXY = 1.14 + 0.3 * (DRAM_N - 1); // 최상단 DRAM 높이 = stagger 정규화 기준
const order = (cy: number) => cy / MAXY;

const parts: PartDef[] = [
  { id: "substrate", base: [0, 0, 0], explode: offset(0), order: order(0), node: <primitive object={buildSubstrate()} /> },
  { id: "interposer", base: [0, 0.4, 0], explode: offset(0.4), order: order(0.4), node: <primitive object={buildInterposer()} /> },
  { id: "base", base: [0, 0.78, 0], explode: offset(0.78), order: order(0.78), node: <primitive object={buildBase()} /> },
];
for (let i = 0; i < DRAM_N; i++) {
  const cy = 1.14 + 0.3 * i;
  parts.push({
    id: "dram",
    base: [0, cy, 0],
    explode: offset(cy),
    order: order(cy),
    layer: i + 1,
    node: <primitive object={buildDram(i)} />,
  });
}

// ── TSV (스택 관통; 매 프레임 길이 갱신) ──────────────────────────
const TSV_GRID = 5,
  TSV_SP = 0.62;
const tsvPos: { x: number; z: number }[] = [];
for (let i = 0; i < TSV_GRID; i++)
  for (let j = 0; j < TSV_GRID; j++)
    tsvPos.push({ x: (i - (TSV_GRID - 1) / 2) * TSV_SP, z: (j - (TSV_GRID - 1) / 2) * TSV_SP });

const tsvMesh = new THREE.InstancedMesh(
  new THREE.CylinderGeometry(0.028, 0.028, 1, 12),
  new THREE.MeshStandardMaterial({ color: 0xcf8038, metalness: 1.0, roughness: 0.22, envMapIntensity: 1.2 }),
  tsvPos.length,
);
tsvMesh.frustumCulled = false;
tsvMesh.userData.partId = "tsv";

const _m = new THREE.Matrix4();
const _v = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();

function update({ groups }: ViewerFrameCtx) {
  const base = groups[2];
  const top = groups[parts.length - 1];
  if (!base || !top) return;
  const bBottom = base.position.y - BASE_HALF;
  const tTop = top.position.y + DRAM_HALF;
  const cc = (bBottom + tTop) / 2;
  const h = tTop - bBottom;
  for (let i = 0; i < tsvPos.length; i++) {
    _m.compose(_v.set(tsvPos[i].x, cc, tsvPos[i].z), _q, _s.set(1, h, 1));
    tsvMesh.setMatrixAt(i, _m);
  }
  tsvMesh.instanceMatrix.needsUpdate = true;
  // 인스턴스 행렬(길이)이 바뀌었으니 레이캐스트용 경계구를 무효화 → 펼친 TSV도 클릭 적중 보장
  tsvMesh.boundingSphere = null;
}

export const hbmModel: ModelDef = { parts, info: hbmInfo, extras: <primitive object={tsvMesh} />, update };
export default hbmModel;
