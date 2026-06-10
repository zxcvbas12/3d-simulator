import * as THREE from "three";
import type { ModelDef, PartDef } from "@app/shared/r3f/model";
import { makeDieTexture, makeRoutingTexture, makeBrushedMetalTexture } from "@app/shared/r3f/textures";
import { cpuInfo } from "./data";

/**
 * CPU(칩렛 패키지) 모델 — 큰 다이 하나가 아니라 여러 칩렛을 한 패키지에 모은 구조.
 * HBM의 수직 적층과 대비되는 "평면 배치 + 혼합 분해"를 보여준다:
 * IHS는 위로 들리고(수직), 컴퓨트 칩렛(CCD)은 옆으로 펼쳐지며(평면) 기판 위 칩렛 레이아웃이 드러난다.
 * 회전·줌·분해·선택·정보패널·환경맵은 공통 <Viewer> 엔진이 처리한다.
 */

// ── 재질 ─────────────────────────────────────────────────────────
function side(color: number, rough: number, metal: number, env: number) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, envMapIntensity: env });
}
function substrateMats() {
  const tex = makeRoutingTexture("#241c10", "hsla(40,55%,58%,A)", 360);
  return [
    side(0x2a2114, 0.8, 0.18, 0.5),
    side(0x2a2114, 0.8, 0.18, 0.5),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.68, metalness: 0.28, envMapIntensity: 0.6 }),
    side(0x1c160c, 0.85, 0.12, 0.5),
    side(0x2a2114, 0.8, 0.18, 0.5),
    side(0x2a2114, 0.8, 0.18, 0.5),
  ];
}
function dieMats(hue: number, col: number, marks: string[]) {
  const tex = makeDieTexture(hue, marks);
  return [
    side(col, 0.45, 0.42, 0.9),
    side(col, 0.45, 0.42, 0.9),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.38, metalness: 0.55, envMapIntensity: 0.95 }),
    side(0x161d28, 0.6, 0.3, 0.9),
    side(col, 0.45, 0.42, 0.9),
    side(col, 0.45, 0.42, 0.9),
  ];
}
function ihsMats() {
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
/** LGA 랜드 — 패키지 바닥의 평평한 금색 접점 격자. */
function addPadGrid(group: THREE.Group, n: number, w: number, yLocal: number) {
  const step = w / (n - 1),
    start = -w / 2;
  const mat = new THREE.MeshStandardMaterial({ color: 0xd9b44a, metalness: 0.9, roughness: 0.35, envMapIntensity: 1.1 });
  const im = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.06, 0.06, 0.045, 10), mat, n * n);
  const mm = new THREE.Matrix4();
  let i = 0;
  for (let a = 0; a < n; a++)
    for (let b = 0; b < n; b++) {
      mm.makeTranslation(start + a * step, yLocal, start + b * step);
      im.setMatrixAt(i++, mm);
    }
  im.instanceMatrix.needsUpdate = true;
  im.frustumCulled = false;
  im.userData.partId = "lga";
  group.add(im);
}

// ── 부품 콘텐츠 그룹 (원점 기준) ──────────────────────────────────
function buildSubstrate() {
  const g = new THREE.Group();
  const m = makeBox(6, 0.5, 6, substrateMats());
  g.add(m);
  addEdges(g, m, 0x7a6a3a, 0.45);
  addPadGrid(g, 16, 6 * 0.84, -0.5 / 2 - 0.025);
  return g;
}
function buildDie(w: number, d: number, hue: number, col: number, edge: number, mark: string) {
  const g = new THREE.Group();
  const m = makeBox(w, 0.3, d, dieMats(hue, col, [mark]));
  g.add(m);
  addEdges(g, m, edge, 0.5);
  return g;
}
function buildTim() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: 0x9aa0a8,
    roughness: 0.85,
    metalness: 0.1,
    transparent: true,
    opacity: 0.55,
  });
  g.add(makeBox(5.0, 0.06, 4.2, mat));
  return g;
}
function buildIhs() {
  const g = new THREE.Group();
  const m = makeBox(5.4, 0.4, 5.4, ihsMats());
  g.add(m);
  addEdges(g, m, 0xdfe5ee, 0.4);
  return g;
}

// ── 부품 조립 (혼합 분해: IHS·TIM·기판은 수직, CCD는 평면으로 펼침) ──
const parts: PartDef[] = [
  { id: "substrate", base: [0, 0, 0], explode: [0, -1.8, 0], order: 0, node: <primitive object={buildSubstrate()} /> },
  // I/O 다이 — 중앙
  { id: "iod", base: [0, 0.44, 0], explode: [0, 0.7, 0], order: 0.4, node: <primitive object={buildDie(1.6, 2.6, 28, 0x4a3a26, 0xd7b072, "IOD")} /> },
  // 컴퓨트 칩렛 ×2 — 좌/우로 평면 전개
  { id: "ccd", base: [-1.75, 0.44, 0], explode: [-2.8, 1.4, 0], order: 0.45, node: <primitive object={buildDie(1.15, 2.0, 212, 0x2a3a52, 0x9fc0ff, "CCD")} /> },
  { id: "ccd", base: [1.75, 0.44, 0], explode: [2.8, 1.4, 0], order: 0.45, node: <primitive object={buildDie(1.15, 2.0, 212, 0x2a3a52, 0x9fc0ff, "CCD")} /> },
  // TIM(열전달 층) — 위로
  { id: "tim", base: [0, 0.66, 0], explode: [0, 2.4, 0], order: 0.7, node: <primitive object={buildTim()} /> },
  // IHS(히트 스프레더) — 가장 위로, 가장 늦게
  { id: "ihs", base: [0, 0.95, 0], explode: [0, 3.6, 0], order: 1, node: <primitive object={buildIhs()} /> },
];

export const cpuModel: ModelDef = { parts, info: cpuInfo };
export default cpuModel;
