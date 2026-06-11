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
      { label: { ko: "패키지", en: "Package size", ja: "パッケージ", zh: "封装尺寸" }, value: "≈ 70 × 70 mm" },
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
  { cat: "space", id: "rocket-engine", status: "live", thumb: "orbit",
    name: { ko: "로켓 엔진", en: "Rocket Engine", ja: "ロケットエンジン", zh: "火箭发动机" },
    desc: { ko: "액체 추진 엔진 구조", en: "Liquid engine anatomy", ja: "液体エンジンの構造", zh: "液体发动机结构" },
    overview: {
      ko: "액체 로켓 엔진은 연료와 산화제를 펌프로 고압으로 밀어 넣고, 인젝터로 안개처럼 뿜어 섞은 뒤 연소실에서 태웁니다. 그렇게 만든 고온·고압 가스를 노즐로 초음속까지 가속해 뒤로 내뿜고, 그 반작용으로 추력을 얻습니다(작용·반작용). 3,000 K가 넘는 가스로부터 벽을 지키기 위해 차가운 연료를 벽 속 채널로 먼저 돌리는 재생냉각을 쓰고, 엔진 전체를 짐벌로 기울여 비행 방향을 잡습니다. 이 모델은 가스 발생기 사이클의 LOX/케로신 엔진을 대표값으로 일반화해, 터보펌프·인젝터·연소실·노즐·짐벌을 분해해 봅니다.",
      en: "A liquid rocket engine pumps fuel and oxidizer in at high pressure, sprays them into a fine mist through the injector, and burns them in the combustion chamber. The resulting hot, high-pressure gas is accelerated to supersonic speed through the nozzle and thrown backward — the reaction pushes the engine forward (action–reaction). To protect the walls from gas above 3,000 K, cold fuel is first run through channels in the walls (regenerative cooling), and the whole engine tilts on a gimbal to steer the flight. This model generalizes a gas-generator LOX/kerosene engine into representative values and takes apart the turbopump, injector, chamber, nozzle and gimbal.",
      ja: "液体ロケットエンジンは、燃料と酸化剤をポンプで高圧で押し込み、インジェクタで霧状に噴いて混ぜ、燃焼室で燃やします。生じた高温・高圧ガスをノズルで超音速まで加速して後方へ噴出し、その反作用で推力を得ます（作用・反作用）。3,000 K を超えるガスから壁を守るため、冷たい燃料を壁内のチャンネルに先に流す再生冷却を用い、エンジン全体をジンバルで傾けて飛行方向を制御します。本モデルはガスジェネレータサイクルの LOX/ケロシンエンジンを代表値で一般化し、ターボポンプ・インジェクタ・燃焼室・ノズル・ジンバルを分解します。",
      zh: "液体火箭发动机用泵把燃料和氧化剂高压压入，经喷注器喷成细雾混合，再在燃烧室中燃烧。所产生的高温高压燃气经喷管加速到超音速并向后喷出，其反作用把发动机向前推（作用与反作用）。为保护壁体免受超过 3,000 K 燃气的侵蚀，先让冷燃料流过壁内通道（再生冷却），并通过万向架倾斜整台发动机来操控飞行方向。本模型将燃气发生器循环的 LOX/煤油发动机一般化为代表值，逐件分解涡轮泵、喷注器、燃烧室、喷管与万向架。",
    },
    specs: [
      { label: { ko: "추력 (해면)", en: "Thrust (SL)", ja: "推力 (海面)", zh: "推力 (海平面)" }, value: "≈ 845 kN" },
      { label: { ko: "비추력 Isp", en: "Specific impulse", ja: "比推力 Isp", zh: "比冲 Isp" }, value: "≈ 283 s SL / 312 s vac" },
      { label: { ko: "연소압", en: "Chamber pressure", ja: "燃焼室圧", zh: "室压" }, value: "≈ 100 bar" },
      { label: { ko: "추진제", en: "Propellant", ja: "推進剤", zh: "推进剂" }, value: "LOX / RP-1 · O/F ≈ 2.3" },
      { label: { ko: "사이클", en: "Cycle", ja: "サイクル", zh: "循环" }, value: "Gas-generator" },
      { label: { ko: "노즐 팽창비", en: "Nozzle ratio", ja: "ノズル膨張比", zh: "喷管膨胀比" }, value: "ε ≈ 16" },
      { label: { ko: "전체 높이", en: "Overall height", ja: "全高", zh: "总高" }, value: "≈ 3.1 m" },
    ] },
  { cat: "space", id: "eo-satellite", status: "live", thumb: "orbit",
    name: { ko: "지구관측 위성", en: "Earth-Observation Satellite", ja: "地球観測衛星", zh: "对地观测卫星" },
    desc: { ko: "저궤도 관측 위성 구조", en: "Low-orbit imaging satellite", ja: "低軌道観測衛星", zh: "低轨成像卫星" },
    overview: {
      ko: "지구관측 위성은 저궤도(LEO)를 돌며 지표를 촬영하는, 사실상 우주에 띄운 망원경입니다. 위성은 임무 장비(탑재체)를 뺀 공통 토대인 \"버스\"에 카메라를 얹어 만들어지는데, 버스는 태양전지판으로 전력을 얻고(+배터리로 음지 대비), 반작용 휠로 연료 없이 자세를 잡아 카메라를 목표에 고정하고, 안테나로 영상을 지상에 내려보내고, 작은 추력기로 궤도를 유지하며, 금박(MLI) 단열로 극한 온도차를 버팁니다. 같은 버스에 다른 장비를 얹으면 통신 위성이 됩니다.",
      en: "An Earth-observation satellite orbits low (LEO) and photographs the surface — essentially a telescope flown in space. It is built by mounting a camera on a \"bus,\" the common foundation minus the mission payload: the bus draws power from solar arrays (with batteries for eclipse), uses reaction wheels to hold attitude without fuel and lock the camera on target, downlinks images through an antenna, keeps its orbit with small thrusters, and survives extreme temperature swings under gold MLI insulation. Mount different equipment on the same bus and it becomes a communications satellite.",
      ja: "地球観測衛星は低軌道（LEO）を回り地表を撮影する、実質的に宇宙へ上げた望遠鏡です。任務機器（ペイロード）を除いた共通の土台「バス」にカメラを載せて作られます。バスは太陽電池で電力を得（バッテリーで食に備え）、リアクションホイールで燃料なしに姿勢を保ってカメラを目標に固定し、アンテナで画像を地上へ送り、小さなスラスタで軌道を維持し、金箔（MLI）断熱で極端な温度差に耐えます。同じバスに別の機器を載せれば通信衛星になります。",
      zh: "对地观测卫星在低轨（LEO）运行、拍摄地表，本质上是放到太空的望远镜。它由在“平台”上加装相机而成——平台是除任务载荷外的通用底座：用太阳能电池阵供电（配电池应对地影），用反作用轮不耗燃料地保持姿态并把相机锁定目标，经天线把影像下传地面，用小推力器维持轨道，并在金箔（MLI）隔热下承受剧烈温差。同一平台换装不同设备，就成了通信卫星。",
    },
    specs: [
      { label: { ko: "구조", en: "Structure", ja: "構造", zh: "结构" }, value: "3-axis bus + solar ×2" },
      { label: { ko: "본체", en: "Bus size", ja: "本体", zh: "本体" }, value: "≈ 2 × 2 × 3 m" },
      { label: { ko: "질량", en: "Mass", ja: "質量", zh: "质量" }, value: "≈ 2,000 kg" },
      { label: { ko: "전력", en: "Power", ja: "電力", zh: "电力" }, value: "solar ≈ 8 kW" },
      { label: { ko: "탑재체", en: "Payload", ja: "ペイロード", zh: "载荷" }, value: "camera · GSD ~ 0.5 m" },
      { label: { ko: "안테나", en: "Antenna", ja: "アンテナ", zh: "天线" }, value: "high-gain ∅ ≈ 2 m · X-band" },
      { label: { ko: "궤도", en: "Orbit", ja: "軌道", zh: "轨道" }, value: "LEO ≈ 600 km" },
    ] },
  { cat: "space", id: "comsat", status: "live", thumb: "orbit",
    name: { ko: "통신 위성", en: "Communications Satellite", ja: "通信衛星", zh: "通信卫星" },
    desc: { ko: "정지궤도 중계 위성 구조", en: "Geostationary relay satellite", ja: "静止軌道中継衛星", zh: "地球静止中继卫星" },
    overview: {
      ko: "통신 위성은 정지궤도(GEO, 35,786 km)에서 지상의 신호를 받아 증폭해 다시 내려보내는 중계국입니다. 지구관측 위성과 똑같은 버스(태양전지·배터리·반작용 휠·추진·MLI)를 쓰되, 탑재체가 카메라가 아니라 중계기(transponder)이고, 지구를 향한 큰 반사판 안테나로 넓은 지역에 신호를 뿌립니다. 정지궤도에서는 위성이 지표의 한 점 위에 멈춘 듯 보여, 안테나를 한 번 겨눠 두면 같은 지역을 계속 덮을 수 있습니다. 관측은 가까이(LEO), 통신은 한자리(GEO) — 임무가 궤도를 정합니다.",
      en: "A communications satellite is a relay station in geostationary orbit (GEO, 35,786 km) that receives ground signals, amplifies them, and sends them back down. It uses the very same bus as the observation satellite (solar, batteries, reaction wheels, propulsion, MLI), but its payload is a transponder rather than a camera, and large reflector antennas aimed at Earth beam signals over a wide region. From GEO the satellite appears to hover over one spot, so once aimed the antennas keep covering the same area. Observation stays close (LEO), communication stays put (GEO) — the mission sets the orbit.",
      ja: "通信衛星は静止軌道（GEO、35,786 km）から地上の信号を受けて増幅し、再び下ろす中継局です。地球観測衛星とまったく同じバス（太陽電池・バッテリー・リアクションホイール・推進・MLI）を使いますが、ペイロードはカメラでなく中継器（トランスポンダ）で、地球を向いた大きな反射鏡アンテナで広い地域へ信号を放ちます。静止軌道では衛星が地表の一点上に止まって見え、一度向ければ同じ地域を覆い続けられます。観測は近く（LEO）、通信は一か所（GEO）— 任務が軌道を決めます。",
      zh: "通信卫星是位于地球静止轨道（GEO，35,786 km）的中继站，接收地面信号、放大后再发回地面。它使用与观测卫星完全相同的平台（太阳能、电池、反作用轮、推进、MLI），但载荷是转发器而非相机，并用朝向地球的大型反射面天线向广阔区域发射信号。在 GEO 上，卫星看似悬停于地表一点之上，因此一次对准后就能持续覆盖同一区域。观测求近（LEO）、通信求定（GEO）——任务决定轨道。",
    },
    specs: [
      { label: { ko: "구조", en: "Structure", ja: "構造", zh: "结构" }, value: "3-axis bus + solar ×2" },
      { label: { ko: "본체", en: "Bus size", ja: "本体", zh: "本体" }, value: "≈ 2 × 2 × 3 m" },
      { label: { ko: "질량", en: "Mass", ja: "質量", zh: "质量" }, value: "≈ 2,000 kg" },
      { label: { ko: "전력", en: "Power", ja: "電力", zh: "电力" }, value: "solar ≈ 8 kW" },
      { label: { ko: "탑재체", en: "Payload", ja: "ペイロード", zh: "载荷" }, value: "transponder repeater" },
      { label: { ko: "안테나", en: "Antenna", ja: "アンテナ", zh: "天线" }, value: "reflector ∅ ≈ 2.5 m ×2 · Ku/Ka" },
      { label: { ko: "궤도", en: "Orbit", ja: "軌道", zh: "轨道" }, value: "GEO 35,786 km" },
    ] },
  { cat: "space", id: "reentry-capsule", status: "live", thumb: "orbit",
    name: { ko: "재진입 캡슐", en: "Reentry Capsule", ja: "再突入カプセル", zh: "返回舱" },
    desc: { ko: "유인 귀환 캡슐 구조", en: "Crewed return capsule", ja: "有人帰還カプセル", zh: "载人返回舱" },
    overview: {
      ko: "재진입 캡슐은 궤도에서 지구로 사람을 살려 데려오는 \"귀환\" 단계의 우주선입니다. 시속 28,000 km로 대기에 부딪히며 3,000°C에 가까운 불덩이를 만나지만, 무딘 몸체가 충격파를 앞으로 밀어 열의 대부분을 떼어내고, 바닥의 융제(ablative) 열 차폐막이 일부러 타며 남은 열을 가져갑니다. 감속은 추력이 아니라 대기가 맡고, 마지막 몇 km만 낙하산이 부드럽게 마무리합니다. 바깥의 열보호 껍질(차폐막·백셸) 안에 1기압을 유지하는 여압 동체와 좌석이 있어, 수 g의 충격으로부터 승무원을 지킵니다. 발사(로켓 엔진)·궤도(위성)에 이은 우주 여정의 마지막 조각입니다.",
      en: "A reentry capsule is the \"return\" stage that brings people home from orbit alive. It slams into the atmosphere at 28,000 km/h and meets a fireball near 3,000°C, but its blunt body pushes the shock wave ahead to shed most of the heat, while the ablative heat shield on the base deliberately chars away to carry off the rest. The braking is done by the atmosphere, not by thrust — only the final few kilometers are finished gently by parachutes. Inside the outer thermal shells (heat shield and backshell) sit a pressure vessel holding one atmosphere and couches that protect the crew from several g. It is the final piece of the journey after launch (rocket engine) and orbit (satellites).",
      ja: "再突入カプセルは、軌道から人を生きて連れ帰る「帰還」段階の宇宙船です。時速 28,000 km で大気に突入し 3,000°C 近い火球に遭いますが、鈍い形が衝撃波を前へ押して熱の大半を逃がし、底の融除（ablative）ヒートシールドがわざと焦げて残りの熱を持ち去ります。減速は推力でなく大気が担い、最後の数 km だけ落下傘が柔らかく仕上げます。外側の熱防護殻（シールド・バックシェル）の内に 1 気圧を保つ与圧構体と座席があり、数 g の衝撃から乗員を守ります。打ち上げ（ロケットエンジン）・軌道（衛星）に続く宇宙の旅の最後の一片です。",
      zh: "返回舱是把人从轨道安全带回地球的“返回”阶段航天器。它以时速 28,000 km 撞入大气，遭遇接近 3,000°C 的火球，但钝体把激波推到前方带走大部分热量，底部的烧蚀（ablative）热盾则故意焦化带走其余热量。减速由大气而非推力完成——只有最后几公里由降落伞柔和收尾。外层热防护壳（热盾与后壳）之内是维持 1 个大气压的增压舱体与座椅，保护乘员免受数 g 冲击。这是继发射（火箭发动机）、入轨（卫星）之后太空旅程的最后一块拼图。",
    },
    specs: [
      { label: { ko: "구조", en: "Structure", ja: "構造", zh: "结构" }, value: "blunt cone capsule" },
      { label: { ko: "베이스", en: "Base ∅", ja: "ベース径", zh: "底径" }, value: "≈ 5 m" },
      { label: { ko: "높이", en: "Height", ja: "全高", zh: "高度" }, value: "≈ 3.3 m" },
      { label: { ko: "질량", en: "Mass", ja: "質量", zh: "质量" }, value: "≈ 9 t" },
      { label: { ko: "승무원", en: "Crew", ja: "乗員", zh: "乘员" }, value: "3–4" },
      { label: { ko: "재진입 속도", en: "Entry speed", ja: "進入速度", zh: "再入速度" }, value: "≈ 7.8 km/s (LEO)" },
      { label: { ko: "열차폐", en: "Heat shield", ja: "熱防護", zh: "热防护" }, value: "ablative" },
      { label: { ko: "감속", en: "Descent", ja: "減速", zh: "减速" }, value: "atmosphere + parachutes" },
    ] },

  // ── 자동차 ──
  { cat: "automotive", id: "ev-battery", status: "live", thumb: "cells",
    name: { ko: "EV 배터리 팩", en: "EV Battery Pack", ja: "EVバッテリーパック", zh: "电动汽车电池组" },
    desc: { ko: "전기차 에너지 저장", en: "EV energy storage", ja: "EVのエネルギー貯蔵", zh: "电动车储能" },
    overview: {
      ko: "전기차 배터리는 셀 → 모듈 → 팩의 3단 계층으로 만듭니다. 가장 작은 단위인 셀(약 3.7 V)을 여러 개 묶어 모듈로, 모듈을 여러 개 모아 차 바닥 전체에 까는 팩으로 키웁니다. 셀을 직렬로 길게 이어 차를 움직일 수백 V를 만들고, 버스바가 그 큰 전류를 나릅니다. 냉각판이 셀 온도를 좁은 범위로 지키고, BMS가 모든 셀을 감시·보호하며, 알루미늄 하우징과 커버가 전체를 밀폐·보호합니다.",
      en: "An EV battery is built as a three-level hierarchy: cell → module → pack. The smallest unit, a cell (~3.7 V), is grouped into modules, and modules are gathered into a pack spread across the vehicle floor. Cells are wired in long series strings to reach the hundreds of volts that move a car, and busbars carry that large current. A cold plate holds the cells in a narrow temperature band, a BMS watches and protects every cell, and an aluminum enclosure and lid seal and protect the whole.",
      ja: "EV のバッテリーはセル→モジュール→パックの三層で作ります。最小単位のセル（約 3.7 V）を束ねてモジュールに、モジュールを集めて床全体に敷くパックにします。セルを直列に長くつないで車を動かす数百 V を作り、バスバーがその大電流を運びます。冷却プレートがセル温度を狭い範囲に保ち、BMS が全セルを監視・保護し、アルミのハウジングとカバーが全体を密閉・保護します。",
      zh: "电动车电池采用电芯→模组→电池包的三层层级。最小单元电芯（约 3.7 V）成组为模组，模组再汇成铺满车底的电池包。电芯串联成长串以获得驱动汽车的数百伏，汇流排承载大电流。冷却板把电芯维持在狭窄温度区间，BMS 监控并保护每颗电芯，铝制外壳与顶盖密封并保护整体。",
    },
    specs: [
      { label: { ko: "구조", en: "Structure", ja: "構造", zh: "结构" }, value: "cell → module → pack" },
      { label: { ko: "팩 크기", en: "Pack size", ja: "パックサイズ", zh: "电池包尺寸" }, value: "≈ 2.0 × 1.5 m" },
      { label: { ko: "셀 전압", en: "Cell voltage", ja: "セル電圧", zh: "电芯电压" }, value: "≈ 3.7 V (Li-ion)" },
      { label: { ko: "팩 전압", en: "Pack voltage", ja: "パック電圧", zh: "电池包电压" }, value: "≈ 400 / 800 V" },
      { label: { ko: "냉각", en: "Cooling", ja: "冷却", zh: "冷却" }, value: "liquid (glycol/water)" },
      { label: { ko: "제어", en: "Control", ja: "制御", zh: "控制" }, value: "BMS (V/T/I + balancing)" },
      { label: { ko: "하우징", en: "Enclosure", ja: "ハウジング", zh: "外壳" }, value: "sealed aluminum" },
    ] },
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
