import { useAppStore } from "../state/store";
import { useT } from "../i18n";

const clampZoom = (z: number) => Math.max(0.42, Math.min(2.4, z));

/** 뷰어 오버레이 컨트롤 — 줌 ＋－ · 자동회전 · 초기화 · 분해 슬라이더 · 힌트. */
export function ViewerChrome() {
  const t = useT();
  const explodeT = useAppStore((s) => s.explodeT);
  const setExplodeT = useAppStore((s) => s.setExplodeT);
  const zoom = useAppStore((s) => s.zoom);
  const setZoom = useAppStore((s) => s.setZoom);
  const autoRotate = useAppStore((s) => s.autoRotate);
  const toggleAutoRotate = useAppStore((s) => s.toggleAutoRotate);
  const reset = useAppStore((s) => s.reset);

  return (
    <>
      <div className="v-topright">
        <button className="v-btn" title="확대" onClick={() => setZoom(clampZoom(zoom * 0.85))}>
          ＋
        </button>
        <button className="v-btn" title="축소" onClick={() => setZoom(clampZoom(zoom * 1.18))}>
          －
        </button>
        <button className={`v-btn${autoRotate ? " on" : ""}`} onClick={toggleAutoRotate}>
          {t.viewer.autoRotate}
        </button>
        <button className="v-btn" onClick={reset}>
          {t.viewer.reset}
        </button>
      </div>
      <div className="v-bottom">
        <div className="v-hint">{t.viewer.hint}</div>
        <div className="v-slider-wrap">
          <span>{t.viewer.assemble}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(explodeT * 100)}
            onChange={(e) => setExplodeT(Number(e.target.value) / 100)}
          />
          <span>{t.viewer.explode}</span>
        </div>
      </div>
    </>
  );
}
