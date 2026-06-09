import "@shared/styles/tokens.css";
import "@shared/styles/base.css";
import * as THREE from "three";
import { createScene } from "@shared/scene/scene";
import { BRAND } from "@shared/config";

document.title = `${BRAND} — 3D 학습 시뮬레이터`;

const mount = document.getElementById("app");
if (!mount) throw new Error("#app mount not found");

const ctx = createScene(mount);

// ── 1단계 스캐폴딩 ──────────────────────────────────────────────
// 아직 제품 모델은 없다. 옅은 블루프린트 그리드 하나만 띄워
// 빌드·렌더 루프·카메라가 살아있음을 눈으로 확인한다.
// 실제 모델/공통 분해·피킹은 다음 단계(공통 3D 토대 → 첫 모델 HBM)에서 들어온다.
const grid = new THREE.GridHelper(12, 12, 0x6f9bff, 0x223052);
const gridMat = grid.material as THREE.Material;
gridMat.transparent = true;
gridMat.opacity = 0.35;
ctx.scene.add(grid);

// 천천히 도는 카메라 — 씬이 렌더되고 있다는 신호.
let angle = 0;
const radius = 11;
ctx.onFrame((dt) => {
  angle += dt * 0.15;
  ctx.camera.position.set(Math.sin(angle) * radius, 5, Math.cos(angle) * radius);
  ctx.camera.lookAt(0, 0, 0);
});
