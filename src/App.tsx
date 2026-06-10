import { Suspense, lazy } from "react";
import { BRAND } from "@shared/config";
import { useAppStore } from "./shared/state/store";

// 3D는 React.lazy + 동적 import로 지연 로드 → 초기 번들에 3D가 안 실린다.
const Scene = lazy(() => import("./shared/r3f/Scene"));

/**
 * 2단계 부트스트랩 셸 — React + R3F 툴체인이 동작함을 보여주는 최소 화면.
 * 실제 앱 셸(상단 네비 · 2단계 사이드바 · 공통 페이지 · i18n)은 3단계에서 만든다.
 */
export default function App() {
  const autoRotate = useAppStore((s) => s.autoRotate);
  const toggleAutoRotate = useAppStore((s) => s.toggleAutoRotate);

  return (
    <div className="boot">
      <header className="boot-nav">
        <span className="brand">
          {BRAND}
          <i className="dot" />
        </span>
        <span className="boot-tag mono">R3F BOOTSTRAP · STEP 02</span>
      </header>

      <main className="boot-stage">
        <Suspense fallback={<div className="boot-loading mono">LOADING 3D…</div>}>
          <Scene />
        </Suspense>
      </main>

      <div className="boot-controls">
        <button className="boot-btn" onClick={toggleAutoRotate}>
          {autoRotate ? "회전 정지" : "자동 회전"}
        </button>
        <span className="boot-note mono">drag to orbit · React + R3F + zustand</span>
      </div>
    </div>
  );
}
