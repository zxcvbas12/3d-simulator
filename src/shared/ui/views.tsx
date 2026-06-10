import { useEffect } from "react";
import { BRAND } from "@shared/config";
import { modelsOf, type ModelEntry, type Status } from "@shared/catalog";
import { useAppStore } from "../state/store";
import { useRoute, type PageId } from "../state/route";
import { useT } from "../i18n";
import { Thumb, Stack } from "./motifs";

function StatusBadge({ status }: { status: Status }) {
  const t = useT();
  return status === "live" ? (
    <div className="badge b-live">
      <span className="b" />
      {t.card.available}
    </div>
  ) : (
    <div className="badge b-soon">
      <span className="b" />
      {t.card.soon}
    </div>
  );
}

function Home() {
  const t = useT();
  const openCategory = useRoute((s) => s.openCategory);
  const goPage = useRoute((s) => s.goPage);
  return (
    <>
      <header className="hero">
        <div>
          <div className="eyebrow">{t.hero.eyebrow}</div>
          <h1>
            <span className="accent" dangerouslySetInnerHTML={{ __html: t.hero.title }} />
          </h1>
          <p className="sub">{t.hero.sub}</p>
          <div className="cta-row">
            <button className="btn btn-primary" onClick={() => openCategory("semiconductor")}>
              {t.hero.ctaPrimary}
            </button>
            <button className="btn btn-ghost" onClick={() => goPage("learn")}>
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
        <div className="stage">
          <div className="t1 mono">EXPLODED VIEW · 01</div>
          <div className="t2 mono">Z-AXIS / 220μ</div>
          <Stack />
        </div>
      </header>
      <section className="how">
        <h3>{t.how.title}</h3>
        <div className="steps">
          <div className="step">
            <div className="n">01</div>
            <h4>{t.how.s1Title}</h4>
            <p>{t.how.s1Desc}</p>
          </div>
          <div className="step">
            <div className="n">02</div>
            <h4>{t.how.s2Title}</h4>
            <p>{t.how.s2Desc}</p>
          </div>
          <div className="step">
            <div className="n">03</div>
            <h4>{t.how.s3Title}</h4>
            <p>{t.how.s3Desc}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function CategoryView() {
  const t = useT();
  const lang = useAppStore((s) => s.lang);
  const category = useRoute((s) => s.category);
  const openModel = useRoute((s) => s.openModel);
  const list = modelsOf(category);
  return (
    <>
      <div className="sec-head">
        <div>
          <div className="eyebrow2">{t.card.catSub}</div>
          <h2>{t.cat[category] + t.category.suffix}</h2>
        </div>
        <div className="count mono">{String(list.length).padStart(2, "0")}</div>
      </div>
      <div className="grid">
        {list.map((m, i) => {
          const live = m.status === "live";
          return (
            <div
              key={m.id}
              className={`card ${live ? "live" : "soon"}`}
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={live ? () => openModel(m) : undefined}
            >
              <div className="thumb">
                <StatusBadge status={m.status} />
                <Thumb type={m.thumb} />
              </div>
              <div className="card-body">
                <h3>{m.name[lang]}</h3>
                <p>{m.desc[lang]}</p>
                {live && <div className="open">{t.card.explore}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function ModelView({ model }: { model: ModelEntry }) {
  const t = useT();
  const lang = useAppStore((s) => s.lang);
  const back = useRoute((s) => s.back);
  // 3D 뷰어(<Viewer>)는 4단계에서 live 모델의 .viewer에 연결한다. 지금은 placeholder.
  return (
    <>
      <button className="back" onClick={back}>
        {t.model.back}
      </button>
      <div className="viewer">
        <div className="lbl mono">{t.model.viewerLbl}</div>
        <Stack />
        <div className="note">{t.model.viewerNote}</div>
      </div>
      <div className="md-meta">
        <h2>{model.name[lang]}</h2>
        <StatusBadge status={model.status} />
      </div>
      <p className="md-desc">{model.desc[lang]}</p>
    </>
  );
}

function PageView({ id }: { id: PageId }) {
  const t = useT();
  const p = t.pages[id];
  return (
    <div className="page">
      <div className="eyebrow2">{BRAND}</div>
      <h2>{p.title}</h2>
      <div className="lead" dangerouslySetInnerHTML={{ __html: p.body }} />
    </div>
  );
}

/** 본문 라우터 — 현재 view에 맞는 화면을 그리고, 전환 시 상단으로 스크롤. */
export function MainView() {
  const view = useRoute((s) => s.view);
  const model = useRoute((s) => s.model);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view, model]);

  if (view === "home") return <Home />;
  if (view === "category") return <CategoryView />;
  if (view === "model") return model ? <ModelView model={model} /> : <Home />;
  return <PageView id={view} />;
}
