import { create } from "zustand";
import type { Lang } from "@locales/index";

/**
 * 전역 UI ↔ 3D 공유 상태 (zustand).
 * React 셸과 R3F 엔진이 같은 스토어를 구독해 분해값·선택 부품·언어·줌 등을 공유한다.
 * 2단계에서는 토대만 — 본격 사용은 셸(3단계)·엔진(4단계)에서 채운다.
 */
export interface AppState {
  /** 현재 언어. (3단계에서 locales 로더와 연결) */
  lang: Lang;
  setLang: (lang: Lang) => void;

  /** 분해 정도 0~1. 하단 슬라이더 ↔ 3D 분해. */
  explodeT: number;
  setExplodeT: (t: number) => void;

  /** 자동 회전 토글. */
  autoRotate: boolean;
  toggleAutoRotate: () => void;

  /** 선택된 부품 id (없으면 null). 정보 패널과 연결. */
  selected: string | null;
  select: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  lang: "ko",
  setLang: (lang) => set({ lang }),

  explodeT: 0,
  setExplodeT: (explodeT) => set({ explodeT }),

  autoRotate: false,
  toggleAutoRotate: () => set((s) => ({ autoRotate: !s.autoRotate })),

  selected: null,
  select: (selected) => set({ selected }),
}));
