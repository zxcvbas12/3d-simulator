import { t, getLang } from "@locales/index";
import { BRAND } from "@shared/config";
import { modelsOf, type CategoryId, type ModelEntry } from "@shared/catalog";
import type { CommonPageId } from "../../pages/common";
import { thumbMarkup, stackMarkup } from "./thumbs";

/**
 * 본문 뷰 렌더 함수들 — 현재 언어의 사전(t())을 읽어 HTML 문자열을 만든다.
 * 클릭 동작은 data-* 속성으로 표시하고, 위임 핸들러(app.ts)가 처리한다.
 * 문구는 우리 정적 i18n 데이터라 innerHTML 주입이 안전하다(<br> 포함).
 */

function statusBadge(status: "live" | "soon"): string {
  const d = t();
  return status === "live"
    ? `<div class="badge b-live"><span class="b"></span>${d.card.available}</div>`
    : `<div class="badge b-soon"><span class="b"></span>${d.card.soon}</div>`;
}

export function viewHome(): string {
  const d = t();
  return `<header class="hero">
    <div>
      <div class="eyebrow">${d.hero.eyebrow}</div>
      <h1><span class="accent">${d.hero.title}</span></h1>
      <p class="sub">${d.hero.sub}</p>
      <div class="cta-row">
        <button class="btn btn-primary" data-act="explore">${d.hero.ctaPrimary}</button>
        <button class="btn btn-ghost" data-act="how">${d.hero.ctaSecondary}</button>
      </div>
    </div>
    <div class="stage"><div class="t1 mono">EXPLODED VIEW · 01</div><div class="t2 mono">Z-AXIS / 220μ</div>${stackMarkup()}</div>
  </header>
  <section class="how">
    <h3>${d.how.title}</h3>
    <div class="steps">
      <div class="step"><div class="n">01</div><h4>${d.how.s1Title}</h4><p>${d.how.s1Desc}</p></div>
      <div class="step"><div class="n">02</div><h4>${d.how.s2Title}</h4><p>${d.how.s2Desc}</p></div>
      <div class="step"><div class="n">03</div><h4>${d.how.s3Title}</h4><p>${d.how.s3Desc}</p></div>
    </div>
  </section>`;
}

export function viewPage(pageId: CommonPageId): string {
  const p = t().pages[pageId];
  return `<div class="page"><div class="eyebrow2">${BRAND}</div><h2>${p.title}</h2><div class="lead">${p.body}</div></div>`;
}

export function viewCategory(cat: CategoryId): string {
  const d = t();
  const lang = getLang();
  const list = modelsOf(cat);
  let cards = "";
  list.forEach((m, i) => {
    const live = m.status === "live";
    cards += `<div class="card ${live ? "live" : "soon"}"${live ? ` data-open-model="${m.cat}:${m.id}"` : ""} style="animation-delay:${i * 0.05}s">
      <div class="thumb">${statusBadge(m.status)}${thumbMarkup(m.thumb)}</div>
      <div class="card-body"><h3>${m.name[lang]}</h3><p>${m.desc[lang]}</p>${live ? `<div class="open">${d.card.explore}</div>` : ""}</div></div>`;
  });
  const title = d.cat[cat] + d.category.suffix;
  return `<div class="sec-head"><div><div class="eyebrow2">${d.card.catSub}</div><h2>${title}</h2></div>
    <div class="count mono">${String(list.length).padStart(2, "0")}</div></div>
    <div class="grid">${cards}</div>`;
}

export function viewModel(m: ModelEntry): string {
  const d = t();
  const lang = getLang();
  return `<button class="back" data-act="back">${d.model.back}</button>
    <div class="viewer"><div class="lbl mono">${d.model.viewerLbl}</div>${stackMarkup()}<div class="note">${d.model.viewerNote}</div></div>
    <div class="md-meta"><h2>${m.name[lang]}</h2>${statusBadge(m.status)}</div>
    <p class="md-desc">${m.desc[lang]}</p>
    ${m.status === "live" ? `<button class="btn btn-primary" data-act="start">${d.model.startLearn}</button>` : ""}`;
}
