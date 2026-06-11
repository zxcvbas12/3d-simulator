import { BRAND } from "@shared/config";
import { CATEGORIES } from "@shared/catalog";
import { useRoute, COMMON_PAGES } from "../state/route";
import { useT } from "../i18n";

/**
 * 푸터 — 전 화면 공통(본문 폭 기준). 브랜드 + 한 줄 설명 · 공통 페이지 링크 ·
 * 카테고리 링크 · 저작권 + 교육용 단순화 면책(신뢰 레이어의 일부 — 빼지 말 것).
 */
export function Footer() {
  const t = useT();
  const goPage = useRoute((s) => s.goPage);
  const openCategory = useRoute((s) => s.openCategory);
  const openFeedback = useRoute((s) => s.openFeedback);

  return (
    <footer className="footer">
      <div className="f-brand-col">
        <div className="f-brand">
          {BRAND}
          <span className="dot" />
        </div>
        <p>{t.footer.tagline}</p>
      </div>
      <div className="f-col">
        <div className="f-head">{t.footer.siteHead}</div>
        {COMMON_PAGES.map((p) => (
          <button key={p} onClick={() => goPage(p)}>
            {t.nav[p]}
          </button>
        ))}
        <button onClick={openFeedback}>{t.feedback.open}</button>
      </div>
      <div className="f-col f-cats">
        <div className="f-head">{t.sidebar.title}</div>
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => openCategory(c.id)}>
            {t.cat[c.id]}
          </button>
        ))}
      </div>
      <div className="f-meta">
        © {new Date().getFullYear()} {BRAND} · {t.footer.disclaimer}
      </div>
    </footer>
  );
}
