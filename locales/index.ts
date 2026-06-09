import { ko, type Dict } from "./ko";
import { en } from "./en";
import { ja } from "./ja";
import { zh } from "./zh";

export type { Dict } from "./ko";
export type Lang = "ko" | "en" | "ja" | "zh";

/** 언어 전환 버튼에 쓰는 표시 코드. 번역하지 않는다(언어 자체의 이름). */
export const LANGS: { id: Lang; label: string }[] = [
  { id: "ko", label: "KO" },
  { id: "en", label: "EN" },
  { id: "ja", label: "日" },
  { id: "zh", label: "中" },
];

// Record<Lang, Dict> 덕분에 en/ja/zh에 ko의 키가 빠지면 컴파일에서 잡힌다.
const DICTS: Record<Lang, Dict> = { ko, en, ja, zh };

const STORAGE_KEY = "strata.lang";

function detectInitial(): Lang {
  const saved = (typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEY)) as Lang | null;
  if (saved && saved in DICTS) return saved;
  const nav = (typeof navigator !== "undefined" ? navigator.language : "ko").slice(0, 2);
  return (nav in DICTS ? nav : "ko") as Lang;
}

let current: Lang = detectInitial();
const listeners = new Set<() => void>();

/** 현재 언어. */
export function getLang(): Lang {
  return current;
}

/** 현재 언어의 사전. 사용처에서는 t().nav.home 처럼 타입 안전하게 접근한다. */
export function t(): Dict {
  return DICTS[current];
}

/** 언어 변경 + 저장 + 구독자에게 통지. */
export function setLang(lang: Lang): void {
  if (lang === current || !(lang in DICTS)) return;
  current = lang;
  document.documentElement.lang = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* localStorage 불가 환경 무시 */
  }
  for (const cb of listeners) cb();
}

/** 언어가 바뀔 때마다 호출될 콜백 등록. 해제 함수를 반환한다. */
export function onLangChange(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// 초기 <html lang> 동기화
if (typeof document !== "undefined") document.documentElement.lang = current;
