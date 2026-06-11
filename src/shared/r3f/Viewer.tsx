import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { useAppStore } from "../state/store";
import { SceneContents } from "./SceneContents";
import { ViewerChrome } from "../ui/ViewerChrome";
import { InfoPanel } from "../ui/InfoPanel";
import type { ModelDef } from "./model";
import "@shared/styles/viewer.css";

/**
 * 공통 3D 뷰어 — 어떤 ModelDef든 받아 동일하게 구동한다.
 * 회전(드래그) · 독립 줌(스크롤/핀치/＋－) · 분해(슬라이더, stagger+ease) · 선택 + 정보 패널.
 * frameloop="demand"로 온디맨드 렌더(자동회전 중엔 always). Three.js 의존이라 ModelView가 lazy 로드.
 */
/** FPS 측정 오버레이(stats.js, drei 동봉) — `?stats`로 켠다. 성능 예산 점검용, 프로덕션 UI 아님. */
const SHOW_STATS = typeof location !== "undefined" && new URLSearchParams(location.search).has("stats");

export default function Viewer({ model }: { model: ModelDef }) {
  const autoRotate = useAppStore((s) => s.autoRotate);

  // 모델을 열 때마다 회전·줌·분해·선택 초기화 (지난 상태가 남지 않게)
  useEffect(() => {
    useAppStore.getState().reset();
  }, []);

  return (
    <div className="viewer viewer--live">
      <Canvas
        frameloop={autoRotate ? "always" : "demand"}
        dpr={[1, 1.5]}
        camera={{ fov: 42, position: [5, 4, 7], near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true; // 단면(cutaway) 옵션용 — 평면 없으면 비용 없음
        }}
      >
        <SceneContents model={model} />
        {SHOW_STATS && <Stats />}
      </Canvas>
      <ViewerChrome model={model} />
      <InfoPanel model={model} />
    </div>
  );
}
