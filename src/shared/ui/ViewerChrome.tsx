import { prefersReducedMotion, useAppStore } from "../state/store";
import { useT } from "../i18n";
import type { ModelDef } from "../r3f/model";

const clampZoom = (z: number) => Math.max(0.42, Math.min(2.4, z));

/** 뷰어 오버레이 컨트롤 — 줌 ＋－ · 자동회전 · 초기화 · 모델 옵션(좌상단) · 분해 슬라이더 · 힌트. */
export function ViewerChrome({ model }: { model?: ModelDef }) {
  const t = useT();
  const lang = useAppStore((s) => s.lang);
  const explodeT = useAppStore((s) => s.explodeT);
  const setExplodeT = useAppStore((s) => s.setExplodeT);
  const zoom = useAppStore((s) => s.zoom);
  const setZoom = useAppStore((s) => s.setZoom);
  const autoRotate = useAppStore((s) => s.autoRotate);
  const toggleAutoRotate = useAppStore((s) => s.toggleAutoRotate);
  const modelOpts = useAppStore((s) => s.modelOpts);
  const setModelOpt = useAppStore((s) => s.setModelOpt);
  const reset = useAppStore((s) => s.reset);

  return (
    <>
      {model?.options && model.options.length > 0 && (
        <div className="v-topleft">
          {model.options.map((opt) => {
            const cur = modelOpts[opt.id] ?? opt.default;
            return (
              <div className="v-opt" key={opt.id} role="group" aria-label={opt.label[lang]}>
                <span className="v-opt-label">{opt.label[lang]}</span>
                <div className="v-opt-vals">
                  {opt.values.map((v) => (
                    <button
                      key={v.id}
                      className={`v-btn v-btn-sm${cur === v.id ? " on" : ""}`}
                      aria-pressed={cur === v.id}
                      onClick={() => setModelOpt(opt.id, v.id)}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="v-topright">
        <button
          className="v-btn"
          title={t.viewer.zoomIn}
          aria-label={t.viewer.zoomIn}
          onClick={() => setZoom(clampZoom(zoom * 0.85))}
        >
          ＋
        </button>
        <button
          className="v-btn"
          title={t.viewer.zoomOut}
          aria-label={t.viewer.zoomOut}
          onClick={() => setZoom(clampZoom(zoom * 1.18))}
        >
          －
        </button>
        {!prefersReducedMotion && (
          <button
            className={`v-btn${autoRotate ? " on" : ""}`}
            aria-pressed={autoRotate}
            onClick={toggleAutoRotate}
          >
            {t.viewer.autoRotate}
          </button>
        )}
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
            aria-label={t.viewer.sliderLabel}
            value={Math.round(explodeT * 100)}
            onChange={(e) => setExplodeT(Number(e.target.value) / 100)}
          />
          <span>{t.viewer.explode}</span>
        </div>
      </div>
    </>
  );
}
