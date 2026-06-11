import * as THREE from "three";
import type { ModelDef, PartDef } from "@app/shared/r3f/model";
import {
  mat,
  addEdges,
  darkSteel,
  buildBus,
  buildSolarWing,
  buildReactionWheels,
  buildPropulsion,
  buildBattery,
  buildDish,
} from "../satellite/parts";
import { comsatInfo } from "./data";

/**
 * 통신 위성(정지궤도 GEO) — 공유 코어(버스·태양전지판·반작용 휠·추진·배터리)에
 * 지구를 향한 대형 반사판 ×2(antenna, +Z)와 중계기 박스(payload, −Z)를 붙였다.
 * EO 위성과 같은 버스 코어를 쓰되, 탑재체·안테나·궤도만 다르다.
 * 분해는 방사형: 태양전지판 ±X, 반사판 +Z(지구), 중계기 −Z, 추진 하단, 휠·배터리 상단.
 */

/** 대형 반사판 ×2 — 지구를 향하도록 개구를 +Z로 돌려 좌우 배치. */
function buildReflectors() {
  const g = new THREE.Group();
  for (const sx of [-1, 1]) {
    const d = buildDish(2.2);
    d.rotation.x = -Math.PI / 2; // 개구 +Y → +Z(지구 쪽)
    d.position.set(sx * 0.85, 0, 0);
    g.add(d);
  }
  return g;
}

/** 중계기(transponder) — 전자 박스 + 도파관 혼. 로컬 원점 = 중심. */
function buildTransponder() {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.0, 0.55), darkSteel());
  g.add(box);
  addEdges(g, box, 0x8a93a0, 0.4);
  const hornMat = mat(0xc9a23a, 0.4, 0.85, 1.1);
  for (let i = 0; i < 3; i++) {
    const horn = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.13, 0.42, 14), hornMat);
    horn.rotation.x = Math.PI / 2;
    horn.position.set(-0.42 + i * 0.42, 0.05, -0.45);
    g.add(horn);
  }
  return g;
}

const parts: PartDef[] = [
  { id: "bus", base: [0, 0, 0], explode: [0, 0, 0], order: 0, node: <primitive object={buildBus()} /> },
  { id: "solar", base: [-1.2, 0.3, 0], explode: [-3.6, 0, 0], order: 0.2, node: <primitive object={buildSolarWing(-1)} /> },
  { id: "solar", base: [1.2, 0.3, 0], explode: [3.6, 0, 0], order: 0.2, node: <primitive object={buildSolarWing(1)} /> },
  { id: "antenna", base: [0, 0.1, 1.35], explode: [0, 0, 3.4], order: 0.4, node: <primitive object={buildReflectors()} /> },
  { id: "payload", base: [0, 0, -1.35], explode: [0, 0, -3.2], order: 0.5, node: <primitive object={buildTransponder()} /> },
  { id: "propulsion", base: [0, -1.4, 0], explode: [0, -3.0, 0], order: 0.6, node: <primitive object={buildPropulsion()} /> },
  { id: "adcs", base: [0, 1.45, -0.5], explode: [0, 2.2, -1.2], order: 0.75, node: <primitive object={buildReactionWheels()} /> },
  { id: "battery", base: [0, 1.45, 0.6], explode: [0, 2.2, 1.4], order: 0.85, node: <primitive object={buildBattery()} /> },
];

export const comsatModel: ModelDef = { parts, info: comsatInfo };
export default comsatModel;
