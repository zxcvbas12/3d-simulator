import type * as THREE from "three";
import type { Lang } from "@locales/index";

/**
 * 모델 계약 — 모든 모델(model.ts)이 공통 뷰어(shared/interaction/viewer.ts)에 꽂히는 인터페이스.
 * 모델마다 다른 건 "형상(build)"과 "부품 설명(info)" 둘뿐이게 한다.
 * 회전·분해·프레이밍·피킹·정보패널 같은 공통 동작은 뷰어가 이 계약 위에서 처리한다.
 */

export type LocalizedText = Record<Lang, string>;

/** 부품 하나의 설명(다국어). 패널에 표시된다. */
export interface PartInfo {
  tag: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
}

/** 부품 id → 설명. 각 모델의 data.ts가 제공한다. */
export type PartInfoMap = Record<string, PartInfo>;

/** 분해 대상 한 덩어리. baseY(분해 전 기준 높이)를 기준으로 위아래로 벌어진다. */
export interface ExplodePart {
  group: THREE.Object3D;
  baseY: number;
}

/** model.build에 넘어가는 컨텍스트. 지금은 씬만 필요. */
export interface ModelBuildContext {
  scene: THREE.Scene;
}

/** model.build의 결과 — 뷰어가 이걸로 분해/프레이밍/피킹을 돌린다. */
export interface ModelBuild {
  /** 모든 파트를 담은 루트 그룹. 뷰어가 씬에 추가하고 프레이밍/정리 대상으로 삼는다. */
  root: THREE.Object3D;
  /** 분해 시 움직일 파트들. */
  parts: ExplodePart[];
  /** 클릭 선택 대상. 각자 userData.id(필수)와 userData.layer(선택)를 가진다. */
  pickables: THREE.Object3D[];
  /** 분해 기준 높이(피벗). 생략 시 parts의 baseY 평균. */
  pivotY?: number;
  /** 분해 강도. 생략 시 기본값. */
  spread?: number;
  /** 모델별 프레임 갱신 훅(예: HBM의 TSV를 스택 높이에 맞춰 늘리기). t=0~1. */
  update?: (t: number) => void;
}

export interface ModelModule {
  build(ctx: ModelBuildContext): ModelBuild;
  info: PartInfoMap;
}
