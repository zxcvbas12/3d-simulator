import type { Lang } from "@locales/index";

/**
 * 사이트 콘텐츠 카탈로그 — 카테고리와 모델 목록.
 * 새 모델 추가 = 여기 MODELS에 한 줄 + <카테고리>/<모델>/ 폴더.
 * 카테고리명은 i18n(cat.*)에서, 모델명/짧은설명은 카탈로그에 직접 둔다(모델별 메타데이터).
 * 부품별 상세 설명은 각 모델의 data.ts에 따로 둔다(이 파일에는 두지 않는다).
 */

export type CategoryId =
  | "semiconductor"
  | "space"
  | "automotive"
  | "appliance"
  | "aviation"
  | "medical"
  | "energy"
  | "robotics";

/** 카드/뷰어 썸네일 모티프 종류. */
export type ThumbType = "layers" | "orbit" | "cells" | "coil" | "blades" | "wave" | "joint";

export type Status = "live" | "soon";

/** 4개 언어 텍스트. Lang 키와 묶어 두어 언어 추가 시 컴파일로 누락을 잡는다. */
export type LocalizedText = Record<Lang, string>;

export interface CategoryEntry {
  id: CategoryId; // 폴더명 + i18n cat.* 키와 동일
  thumb: ThumbType;
  /** 분야 한 줄 소개 — 카테고리 화면 헤더 아래 노출. */
  intro: LocalizedText;
  /** 그 분야의 추천 학습 순서(있으면 카테고리 화면에 콜아웃). 사이트 공통 페이지에는 분야 종속 안내를 두지 않는다. */
  guide?: LocalizedText;
}

/** 모델 전체 사양 한 줄 (라벨은 다국어, 값은 단위 포함 수치로 언어 중립). */
export interface ModelSpec {
  label: LocalizedText;
  value: string;
}

export interface ModelEntry {
  cat: CategoryId;
  id: string; // 카테고리 안에서의 모델 슬러그(= 폴더명)
  status: Status;
  thumb: ThumbType;
  name: LocalizedText;
  desc: LocalizedText;
  /** 모델 상세의 자세한 개요 문단(없으면 짧은 desc만 노출). */
  overview?: LocalizedText;
  /** 주요 사양(전체 크기·공정 등) — 모델 상세에 표로 노출. */
  specs?: ModelSpec[];
}

export const CATEGORIES: CategoryEntry[] = [
  { id: "semiconductor", thumb: "layers",
    intro: {
      ko: "손톱만 한 칩 안에서 일어나는 일 — 쌓고(적층), 잇고(패키징), 나누는(칩렛) 구조를 다룹니다.",
      en: "What happens inside a fingernail-sized chip — structures that stack, connect and split.",
      ja: "爪ほどのチップの中で起きること — 積む（積層）、つなぐ（パッケージング）、分ける（チップレット）構造を扱います。",
      zh: "指甲大小的芯片内部 — 堆叠、互连与拆分（芯粒）的结构。",
    },
    guide: {
      ko: "추천 순서 — HBM → GPU → CPU. 쌓는 구조(HBM)를 먼저 이해하면, 그것을 프로세서 옆에 두는 이유(GPU)와 칩을 나누는 이유(CPU)가 자연스럽게 이어집니다.",
      en: "Suggested order — HBM → GPU → CPU. Understand stacking first (HBM), and why it sits beside a processor (GPU) and why chips are split (CPU) follow naturally.",
      ja: "おすすめ順 — HBM → GPU → CPU。積む構造（HBM）を先に理解すれば、プロセッサの隣に置く理由（GPU）とチップを分ける理由（CPU）が自然につながります。",
      zh: "推荐顺序 — HBM → GPU → CPU。先理解堆叠结构（HBM），再看为何放在处理器旁（GPU）、为何拆分芯片（CPU），脉络自然贯通。",
    } },
  { id: "space", thumb: "orbit",
    intro: {
      ko: "로켓 엔진부터 인공위성까지 — 극한 환경을 견디는 기계의 구조를 다룹니다.",
      en: "From rocket engines to satellites — machines built to survive extreme environments.",
      ja: "ロケットエンジンから人工衛星まで — 極限環境に耐える機械の構造を扱います。",
      zh: "从火箭发动机到人造卫星 — 为极端环境而生的机械结构。",
    } },
  { id: "automotive", thumb: "cells",
    intro: {
      ko: "배터리 팩부터 내연기관까지 — 바퀴를 굴리는 동력의 구조를 다룹니다.",
      en: "From battery packs to combustion engines — the structures that put power on wheels.",
      ja: "バッテリーパックから内燃機関まで — 車輪を回す動力の構造を扱います。",
      zh: "从电池组到内燃机 — 驱动车轮的动力结构。",
    } },
  { id: "appliance", thumb: "coil",
    intro: {
      ko: "컴프레서·모터·마그네트론 — 매일 쓰는 가전 속 핵심 부품을 다룹니다.",
      en: "Compressors, motors, magnetrons — the core parts inside everyday appliances.",
      ja: "コンプレッサー・モーター・マグネトロン — 毎日使う家電の中核部品を扱います。",
      zh: "压缩机、电机、磁控管 — 日常家电中的核心部件。",
    } },
  { id: "aviation", thumb: "blades",
    intro: {
      ko: "제트 엔진과 날개 — 항공기를 띄우고 움직이는 구조를 다룹니다.",
      en: "Jet engines and wings — the structures that lift and move an aircraft.",
      ja: "ジェットエンジンと主翼 — 航空機を飛ばし動かす構造を扱います。",
      zh: "喷气发动机与机翼 — 让飞机起飞与前行的结构。",
    } },
  { id: "medical", thumb: "wave",
    intro: {
      ko: "MRI부터 인슐린 펌프까지 — 몸을 진단하고 치료하는 기기를 다룹니다.",
      en: "From MRI to insulin pumps — devices that diagnose and treat the body.",
      ja: "MRI からインスリンポンプまで — 体を診断し治療する機器を扱います。",
      zh: "从 MRI 到胰岛素泵 — 诊断与治疗身体的设备。",
    } },
  { id: "energy", thumb: "cells",
    intro: {
      ko: "배터리 셀·태양광·풍력 — 에너지를 만들고 저장하는 구조를 다룹니다.",
      en: "Battery cells, solar, wind — structures that make and store energy.",
      ja: "電池セル・太陽光・風力 — エネルギーを作り蓄える構造を扱います。",
      zh: "电芯、太阳能、风电 — 制造与储存能源的结构。",
    } },
  { id: "robotics", thumb: "joint",
    intro: {
      ko: "액추에이터·로봇 손·라이다 — 로봇을 움직이고 감지하게 하는 부품을 다룹니다.",
      en: "Actuators, robot hands, LiDAR — the parts that make robots move and sense.",
      ja: "アクチュエータ・ロボットハンド・LiDAR — ロボットを動かし感知させる部品を扱います。",
      zh: "执行器、机械手、激光雷达 — 让机器人运动与感知的部件。",
    } },
];

export const MODELS: ModelEntry[] = [
  // ── 반도체 ──
  { cat: "semiconductor", id: "hbm", status: "live", thumb: "layers",
    name: { ko: "HBM 고대역폭 메모리", en: "HBM High-Bandwidth Memory", ja: "HBM 広帯域メモリ", zh: "HBM 高带宽内存" },
    desc: { ko: "수직으로 쌓은 적층 DRAM", en: "Vertically stacked DRAM", ja: "積層型DRAM", zh: "垂直堆叠DRAM" },
    overview: {
      ko: "HBM(High Bandwidth Memory)은 여러 장의 얇은 DRAM 다이를 수직으로 쌓고, 실리콘을 관통하는 전극(TSV)으로 곧장 연결한 적층 메모리입니다. 넓게 펼치는 대신 위로 쌓아 좁은 면적에 큰 용량과 아주 넓은 데이터 통로(대역폭)를 동시에 얻습니다. GPU 바로 옆에 실리콘 인터포저로 붙이는 2.5D 패키징의 핵심 부품으로, AI·HPC 가속기의 메모리 병목을 푸는 데 쓰입니다.",
      en: "HBM (High Bandwidth Memory) is stacked memory: several thin DRAM dies piled vertically and wired straight through by through-silicon vias (TSVs). By stacking up instead of spreading out, it fits large capacity and a very wide data path (bandwidth) into a small footprint. Sitting right beside the GPU on a silicon interposer — 2.5D packaging — it relieves the memory bottleneck of AI and HPC accelerators.",
      ja: "HBM（High Bandwidth Memory）は、薄い DRAM ダイを何枚も垂直に積み、シリコンを貫く電極（TSV）で真っ直ぐ接続した積層メモリです。広げる代わりに上へ積むことで、狭い面積に大容量と非常に広いデータ経路（帯域幅）を同時に得ます。GPU のすぐ隣にシリコンインターポーザで載せる 2.5D パッケージングの中核部品で、AI・HPC アクセラレータのメモリボトルネックを解消します。",
      zh: "HBM（高带宽内存）是一种堆叠内存：把多片薄 DRAM 裸片垂直堆叠，并用硅通孔（TSV）笔直连通。以向上堆叠取代横向铺开，在很小的面积内同时获得大容量与极宽的数据通道（带宽）。它通过硅转接板紧贴 GPU（2.5D 封装），用于缓解 AI 与 HPC 加速器的内存瓶颈。",
    },
    specs: [
      { label: { ko: "구조", en: "Structure", ja: "構造", zh: "结构" }, value: "8-Hi DRAM + logic die" },
      { label: { ko: "다이 크기", en: "Die size", ja: "ダイサイズ", zh: "裸片尺寸" }, value: "≈ 11 × 11 mm" },
      { label: { ko: "스택 높이", en: "Stack height", ja: "スタック高さ", zh: "堆叠高度" }, value: "≈ 0.72 mm (8-Hi)" },
      { label: { ko: "DRAM 두께", en: "DRAM thickness", ja: "DRAM厚さ", zh: "DRAM 厚度" }, value: "≈ 50 μm / die" },
      { label: { ko: "연결", en: "Interconnect", ja: "接続", zh: "互连" }, value: "TSV ∅ ≈ 10 μm" },
      { label: { ko: "대역폭", en: "Bandwidth", ja: "帯域幅", zh: "带宽" }, value: "≈ 1 TB/s / stack" },
      { label: { ko: "패키징", en: "Packaging", ja: "パッケージング", zh: "封装" }, value: "2.5D (Si interposer)" },
    ] },
  { cat: "semiconductor", id: "gpu", status: "live", thumb: "layers",
    name: { ko: "GPU 패키지", en: "GPU Package", ja: "GPUパッケージ", zh: "GPU封装" },
    desc: { ko: "그래픽 처리 장치 구조", en: "Graphics processor anatomy", ja: "GPUの構造", zh: "图形处理器结构" },
    overview: {
      ko: "AI 가속기급 GPU는 칩 하나가 아니라 패키지입니다. 한가운데의 큰 연산 다이 양옆에 HBM 적층 메모리를 붙이고, 둘을 실리콘 인터포저의 수천 가닥 미세 배선으로 잇습니다(2.5D 패키징). 메모리를 프로세서 바로 옆 몇 mm 거리에 두면 데이터 통로가 넓고 짧아져 대역폭은 커지고 전력은 줄어듭니다. 큰 연산 다이 + 옆 메모리 — 현대 AI 가속기의 기본 형태를 이 모델에서 분해해 볼 수 있습니다.",
      en: "An AI-class GPU is not one chip but a package: a large compute die at the center with HBM memory stacks at its sides, joined by thousands of fine wires in a silicon interposer (2.5D packaging). Parking memory just millimeters from the processor makes the data path wide and short — more bandwidth, less power. A big compute die with memory beside it is the basic shape of the modern AI accelerator, and this model takes it apart.",
      ja: "AI アクセラレータ級の GPU は一つのチップではなくパッケージです。中央の大きな演算ダイの両脇に HBM 積層メモリを置き、シリコンインターポーザの数千本の微細配線で結びます（2.5D パッケージング）。メモリをプロセッサのすぐ隣・数 mm に置くことでデータ経路が広く短くなり、帯域は増え電力は減ります。大きな演算ダイ + 隣のメモリ — 現代 AI アクセラレータの基本形をこのモデルで分解できます。",
      zh: "AI 加速器级的 GPU 不是一颗芯片，而是一个封装：中央的大计算裸片两侧放置 HBM 堆叠内存，由硅转接板上数千条微细布线连通（2.5D 封装）。内存距处理器仅几毫米，数据通道又宽又短——带宽更大、功耗更低。大计算裸片 + 旁侧内存，正是现代 AI 加速器的基本形态，本模型将其逐件分解。",
    },
    specs: [
      { label: { ko: "구조", en: "Structure", ja: "構造", zh: "结构" }, value: "GPU die + HBM ×4 (2.5D)" },
      { label: { ko: "패키지", en: "Package size", ja: "パッケージ", zh: "封装尺寸" }, value: "≈ 55 × 55 mm" },
      { label: { ko: "연산 다이", en: "Compute die", ja: "演算ダイ", zh: "计算裸片" }, value: "≈ 800 mm² · 4 nm" },
      { label: { ko: "메모리", en: "Memory", ja: "メモリ", zh: "内存" }, value: "HBM ×4 · ≈ 1 TB/s each" },
      { label: { ko: "인터포저", en: "Interposer", ja: "インターポーザ", zh: "转接板" }, value: "Si · ≈ 2,500 mm²" },
      { label: { ko: "접점", en: "Contacts", ja: "接点", zh: "触点" }, value: "BGA · 1,000+ balls" },
      { label: { ko: "덮개", en: "Lid", ja: "リッド", zh: "盖" }, value: "Ni-plated Cu" },
    ] },
  { cat: "semiconductor", id: "cpu", status: "live", thumb: "layers",
    name: { ko: "CPU 칩렛 패키지", en: "CPU Chiplet Package", ja: "CPUチップレット", zh: "CPU芯粒封装" },
    desc: { ko: "여러 칩렛을 모은 구조", en: "Multiple chiplets in one package", ja: "複数チップレット構成", zh: "多芯粒封装结构" },
    overview: {
      ko: "현대 CPU는 모든 코어를 담은 하나의 큰 다이 대신, 여러 개의 작은 칩렛(chiplet)을 한 패키지에 모아 만듭니다. 코어가 든 컴퓨트 칩렛(CCD)과 메모리·입출력을 맡는 I/O 다이를 분리하면, 불량 다이만 버리면 되어 수율이 오르고 비용이 내려갑니다. 칩렛을 더 붙이는 것만으로 코어 수를 늘릴 수 있어 확장도 유연합니다. 맨 위에는 열을 퍼뜨리는 금속 덮개(IHS)가, 다이와 덮개 사이에는 열을 전달하는 TIM이 들어갑니다.",
      en: "A modern CPU is built not from one large die holding every core, but by gathering several small chiplets in one package. Separating the compute chiplets (CCDs, which hold the cores) from the I/O die (memory and I/O) means only a defective chiplet is thrown away — raising yield and lowering cost. Core counts scale simply by adding more chiplets. A metal lid (IHS) spreads the heat on top, with a thermal interface material (TIM) between the dies and the lid.",
      ja: "現代の CPU は、全コアを載せた一つの大きなダイではなく、複数の小さなチップレットを一つのパッケージに集めて作ります。コアを持つコンピュートチップレット（CCD）と、メモリ・入出力を担う I/O ダイを分ければ、不良のダイだけ捨てればよく、歩留まりが上がりコストが下がります。チップレットを足すだけでコア数を増やせ、拡張も柔軟です。最上部には熱を広げる金属の蓋（IHS）、ダイと蓋の間には熱を伝える TIM が入ります。",
      zh: "现代 CPU 不是用一颗装下所有核心的大裸片，而是把多颗小芯粒（chiplet）集成在一个封装里。把含核心的计算芯粒（CCD）与负责内存、输入输出的 I/O 裸片分开，只需丢弃有缺陷的芯粒，从而提升良率、降低成本。只需增加芯粒即可扩展核心数，十分灵活。顶部是摊开热量的金属盖（IHS），裸片与盖之间是传热的 TIM。",
    },
    specs: [
      { label: { ko: "구조", en: "Structure", ja: "構造", zh: "结构" }, value: "CCD ×2 + I/O die" },
      { label: { ko: "패키지", en: "Package size", ja: "パッケージ", zh: "封装尺寸" }, value: "≈ 40 × 40 mm" },
      { label: { ko: "컴퓨트 칩렛", en: "Compute die", ja: "コンピュートダイ", zh: "计算裸片" }, value: "≈ 70 mm² · 5 nm" },
      { label: { ko: "I/O 다이", en: "I/O die", ja: "I/O ダイ", zh: "I/O 裸片" }, value: "≈ 120 mm² · 6 nm" },
      { label: { ko: "접점", en: "Contacts", ja: "接点", zh: "触点" }, value: "LGA · 1,000+ lands" },
      { label: { ko: "덮개", en: "Lid (IHS)", ja: "蓋 (IHS)", zh: "盖 (IHS)" }, value: "Ni-plated Cu" },
    ] },

  // ── 우주 ──
  { cat: "space", id: "rocket-engine", status: "soon", thumb: "orbit",
    name: { ko: "로켓 엔진", en: "Rocket Engine", ja: "ロケットエンジン", zh: "火箭发动机" },
    desc: { ko: "추진 시스템 단면", en: "Propulsion cutaway", ja: "推進システム断面", zh: "推进系统剖面" } },
  { cat: "space", id: "satellite", status: "soon", thumb: "orbit",
    name: { ko: "인공위성", en: "Satellite", ja: "人工衛星", zh: "人造卫星" },
    desc: { ko: "궤도 위성 모듈", en: "Orbital satellite", ja: "軌道衛星", zh: "轨道卫星模块" } },
  { cat: "space", id: "reentry-capsule", status: "soon", thumb: "orbit",
    name: { ko: "재진입 캡슐", en: "Reentry Capsule", ja: "再突入カプセル", zh: "返回舱" },
    desc: { ko: "대기권 재진입 구조", en: "Atmospheric reentry", ja: "大気圏再突入", zh: "大气层返回" } },

  // ── 자동차 ──
  { cat: "automotive", id: "ev-battery", status: "soon", thumb: "cells",
    name: { ko: "EV 배터리 팩", en: "EV Battery Pack", ja: "EVバッテリーパック", zh: "电动汽车电池组" },
    desc: { ko: "전기차 에너지 저장", en: "EV energy storage", ja: "EVのエネルギー貯蔵", zh: "电动车储能" } },
  { cat: "automotive", id: "combustion-engine", status: "soon", thumb: "cells",
    name: { ko: "내연기관 엔진", en: "Combustion Engine", ja: "内燃エンジン", zh: "内燃机" },
    desc: { ko: "4행정 작동 원리", en: "Four-stroke cycle", ja: "4ストロークの原理", zh: "四冲程原理" } },
  { cat: "automotive", id: "drive-motor", status: "soon", thumb: "cells",
    name: { ko: "구동 모터", en: "Drive Motor", ja: "駆動モーター", zh: "驱动电机" },
    desc: { ko: "전기 구동 장치", en: "Electric drive unit", ja: "電動駆動装置", zh: "电力驱动装置" } },

  // ── 가전 ──
  { cat: "appliance", id: "cooling-compressor", status: "soon", thumb: "coil",
    name: { ko: "냉각 컴프레서", en: "Cooling Compressor", ja: "冷却コンプレッサー", zh: "制冷压缩机" },
    desc: { ko: "냉장·냉방의 심장부", en: "The heart of cooling", ja: "冷却の心臓部", zh: "制冷核心" } },
  { cat: "appliance", id: "electric-motor", status: "soon", thumb: "coil",
    name: { ko: "전기 모터", en: "Electric Motor", ja: "電動モーター", zh: "电动机" },
    desc: { ko: "회전 동력 장치", en: "Rotary drive", ja: "回転駆動", zh: "旋转动力" } },
  { cat: "appliance", id: "microwave", status: "soon", thumb: "coil",
    name: { ko: "전자레인지", en: "Microwave Oven", ja: "電子レンジ", zh: "微波炉" },
    desc: { ko: "마그네트론 작동 원리", en: "How a magnetron works", ja: "マグネトロンの仕組み", zh: "磁控管原理" } },

  // ── 항공 ──
  { cat: "aviation", id: "jet-engine", status: "soon", thumb: "blades",
    name: { ko: "제트 엔진", en: "Jet Engine", ja: "ジェットエンジン", zh: "喷气发动机" },
    desc: { ko: "터보팬 구조", en: "Turbofan anatomy", ja: "ターボファン構造", zh: "涡扇结构" } },
  { cat: "aviation", id: "landing-gear", status: "soon", thumb: "blades",
    name: { ko: "랜딩기어", en: "Landing Gear", ja: "着陸装置", zh: "起落架" },
    desc: { ko: "이착륙 장치", en: "Takeoff & landing gear", ja: "離着陸装置", zh: "起降装置" } },
  { cat: "aviation", id: "wing", status: "soon", thumb: "blades",
    name: { ko: "날개 구조", en: "Wing Structure", ja: "主翼構造", zh: "机翼结构" },
    desc: { ko: "항공기 날개 내부", en: "Inside an aircraft wing", ja: "主翼の内部", zh: "机翼内部" } },

  // ── 의료기기 ──
  { cat: "medical", id: "mri", status: "soon", thumb: "wave",
    name: { ko: "MRI 스캐너", en: "MRI Scanner", ja: "MRIスキャナー", zh: "磁共振扫描仪" },
    desc: { ko: "자기공명영상 장치", en: "Magnetic resonance imaging", ja: "磁気共鳴画像", zh: "磁共振成像" } },
  { cat: "medical", id: "pacemaker", status: "soon", thumb: "wave",
    name: { ko: "페이스메이커", en: "Pacemaker", ja: "ペースメーカー", zh: "心脏起搏器" },
    desc: { ko: "인공 심장박동 조율기", en: "Cardiac rhythm device", ja: "心臓ペースメーカー", zh: "心律调节器" } },
  { cat: "medical", id: "insulin-pump", status: "soon", thumb: "wave",
    name: { ko: "인슐린 펌프", en: "Insulin Pump", ja: "インスリンポンプ", zh: "胰岛素泵" },
    desc: { ko: "자동 인슐린 주입", en: "Automated insulin delivery", ja: "自動インスリン注入", zh: "自动注射胰岛素" } },

  // ── 에너지 ──
  { cat: "energy", id: "lithium-ion", status: "soon", thumb: "cells",
    name: { ko: "리튬이온 배터리", en: "Lithium-Ion Cell", ja: "リチウムイオン電池", zh: "锂离子电池" },
    desc: { ko: "충전식 배터리 셀", en: "Rechargeable battery cell", ja: "充電式電池セル", zh: "可充电电芯" } },
  { cat: "energy", id: "solar-panel", status: "soon", thumb: "cells",
    name: { ko: "태양광 패널", en: "Solar Panel", ja: "太陽光パネル", zh: "太阳能板" },
    desc: { ko: "광전지 변환 구조", en: "Photovoltaic conversion", ja: "太陽光発電", zh: "光伏转换" } },
  { cat: "energy", id: "wind-turbine", status: "soon", thumb: "cells",
    name: { ko: "풍력 터빈", en: "Wind Turbine", ja: "風力タービン", zh: "风力涡轮机" },
    desc: { ko: "풍력 발전 장치", en: "Wind power generator", ja: "風力発電", zh: "风力发电" } },

  // ── 로보틱스 ──
  { cat: "robotics", id: "actuator", status: "soon", thumb: "joint",
    name: { ko: "로봇 액추에이터", en: "Robotic Actuator", ja: "ロボットアクチュエータ", zh: "机器人执行器" },
    desc: { ko: "로봇 관절 구동부", en: "Robot joint drive", ja: "関節駆動部", zh: "关节驱动" } },
  { cat: "robotics", id: "humanoid-hand", status: "soon", thumb: "joint",
    name: { ko: "휴머노이드 손", en: "Humanoid Hand", ja: "ヒューマノイドハンド", zh: "仿生机械手" },
    desc: { ko: "다관절 로봇 손", en: "Multi-joint robot hand", ja: "多関節ロボットハンド", zh: "多关节机械手" } },
  { cat: "robotics", id: "lidar", status: "soon", thumb: "joint",
    name: { ko: "라이다", en: "LiDAR Sensor", ja: "LiDARセンサー", zh: "激光雷达" },
    desc: { ko: "자율주행 거리 센서", en: "Self-driving range sensor", ja: "自動運転センサー", zh: "自动驾驶传感器" } },
];

/** 한 카테고리의 모델만 추린다. */
export function modelsOf(cat: CategoryId): ModelEntry[] {
  return MODELS.filter((m) => m.cat === cat);
}

/** cat/id 로 모델 하나 찾기. */
export function findModel(cat: string, id: string): ModelEntry | undefined {
  return MODELS.find((m) => m.cat === cat && m.id === id);
}
