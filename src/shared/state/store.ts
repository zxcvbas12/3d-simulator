import { create } from "zustand";
import type { Lang } from "@locales/index";

/**
 * 앱/뷰어 전역 상태 (zustand) — UI ↔ 3D 공유.
 * 언어는 여기서 관리(셸·뷰어 모두 구독). 분해값·선택·줌은 4단계 엔진에서 본격 사용.
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

export interface AppState {
  lang: Lang;
  setLang: (lang: Lang) => void;

  /** 분해 정도 0~1 (하단 슬라이더 ↔ 3D). 4단계 엔진에서 사용. */
  explodeT: number;
  setExplodeT: (t: number) => void;

  /** 선택된 부품 id (정보 패널과 연결). */
  selected: string | null;
  select: (id: string | null) => void;

  autoRotate: boolean;
  toggleAutoRotate: () => void;
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

  selected: null,
  select: (selected) => set({ selected }),

  autoRotate: false,
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),
}));
