import * as THREE from "three";
import type { ModelDef, PartDef, ViewerFrameCtx } from "@app/shared/r3f/model";
import { makeBrushedMetalTexture } from "@app/shared/r3f/textures";
import { combustionEngineInfo } from "./data";

/**
 * 내연기관 엔진 모델 — 직렬 4기통 DOHC 가솔린 엔진(4행정).
 * 위에서부터 밸브커버 → 캠샤프트 → 실린더 헤드 → (블록 안) 피스톤×4 → 커넥팅 로드×4
 * → 크랭크샤프트 → 오일팬. 분해는 실제 정비 순서(위→아래로 열어 내려가는 수직 분해).
 * 피스톤은 점화순서 1-3-4-2의 크랭크 위상(1·4 상사점, 2·3 하사점)에 맞춰 높이가 다르다.
 * 회전·줌·분해·선택·정보패널·환경맵은 공통 <Viewer> 엔진이 처리한다.
 */

// ── 재질 ─────────────────────────────────────────────────────────
function side(color: number, rough: number, metal: number, env: number) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal, envMapIntensity: env });
}
const X90 = Math.PI / 2;

function makeBox(w: number, h: number, d: number, mat: THREE.Material | THREE.Material[]) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
}
function makeAxialCyl(r: number, len: number, mat: THREE.Material, seg = 24) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg), mat);
  m.rotation.z = X90; // 축 → x방향
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

// 4기통 배치 + 크랭크 위상(점화 1-3-4-2): 1·4 = 상사점(TDC), 2·3 = 하사점(BDC)
// 기구학 상수 — 4행정 연출(update)과 정적 포즈가 같은 식을 쓴다.
const CYL_X = [-1.65, -0.55, 0.55, 1.65];
const PHASE = [1, -1, -1, 1]; // +1 = TDC (위상각 0), -1 = BDC (위상각 π)
const CRANK_Y = -1.05; // 크랭크 중심
const CRANK_R = 0.18; // 크랭크 반경(스트로크의 절반)
const ROD_L = 1.2; // 커넥팅 로드 핀 간 길이(전 기통 동일)
const PISTON_HALF = 0.25;
/** 크랭크 각 a에서의 피스톤 핀(소단부) 높이 — 표준 슬라이더-크랭크 식. */
const pinTopY = (a: number) => CRANK_Y + CRANK_R * Math.cos(a) + Math.sqrt(ROD_L * ROD_L - CRANK_R * Math.sin(a) * CRANK_R * Math.sin(a));
const phaseAngle = (i: number) => (PHASE[i] === 1 ? 0 : Math.PI);
const PISTON_Y = (i: number) => pinTopY(phaseAngle(i)) + PISTON_HALF; // 정적(θ=0) 피스톤 중심
const PIN_Y = (i: number) => CRANK_Y + CRANK_R * PHASE[i]; // 정적 크랭크 핀 중심

// ── 부품 빌더 ─────────────────────────────────────────────────────
/** 밸브 커버 — 주조 알루미늄 덮개 + 오일 캡(장식). */
function buildValveCover() {
  const g = new THREE.Group();
  const tex = makeBrushedMetalTexture();
  const body = makeBox(4.5, 0.45, 1.7, new THREE.MeshStandardMaterial({
    map: tex, color: 0xaeb5bf, roughness: 0.36, metalness: 0.85, envMapIntensity: 1.2,
  }));
  g.add(body);
  addEdges(g, body, 0xdfe5ee, 0.4);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 16), side(0x2b323c, 0.5, 0.6, 0.9));
  cap.position.set(-1.5, 0.28, 0.4);
  cap.raycast = () => {};
  g.add(cap);
  return g;
}
/** 캠샤프트 — DOHC 2축 + 캠 로브(타원 단면, 인스턴싱 대신 소수 메시). */
function buildCamshafts() {
  const g = new THREE.Group();
  const shaftMat = side(0xc6ccd6, 0.32, 0.9, 1.15);
  const lobeMat = side(0x8b929c, 0.4, 0.8, 1.05);
  for (const z of [-0.45, 0.45]) {
    const shaft = makeAxialCyl(0.09, 4.4, shaftMat);
    shaft.position.z = z;
    g.add(shaft);
    for (const x of CYL_X) {
      for (const dx of [-0.16, 0.16]) {
        const lobe = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.1, 16), lobeMat);
        lobe.rotation.z = X90;
        lobe.scale.y = 1.45; // 타원 로브
        lobe.position.set(x + dx, 0.045, z);
        lobe.raycast = () => {};
        g.add(lobe);
      }
    }
    // 캠 스프로킷(타이밍 기어, 장식)
    const gear = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.08, 20), side(0x6f7681, 0.42, 0.85, 1.0));
    gear.rotation.z = X90;
    gear.position.set(-2.28, 0, z);
    gear.raycast = () => {};
    g.add(gear);
  }
  return g;
}
/** 실린더 헤드 — 알루미늄 블록 + 점화플러그 4개(골드, 장식) + 포트 자국. */
function buildHead() {
  const g = new THREE.Group();
  const body = makeBox(4.5, 0.55, 1.8, side(0x9aa1ac, 0.4, 0.8, 1.1));
  g.add(body);
  addEdges(g, body, 0xc6ccd6, 0.45);
  const plugMat = side(0xe6b53c, 0.3, 1.0, 1.15);
  for (const x of CYL_X) {
    const plug = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.2, 10), plugMat);
    plug.position.set(x, 0.32, 0);
    plug.raycast = () => {};
    g.add(plug);
    // 연소실 자국(헤드 아랫면, 장식)
    const dome = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.03, 24), side(0x2b323c, 0.5, 0.5, 0.8));
    dome.position.set(x, -0.27, 0);
    dome.raycast = () => {};
    g.add(dome);
  }
  return g;
}
/** 실린더 블록 — 주철 본체 + 보어 개구 4개(장식) + 측면 워터재킷 라인. */
function buildBlock() {
  const g = new THREE.Group();
  const body = makeBox(4.6, 1.7, 1.9, side(0x4a525e, 0.5, 0.65, 0.95));
  g.add(body);
  addEdges(g, body, 0x7d889f, 0.5);
  for (const x of CYL_X) {
    const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.04, 24), side(0x1c222b, 0.55, 0.5, 0.8));
    bore.position.set(x, 0.86, 0);
    bore.raycast = () => {};
    g.add(bore);
  }
  return g;
}
/** 피스톤 — 크라운 + 링 그루브 2줄 + 스커트. */
function buildPiston() {
  const g = new THREE.Group();
  const mat = side(0xd0d6de, 0.3, 0.9, 1.2);
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.5, 24), mat);
  g.add(crown);
  const ringMat = side(0x6f7681, 0.38, 0.85, 1.0);
  for (const y of [0.16, 0.06]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.018, 8, 32), ringMat);
    ring.rotation.x = X90;
    ring.position.y = y;
    ring.raycast = () => {};
    g.add(ring);
  }
  return g;
}
/** 커넥팅 로드 — I빔 막대 + 대단부(크랭크쪽) 링 + 소단부 핀. */
function buildConrod(len: number) {
  const g = new THREE.Group(); // 원점 = 로드 중심
  const mat = side(0x8b929c, 0.38, 0.82, 1.05);
  const beam = makeBox(0.16, len, 0.1, mat);
  g.add(beam);
  addEdges(g, beam, 0xc6ccd6, 0.4);
  const big = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.07, 10, 24), mat);
  big.rotation.y = X90;
  big.position.y = -len / 2;
  g.add(big);
  const small = makeAxialCyl(0.09, 0.3, side(0xc6ccd6, 0.3, 0.9, 1.15), 12);
  small.position.y = len / 2;
  g.add(small);
  return g;
}
/** 크랭크샤프트 — 메인 저널 + 위상 오프셋 핀 + 웹/카운터웨이트 + 플라이휠. */
function buildCrankshaft() {
  const g = new THREE.Group();
  const mat = side(0xb8bfc9, 0.32, 0.9, 1.15);
  const webMat = side(0x6f7681, 0.4, 0.85, 1.0);
  const main = makeAxialCyl(0.15, 4.9, mat);
  g.add(main);
  for (let i = 0; i < 4; i++) {
    const pin = makeAxialCyl(0.13, 0.34, mat, 14);
    pin.position.set(CYL_X[i], 0.18 * PHASE[i], 0);
    g.add(pin);
    for (const dx of [-0.24, 0.24]) {
      const web = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.09, 20), webMat);
      web.rotation.z = X90;
      web.position.set(CYL_X[i] + dx, 0.09 * PHASE[i], 0);
      web.raycast = () => {};
      g.add(web);
    }
  }
  const flywheel = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.12, 28), webMat);
  flywheel.rotation.z = X90;
  flywheel.position.x = 2.55;
  g.add(flywheel);
  addEdges(g, flywheel, 0xc6ccd6, 0.4);
  return g;
}
/** 오일팬 — 강판 트레이 + 드레인 플러그(장식). */
function buildOilpan() {
  const g = new THREE.Group();
  const body = makeBox(4.4, 0.55, 1.7, side(0x39424e, 0.45, 0.7, 0.95));
  g.add(body);
  addEdges(g, body, 0x6a86a0, 0.45);
  const plug = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.1, 10), side(0xe6b53c, 0.3, 1.0, 1.1));
  plug.position.set(1.4, -0.32, 0);
  plug.raycast = () => {};
  g.add(plug);
  return g;
}

// ── 부품 조립 (정비 순서 수직 분해: 커버→캠→헤드 ↑ / 피스톤·로드 ↑ / 크랭크·팬 ↓) ──
const parts: PartDef[] = [
  { id: "valvecover", base: [0, 1.78, 0], explode: [0, 2.6, 0], order: 0, node: <primitive object={buildValveCover()} /> },
  { id: "camshaft", base: [0, 1.42, 0], explode: [0, 1.9, 0], order: 0.15, node: <primitive object={buildCamshafts()} /> },
  { id: "head", base: [0, 1.08, 0], explode: [0, 1.2, 0], order: 0.3, node: <primitive object={buildHead()} /> },
  { id: "block", base: [0, 0, 0], explode: [0, 0, 0], order: 0.5, node: <primitive object={buildBlock()} /> },
];
// 피스톤·커넥팅 로드 ×4 — 보어에서 위로 뽑혀 나옴 (점화순서 위상대로 높이 차)
for (let i = 0; i < 4; i++) {
  parts.push({
    id: "piston",
    base: [CYL_X[i], PISTON_Y(i), 0],
    explode: [0, 2.9, 0],
    order: 0.45 + i * 0.03,
    layer: i + 1,
    node: <primitive object={buildPiston()} />,
  });
  const top = PISTON_Y(i) - PISTON_HALF;
  const bottom = PIN_Y(i);
  parts.push({
    id: "conrod",
    base: [CYL_X[i], (top + bottom) / 2, 0],
    explode: [0, 1.7, 0],
    order: 0.58 + i * 0.03,
    layer: i + 1,
    node: <primitive object={buildConrod(ROD_L)} />,
  });
}
parts.push(
  { id: "crankshaft", base: [0, -1.05, 0], explode: [0, -1.5, 0], order: 0.8, node: <primitive object={buildCrankshaft()} /> },
  { id: "oilpan", base: [0, -1.62, 0], explode: [0, -2.6, 0], order: 1, node: <primitive object={buildOilpan()} /> },
);

// ── 4행정 구동 연출: 자동 회전 중 크랭크가 돌고 피스톤이 왕복한다(슬라이더-크랭크 기구학) ──
// 분해(t↑)하면 연출이 잦아들고 정적 위상 포즈로 복귀. 크랭크 회전만 분해 후에도 유지(회전부 표시).
const PISTON_IDX = (i: number) => 4 + i * 2;
const CONROD_IDX = (i: number) => 5 + i * 2;
const CRANK_IDX = 12;
let theta = 0;
function update({ t, dt, autoRotate, groups }: ViewerFrameCtx) {
  if (autoRotate) theta += dt * 2.6; // 느린 시연 속도
  const crank = groups[CRANK_IDX];
  if (crank) crank.rotation.x = theta;
  const k = Math.max(0, 1 - t * 4); // 조립 상태에서만 풀 연출 (t>0.25부터 0)
  for (let i = 0; i < 4; i++) {
    const piston = groups[PISTON_IDX(i)];
    const rod = groups[CONROD_IDX(i)];
    if (!piston || !rod) continue;
    if (k <= 0.001) {
      rod.rotation.x = 0;
      rod.position.z = 0;
      continue; // 위치는 엔진이 이미 정적 포즈로 잡아 둠
    }
    const a = theta + phaseAngle(i);
    const py = CRANK_Y + CRANK_R * Math.cos(a); // 크랭크 핀 y
    const pz = CRANK_R * Math.sin(a); // 크랭크 핀 z (크랭크 회전과 동일 위상)
    const dy = Math.sqrt(ROD_L * ROD_L - pz * pz);
    const topY = py + dy; // 피스톤 핀 y
    piston.position.y = piston.position.y * (1 - k) + (topY + PISTON_HALF) * k;
    rod.position.y = rod.position.y * (1 - k) + ((topY + py) / 2) * k;
    rod.position.z = (pz / 2) * k;
    rod.rotation.x = Math.atan2(-pz, dy) * k; // 핀의 z 이동을 따라 살짝 기울어짐
  }
}

export const combustionEngineModel: ModelDef = { parts, info: combustionEngineInfo, update };
export default combustionEngineModel;
