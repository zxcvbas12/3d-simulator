import { create } from "zustand";
import type { CategoryId, ModelEntry } from "@shared/catalog";

/** 공통 페이지(소개/학습 구조/제작자 의도). */
export type PageId = "about" | "learn" | "intent";
export const COMMON_PAGES: PageId[] = ["about", "learn", "intent"];

export type View = "home" | "category" | "model" | PageId;

/**
 * 셸 라우팅 상태 (zustand) — 어떤 화면/카테고리/모델을 보는지 + 모바일 드로어.
 * 네비·사이드바·본문이 같은 스토어를 구독한다(프롭 드릴링 없이).
 * 네비게이션 액션은 드로어를 자동으로 닫는다.
 */
export interface RouteState {
  view: View;
  category: CategoryId;
  model: ModelEntry | null;
  drawerOpen: boolean;

  /** 사용자 피드백 모달 — 푸터 링크·플로팅 버튼이 연다. 화면 라우팅과 독립. */
  feedbackOpen: boolean;

  goHome: () => void;
  goPage: (id: PageId) => void;
  openCategory: (cat: CategoryId) => void;
  openModel: (m: ModelEntry) => void;
  back: () => void;

  toggleDrawer: () => void;
  closeDrawer: () => void;
  openFeedback: () => void;
  closeFeedback: () => void;
}

export const useRoute = create<RouteState>((set) => ({
  view: "home",
  category: "semiconductor",
  model: null,
  drawerOpen: false,
  feedbackOpen: false,

  goHome: () => set({ view: "home", model: null, drawerOpen: false }),
  goPage: (id) => set({ view: id, model: null, drawerOpen: false }),
  openCategory: (category) => set({ view: "category", category, model: null, drawerOpen: false }),
  openModel: (model) => set({ view: "model", category: model.cat, model, drawerOpen: false }),
  back: () => set({ view: "category", model: null }),

  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
  closeDrawer: () => set({ drawerOpen: false }),
  openFeedback: () => set({ feedbackOpen: true, drawerOpen: false }),
  closeFeedback: () => set({ feedbackOpen: false }),
}));
