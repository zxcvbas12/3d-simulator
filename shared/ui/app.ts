import { t, getLang, setLang, onLangChange, LANGS, type Lang } from "@locales/index";
import { BRAND } from "@shared/config";
import { CATEGORIES, findModel, modelsOf, type CategoryId, type ModelEntry } from "@shared/catalog";
import { COMMON_PAGES, isCommonPage, type CommonPageId } from "../../pages/common";
import { viewCategory, viewHome, viewModel, viewModelBottom, viewModelTop, viewPage } from "./views";

type View = "home" | "category" | "model" | CommonPageId;

/** 마운트된 3D 뷰어 핸들(동적 import 되므로 타입만 최소로 안다). */
interface ViewerHandle {
  dispose(): void;
}

/**
 * 앱 셸(컴포지션 루트). 상단 네비 + 2단계 사이드바 + 본문 라우팅 + 모바일 드로어 + 언어 전환.
 * live 모델 상세에서는 .viewer 영역에 공통 3D 뷰어를 동적 import 해서 마운트한다.
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

  private activeViewer: ViewerHandle | null = null;
  private mountToken = 0;

  constructor(private root: HTMLElement) {
    this.buildSkeleton();
    this.root.addEventListener("click", (e) => this.onClick(e));
    onLangChange(() => this.onLang());
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
    if (lang) return setLang(lang as Lang);

    const navView = el.dataset.view;
    if (navView) return this.goView(navView as View);

    const openCat = el.dataset.openCat;
    if (openCat) return this.openCategory(openCat as CategoryId);

    const openModel = el.dataset.openModel;
    if (openModel) {
      const [cat, id] = openModel.split(":");
      return this.openModel(cat as CategoryId, id);
    }
    switch (el.dataset.act) {
      case "home":
        return this.goView("home");
      case "explore":
        return this.openCategory("semiconductor");
      case "how":
        return this.goView("learn");
      case "back":
        return this.goView("category");
      case "toggle-drawer":
        return this.sidebar.classList.contains("open") ? this.closeDrawer() : this.openDrawer();
      case "backdrop":
        return this.closeDrawer();
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
  /** 네비게이션 시: 크롬 + 본문 전체. */
  private render(): void {
    this.renderChrome();
    this.renderMain();
  }

  /** 언어 변경 시: 크롬은 항상 갱신. live 뷰어가 떠 있으면 뷰어는 유지하고 주변 텍스트만. */
  private onLang(): void {
    this.renderChrome();
    if (this.view === "model" && this.curModel?.status === "live" && this.activeViewer) {
      const top = this.main.querySelector('[data-role="md-top"]');
      const bottom = this.main.querySelector('[data-role="md-bottom"]');
      if (top) top.innerHTML = viewModelTop();
      if (bottom) bottom.innerHTML = viewModelBottom(this.curModel);
      // 뷰어 자신의 크롬·패널은 뷰어가 스스로 relocalize 한다.
    } else {
      this.renderMain();
    }
  }

  private renderChrome(): void {
    const d = t();
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

    this.root.querySelectorAll<HTMLElement>("[data-lang]").forEach((b) => {
      b.classList.toggle("on", b.dataset.lang === getLang());
    });

    this.q('[data-role="sb-title"]').textContent = d.sidebar.title;
    this.renderSidebar();
  }

  private renderMain(): void {
    this.disposeViewer(); // 본문을 갈아끼우기 전에 기존 뷰어를 정리

    if (this.view === "home") this.main.innerHTML = viewHome();
    else if (this.view === "category") this.main.innerHTML = viewCategory(this.curCat);
    else if (this.view === "model" && this.curModel) this.main.innerHTML = viewModel(this.curModel);
    else if (isCommonPage(this.view)) this.main.innerHTML = viewPage(this.view);
    else this.main.innerHTML = viewHome();

    if (this.view === "model" && this.curModel?.status === "live") this.mountViewer(this.curModel);

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

  // ── 3D 뷰어 마운트/정리 (Three.js는 여기서 동적 import → 초기 번들 분리) ──
  private mountViewer(model: ModelEntry): void {
    const token = ++this.mountToken;
    const mountEl = this.main.querySelector<HTMLElement>('[data-role="viewer-mount"]');
    if (!mountEl) return;

    void (async () => {
      const [{ Viewer }, mod] = await Promise.all([
        import("@shared/interaction/viewer"),
        model.load
          ? model.load()
          : import("@shared/scene/demoModel").then((m) => m.createDemoModel()),
      ]);
      // 그새 다른 화면으로 이동했거나 마운트 노드가 사라졌으면 중단
      if (token !== this.mountToken || !mountEl.isConnected) return;
      this.activeViewer = new Viewer(mountEl, mod);
    })();
  }

  private disposeViewer(): void {
    this.mountToken++; // 진행 중인 비동기 마운트 무효화
    if (this.activeViewer) {
      this.activeViewer.dispose();
      this.activeViewer = null;
    }
  }
}
