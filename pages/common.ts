/**
 * 사이트 전체 공통 페이지 — 특정 카테고리·모델에 속하지 않는다.
 * 본문 문구는 전부 i18n(pages.*)에 있고, 여기서는 "어떤 공통 페이지가 있는지"만 선언한다.
 * 상단 네비의 about/learn/intent 링크가 이 목록과 대응한다.
 */
export const COMMON_PAGES = ["about", "learn", "intent"] as const;

export type CommonPageId = (typeof COMMON_PAGES)[number];

export function isCommonPage(id: string): id is CommonPageId {
  return (COMMON_PAGES as readonly string[]).includes(id);
}
