import { ko } from "@locales/ko";
import { en } from "@locales/en";
import { ja } from "@locales/ja";
import { zh } from "@locales/zh";
import type { Lang, Dict } from "@locales/index";
import { useAppStore } from "./state/store";

/**
 * React용 i18n — 현재 언어(zustand)에 해당하는 사전을 반환한다.
 * 사전 자체(ko/en/ja/zh)는 기존 locales를 그대로 재사용. 언어 상태만 zustand로.
 * 컴포넌트에서: const t = useT(); t.nav.home …
 */
const DICTS: Record<Lang, Dict> = { ko, en, ja, zh };

export function useT(): Dict {
  return DICTS[useAppStore((s) => s.lang)];
}

/** 언어 전환 버튼 라벨(번역하지 않는 언어 코드). */
export const LANGS: { id: Lang; label: string }[] = [
  { id: "ko", label: "KO" },
  { id: "en", label: "EN" },
  { id: "ja", label: "日" },
  { id: "zh", label: "中" },
];

export type { Lang };
