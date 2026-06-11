import * as THREE from "three";
import type { ModelOption } from "./model";

/**
 * 단면(cutaway) 공용 헬퍼 — 여러 모델이 같은 옵션·클리핑 로직을 재사용한다.
 * Viewer가 localClippingEnabled를 켜두므로(평면 없으면 비용 0) 모델은 재질에 평면만 넣으면 된다.
 * 사용: options에 cutawayOption() 추가 → update에서 setClipping(groups·extras, on ? [CUT_PLANE_Z] : null).
 */

/** z>0 절반을 잘라내는 표준 절단 평면(모델 중심 기준). */
export const CUT_PLANE_Z = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);

/** 표준 "단면" 옵션 항목(라벨 4개 언어 공통). */
export function cutawayOption(): ModelOption {
  return {
    id: "cut",
    label: { ko: "단면", en: "Cutaway", ja: "断面", zh: "剖面" },
    values: [
      { id: "off", label: "OFF" },
      { id: "on", label: "ON" },
    ],
    default: "off",
  };
}

/** 주어진 객체 트리들의 모든 재질에 클리핑 평면을 적용/해제한다(변경 시에만 호출할 것). */
export function setClipping(objs: (THREE.Object3D | null | undefined)[], planes: THREE.Plane[] | null) {
  const visit = (o: THREE.Object3D) => {
    const mat = (o as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
    if (!mat) return;
    for (const m of Array.isArray(mat) ? mat : [mat]) m.clippingPlanes = planes;
  };
  for (const g of objs) g?.traverse(visit);
}
