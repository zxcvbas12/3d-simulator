import { create } from "zustand";
import type { Lang } from "@locales/index";

/**
 * 앱/뷰어 전역 상태 (zustand) — UI ↔ 3D 공유.
 * 언어·분해값·선택·줌·자동회전을 셸과 R3F 엔진이 함께 구독한다.
 */
const LANG_KEY = "strata.lang";
const SUPPORTED: readonly Lang[] = ["ko", "en", "ja", "zh"];

function initLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch {
    /* localStorage 불가 환경 무시 */
  }
  const nav = (typeof navigator !== "undefined" ? navigator.language : "ko").slice(0, 2) as Lang;
  return SUPPORTED.includes(nav) ? nav : "ko";
}

/** 선택된 부품 (없으면 null). layer = 같은 종류 부품의 n번째. */
export interface Selection {
  id: string;
  layer?: number;
}

export interface AppState {
  lang: Lang;
  setLang: (lang: Lang) => void;

  /** 분해 정도 0~1 (하단 슬라이더 전용). */
  explodeT: number;
  setExplodeT: (t: number) => void;

  /** 카메라 줌 배율 (분해와 독립). 작을수록 가깝다. */
  zoom: number;
  setZoom: (z: number) => void;

  selected: Selection | null;
  select: (sel: Selection | null) => void;

  autoRotate: boolean;
  toggleAutoRotate: () => void;

  /** 회전·줌·분해·선택 전체 초기화. resetNonce로 엔진(카메라 각도)에 신호. */
  resetNonce: number;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  lang: initLang(),
  setLang: (lang) => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* 무시 */
    }
    if (typeof document !== "undefined") document.documentElement.lang = lang;
    set({ lang });
  },

  explodeT: 0,
  setExplodeT: (explodeT) => set({ explodeT }),

  zoom: 1,
  setZoom: (zoom) => set({ zoom }),

  selected: null,
  select: (selected) => set({ selected }),

  autoRotate: false,
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),

  resetNonce: 0,
  reset: () =>
    set((s) => ({
      explodeT: 0,
      zoom: 1,
      selected: null,
      autoRotate: false,
      resetNonce: s.resetNonce + 1,
    })),
}));
