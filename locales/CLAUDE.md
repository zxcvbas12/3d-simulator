# 다국어 문구 지침 (locales/)

> 루트 `../CLAUDE.md`의 공통 규칙 위에 적용된다.

## 구조
- **`ko.ts`가 원본(source of truth).** `Dict` 타입이 여기서 나오고, en/ja/zh는 `: Dict`로 선언해 **키 누락을 컴파일에서 잡는다.**
- 키를 추가하면 반드시 4개 언어 모두 같은 커밋에서 채운다. "나중에 번역"으로 비워 두지 말 것.
- 부품 설명(lead/detail/facts)은 각 모델의 `data.ts`에, 모델 개요·사양은 `shared/catalog.ts`에 둔다 — 여기 사전에는 **화면 UI 문구와 공통 페이지 본문**만.

## 페이지 콘텐츠 스키마 (8단계 콘텐츠 확충용)
공통 페이지(about/learn/intent)는 한 덩어리 `body` 대신 **섹션 배열**로 확장한다:
```ts
pages: {
  about: {
    title: string,
    lead: string,                            // 페이지 첫 문단(요약)
    sections: { heading: string; body: string }[],  // 섹션 = 소제목 + 본문
  },
  // learn / intent 동일 구조. intent는 heading 없이 body만인 섹션 허용(에세이 흐름).
}
```
- 항목 나열이 필요한 섹션(누구를 위한 것인가 등)은 body 안에서 `<br>` 줄바꿈으로 충분하면 그렇게, 구조가 필요하면 `items: string[]`를 그 섹션에만 추가.
- 홈 신규 섹션(신뢰 레이어 등)은 `home.*` 키로, 푸터는 `footer.*` 키로 추가한다.

## HTML 주입 규칙
- 일부 본문은 `dangerouslySetInnerHTML`로 들어간다. **허용 태그는 `<br>`, `<b>` 수준만** — 링크·스크립트성 마크업 금지.
- 이 사전의 값은 전부 우리가 작성한 정적 문구다. 사용자 입력을 이 경로로 넣지 말 것.

## 번역 톤
- ko: 기준. `pages/CLAUDE.md`의 톤 가이드(차분·정확·과장 금지)를 따른다.
- en: 직역하지 말고 같은 정보를 자연스러운 영어로. 기술 용어는 업계 표준 표기(die, interposer, chiplet).
- ja/zh: 기술 용어는 현지 업계 관례(ダイ/裸片 등)를 따른다. 기존 모델 data.ts의 용어 선택과 통일.
- 언어 중립 값(치수·모델명 코드 등)은 번역하지 않고 spec/value 필드에 둔다.
