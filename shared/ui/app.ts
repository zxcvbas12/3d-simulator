import { t, getLang, setLang, onLangChange, LANGS, type Lang } from "@locales/index";
import { BRAND } from "@shared/config";
import { CATEGORIES, findModel, modelsOf, type CategoryId, type ModelEntry } from "@shared/catalog";
import { COMMON_PAGES, isCommonPage, type CommonPageId } from "../../pages/common";
import { viewCategory, viewHome, viewModel, viewPage } from "./views";

type View = "home" | "category" | "model" | CommonPageId;

/**
 * 앱 셸(컴포지션 루트). 시안 homepage-mockup-v2.html의 구조·동작을 이식한다.
 * 상단 네비 + 2단계 사이드바 + 본문 라우팅 + 모바일 드로어 + 언어 전환.
 * 모든 클릭은 루트 한 곳에서 위임 처리하므로 innerHTML 재렌더에도 핸들러가 살아있다.
 */
export class App {
  private view: View = "home";
  private curCat: CategoryId = "semiconductor";
  private curModel: ModelEntry | null = null;

  private nav!: HTMLElement;
  private catList!: HTMLElement;
  private main!: HTMLElement;
  private sidebar!: HTMLElement;
  private backdrop!: HTMLElement;

  constructor(private root: HTMLElement) {
    this.buildSkeleton();
    this.root.addEventListener("click", (e) => this.onClick(e));
    onLangChange(() => this.render());
    this.render();
  }

  private buildSkeleton(): void {
    this.root.innerHTML = `
      <nav>
        <div class="nav-in">
          <button class="sb-toggle" data-act="toggle-drawer" aria-label="menu">☰</button>
          <div class="brand" data-act="home">${BRAND}<span class="dot"></span></div>
          <div class="commnav" data-role="commnav"></div>
          <div class="lang" data-role="lang"></div>
        </div>
      </nav>
      <div class="backdrop" data-act="backdrop" data-role="backdrop"></div>
      <div class="shell">
        <aside class="sidebar" data-role="sidebar">
          <div class="sb-title" data-role="sb-title"></div>
          <div data-role="cat-list"></div>
        </aside>
        <main class="main" data-role="main"></main>
      </div>`;

    this.nav = this.q('[data-role="commnav"]');
    this.catList = this.q('[data-role="cat-list"]');
    this.main = this.q('[data-role="main"]');
    this.sidebar = this.q('[data-role="sidebar"]');
    this.backdrop = this.q('[data-role="backdrop"]');

    // 언어 버튼은 라벨이 고정(KO/EN/日/中)이라 한 번만 만든다.
    this.q('[data-role="lang"]').innerHTML = LANGS.map(
      (l) => `<button data-lang="${l.id}">${l.label}</button>`,
    ).join("");
  }

  private q<T extends HTMLElement = HTMLElement>(sel: string): T {
    const el = this.root.querySelector<T>(sel);
    if (!el) throw new Error(`missing element: ${sel}`);
    return el;
  }

  // ── 라우팅 ─────────────────────────────────────────────
  private goView(view: View): void {
    this.view = view;
    if (view !== "model") this.curModel = null;
    this.closeDrawer();
    this.render();
  }

  private openCategory(cat: CategoryId): void {
    this.curCat = cat;
    this.curModel = null;
    this.view = "category";
    this.closeDrawer();
    this.render();
  }

  private openModel(cat: CategoryId, id: string): void {
    const m = findModel(cat, id);
    if (!m) return;
    this.curCat = cat;
    this.curModel = m;
    this.view = "model";
    this.closeDrawer();
    this.render();
  }

  // ── 이벤트 위임 ────────────────────────────────────────
  private onClick(e: MouseEvent): void {
    const el = (e.target as HTMLElement).closest<HTMLElement>(
      "[data-act],[data-view],[data-lang],[data-open-cat],[data-open-model]",
    );
    if (!el) return;

    const lang = el.dataset.lang;
    if (lang) {
      setLang(lang as Lang);
      return;
    }
    const navView = el.dataset.view;
    if (navView) {
      this.goView(navView as View);
      return;
    }
    const openCat = el.dataset.openCat;
    if (openCat) {
      this.openCategory(openCat as CategoryId);
      return;
    }
    const openModel = el.dataset.openModel;
    if (openModel) {
      const [cat, id] = openModel.split(":");
      this.openModel(cat as CategoryId, id);
      return;
    }
    switch (el.dataset.act) {
      case "home":
        this.goView("home");
        break;
      case "explore":
        this.openCategory("semiconductor");
        break;
      case "how":
        this.goView("learn");
        break;
      case "back":
        this.goView("category");
        break;
      case "start":
        // 3D 학습 시작은 다음 단계(공통 3D 토대 → HBM)에서 이 뷰어에 연결한다.
        break;
      case "toggle-drawer":
        this.sidebar.classList.contains("open") ? this.closeDrawer() : this.openDrawer();
        break;
      case "backdrop":
        this.closeDrawer();
        break;
    }
  }

  // ── 모바일 드로어 ──────────────────────────────────────
  private openDrawer(): void {
    this.sidebar.classList.add("open");
    this.backdrop.classList.add("show");
  }
  private closeDrawer(): void {
    this.sidebar.classList.remove("open");
    this.backdrop.classList.remove("show");
  }

  // ── 렌더 ───────────────────────────────────────────────
  private render(): void {
    const d = t();

    // 상단 네비: 라벨은 언어에 따라 바뀌므로 매번 다시 만든다.
    const links: { view: View; label: string }[] = [
      { view: "home", label: d.nav.home },
      ...COMMON_PAGES.map((p) => ({ view: p as View, label: d.nav[p] })),
    ];
    this.nav.innerHTML = links
      .map(
        (l) =>
          `<button class="navlink${l.view === this.view ? " active" : ""}" data-view="${l.view}">${l.label}</button>`,
      )
      .join("");

    // 언어 버튼 활성 표시
    this.root.querySelectorAll<HTMLElement>("[data-lang]").forEach((b) => {
      b.classList.toggle("on", b.dataset.lang === getLang());
    });

    this.q('[data-role="sb-title"]').textContent = d.sidebar.title;
    this.renderSidebar();

    // 본문
    if (this.view === "home") this.main.innerHTML = viewHome();
    else if (this.view === "category") this.main.innerHTML = viewCategory(this.curCat);
    else if (this.view === "model" && this.curModel) this.main.innerHTML = viewModel(this.curModel);
    else if (isCommonPage(this.view)) this.main.innerHTML = viewPage(this.view);
    else this.main.innerHTML = viewHome();

    window.scrollTo({ top: 0 });
  }

  private renderSidebar(): void {
    const lang = getLang();
    const d = t();
    const onModelView = this.view === "category" || this.view === "model";

    this.catList.innerHTML = CATEGORIES.map((c) => {
      const open = this.curCat === c.id;
      const active = onModelView && this.curCat === c.id;
      const head = `<button class="cat-head${open ? " open" : ""}${active ? " active" : ""}" data-open-cat="${c.id}">
        <span class="ic"></span>${d.cat[c.id]}<span class="chev">▶</span></button>`;

      const models = modelsOf(c.id)
        .map((m) => {
          const isActive = this.view === "model" && this.curModel?.cat === m.cat && this.curModel?.id === m.id;
          const live = m.status === "live" ? '<span class="live"></span>' : "";
          return `<button class="model-link${isActive ? " active" : ""}" data-open-model="${m.cat}:${m.id}">${m.name[lang]}${live}</button>`;
        })
        .join("");

      return `<div>${head}<div class="cat-models${open ? " open" : ""}">${models}</div></div>`;
    }).join("");
  }
}
