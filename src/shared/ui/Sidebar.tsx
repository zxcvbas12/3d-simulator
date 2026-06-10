import { CATEGORIES, modelsOf } from "@shared/catalog";
import { useAppStore } from "../state/store";
import { useRoute } from "../state/route";
import { useT } from "../i18n";

/** 좌측 2단계 사이드바 — 카테고리(아코디언) → 모델 목록. 모바일은 드로어. */
export function Sidebar() {
  const t = useT();
  const lang = useAppStore((s) => s.lang);
  const view = useRoute((s) => s.view);
  const category = useRoute((s) => s.category);
  const model = useRoute((s) => s.model);
  const drawerOpen = useRoute((s) => s.drawerOpen);
  const openCategory = useRoute((s) => s.openCategory);
  const openModel = useRoute((s) => s.openModel);

  const onModelView = view === "category" || view === "model";

  return (
    <aside className={`sidebar${drawerOpen ? " open" : ""}`}>
      <div className="sb-title">{t.sidebar.title}</div>
      <div>
        {CATEGORIES.map((c) => {
          const open = category === c.id;
          const active = onModelView && category === c.id;
          return (
            <div key={c.id}>
              <button
                className={`cat-head${open ? " open" : ""}${active ? " active" : ""}`}
                onClick={() => openCategory(c.id)}
              >
                <span className="ic" />
                {t.cat[c.id]}
                <span className="chev">▶</span>
              </button>
              <div className={`cat-models${open ? " open" : ""}`}>
                {modelsOf(c.id).map((m) => {
                  const isActive = view === "model" && model?.cat === m.cat && model?.id === m.id;
                  return (
                    <button
                      key={m.id}
                      className={`model-link${isActive ? " active" : ""}`}
                      onClick={() => openModel(m)}
                    >
                      {m.name[lang]}
                      {m.status === "live" && <span className="live" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
