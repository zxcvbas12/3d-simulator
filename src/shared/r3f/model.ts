import type { ReactNode } from "react";
import type { Lang } from "@locales/index";

/**
 * R3F 모델 계약 — 모델마다 다른 건 "형상(parts)"과 "부품 설명(info)"뿐.
 * 회전·줌·분해·프레이밍·선택·정보패널은 공통 엔진(<Viewer>)이 이 계약 위에서 처리한다.
 */

export type LocalizedText = Record<Lang, string>;
export type LocalizedList = Record<Lang, string[]>;

/** 부품 하나의 설명(다국어). 패널: 태그 · 제목 · 한 줄 요약(lead) · 자세히(detail) · 핵심 항목(facts). */
export interface PartInfo {
  tag: LocalizedText;
  title: LocalizedText;
  lead: LocalizedText;
  detail: LocalizedText;
  facts: LocalizedList;
}

export type PartInfoMap = Record<string, PartInfo>;

/** 분해 대상 부품. 위치는 base에서 시작해 t=1에서 base+explode 까지 보간된다(방향은 모델이 정함). */
export interface PartDef {
  id: string;
  /** 분해 전 위치. */
  base: [number, number, number];
  /** 완전 분해(t=1) 시 base로부터의 이동량. 수직 적층/평면 배치 모두 이 벡터로 표현. */
  explode: [number, number, number];
  /** 순차 전개(stagger) 순서 0~1. 클수록 늦게 출발. */
  order?: number;
  /** 같은 종류 부품의 n번째(예: DRAM 3번째 층). */
  layer?: number;
  /** 이 부품의 메시(들). Canvas 안에서 렌더된다. */
  node: ReactNode;
}

export interface ModelDef {
  parts: PartDef[];
  info: PartInfoMap;
}
