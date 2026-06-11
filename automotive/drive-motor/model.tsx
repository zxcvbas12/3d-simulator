import * as THREE from "three";
import type { ModelDef, ModelOption, PartDef, ViewerFrameCtx } from "@app/shared/r3f/model";
import { makeBrushedMetalTexture } from "@app/shared/r3f/textures";
import { CUT_PLANE_Z, cutawayOption, setClipping } from "@app/shared/r3f/cutaway";
import { driveMotorInfo } from "./data";

/**
 * 구동 모터 모델 — EV의 표준인 영구자석 동기 모터(PMSM).
 * 축이 x방향으로 누운 원통: 하우징 안에 고정자(링) → 그 안에 회전자 → 중심에 샤프트.
 * 사이트 첫 "축방향(axial)" 분해: 하우징이 위로 열린 뒤, 엔드캡·베어링·회전자·샤프트가
 * 축을 따라 좌우로 빠진다(실제 모터 분해 순서). EV 배터리와 묶어 "전기 동력계" 한 쌍.
 * 회전·줌·분해·선택·정보패널·환경맵은 공통 <Viewer> 엔진이 처리한다.
 */

// ── 재질 ─────────────────────────────────────────────────────────
function side(color: number, rough: number, metal: number, env: number) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, envMapIntensity: env });
}
const X90 = Math.PI / 2; // Cylinder(축 Y) → 축 X로 눕히는 회전

function makeAxialCyl(rTop: number, rBot: number, len: number, mat: THREE.Material, open = false, seg = 48) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, len, seg, 1, open), mat);
  m.rotation.z = X90;
  return m;
}
function addEdges(group: THREE.Group, mesh: THREE.Mesh, color: number, op = 0.45) {
  const e = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: op }),
  );
  e.rotation.copy(mesh.rotation);
  e.position.copy(mesh.position);
  e.raycast = () => {}; // 엣지 라인은 장식 — 픽 제외
  group.add(e);
}

// ── 부품 빌더 (원점 기준; 위치는 엔진이 잡는다) ────────────────────
/** 하우징 — 열린 원통 셸 + 냉각 핀 링(장식, 픽은 부모 housing으로 귀속). */
function buildHousing() {
  const tex = makeBrushedMetalTexture();
  const g = new THREE.Group();
  const shell = makeAxialCyl(1.7, 1.7, 4.2, new THREE.MeshStandardMaterial({
    map: tex, color: 0xb4bbc5, roughness: 0.34, metalness: 0.85, envMapIntensity: 1.2, side: THREE.DoubleSide,
  }), true);
  g.add(shell);
  const finMat = side(0x9aa1ac, 0.4, 0.85, 1.1);
  for (let i = -3; i <= 3; i++) {
    const fin = new THREE.Mesh(new THREE.TorusGeometry(1.78, 0.045, 8, 48), finMat);
    fin.rotation.y = X90;
    fin.position.x = i * 0.55;
    g.add(fin);
  }
  return g;
}
/** 엔드캡 — 원판 + 중앙 허브(샤프트 통과부) + 볼트 머리(인스턴싱, 장식). */
function buildEndcap(sign: number) {
  const g = new THREE.Group();
  const mat = side(0xa7aeb8, 0.38, 0.85, 1.15);
  const disc = makeAxialCyl(1.72, 1.72, 0.28, mat);
  g.add(disc);
  addEdges(g, disc, 0xdfe5ee, 0.4);
  const hub = makeAxialCyl(0.5, 0.55, 0.2, side(0x8b929c, 0.4, 0.8, 1.1));
  hub.position.x = sign * 0.24;
  g.add(hub);
  const boltMat = side(0x6f7681, 0.45, 0.85, 1.0);
  const bolts = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 8), boltMat, 8);
  const m = new THREE.Matrix4();
  const r = new THREE.Matrix4().makeRotationZ(X90);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    m.makeTranslation(sign * 0.17, Math.cos(a) * 1.45, Math.sin(a) * 1.45).multiply(r);
    bolts.setMatrixAt(i, m);
  }
  bolts.instanceMatrix.needsUpdate = true;
  bolts.frustumCulled = false;
  bolts.raycast = () => {};
  g.add(bolts);
  return g;
}
/** 고정자 — 적층 강판 링(Lathe 단면 회전) + 얇은 적층 라인. */
function buildStator() {
  const g = new THREE.Group();
  const pts = [
    new THREE.Vector2(0.95, -1.3),
    new THREE.Vector2(1.5, -1.3),
    new THREE.Vector2(1.5, 1.3),
    new THREE.Vector2(0.95, 1.3),
    new THREE.Vector2(0.95, -1.3),
  ];
  const ring = new THREE.Mesh(new THREE.LatheGeometry(pts, 48), side(0x4a525e, 0.46, 0.7, 1.0));
  ring.rotation.z = X90;
  g.add(ring);
  // 적층(라미네이션) 라인 — 둘레의 얇은 링 (장식)
  const lamMat = side(0x39414c, 0.5, 0.6, 0.9);
  for (let i = -2; i <= 2; i++) {
    const lam = new THREE.Mesh(new THREE.TorusGeometry(1.505, 0.012, 6, 48), lamMat);
    lam.rotation.y = X90;
    lam.position.x = i * 0.5;
    lam.raycast = () => {};
    g.add(lam);
  }
  return g;
}
/** 권선 — 양끝 구리 엔드와인딩(토러스) + 슬롯 구리 막대(인스턴싱). */
function buildWinding() {
  const g = new THREE.Group();
  const cu = side(0xc97b34, 0.32, 1.0, 1.2);
  for (const sx of [-1, 1]) {
    const endw = new THREE.Mesh(new THREE.TorusGeometry(1.16, 0.18, 12, 48), cu);
    endw.rotation.y = X90;
    endw.position.x = sx * 1.45;
    g.add(endw);
  }
  const rods = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.055, 0.055, 2.9, 8), cu, 12);
  const m = new THREE.Matrix4();
  const r = new THREE.Matrix4().makeRotationZ(X90);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    m.makeTranslation(0, Math.cos(a) * 1.16, Math.sin(a) * 1.16).multiply(r);
    rods.setMatrixAt(i, m);
  }
  rods.instanceMatrix.needsUpdate = true;
  rods.frustumCulled = false;
  rods.userData.partId = "winding";
  g.add(rods);
  return g;
}
/** 회전자 — 강철 원통 + 내장(IPM) V자 영구자석(인스턴싱, 픽은 rotor 귀속).
 *  자석은 실제처럼 내부에 V자로 묻혀 있어 양 끝면의 V 단면과 단면(cutaway) 옵션으로 보인다. */
function buildRotor() {
  const g = new THREE.Group();
  const core = makeAxialCyl(0.88, 0.88, 2.5, side(0x39424e, 0.42, 0.75, 1.0));
  g.add(core);
  addEdges(g, core, 0x6a86a0, 0.45);
  // 8극 × V자 한 쌍(16개) — V 꼭짓점이 축쪽, 입이 표면쪽(전형적 IPM 배치)
  const magMat = side(0x1d242e, 0.5, 0.55, 0.85);
  const mags = new THREE.InstancedMesh(new THREE.BoxGeometry(2.52, 0.07, 0.36), magMat, 16);
  const m = new THREE.Matrix4();
  const pole = new THREE.Matrix4();
  const off = new THREE.Matrix4();
  const tilt = new THREE.Matrix4();
  let idx = 0;
  for (let p = 0; p < 8; p++) {
    pole.makeRotationX((p / 8) * Math.PI * 2);
    for (const s of [-1, 1]) {
      off.makeTranslation(0, 0.6, s * 0.17);
      tilt.makeRotationX(-s * 0.55);
      m.copy(pole).multiply(off).multiply(tilt);
      mags.setMatrixAt(idx++, m);
    }
  }
  mags.instanceMatrix.needsUpdate = true;
  mags.frustumCulled = false;
  g.add(mags);
  // 작은 허브 링(끝면의 V 단면이 보이도록 축 주변만)
  for (const sx of [-1, 1]) {
    const hub = makeAxialCyl(0.32, 0.32, 0.07, side(0xc6ccd6, 0.32, 0.9, 1.15));
    hub.position.x = sx * 1.28;
    g.add(hub);
  }
  return g;
}
/** 샤프트 — 출력축 + 스플라인 단(굵은 구간). */
function buildShaft() {
  const g = new THREE.Group();
  const mat = side(0xd0d6de, 0.3, 0.9, 1.2);
  const main = makeAxialCyl(0.2, 0.2, 5.4, mat);
  g.add(main);
  const step = makeAxialCyl(0.3, 0.3, 0.6, side(0xb8bfc9, 0.34, 0.88, 1.15));
  step.position.x = 2.5;
  g.add(step);
  return g;
}
/** 베어링 — 외륜 토러스 + 볼(인스턴싱, 장식). */
function buildBearing() {
  const g = new THREE.Group();
  const race = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.12, 12, 32), side(0xb8bfc9, 0.3, 0.92, 1.2));
  race.rotation.y = X90;
  g.add(race);
  const balls = new THREE.InstancedMesh(new THREE.SphereGeometry(0.07, 8, 8), side(0xe2e6ec, 0.25, 0.95, 1.25), 10);
  const m = new THREE.Matrix4();
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    m.makeTranslation(0, Math.cos(a) * 0.34, Math.sin(a) * 0.34);
    balls.setMatrixAt(i, m);
  }
  balls.instanceMatrix.needsUpdate = true;
  balls.frustumCulled = false;
  balls.raycast = () => {};
  g.add(balls);
  return g;
}

// ── 부품 조립 (축방향 분해: 하우징 ↑ → 엔드캡·베어링 ±x → 회전자·샤프트 +x → 권선·고정자 분리) ──
const parts: PartDef[] = [
  { id: "housing", base: [0, 0, 0], explode: [0, 2.5, 0], order: 0, node: <primitive object={buildHousing()} /> },
  { id: "endcap", base: [-2.25, 0, 0], explode: [-2.6, 0, 0], order: 0.2, layer: 1, node: <primitive object={buildEndcap(-1)} /> },
  { id: "endcap", base: [2.25, 0, 0], explode: [2.6, 0, 0], order: 0.2, layer: 2, node: <primitive object={buildEndcap(1)} /> },
  { id: "bearing", base: [-1.55, 0, 0], explode: [-1.7, 0, 0], order: 0.35, layer: 1, node: <primitive object={buildBearing()} /> },
  { id: "bearing", base: [1.55, 0, 0], explode: [1.7, 0, 0], order: 0.35, layer: 2, node: <primitive object={buildBearing()} /> },
  { id: "rotor", base: [0, 0, 0], explode: [3.1, 0, 0], order: 0.5, node: <primitive object={buildRotor()} /> },
  { id: "shaft", base: [0, 0, 0], explode: [5.0, 0, 0], order: 0.62, node: <primitive object={buildShaft()} /> },
  { id: "winding", base: [0, 0, 0], explode: [0, 1.5, 0], order: 0.78, node: <primitive object={buildWinding()} /> },
  { id: "stator", base: [0, 0, 0], explode: [0, -1.1, 0], order: 0.9, node: <primitive object={buildStator()} /> },
];

// ── 옵션: 단면(cutaway) — 고정자 슬롯·IPM V자 자석 배치가 드러난다 ──
const options: ModelOption[] = [cutawayOption()];
let lastCut: boolean | null = null;

// ── 구동 연출: 자동 회전 중 회전자·샤프트가 실제로 돈다 (분해 상태에서도 — 회전부가 어디인지 보여줌) ──
const ROTOR_IDX = 5;
const SHAFT_IDX = 6;
let spin = 0;
function update({ dt, autoRotate, groups, options: opts }: ViewerFrameCtx) {
  if (autoRotate) spin += dt * 2.4; // 느린 시연 속도(실제 회전수와 무관)
  const rotor = groups[ROTOR_IDX];
  const shaft = groups[SHAFT_IDX];
  if (rotor) rotor.rotation.x = spin;
  if (shaft) shaft.rotation.x = spin;
  const cut = (opts["cut"] ?? "off") === "on";
  if (cut !== lastCut) {
    lastCut = cut;
    setClipping(groups, cut ? [CUT_PLANE_Z] : null);
  }
}

export const driveMotorModel: ModelDef = { parts, info: driveMotorInfo, options, update };
export default driveMotorModel;
