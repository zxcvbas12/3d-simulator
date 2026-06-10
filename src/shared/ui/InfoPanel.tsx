import { useAppStore } from "../state/store";
import { useT } from "../i18n";
import type { ModelDef } from "../r3f/model";

/**
 * 부품 정보 패널 — 선택된 부품의 다국어 설명(태그·제목·lead·detail·facts)을 표시.
 * 오른쪽(모바일은 아래)에서 슬라이드인. 언어가 바뀌면 자동으로 다시 그려진다(상태 구독).
 */
export function InfoPanel({ model }: { model: ModelDef }) {
  const t = useT();
  const lang = useAppStore((s) => s.lang);
  const selected = useAppStore((s) => s.selected);
  const select = useAppStore((s) => s.select);

  const info = selected ? model.info[selected.id] : null;

  return (
    <div className={`v-panel${selected ? " open" : ""}`}>
      <button className="v-panel-close" onClick={() => select(null)} aria-label="close">
        ×
      </button>
      <div className="v-panel-accent" />
      {info && (
        <>
          <div className="v-panel-tag">
            {selected?.layer != null
              ? t.viewer.layerLabel.replace("{n}", String(selected.layer))
              : info.tag[lang]}
          </div>
          <h2 className="v-panel-title">{info.title[lang]}</h2>
          {info.spec && (
            <div className="v-panel-spec">
              <span className="v-spec-label">{t.viewer.spec}</span>
              <span className="v-spec-val">{info.spec}</span>
            </div>
          )}
          <div className="v-panel-body">
            <p className="lead">{info.lead[lang]}</p>
            <p className="detail">{info.detail[lang]}</p>
            <ul className="facts">
              {info.facts[lang].map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
