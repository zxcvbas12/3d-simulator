import * as THREE from "three";
import type { ModelDef, ModelOption, PartDef, ViewerFrameCtx } from "@app/shared/r3f/model";
import { makeDieTexture, makeRoutingTexture, makeBaseTexture } from "@app/shared/r3f/textures";
import { hbmInfo } from "./data";

/**
 * HBM 모델 — hbm-3d-space.html의 형상·절차적 텍스처·PBR·인스턴싱을 R3F ModelDef로 이식.
 * 회전·줌·분해·선택·정보패널·환경맵은 공통 <Viewer> 엔진이 처리한다.
 * 형상은 module 로드 시 THREE 객체로 한 번 빌드하고 <primitive>로 꽂는다(텍스처는 공용 모듈에서 1회 생성).
 *
 * 구조(아래→위): 패키지 기판 · 인터포저 · 베이스(로직) 다이 · DRAM ×8~16 · TSV(스택 관통) · 마이크로 범프 · BGA 볼.
 * 옵션: 층수(8/12/16-Hi — 16층을 미리 만들어 표시 전환, TSV·각인·프레이밍 자동 추종) · 단면(cutaway, 클리핑 평면).
 */

const CY = 1.55; // 분해 피벗(높이)
const SPREAD = 2.6; // 분해 강도
const DRAM_HALF = 0.15;
const BASE_HALF = 0.21;
const DRAM_MAX = 16; // 사전 빌드 층수(최대) — 표시 층수는 옵션으로 8/12/16
const DEFAULT_N = 8;

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
function dramMats(hue: number, col: number) {
  const tex = makeDieTexture(hue, undefined);
  return [
    side(col, 0.45, 0.4, 0.9),
    side(col, 0.45, 0.4, 0.9),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.38, metalness: 0.55, envMapIntensity: 0.9 }),
    side(0x1a2230, 0.6, 0.3, 0.9),
    side(col, 0.45, 0.4, 0.9),
    side(col, 0.45, 0.4, 0.9),
  ];
}
/** 최상층(각인) 윗면 재질 — 층수 옵션마다 각인 문구가 다르다(텍스처는 파라미터별 캐시 1장). */
function engravedTopMat(n: number) {
  const tex = makeDieTexture(212, ["HBM", `K4ZAH08 · ${n}H`]);
  return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.38, metalness: 0.55, envMapIntensity: 0.9 });
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
const dramMeshes: THREE.Mesh[] = []; // 층수 옵션에 따라 윗면 각인을 옮기기 위한 참조
const dramPlainTops: THREE.Material[] = [];
function buildDram(i: number) {
  const g = new THREE.Group();
  const col = new THREE.Color().setHSL(0.58, 0.5, 0.4 + i * 0.012).getHex();
  const edge = new THREE.Color().setHSL(0.58, 0.7, 0.72).getHex();
  const mats = dramMats(212, col);
  const m = makeBox(3.2, 0.3, 3.2, mats);
  dramMeshes[i] = m;
  dramPlainTops[i] = mats[2];
  g.add(m);
  addEdges(g, m, edge, 0.5);
  addBumps(g, 3.2, 0.3 / 2);
  return g;
}

// ── 부품 조립 ────────────────────────────────────────────────────
const offset = (cy: number): [number, number, number] => [0, (cy - CY) * SPREAD, 0];
const MAXY = 1.14 + 0.3 * (DRAM_MAX - 1); // 최상단 DRAM 높이 = stagger 정규화 기준
const order = (cy: number) => cy / MAXY;

const parts: PartDef[] = [
  { id: "substrate", base: [0, 0, 0], explode: offset(0), order: order(0), node: <primitive object={buildSubstrate()} /> },
  { id: "interposer", base: [0, 0.4, 0], explode: offset(0.4), order: order(0.4), node: <primitive object={buildInterposer()} /> },
  { id: "base", base: [0, 0.78, 0], explode: offset(0.78), order: order(0.78), node: <primitive object={buildBase()} /> },
];
const DRAM_PART0 = parts.length; // 첫 DRAM 부품 인덱스(=3)
for (let i = 0; i < DRAM_MAX; i++) {
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

// ── 옵션: 층수(표시 전환) + 단면(클리핑) ──────────────────────────
const options: ModelOption[] = [
  {
    id: "stack",
    label: { ko: "층수", en: "Stack height", ja: "層数", zh: "层数" },
    values: [
      { id: "8", label: "8-Hi" },
      { id: "12", label: "12-Hi" },
      { id: "16", label: "16-Hi" },
    ],
    default: String(DEFAULT_N),
  },
  {
    id: "cut",
    label: { ko: "단면", en: "Cutaway", ja: "断面", zh: "剖面" },
    values: [
      { id: "off", label: "OFF" },
      { id: "on", label: "ON" },
    ],
    default: "off",
  },
];
const cutPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0); // z>0 절반 제거 → 내부 단면
const engravedMats: Record<number, THREE.Material> = {};
let lastN = -1;
let lastCut: boolean | null = null;

function applyClipping(groups: ViewerFrameCtx["groups"], on: boolean) {
  const planes = on ? [cutPlane] : null;
  const visit = (o: THREE.Object3D) => {
    const mat = (o as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
    if (!mat) return;
    for (const m of Array.isArray(mat) ? mat : [mat]) m.clippingPlanes = planes;
  };
  for (const g of groups) g?.traverse(visit);
  visit(tsvMesh);
}

function update({ groups, options: opts }: ViewerFrameCtx) {
  // 층수 옵션 — 표시 층 전환 + 최상층 각인 이동 (변경 시에만)
  const n = parseInt(opts["stack"] ?? String(DEFAULT_N), 10);
  if (n !== lastN) {
    lastN = n;
    for (let i = 0; i < DRAM_MAX; i++) {
      const g = groups[DRAM_PART0 + i];
      if (g) g.visible = i < n;
      const mats = dramMeshes[i]?.material as THREE.Material[] | undefined;
      if (mats) mats[2] = i === n - 1 ? (engravedMats[n] ??= engravedTopMat(n)) : dramPlainTops[i];
    }
  }
  // 단면 옵션 — 전 재질에 클리핑 평면 적용/해제 (변경 시에만)
  const cut = (opts["cut"] ?? "off") === "on";
  if (cut !== lastCut) {
    lastCut = cut;
    applyClipping(groups, cut);
  }
  // TSV — 보이는 최상층까지 관통하며 분해 높이를 따라 늘어난다
  const base = groups[2];
  const top = groups[DRAM_PART0 + lastN - 1];
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
  tsvMesh.boundingBox = null; // 길이가 바뀌므로 프레이밍·픽 경계 무효화
  tsvMesh.boundingSphere = null;
  // (분해 중 인스턴스 경계 무효화는 엔진도 일괄 처리한다 — SceneContents 참고)
}

export const hbmModel: ModelDef = { parts, info: hbmInfo, extras: <primitive object={tsvMesh} />, options, update };
export default hbmModel;
