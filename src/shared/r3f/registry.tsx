import { lazy, type ComponentType, type LazyExoticComponent } from "react";

/**
 * 모델 레지스트리 — "카테고리/모델 id" → 그 모델을 띄우는 lazy 뷰어 컴포넌트.
 * 각 항목은 Viewer(R3F/three)와 모델(model.tsx)을 함께 동적 import 한다.
 * 이 파일 자체는 무거운 정적 import가 없어 셸 번들에 three가 실리지 않는다.
 * 새 모델 추가 = 여기 한 줄 + <카테고리>/<모델>/model.tsx.
 */
function makeViewer(loadModel: () => Promise<{ default: unknown }>): LazyExoticComponent<ComponentType> {
  return lazy(async () => {
    const [{ default: Viewer }, mod] = await Promise.all([import("./Viewer"), loadModel()]);
    const model = mod.default as import("./model").ModelDef;
    return { default: () => <Viewer model={model} /> };
  });
}

const REGISTRY: Record<string, LazyExoticComponent<ComponentType>> = {
  "semiconductor/hbm": makeViewer(() => import("../../../semiconductor/hbm/model")),
  "semiconductor/gpu": makeViewer(() => import("../../../semiconductor/gpu/model")),
  "semiconductor/cpu": makeViewer(() => import("../../../semiconductor/cpu/model")),
  "space/rocket-engine": makeViewer(() => import("../../../space/rocket-engine/model")),
};

/** 검증용 더미 — model.tsx가 아직 없는 live 모델의 폴백. */
const DemoViewer = makeViewer(() => import("./demoModel").then((m) => ({ default: m.demoModel })));

export function getModelViewer(cat: string, id: string): LazyExoticComponent<ComponentType> {
  return REGISTRY[`${cat}/${id}`] ?? DemoViewer;
}
