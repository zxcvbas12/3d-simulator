import type { ModelDef } from "./model";

/**
 * 검증용 더미 모델 — 공통 <Viewer>(회전·독립 줌·stagger 분해·선택·정보패널)를 시험하기 위한 일반 적층.
 * 특정 제품이 아니다. model.tsx가 생기면(예: HBM) 이 자리에 실제 모델이 들어온다.
 * three를 직접 import 하지 않는다 — <mesh> 등은 R3F 인트린식이라 Canvas 안에서만 의미를 갖는다.
 */
export const demoModel: ModelDef = {
  parts: [
    {
      id: "base",
      base: [0, 0, 0],
      explode: [0, -1.4, 0],
      order: 0,
      node: (
        <mesh>
          <boxGeometry args={[4.2, 0.5, 4.2]} />
          <meshStandardMaterial color="#123028" metalness={0.15} roughness={0.82} />
        </mesh>
      ),
    },
    {
      id: "core",
      base: [0, 0.6, 0],
      explode: [0, 0.2, 0],
      order: 0.33,
      node: (
        <mesh>
          <boxGeometry args={[2.6, 0.4, 2.6]} />
          <meshStandardMaterial color="#2a3a52" metalness={0.4} roughness={0.5} />
        </mesh>
      ),
    },
    {
      id: "mid",
      base: [0, 1.05, 0],
      explode: [0, 1.2, 0],
      order: 0.66,
      node: (
        <mesh>
          <boxGeometry args={[2.4, 0.3, 2.4]} />
          <meshStandardMaterial color="#3a5fa0" metalness={0.38} roughness={0.46} />
        </mesh>
      ),
    },
    {
      id: "cap",
      base: [0, 1.45, 0],
      explode: [0, 2.4, 0],
      order: 1,
      node: (
        <mesh>
          <boxGeometry args={[2.0, 0.3, 2.0]} />
          <meshStandardMaterial color="#8a6a32" metalness={0.85} roughness={0.35} />
        </mesh>
      ),
    },
  ],
  info: {
    base: {
      tag: { ko: "BASE", en: "BASE", ja: "BASE", zh: "BASE" },
      title: { ko: "받침 (Base)", en: "Base", ja: "ベース", zh: "底座" },
      lead: {
        ko: "전체를 받치는 가장 큰 판이에요.",
        en: "The largest plate that supports everything.",
        ja: "全体を支える最も大きな板です。",
        zh: "支撑整体的最大底板。",
      },
      detail: {
        ko: "더미 모델로, 공통 뷰어의 동작(회전·독립 줌·분해·선택·정보)을 확인하기 위한 예시 부품입니다. 실제 모델에서는 패키지 기판 같은 역할을 합니다.",
        en: "A demo part for verifying the shared viewer (rotate, independent zoom, explode, select, info). In a real model this is like the package substrate.",
        ja: "共通ビューア（回転・独立ズーム・分解・選択・情報）を確認するためのデモ部品です。実際のモデルではパッケージ基板に相当します。",
        zh: "用于验证通用查看器（旋转、独立缩放、拆解、选择、信息）的演示部件。在真实模型中相当于封装基板。",
      },
      facts: {
        ko: ["역할 — 지지 + 외부 연결", "가장 큰 바닥판", "위로 코어·층이 쌓임"],
        en: ["Role — support + external link", "Largest bottom plate", "Core & layers stack on top"],
        ja: ["役割 — 支持 + 外部接続", "最も大きい底板", "上にコア・層が重なる"],
        zh: ["作用 — 支撑 + 对外连接", "最大的底板", "其上堆叠核心与层"],
      },
    },
    core: {
      tag: { ko: "CORE", en: "CORE", ja: "CORE", zh: "CORE" },
      title: { ko: "코어 (Core)", en: "Core", ja: "コア", zh: "核心" },
      lead: {
        ko: "가운데 핵심 블록이에요.",
        en: "The central core block.",
        ja: "中央のコアブロックです。",
        zh: "中央核心块。",
      },
      detail: {
        ko: "분해하면 위아래 층 사이로 벌어집니다. 순차 전개(stagger)와 가감속(ease)이 적용되는지 확인하는 부품입니다.",
        en: "When exploded it spreads between the layers above and below — a part to check the staggered, eased motion.",
        ja: "分解すると上下の層の間に広がります。stagger と ease の動きを確認する部品です。",
        zh: "拆解时在上下层之间展开，用于检查错峰与缓动效果。",
      },
      facts: {
        ko: ["역할 — 중심 블록", "분해 시 중간에서 전개", "stagger·ease 확인용"],
        en: ["Role — central block", "Spreads from the middle", "Checks stagger & ease"],
        ja: ["役割 — 中心ブロック", "中間で展開", "stagger・ease 確認"],
        zh: ["作用 — 中心块", "从中间展开", "检查错峰与缓动"],
      },
    },
    mid: {
      tag: { ko: "LAYER", en: "LAYER", ja: "LAYER", zh: "LAYER" },
      title: { ko: "중간 층 (Layer)", en: "Middle layer", ja: "中間層", zh: "中间层" },
      lead: {
        ko: "코어 위에 쌓인 중간 층이에요.",
        en: "A middle layer stacked on the core.",
        ja: "コアの上に積まれた中間層です。",
        zh: "堆叠在核心上的中间层。",
      },
      detail: {
        ko: "실제 모델에서는 이런 층이 여러 장 반복됩니다(예: DRAM 다이). 같은 종류 층은 클릭 시 몇 번째인지 표시할 수 있습니다.",
        en: "In a real model many such layers repeat (e.g. DRAM dies). Identical layers can show their index when clicked.",
        ja: "実際のモデルではこうした層が何枚も重なります（例：DRAMダイ）。同種の層はクリック時に何番目かを表示できます。",
        zh: "在真实模型中这样的层会重复多次（如 DRAM 裸片）。同类层点击时可显示第几层。",
      },
      facts: {
        ko: ["역할 — 반복되는 층", "여러 장 적층 가능", "n번째 표시 지원"],
        en: ["Role — repeating layer", "Stacks many high", "Shows layer index"],
        ja: ["役割 — 反復する層", "多層に積層可能", "n番目を表示"],
        zh: ["作用 — 重复层", "可多层堆叠", "显示第几层"],
      },
    },
    cap: {
      tag: { ko: "CAP", en: "CAP", ja: "CAP", zh: "CAP" },
      title: { ko: "덮개 (Cap)", en: "Cap", ja: "キャップ", zh: "顶盖" },
      lead: {
        ko: "맨 위 금속 덮개예요.",
        en: "The metallic top cap.",
        ja: "一番上の金属の蓋です。",
        zh: "最顶部的金属盖。",
      },
      detail: {
        ko: "금속 질감(높은 metalness)으로 PBR 반사를 확인합니다. 분해 시 가장 멀리, 가장 늦게 떠오릅니다.",
        en: "A metallic finish (high metalness) to check PBR reflection. On explode it rises the farthest and the latest.",
        ja: "メタリックな質感（高い metalness）で PBR 反射を確認します。分解時に最も遠く、最も遅れて浮きます。",
        zh: "金属质感（高 metalness）用于检查 PBR 反射。拆解时升得最远、最晚。",
      },
      facts: {
        ko: ["역할 — 최상단 덮개", "금속 질감(PBR)", "가장 늦게 전개"],
        en: ["Role — top cap", "Metallic (PBR)", "Spreads last"],
        ja: ["役割 — 最上部の蓋", "メタリック(PBR)", "最後に展開"],
        zh: ["作用 — 顶盖", "金属质感(PBR)", "最后展开"],
      },
    },
  },
};
