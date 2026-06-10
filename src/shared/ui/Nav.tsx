import { BRAND } from "@shared/config";
import { useAppStore } from "../state/store";
import { useRoute, COMMON_PAGES, type View } from "../state/route";
import { useT, LANGS } from "../i18n";

/** 상단 네비 — 브랜드 · 공통 페이지 링크 · 언어 전환 · (모바일) 드로어 토글. */
export function Nav() {
  const t = useT();
  const view = useRoute((s) => s.view);
  const goHome = useRoute((s) => s.goHome);
  const goPage = useRoute((s) => s.goPage);
  const toggleDrawer = useRoute((s) => s.toggleDrawer);
  const lang = useAppStore((s) => s.lang);
  const setLang = useAppStore((s) => s.setLang);

  const links: { v: View; label: string; onClick: () => void }[] = [
    { v: "home", label: t.nav.home, onClick: goHome },
    ...COMMON_PAGES.map((p) => ({ v: p as View, label: t.nav[p], onClick: () => goPage(p) })),
  ];

  return (
    <nav>
      <div className="nav-in">
        <button className="sb-toggle" onClick={toggleDrawer} aria-label={t.nav.menu}>
          ☰
        </button>
        <div className="brand" onClick={goHome}>
          {BRAND}
          <span className="dot" />
        </div>
        <div className="commnav">
          {links.map((l) => (
            <button key={l.v} className={`navlink${l.v === view ? " active" : ""}`} onClick={l.onClick}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="lang">
          {LANGS.map((l) => (
            <button key={l.id} className={lang === l.id ? "on" : ""} onClick={() => setLang(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
