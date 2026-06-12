import * as THREE from "three";
import type { ModelDef, ModelOption, PartDef, ViewerFrameCtx } from "@app/shared/r3f/model";
import { makeBrushedMetalTexture } from "@app/shared/r3f/textures";
import { CUT_PLANE_Z, cutawayOption, setClipping } from "@app/shared/r3f/cutaway";
import { actuatorInfo } from "./data";

/**
 * 로봇 관절 액추에이터 모델 — 협동로봇·휴머노이드 관절의 일체형 구동부.
 * 축이 x방향으로 누운 원통: 엔코더 → 프레임리스 BLDC 모터 → 하모닉 드라이브(웨이브 제너레이터·
 * 플렉스플라인·서큘러 스플라인) → 크로스롤러 베어링 → 출력 플랜지. 하모닉 드라이브가 주인공 —
 * 동심 3겹이 축방향 분해로 나란히 펼쳐진다. 자동 회전 시 입력(웨이브 제너레이터)은 빠르게,
 * 출력(플렉스플라인·플랜지)은 느리게 역방향 회전(감속 시각화 — 시연 비율, 실제 ≈100:1).
 * 회전·줌·분해·선택·정보패널·환경맵은 공통 <Viewer> 엔진이 처리한다.
 */

// ── 재질 ─────────────────────────────────────────────────────────
function side(color: number, rough: number, metal: number, env: number) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, envMapIntensity: env });
}
const X90 = Math.PI / 2;

function makeAxialCyl(r: number, len: number, mat: THREE.Material, seg = 32, open = false) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg, 1, open), mat);
  m.rotation.z = X90; // 축 → x방향 (+y가 -x로 매핑)
  return m;
}
/** 축방향 링(파이프 단면) — Lathe 단면 회전 후 x축으로 눕힘. */
function makeAxialRing(rIn: number, rOut: number, len: number, mat: THREE.Material, seg = 40) {
  const pts = [
    new THREE.Vector2(rIn, -len / 2),
    new THREE.Vector2(rOut, -len / 2),
    new THREE.Vector2(rOut, len / 2),
    new THREE.Vector2(rIn, len / 2),
    new THREE.Vector2(rIn, -len / 2),
  ];
  const m = new THREE.Mesh(new THREE.LatheGeometry(pts, seg), mat);
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
  e.raycast = () => {};
  group.add(e);
}
/** 원주 배치 인스턴싱(축 x 기준) — 치형·롤러·볼트 공용. */
function ringInstances(
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  n: number,
  radius: number,
  xLocal: number,
  extraRot?: (i: number) => THREE.Matrix4,
) {
  const im = new THREE.InstancedMesh(geo, mat, n);
  const m = new THREE.Matrix4();
  const rot = new THREE.Matrix4();
  const tr = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    rot.makeRotationX(a);
    tr.makeTranslation(xLocal, radius, 0);
    m.multiplyMatrices(rot, tr);
    if (extraRot) m.multiply(extraRot(i));
    im.setMatrixAt(i, m);
  }
  im.instanceMatrix.needsUpdate = true;
  im.frustumCulled = false;
  im.raycast = () => {}; // 장식 — 픽은 부모 부품으로 귀속
  return im;
}

// ── 부품 빌더 (원점 기준; 위치는 엔진이 잡는다) ────────────────────
/** 하우징 — 열린 원통 셸 + 케이블 그로밋. */
function buildHousing() {
  const g = new THREE.Group();
  const tex = makeBrushedMetalTexture();
  const shell = makeAxialCyl(1.5, 3.0, new THREE.MeshStandardMaterial({
    map: tex, color: 0xb4bbc5, roughness: 0.34, metalness: 0.85, envMapIntensity: 1.2, side: THREE.DoubleSide,
  }), 40, true);
  g.add(shell);
  const grommet = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.2, 12), side(0x2b323c, 0.5, 0.6, 0.9));
  grommet.position.set(-1.0, 0, 1.5);
  grommet.rotation.x = X90;
  grommet.raycast = () => {};
  g.add(grommet);
  return g;
}
/** 엔코더 — 슬릿 디스크 + 리더 PCB 링. */
function buildEncoder() {
  const g = new THREE.Group();
  const disc = makeAxialCyl(0.75, 0.06, side(0x39424e, 0.4, 0.7, 1.0));
  g.add(disc);
  addEdges(g, disc, 0x7fa6d0, 0.5);
  // 방사형 슬릿(장식) — 디스크 가장자리의 밝은 눈금
  g.add(ringInstances(new THREE.BoxGeometry(0.02, 0.12, 0.04), side(0xc6d4e6, 0.3, 0.6, 1.1), 36, 0.62, 0.035));
  const pcb = makeAxialRing(0.3, 0.55, 0.06, side(0x123028, 0.7, 0.25, 0.6));
  pcb.position.x = -0.14;
  g.add(pcb);
  return g;
}
/** 프레임리스 BLDC 모터 — 고정자 링(구리 권선 띠) + 자석 로터 링, 한 부품. */
function buildMotor() {
  const g = new THREE.Group();
  const stator = makeAxialRing(0.95, 1.35, 0.9, side(0x4a525e, 0.46, 0.7, 1.0));
  g.add(stator);
  // 권선 띠(구리) — 고정자 안쪽 둘레
  g.add(ringInstances(new THREE.BoxGeometry(0.7, 0.1, 0.16), side(0xc97b34, 0.32, 1.0, 1.2), 18, 1.0, 0));
  const rotor = makeAxialRing(0.62, 0.88, 0.84, side(0x2b323c, 0.42, 0.75, 1.0));
  g.add(rotor);
  // 로터 표면 자석(장식)
  g.add(ringInstances(new THREE.BoxGeometry(0.78, 0.05, 0.22), side(0x1d242e, 0.5, 0.55, 0.85), 12, 0.9, 0));
  return g;
}
/** 웨이브 제너레이터 — 타원 캠 + 타원 베어링 링 + 입력축(모터 쪽으로). */
function buildWaveGen() {
  const g = new THREE.Group();
  const cam = makeAxialCyl(0.5, 0.3, side(0xb8bfc9, 0.32, 0.9, 1.15), 36);
  cam.scale.set(1, 1.18, 0.85); // y-z 평면 타원 (축이 x라 scale y/z)
  g.add(cam);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.045, 10, 36), side(0xe6b53c, 0.3, 1.0, 1.15));
  ring.rotation.y = X90;
  ring.scale.set(1, 1.18, 0.85);
  ring.raycast = () => {};
  g.add(ring);
  const input = makeAxialCyl(0.18, 1.6, side(0xd0d6de, 0.3, 0.9, 1.2), 16);
  input.position.x = -0.7;
  g.add(input);
  return g;
}
/** 플렉스플라인 — 얇은 컵(바닥이 출력 쪽) + 림 바깥 치형. */
function buildFlexspline() {
  const g = new THREE.Group();
  const pts = [
    new THREE.Vector2(0.24, -0.5), // 컵 바닥 허브
    new THREE.Vector2(0.6, -0.5), // 바닥 가장자리
    new THREE.Vector2(0.6, 0.5), // 림(개구부) — +y → -x(웨이브 제너레이터를 감싼다)
  ];
  const cup = new THREE.Mesh(
    new THREE.LatheGeometry(pts, 40),
    side(0x8b929c, 0.36, 0.85, 1.1),
  );
  (cup.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide;
  cup.rotation.z = X90;
  g.add(cup);
  // 림 부근 바깥 치형(장식) — 서큘러 스플라인과 맞물리는 구간
  g.add(ringInstances(new THREE.BoxGeometry(0.3, 0.05, 0.09), side(0xc6ccd6, 0.3, 0.9, 1.15), 24, 0.63, -0.32));
  return g;
}
/** 서큘러 스플라인 — 고정 링 기어(안쪽 치형). */
function buildCircspline() {
  const g = new THREE.Group();
  const ring = makeAxialRing(0.72, 1.0, 0.5, side(0x39424e, 0.42, 0.72, 1.0));
  g.add(ring);
  // 안쪽 치형(장식)
  g.add(ringInstances(new THREE.BoxGeometry(0.42, 0.05, 0.08), side(0x6f7681, 0.4, 0.8, 1.0), 26, 0.69, 0));
  return g;
}
/** 크로스롤러 베어링 — 외륜 + 교차 배치 롤러(90°씩 엇갈림). */
function buildCrossroller() {
  const g = new THREE.Group();
  const race = makeAxialRing(1.0, 1.3, 0.34, side(0xb8bfc9, 0.3, 0.92, 1.2));
  g.add(race);
  const rollerGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.14, 10);
  const rollerMat = side(0xe2e6ec, 0.25, 0.95, 1.25);
  // 교차 롤러: 짝수는 +45°, 홀수는 -45°로 엇갈리게
  const tilt = new THREE.Matrix4();
  g.add(
    ringInstances(rollerGeo, rollerMat, 16, 1.15, 0, (i) =>
      tilt.makeRotationZ(i % 2 === 0 ? Math.PI / 4 : -Math.PI / 4).clone(),
    ),
  );
  return g;
}
/** 출력 플랜지 — 디스크 + 볼트 원 + 중공축 구멍. */
function buildFlange() {
  const g = new THREE.Group();
  const disc = makeAxialCyl(1.28, 0.22, side(0xa7aeb8, 0.36, 0.85, 1.15), 40);
  g.add(disc);
  addEdges(g, disc, 0xdfe5ee, 0.4);
  g.add(ringInstances(new THREE.CylinderGeometry(0.06, 0.06, 0.26, 8), side(0x6f7681, 0.45, 0.85, 1.0), 8, 1.0, 0, () => new THREE.Matrix4().makeRotationZ(X90)));
  const bore = makeAxialCyl(0.24, 0.24, side(0x10151c, 0.6, 0.4, 0.7), 20);
  bore.raycast = () => {};
  g.add(bore);
  return g;
}

// ── 부품 조립 (축방향 분해: 하우징 ↑ → 엔코더 -x → 하모닉 3겹·베어링·플랜지 +x 일렬) ──
const parts: PartDef[] = [
  { id: "housing", base: [0, 0, 0], explode: [0, 2.4, 0], order: 0, node: <primitive object={buildHousing()} /> },
  { id: "encoder", base: [-1.1, 0, 0], explode: [-2.2, 0, 0], order: 0.2, node: <primitive object={buildEncoder()} /> },
  { id: "motor", base: [-0.35, 0, 0], explode: [-1.0, 0, 0], order: 0.35, node: <primitive object={buildMotor()} /> },
  { id: "wavegen", base: [0.55, 0, 0], explode: [1.3, 0, 0], order: 0.5, node: <primitive object={buildWaveGen()} /> },
  { id: "flexspline", base: [0.55, 0, 0], explode: [2.6, 0, 0], order: 0.62, node: <primitive object={buildFlexspline()} /> },
  { id: "circspline", base: [0.2, 0, 0], explode: [3.9, 0, 0], order: 0.74, node: <primitive object={buildCircspline()} /> },
  { id: "crossroller", base: [1.25, 0, 0], explode: [4.4, 0, 0], order: 0.85, node: <primitive object={buildCrossroller()} /> },
  { id: "flange", base: [1.55, 0, 0], explode: [5.2, 0, 0], order: 1, node: <primitive object={buildFlange()} /> },
];

// ── 옵션(단면) + 구동 연출(감속 시각화) ────────────────────────────
const options: ModelOption[] = [cutawayOption()];
let lastCut: boolean | null = null;
const WAVEGEN_IDX = 3;
const FLEX_IDX = 4;
const FLANGE_IDX = 7;
const DEMO_RATIO = 12; // 시연용 감속비(실제 ≈100:1은 출력이 안 보일 정도로 느려서 과장)
let spinIn = 0;

function update({ dt, autoRotate, groups, options: opts }: ViewerFrameCtx) {
  const cut = (opts["cut"] ?? "off") === "on";
  if (cut !== lastCut) {
    lastCut = cut;
    setClipping(groups, cut ? [CUT_PLANE_Z] : null);
  }
  if (autoRotate) spinIn += dt * 3.2;
  const wg = groups[WAVEGEN_IDX];
  const flex = groups[FLEX_IDX];
  const flange = groups[FLANGE_IDX];
  if (wg) wg.rotation.x = spinIn; // 입력 — 빠르게
  const out = -spinIn / DEMO_RATIO; // 출력 — 느리게, 역방향(하모닉 드라이브 특성)
  if (flex) flex.rotation.x = out;
  if (flange) flange.rotation.x = out;
}

export const actuatorModel: ModelDef = { parts, info: actuatorInfo, options, update };
export default actuatorModel;
