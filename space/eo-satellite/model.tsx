import * as THREE from "three";
import type { ModelDef, PartDef } from "@app/shared/r3f/model";
import {
  mat,
  addEdges,
  steel,
  darkSteel,
  buildBus,
  buildSolarWing,
  buildReactionWheels,
  buildPropulsion,
  buildBattery,
  buildDish,
} from "../satellite/parts";
import { eoSatInfo } from "./data";

/**
 * 지구관측 위성(저궤도 LEO) — 공유 코어(버스·태양전지판·반작용 휠·추진·배터리)에
 * 지구를 향한 관측 카메라(payload, −Y nadir)와 고이득 dish(antenna, 상단) 한 개를 붙였다.
 * 분해는 방사형: 태양전지판 ±X, 안테나·반작용 휠 상단으로, 카메라·추진 하단으로, 배터리 +Z로.
 * 회전·줌·분해·선택·정보패널·환경맵은 공통 <Viewer> 엔진이 처리한다.
 */

/** 관측 카메라 — 망원 배럴 + 차양 + 골드 조리개 + 어두운 렌즈. 로컬 원점 = 상단 마운트(−Y로 뻗음). */
function buildCamera() {
  const g = new THREE.Group();
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.4, 28), darkSteel());
  barrel.position.y = -0.7;
  g.add(barrel);
  addEdges(g, barrel, 0x8a93a0, 0.35);
  const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.5, 0.3, 28, 1, true), steel(0.4));
  shade.position.y = -0.12;
  g.add(shade);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.06, 10, 32), mat(0xe0b53c, 0.3, 0.85, 1.2));
  ring.position.y = -1.4;
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  const lens = new THREE.Mesh(
    new THREE.CircleGeometry(0.44, 32),
    mat(0x0a1020, 0.2, 0.5, 1.4, { side: THREE.DoubleSide }),
  );
  lens.position.y = -1.4;
  lens.rotation.x = Math.PI / 2;
  g.add(lens);
  return g;
}

const dish = buildDish(2.6); // 개구 +Y (상단, 안티-네이디르 통신)

const parts: PartDef[] = [
  { id: "bus", base: [0, 0, 0], explode: [0, 0, 0], order: 0, node: <primitive object={buildBus()} /> },
  { id: "solar", base: [-1.2, 0.3, 0], explode: [-3.6, 0, 0], order: 0.2, node: <primitive object={buildSolarWing(-1)} /> },
  { id: "solar", base: [1.2, 0.3, 0], explode: [3.6, 0, 0], order: 0.2, node: <primitive object={buildSolarWing(1)} /> },
  { id: "antenna", base: [0, 1.45, 0.5], explode: [0, 2.6, 0.4], order: 0.4, node: <primitive object={dish} /> },
  { id: "payload", base: [0, -1.4, 0.3], explode: [0, -3.0, 0], order: 0.5, node: <primitive object={buildCamera()} /> },
  { id: "propulsion", base: [0, -1.4, -0.7], explode: [0, -1.4, -2.6], order: 0.6, node: <primitive object={buildPropulsion()} /> },
  { id: "adcs", base: [0, 1.45, -0.6], explode: [0, 1.9, -1.6], order: 0.75, node: <primitive object={buildReactionWheels()} /> },
  { id: "battery", base: [0, -0.2, 1.25], explode: [0, 0, 2.8], order: 0.85, node: <primitive object={buildBattery()} /> },
];

export const eoSatelliteModel: ModelDef = { parts, info: eoSatInfo };
export default eoSatelliteModel;
