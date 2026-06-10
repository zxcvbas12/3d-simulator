import { useState } from "react";
import { useAppStore } from "../state/store";
import { useT } from "../i18n";
import type { ModelDef } from "../r3f/model";

/**
 * 부품 정보 패널 — 선택된 부품의 다국어 설명을 표시.
 * 형식: 태그 · 제목 · 치수(spec) · 한 줄 요약(lead) · [심화: detail · facts · 출처].
 * "간단히 ↔ 자세히" 토글로 입문/심화를 전환(기본 자세히). 언어/선택이 바뀌면 자동 갱신.
 */
export function InfoPanel({ model }: { model: ModelDef }) {
  const t = useT();
  const lang = useAppStore((s) => s.lang);
  const selected = useAppStore((s) => s.selected);
  const select = useAppStore((s) => s.select);
  const [deep, setDeep] = useState(true);

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
            {deep && (
              <>
                <p className="detail">{info.detail[lang]}</p>
                <ul className="facts">
                  {info.facts[lang].map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                {info.sources && info.sources.length > 0 && (
                  <div className="v-panel-sources">
                    <div className="v-sources-label">{t.viewer.sources}</div>
                    {info.sources.map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
            <button className="v-panel-toggle" onClick={() => setDeep((d) => !d)}>
              {deep ? t.viewer.less : t.viewer.more}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
