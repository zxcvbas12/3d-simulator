import * as THREE from "three";
import type { ExplodePart, ModelBuild, ModelModule, PartInfoMap } from "@shared/model";

/**
 * 검증용 더미 모델 — 공통 뷰어(회전·분해·프레이밍·피킹·정보패널)를 시험하기 위한 일반 적층 형상.
 * 특정 제품이 아니다. 모델별 model.ts가 생기면(예: HBM) catalog.load로 대체된다.
 * 이 파일은 "모델 계약을 어떻게 구현하는지" 보여주는 최소 예시이기도 하다.
 */

const info: PartInfoMap = {
  base: {
    tag: { ko: "BASE", en: "BASE", ja: "BASE", zh: "BASE" },
    title: { ko: "받침 (Base)", en: "Base", ja: "ベース", zh: "底座" },
    body: {
      ko: "전체를 받치는 가장 큰 판입니다. 더미 모델로, 공통 뷰어의 동작(회전·분해·선택·정보)을 확인하기 위한 예시 부품입니다.",
      en: "The largest plate that supports everything. A demo part used to verify the shared viewer (rotate, explode, select, info).",
      ja: "全体を支える最も大きな板。共通ビューア（回転・分解・選択・情報）を確認するためのデモ部品です。",
      zh: "支撑整体的最大底板。这是用于验证通用查看器（旋转、拆解、选择、信息）的演示部件。",
    },
  },
  core: {
    tag: { ko: "CORE", en: "CORE", ja: "CORE", zh: "CORE" },
    title: { ko: "코어 (Core)", en: "Core", ja: "コア", zh: "核心" },
    body: {
      ko: "가운데 핵심 블록입니다. 분해하면 위아래 층 사이로 벌어집니다.",
      en: "The central core block. When exploded, it spreads out between the layers above and below.",
      ja: "中央のコアブロック。分解すると上下の層の間に広がります。",
      zh: "中央核心块。拆解时会在上下层之间展开。",
    },
  },
  mid: {
    tag: { ko: "LAYER", en: "LAYER", ja: "LAYER", zh: "LAYER" },
    title: { ko: "중간 층 (Layer)", en: "Middle layer", ja: "中間層", zh: "中间层" },
    body: {
      ko: "코어 위에 쌓인 중간 층입니다. 실제 모델에서는 이런 층이 여러 장 반복됩니다.",
      en: "A middle layer stacked on the core. In a real model, many such layers repeat.",
      ja: "コアの上に積まれた中間層。実際のモデルではこうした層が何枚も重なります。",
      zh: "堆叠在核心上方的中间层。在真实模型中，这样的层会重复多次。",
    },
  },
  cap: {
    tag: { ko: "CAP", en: "CAP", ja: "CAP", zh: "CAP" },
    title: { ko: "덮개 (Cap)", en: "Cap", ja: "キャップ", zh: "顶盖" },
    body: {
      ko: "맨 위 덮개입니다. 금속 질감으로 마감했습니다.",
      en: "The top cap, finished with a metallic look.",
      ja: "一番上の蓋。メタリックな質感で仕上げています。",
      zh: "最顶部的盖子，采用金属质感处理。",
    },
  },
};

function makeBox(
  w: number,
  h: number,
  d: number,
  color: number,
  metal: number,
  rough: number,
  edge: number,
): THREE.Group {
  const g = new THREE.Group();
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color, metalness: metal, roughness: rough }),
  );
  g.add(mesh);
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color: edge, transparent: true, opacity: 0.55 }),
  );
  g.add(edges);
  return g;
}

export function createDemoModel(): ModelModule {
  return {
    info,
    build(): ModelBuild {
      const root = new THREE.Group();
      const parts: ExplodePart[] = [];
      const pickables: THREE.Object3D[] = [];

      // [id, y, w, h, d, color, metal, rough, edge]
      const specs: Array<[string, number, number, number, number, number, number, number, number]> = [
        ["base", 0.0, 4.2, 0.5, 4.2, 0x123028, 0.1, 0.85, 0x2f6f5e],
        ["core", 0.6, 2.6, 0.4, 2.6, 0x2a3a52, 0.35, 0.5, 0x6f9bff],
        ["mid", 1.05, 2.6, 0.3, 2.6, 0x3a5fa0, 0.32, 0.46, 0x9fc0ff],
        ["cap", 1.45, 2.0, 0.3, 2.0, 0x8a6a32, 0.85, 0.35, 0xe6b53c],
      ];

      for (const [id, y, w, h, d, color, metal, rough, edge] of specs) {
        const g = makeBox(w, h, d, color, metal, rough, edge);
        g.position.y = y;
        const mesh = g.children[0] as THREE.Mesh;
        mesh.userData.id = id;
        root.add(g);
        parts.push({ group: g, baseY: y });
        pickables.push(mesh);
      }

      return { root, parts, pickables, spread: 1.6 };
    },
  };
}
