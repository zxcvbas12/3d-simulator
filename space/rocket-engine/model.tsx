import * as THREE from "three";
import type { ModelDef, PartDef } from "@app/shared/r3f/model";
import { makeBrushedMetalTexture, makeChannelTexture } from "@app/shared/r3f/textures";
import { rocketEngineInfo } from "./data";

/**
 * 로켓 엔진(액체, 가스 발생기 사이클 · LOX/RP-1) 모델 — 사이트 첫 회전체(원통·원뿔·벨) 형상.
 * 수직 추력축(Y): 짐벌이 맨 위(+Y), 노즐 출구가 맨 아래(−Y), 목(throat)을 y=0에 둔다.
 * 분해는 수직+방사 혼합: 노즐 ↓ 크게(목·인젝터가 드러남), 인젝터·짐벌 ↑, 터보펌프·배관은 옆(±x)으로.
 * 회전·줌·분해·선택·정보패널·환경맵은 공통 <Viewer> 엔진이 처리한다.
 * 부품 간 재질 인스턴스는 공유하지 않는다(클릭 강조가 부품별로 독립되도록 — 텍스처 map은 캐시 공유 OK).
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
/** 재생냉각 채널 구리 벽(노즐·연소실). 호출마다 새 재질(강조 독립), map은 캐시 공유. */
function copperWall() {
  return new THREE.MeshStandardMaterial({
    color: 0xca8a52,
    map: makeChannelTexture(22),
    roughness: 0.46,
    metalness: 0.82,
    envMapIntensity: 1.15,
    side: THREE.DoubleSide,
  });
}
/** 차가운 강철(인젝터·터보펌프·짐벌). */
function steel(roughness = 0.4) {
  return new THREE.MeshStandardMaterial({
    color: 0xb7bec8,
    map: makeBrushedMetalTexture(),
    roughness,
    metalness: 0.85,
    envMapIntensity: 1.2,
  });
}

// ── 빌더 헬퍼 ────────────────────────────────────────────────────
/** 엣지 라인(장식 — 픽 제외). 메시의 변환을 복사해 오프셋된 메시에도 맞춘다. */
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
/** 두 점을 잇는 원통(짐벌 스트럿 등). */
function connect(a: THREE.Vector3, b: THREE.Vector3, r: number, m: THREE.Material) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 12), m);
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  return mesh;
}
/** CatmullRom 곡선을 따르는 배관 튜브. */
function tube(points: [number, number, number][], r: number, m: THREE.Material) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 44, r, 9, false), m);
}

// ── 부품 콘텐츠 그룹 (각자 자연스러운 로컬 원점; 위치는 parts[].base가 잡는다) ──
/** 노즐 벨 — Lathe(벨 곡선). 로컬 원점 = 목(top, y=0), 출구는 y=-3.6. */
function buildNozzle() {
  const g = new THREE.Group();
  const N = 16;
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    pts.push(new THREE.Vector2(0.7 + (2.6 - 0.7) * Math.pow(t, 0.6), -3.6 * t));
  }
  g.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 56), copperWall()));
  // 출구 림(강조)
  const rim = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.05, 10, 56), mat(0x8a5a30, 0.4, 0.9, 1.2));
  rim.position.y = -3.6;
  rim.rotation.x = Math.PI / 2;
  g.add(rim);
  return g;
}
/** 연소실 — Lathe(목→배럴). 로컬 원점 = 목(bottom, y=0), 상단 y=1.8. 목에 절제된 골드 발광. */
function buildChamber() {
  const g = new THREE.Group();
  const pts = [
    new THREE.Vector2(0.72, 0.0), // throat
    new THREE.Vector2(0.82, 0.14),
    new THREE.Vector2(0.92, 0.42), // shoulder
    new THREE.Vector2(0.92, 1.5), // barrel
    new THREE.Vector2(0.86, 1.8), // top lip
  ];
  g.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 56), copperWall()));
  const glow = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, 0.045, 8, 40),
    mat(0x32190b, 0.55, 0.3, 0.5, { emissive: 0xa8531a, emissiveIntensity: 0.22 }),
  );
  glow.position.y = 0.03;
  glow.rotation.x = Math.PI / 2;
  g.add(glow);
  return g;
}
/** 인젝터 돔 + 분사면 + 오리피스 격자(인스턴싱). 로컬 원점 = 돔 밑면 중심(y=0). */
function buildInjector() {
  const g = new THREE.Group();
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.9, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2),
    steel(),
  );
  g.add(dome);
  addEdges(g, dome, 0xd5dde8, 0.3);
  const face = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.86, 0.12, 40), steel(0.5));
  face.position.y = -0.06;
  g.add(face);
  // 오리피스 — 동심 링으로 배치, 아래(−y)로 분사
  const positions: [number, number][] = [];
  for (let ring = 1; ring <= 4; ring++) {
    const rr = ring * 0.18;
    const count = ring * 8;
    for (let k = 0; k < count; k++) {
      const a = (k / count) * Math.PI * 2;
      positions.push([Math.cos(a) * rr, Math.sin(a) * rr]);
    }
  }
  const im = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.022, 0.022, 0.08, 8),
    mat(0x161b22, 0.6, 0.5, 0.4),
    positions.length + 1,
  );
  const mm = new THREE.Matrix4();
  positions.forEach(([px, pz], i) => {
    mm.makeTranslation(px, -0.12, pz);
    im.setMatrixAt(i, mm);
  });
  mm.makeTranslation(0, -0.12, 0);
  im.setMatrixAt(positions.length, mm);
  im.instanceMatrix.needsUpdate = true;
  im.frustumCulled = false;
  g.add(im);
  return g;
}
/** 터보펌프 — 터빈 하우징 + 상·하 펌프 볼류트 + 소형 가스 발생기(구리·약한 발광). 로컬 원점 = 중심. */
function buildTurbopump() {
  const g = new THREE.Group();
  const housing = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.9, 28), steel());
  g.add(housing);
  addEdges(g, housing, 0xcdd5e0, 0.3);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.42, 0.34, 28), steel(0.45));
  top.position.y = 0.6;
  g.add(top);
  addEdges(g, top, 0xcdd5e0, 0.3);
  const bot = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.32, 28), steel(0.45));
  bot.position.y = -0.6;
  g.add(bot);
  addEdges(g, bot, 0xcdd5e0, 0.3);
  // 가스 발생기(터빈 구동) — 측면 소형 구리 실린더, 절제된 발광
  const gg = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.16, 0.46, 16),
    mat(0xb06a38, 0.5, 0.78, 1.0, { emissive: 0x9c4a16, emissiveIntensity: 0.2 }),
  );
  gg.position.set(0.46, 0.1, 0.0);
  g.add(gg);
  return g;
}
/** 추진제 배관 — 연료 매니폴드 링 + 산화제(골드)·연료(블루) 튜브. 절대(조립) 좌표로 빌드(base=0). */
function buildFeedlines() {
  const g = new THREE.Group();
  const fuel = () => mat(0x5f8fd0, 0.35, 0.7, 1.0);
  const ox = () => mat(0xe0a93a, 0.32, 0.78, 1.1);
  // 연료 매니폴드 링(연소실 하부를 감음)
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.07, 10, 44), fuel());
  ring.position.y = 0.5;
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  // 산화제: 터보펌프 → 인젝터(곧장)
  g.add(tube([[2.05, 0.45, 0.25], [1.7, 1.2, 0.3], [1.0, 2.0, 0.2], [0.3, 2.35, 0.05]], 0.05, ox()));
  // 연료: 터보펌프 → 매니폴드(냉각 진입)
  g.add(tube([[2.05, 1.5, -0.15], [1.7, 1.0, -0.25], [1.25, 0.6, -0.1], [1.0, 0.5, 0.0]], 0.05, fuel()));
  // 연료: 매니폴드 → 인젝터(냉각 후 복귀)
  g.add(tube([[0.7, 0.55, 0.45], [0.55, 1.3, 0.5], [0.4, 2.0, 0.25], [0.3, 2.3, 0.1]], 0.05, fuel()));
  return g;
}
/** 짐벌 마운트 — 상단 링 + 스트럿 케이지 + 허브. 로컬 원점 = 링 중심(y=0), 허브는 y=-0.6. */
function buildGimbal() {
  const g = new THREE.Group();
  const m = steel(0.45);
  m.color.setHex(0x7a828d); // 어두운 구조 강철
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.92, 0.1, 12, 44), m);
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.24, 20), m);
  hub.position.y = -0.6;
  g.add(hub);
  addEdges(g, hub, 0xb9c1cc, 0.3);
  const hubV = new THREE.Vector3(0, -0.6, 0);
  for (let k = 0; k < 4; k++) {
    const a = (k / 4) * Math.PI * 2 + Math.PI / 4;
    const ringPt = new THREE.Vector3(Math.cos(a) * 0.92, 0, Math.sin(a) * 0.92);
    g.add(connect(ringPt, hubV, 0.05, m));
  }
  return g;
}

// ── 부품 조립 (수직 + 방사 혼합 분해) ────────────────────────────
const parts: PartDef[] = [
  { id: "nozzle", base: [0, 0, 0], explode: [0, -3.4, 0], order: 0, node: <primitive object={buildNozzle()} /> },
  { id: "chamber", base: [0, 0, 0], explode: [0, 0.35, 0], order: 0.2, node: <primitive object={buildChamber()} /> },
  { id: "feedlines", base: [0, 0, 0], explode: [2.8, -0.3, 0], order: 0.4, node: <primitive object={buildFeedlines()} /> },
  { id: "injector", base: [0, 1.8, 0], explode: [0, 1.7, 0], order: 0.55, node: <primitive object={buildInjector()} /> },
  { id: "turbopump", base: [2.05, 1.0, 0], explode: [3.0, 0.8, 0], order: 0.7, node: <primitive object={buildTurbopump()} /> },
  { id: "gimbal", base: [0, 2.75, 0], explode: [0, 2.7, 0], order: 1, node: <primitive object={buildGimbal()} /> },
];

export const rocketEngineModel: ModelDef = { parts, info: rocketEngineInfo };
export default rocketEngineModel;
