import * as THREE from "three";
import { makeFoilTexture, makeSolarTexture, makeBrushedMetalTexture } from "@app/shared/r3f/textures";

/**
 * 인공위성 공유 코어 — 두 모델(eo-satellite·comsat)이 import하는 공통 부품 빌더와 재질.
 * 버스·태양전지판·반작용 휠·추진·배터리·접시(dish)는 여기서 만들고,
 * 각 모델은 자기 탑재체(카메라/중계기)와 안테나 배치만 따로 짠다.
 * 부품 간 재질 인스턴스는 공유하지 않는다(클릭 강조 독립) — 텍스처 map은 캐시 공유 OK.
 */

// ── 재질 헬퍼 ────────────────────────────────────────────────────
export function mat(
  color: number,
  roughness: number,
  metalness: number,
  envMapIntensity: number,
  opts: THREE.MeshStandardMaterialParameters = {},
) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, envMapIntensity, ...opts });
}
/** MLI 금박(버스 표면). */
export function foilMat() {
  return new THREE.MeshStandardMaterial({
    color: 0xcea23a,
    map: makeFoilTexture(42),
    roughness: 0.5,
    metalness: 0.62,
    envMapIntensity: 1.0,
  });
}
/** 태양전지 패널 6면 — 넓은 ±Z면에 셀 텍스처, 나머지는 프레임. */
export function solarMats() {
  const cell = new THREE.MeshStandardMaterial({
    map: makeSolarTexture(),
    color: 0xffffff,
    roughness: 0.35,
    metalness: 0.5,
    envMapIntensity: 0.8,
  });
  const frame = mat(0x223047, 0.5, 0.6, 0.7);
  return [frame, frame, frame, frame, cell, cell]; // [px,nx,py,ny,pz,nz]
}
export function steel(roughness = 0.4) {
  return new THREE.MeshStandardMaterial({
    color: 0xb7bec8,
    map: makeBrushedMetalTexture(),
    roughness,
    metalness: 0.85,
    envMapIntensity: 1.2,
  });
}
export function whiteMetal() {
  return mat(0xd5dae0, 0.3, 0.7, 1.25, { side: THREE.DoubleSide });
}
export function darkSteel() {
  return mat(0x6b7480, 0.45, 0.7, 1.0);
}
export function copperMat() {
  return mat(0xc07a3a, 0.45, 0.8, 1.1, { side: THREE.DoubleSide });
}

// ── 빌더 헬퍼 ────────────────────────────────────────────────────
export function addEdges(group: THREE.Group, mesh: THREE.Mesh, color: number, op = 0.4) {
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
export function connect(a: THREE.Vector3, b: THREE.Vector3, r: number, m: THREE.Material) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 12), m);
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
  return mesh;
}

// ── 공통 부품 (로컬 원점은 각자 자연스러운 기준; 위치는 parts[].base가 잡는다) ──
/** 버스(본체) — 금박 박스. 로컬 원점 = 중심. */
export function buildBus(w = 2.4, h = 2.8, d = 2.4) {
  const g = new THREE.Group();
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), foilMat());
  g.add(m);
  addEdges(g, m, 0x8a6a22, 0.5);
  return g;
}
/** 태양전지판 한 날개 — 버스 부착점(x=0)에서 side(+1/−1) 방향으로 암 + 패널. */
export function buildSolarWing(side: 1 | -1) {
  const g = new THREE.Group();
  const armLen = 0.7,
    gap = 0.1,
    panelLen = 5.0,
    panelH = 2.6,
    thin = 0.07;
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, armLen, 12), steel(0.4));
  arm.rotation.z = Math.PI / 2;
  arm.position.x = side * (armLen / 2);
  g.add(arm);
  const panel = new THREE.Mesh(new THREE.BoxGeometry(panelLen, panelH, thin), solarMats());
  panel.position.x = side * (armLen + gap + panelLen / 2);
  g.add(panel);
  addEdges(g, panel, 0x3a4f70, 0.4);
  return g;
}
/** 반작용 휠 클러스터 — 베이스 + 1 평면 + 3 기울인 휠. 로컬 원점 = 베이스. */
export function buildReactionWheels() {
  const g = new THREE.Group();
  const wm = steel(0.35);
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 20), darkSteel()));
  const wheel = () => new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.16, 20), wm);
  const w0 = wheel();
  w0.position.y = 0.14;
  g.add(w0);
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * Math.PI * 2;
    const wv = wheel();
    wv.position.set(Math.cos(a) * 0.3, 0.12, Math.sin(a) * 0.3);
    wv.rotation.z = 0.5 * Math.cos(a);
    wv.rotation.x = 0.5 * Math.sin(a);
    g.add(wv);
  }
  return g;
}
/** 추진 모듈 — 추진제 탱크(구) + 추력기 노즐(콘). 로컬 원점 = 상단 마운트(y=0). */
export function buildPropulsion() {
  const g = new THREE.Group();
  const tank = new THREE.Mesh(new THREE.SphereGeometry(0.6, 28, 20), mat(0xb9bfc6, 0.4, 0.7, 1.15));
  tank.position.y = -0.55;
  g.add(tank);
  const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.6, 24, 1, true), copperMat());
  nozzle.position.y = -1.3;
  g.add(nozzle);
  return g;
}
/** 배터리 팩 — 박스 + 셀 묶음. 로컬 원점 = 중심. */
export function buildBattery() {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, 0.8), darkSteel());
  g.add(box);
  addEdges(g, box, 0x4a5568, 0.4);
  const cellMat = mat(0x2a3a55, 0.5, 0.6, 0.7);
  for (let i = 0; i < 5; i++) {
    const cell = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 14), cellMat);
    cell.position.set(-0.5 + i * 0.25, 0.0, 0.18);
    g.add(cell);
  }
  return g;
}
/** 포물면 접시 안테나 — Lathe(포물면) + 림 + 피드혼(삼각대). 로컬 원점 = 접시 뒤 중심, 개구는 +Y. */
export function buildDish(diameter = 2.4) {
  const g = new THREE.Group();
  const R = diameter / 2;
  const depth = R * 0.3;
  const pts: THREE.Vector2[] = [];
  const N = 14;
  for (let i = 0; i <= N; i++) {
    const r = (i / N) * R;
    pts.push(new THREE.Vector2(r, (r * r) / (R * R) * depth));
  }
  g.add(new THREE.Mesh(new THREE.LatheGeometry(pts, 48), whiteMetal()));
  const rim = new THREE.Mesh(new THREE.TorusGeometry(R, 0.03, 8, 48), steel(0.3));
  rim.position.y = depth;
  rim.rotation.x = Math.PI / 2;
  g.add(rim);
  const feedY = R * 0.95;
  const feed = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.26, 12), mat(0xe0a93a, 0.35, 0.8, 1.1));
  feed.position.y = feedY;
  g.add(feed);
  const top = new THREE.Vector3(0, feedY, 0);
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * Math.PI * 2;
    const bot = new THREE.Vector3(Math.cos(a) * R * 0.8, depth * 0.8, Math.sin(a) * R * 0.8);
    g.add(connect(bot, top, 0.02, steel(0.4)));
  }
  return g;
}
