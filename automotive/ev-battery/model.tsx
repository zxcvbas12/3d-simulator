import * as THREE from "three";
import type { ModelDef, ModelOption, PartDef, ViewerFrameCtx } from "@app/shared/r3f/model";
import { makeBrushedMetalTexture, makeChannelTexture, makeRoutingTexture } from "@app/shared/r3f/textures";
import { evBatteryInfo } from "./data";

/**
 * EV 배터리 팩 모델 — 트레이(하우징) 안에 냉각판·모듈(셀 묶음)·버스바·BMS가 들어가고
 * 위를 커버가 덮는 스케이트보드형 팩. 반도체의 "적층"과 달리 "중첩(트레이 안에 모듈 배열)" 구조.
 * 분해는 혼합: 커버·버스바·BMS는 수직(위로), 모듈은 평면(바깥으로 펼침), 냉각판·트레이는 아래로.
 * 회전·줌·분해·선택·정보패널·환경맵은 공통 <Viewer> 엔진이 처리한다.
 */

// ── 재질 ─────────────────────────────────────────────────────────
function side(color: number, rough: number, metal: number, env: number) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, envMapIntensity: env });
}
function aluMats() {
  const tex = makeBrushedMetalTexture();
  const s = () => side(0xb8bfc9, 0.36, 0.9, 1.2);
  return [s(), s(), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.32, metalness: 0.88, envMapIntensity: 1.25 }), side(0x9aa1ac, 0.42, 0.85, 1.15), s(), s()];
}
function coldMats() {
  const tex = makeChannelTexture(188); // 시안 계열 냉각 채널
  return [
    side(0x6d7c86, 0.4, 0.75, 1.0),
    side(0x6d7c86, 0.4, 0.75, 1.0),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.42, metalness: 0.6, envMapIntensity: 1.0 }),
    side(0x4d5a64, 0.5, 0.6, 0.9),
    side(0x6d7c86, 0.4, 0.75, 1.0),
    side(0x6d7c86, 0.4, 0.75, 1.0),
  ];
}
function bmsMats() {
  const tex = makeRoutingTexture("#0e2620", "hsla(150,55%,55%,A)", 320);
  return [
    side(0x123028, 0.8, 0.18, 0.5),
    side(0x123028, 0.8, 0.18, 0.5),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.68, metalness: 0.25, envMapIntensity: 0.6 }),
    side(0x0d2019, 0.85, 0.12, 0.5),
    side(0x123028, 0.8, 0.18, 0.5),
    side(0x123028, 0.8, 0.18, 0.5),
  ];
}

// ── 빌더 ─────────────────────────────────────────────────────────
function makeBox(w: number, h: number, d: number, mat: THREE.Material | THREE.Material[]) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
}
function addEdges(_group: THREE.Group, mesh: THREE.Mesh, color: number, op = 0.45) {
  const e = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: op }),
  );
  e.raycast = () => {}; // 엣지 라인은 장식 — 픽 제외
  mesh.add(e); // 메시의 자식으로 — 위치·이동(2단계 분해)을 자동으로 따라간다
}

// 모듈 배열: 3열 × 2행
const MOD_X = [-3.0, 0, 3.0];
const MOD_Z = [-1.6, 1.6];
const CELL_N = 5; // 모듈당 각형 셀 수
const CELL_W = 0.42;
const CELL_H = 1.0;
const CELL_D = 2.3;
const MOD_Y = 1.0; // 셀/모듈 중심 높이 (냉각판 위)

/** 셀 형식 변형(각형/원통/파우치)과 2단계 분해를 위해 모듈별 내부를 모아 둔다.
 *  rec.base = 인스턴스 기준 위치 — 2단계 분해 때 x를 배율로 벌린다. */
type CellRec = { im: THREE.InstancedMesh; base: [number, number, number][] };
type CellVariant = { grp: THREE.Group; recs: CellRec[] };
const moduleInternals: { plates: THREE.Mesh[]; variants: Record<string, CellVariant> }[] = [];

function makeInstanced(
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  base: [number, number, number][],
  pickable: boolean,
): CellRec {
  const im = new THREE.InstancedMesh(geo, mat, base.length);
  const m = new THREE.Matrix4();
  base.forEach(([x, y, z], i) => {
    m.makeTranslation(x, y, z);
    im.setMatrixAt(i, m);
  });
  im.instanceMatrix.needsUpdate = true;
  im.frustumCulled = false;
  if (pickable) im.userData.partId = "cell";
  else im.raycast = () => {};
  return { im, base };
}

/** 모듈 하나 = 양옆 압축 엔드플레이트(픽: module) + 셀 묶음(형식 옵션: 각형/원통/파우치, 픽: cell). */
function buildModule() {
  const g = new THREE.Group();
  // 엔드플레이트 ×2 (셀을 압축해 잡아 주는 금속판) — partId 없음 → 부모(module)로 픽 귀속
  const plateMat = side(0x8b929c, 0.4, 0.8, 1.1);
  const plates: THREE.Mesh[] = [];
  for (const sx of [-1, 1]) {
    const p = makeBox(0.12, CELL_H + 0.16, CELL_D + 0.18, plateMat);
    p.position.x = sx * (CELL_N * CELL_W) / 2 + sx * 0.18;
    g.add(p);
    addEdges(g, p, 0xc6ccd6, 0.4);
    plates.push(p);
  }
  const start = -((CELL_N - 1) * CELL_W) / 2;
  const xs = Array.from({ length: CELL_N }, (_, i) => start + i * CELL_W);
  const variants: Record<string, CellVariant> = {};

  // ① 각형(prismatic, 기본) — 금속 캔 + 상단 골드 단자
  {
    const grp = new THREE.Group();
    const cells = makeInstanced(
      new THREE.BoxGeometry(CELL_W * 0.86, CELL_H, CELL_D),
      side(0x9fb6ad, 0.34, 0.7, 1.05),
      xs.map((x) => [x, 0, 0]),
      true,
    );
    const terms = makeInstanced(
      new THREE.CylinderGeometry(0.07, 0.07, 0.08, 10),
      side(0xe6b53c, 0.3, 1.0, 1.1),
      xs.map((x) => [x, CELL_H / 2 + 0.04, CELL_D / 2 - 0.3]),
      false,
    );
    grp.add(cells.im, terms.im);
    g.add(grp);
    variants["prism"] = { grp, recs: [cells, terms] };
  }
  // ② 원통(cylindrical) — 2열 × CELL_N, 상단 골드 양극 캡
  {
    const grp = new THREE.Group();
    const pos: [number, number, number][] = [];
    for (const z of [-0.58, 0.58]) for (const x of xs) pos.push([x, 0, z]);
    const cans = makeInstanced(
      new THREE.CylinderGeometry(0.19, 0.19, CELL_H, 16),
      side(0xaab4be, 0.32, 0.85, 1.1),
      pos,
      true,
    );
    const caps = makeInstanced(
      new THREE.CylinderGeometry(0.08, 0.08, 0.05, 10),
      side(0xe6b53c, 0.3, 1.0, 1.1),
      pos.map(([x, , z]) => [x, CELL_H / 2 + 0.025, z]),
      false,
    );
    grp.add(cans.im, caps.im);
    grp.visible = false;
    g.add(grp);
    variants["cyl"] = { grp, recs: [cans, caps] };
  }
  // ③ 파우치(pouch) — 얇고 부드러운 직사각 팩 + 상단 탭
  {
    const grp = new THREE.Group();
    const n = CELL_N + 1;
    const startP = -((n - 1) * 0.36) / 2;
    const xsP = Array.from({ length: n }, (_, i) => startP + i * 0.36);
    const packs = makeInstanced(
      new THREE.BoxGeometry(0.28, CELL_H * 0.94, CELL_D * 0.94),
      side(0x93a0b5, 0.6, 0.3, 0.8),
      xsP.map((x) => [x, 0, 0]),
      true,
    );
    const tabs = makeInstanced(
      new THREE.BoxGeometry(0.16, 0.06, 0.3),
      side(0xc9b06a, 0.4, 0.9, 1.05),
      xsP.map((x) => [x, (CELL_H * 0.94) / 2 + 0.03, CELL_D / 2 - 0.45]),
      false,
    );
    grp.add(packs.im, tabs.im);
    grp.visible = false;
    g.add(grp);
    variants["pouch"] = { grp, recs: [packs, tabs] };
  }
  moduleInternals.push({ plates, variants });
  return g;
}

function buildEnclosure() {
  const g = new THREE.Group();
  const floor = makeBox(10, 0.4, 7, aluMats());
  g.add(floor);
  addEdges(g, floor, 0xc6ccd6, 0.4);
  // 측벽(트레이 림) — 낮은 4면
  const wallMat = side(0x9aa1ac, 0.4, 0.85, 1.15);
  const longW = makeBox(10, 0.7, 0.2, wallMat);
  const shortW = makeBox(0.2, 0.7, 7, wallMat);
  for (const z of [-3.4, 3.4]) {
    const w = longW.clone();
    w.position.set(0, 0.35, z);
    g.add(w);
  }
  for (const x of [-4.9, 4.9]) {
    const w = shortW.clone();
    w.position.set(x, 0.35, 0);
    g.add(w);
  }
  return g;
}
function buildColdplate() {
  const g = new THREE.Group();
  const m = makeBox(9.4, 0.18, 6.4, coldMats());
  g.add(m);
  addEdges(g, m, 0x7fd4e0, 0.5);
  return g;
}
function buildBusbar() {
  const g = new THREE.Group();
  const barMat = side(0xc97b34, 0.3, 1.0, 1.2); // 구리
  // 모듈 열을 잇는 가로 버스바 2줄
  for (const z of [-1.6, 1.6]) {
    const bar = makeBox(8.6, 0.12, 0.34, barMat);
    bar.position.set(0, 0, z);
    g.add(bar);
    addEdges(g, bar, 0xe2a96a, 0.5);
  }
  return g;
}
function buildBms() {
  const g = new THREE.Group();
  const m = makeBox(3.4, 0.4, 1.3, bmsMats());
  g.add(m);
  addEdges(g, m, 0x3f8f6f, 0.5);
  return g;
}
function buildLid() {
  const g = new THREE.Group();
  const m = makeBox(10, 0.3, 7, aluMats());
  g.add(m);
  addEdges(g, m, 0xdfe5ee, 0.4);
  return g;
}

// ── 부품 조립 ────────────────────────────────────────────────────
const parts: PartDef[] = [
  { id: "enclosure", base: [0, 0, 0], explode: [0, -2.2, 0], order: 0, node: <primitive object={buildEnclosure()} /> },
  { id: "coldplate", base: [0, 0.45, 0], explode: [0, -0.9, 0], order: 0.25, node: <primitive object={buildColdplate()} /> },
];
// 모듈 ×6 (평면으로 바깥 전개 + 살짝 위로, 순차)
let modIdx = 0;
for (const mz of MOD_Z) {
  for (const mx of MOD_X) {
    modIdx++;
    const dirx = mx === 0 ? 0 : Math.sign(mx);
    const dirz = Math.sign(mz);
    parts.push({
      id: "module",
      base: [mx, MOD_Y, mz],
      explode: [dirx * 2.4, 1.1, dirz * 2.0],
      order: 0.45 + modIdx * 0.015,
      layer: modIdx,
      node: <primitive object={buildModule()} />,
    });
  }
}
parts.push(
  { id: "busbar", base: [0, 1.62, 0], explode: [0, 2.8, 0], order: 0.8, node: <primitive object={buildBusbar()} /> },
  { id: "bms", base: [0, 0.8, 2.9], explode: [0, 1.4, 2.2], order: 0.7, node: <primitive object={buildBms()} /> },
  { id: "lid", base: [0, 1.95, 0], explode: [0, 4.0, 0], order: 1, node: <primitive object={buildLid()} /> },
);

// ── 옵션: 셀 형식(각형/원통/파우치) — 같은 모듈 자리에 다른 셀 패키징을 보여준다 ──
const options: ModelOption[] = [
  {
    id: "celltype",
    label: { ko: "셀 형식", en: "Cell type", ja: "セル形式", zh: "电芯形式" },
    values: [
      { id: "prism", label: "PRISM" },
      { id: "cyl", label: "CYL" },
      { id: "pouch", label: "POUCH" },
    ],
    default: "prism",
  },
];

// ── 2단계 분해 + 셀 형식 반영: 분해 후반(t>0.6)에 활성 형식의 셀·플레이트가 추가로 벌어진다 ──
const _m = new THREE.Matrix4();
function update({ t, options: opts }: ViewerFrameCtx) {
  const type = opts["celltype"] ?? "prism";
  let sub = Math.max(0, Math.min(1, (t - 0.6) / 0.4));
  sub = sub < 0.5 ? 2 * sub * sub : 1 - Math.pow(-2 * sub + 2, 2) / 2; // easeInOutQuad
  const f = 1 + sub * 0.95;
  for (const mod of moduleInternals) {
    for (const [key, variant] of Object.entries(mod.variants)) {
      variant.grp.visible = key === type;
      if (key !== type) continue;
      for (const rec of variant.recs) {
        rec.base.forEach(([x, y, z], i) => {
          _m.makeTranslation(x * f, y, z);
          rec.im.setMatrixAt(i, _m);
        });
        rec.im.instanceMatrix.needsUpdate = true;
      }
    }
    mod.plates[0].position.x = (-(CELL_N * CELL_W) / 2 - 0.18) * f;
    mod.plates[1].position.x = ((CELL_N * CELL_W) / 2 + 0.18) * f;
  }
}

export const evBatteryModel: ModelDef = { parts, info: evBatteryInfo, options, update };
export default evBatteryModel;
