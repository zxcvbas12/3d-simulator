import type { PartInfoMap } from "@app/shared/r3f/model";

/**
 * GPU(2.5D 패키지) 부품 설명 (다국어).
 * 핵심 학습 포인트: HBM을 GPU 바로 옆에 두면 데이터 거리가 짧아져 대역폭↑·전력↓.
 * 인터포저가 두 칩을 수천 배선으로 잇는 2.5D — 큰 연산 다이 + 옆 메모리 = AI 가속기의 기본 형태.
 */
export const gpuInfo: PartInfoMap = {
  gpudie: {
    tag: { ko: "COMPUTE DIE", en: "COMPUTE DIE", ja: "COMPUTE DIE", zh: "COMPUTE DIE" },
    spec: "≈ 800 mm² (reticle limit) · 4 nm",
    sources: [{ label: "Wikipedia · Graphics processing unit", url: "https://en.wikipedia.org/wiki/Graphics_processing_unit" }],
    title: {
      ko: "GPU 연산 다이 (Compute Die)",
      en: "GPU Compute Die",
      ja: "GPU 演算ダイ",
      zh: "GPU 计算裸片",
    },
    lead: {
      ko: "패키지 한가운데의 가장 큰 칩이에요. 수만 개의 코어가 동시에 계산합니다.",
      en: "The biggest chip at the center of the package — tens of thousands of cores computing at once.",
      ja: "パッケージ中央の最も大きなチップ。数万のコアが同時に計算します。",
      zh: "封装正中央最大的芯片，数万个核心同时运算。",
    },
    detail: {
      ko: "CPU가 빠른 코어 몇 개로 일을 처리한다면, GPU는 단순한 코어 수만 개를 깔아 같은 계산을 한꺼번에 합니다. AI 학습·그래픽처럼 \"같은 일을 엄청나게 많이\" 해야 하는 작업에 강해요. 다이는 노광 장비가 한 번에 찍을 수 있는 최대 크기(레티클 한계)까지 키우고, 그래도 모자란 메모리 대역폭은 바로 옆 HBM이 채웁니다.",
      en: "Where a CPU works with a few fast cores, a GPU lays down tens of thousands of simple cores and runs the same computation on all of them at once — ideal for AI training and graphics, where the same work repeats massively. The die is grown to the largest size lithography can print in one shot (the reticle limit), and the memory bandwidth it still craves is supplied by the HBM right beside it.",
      ja: "CPU が少数の高速コアで処理するのに対し、GPU は単純なコアを数万個並べ、同じ計算を一斉に行います。AI 学習やグラフィックスのように「同じ処理を大量に」行う作業に強い。ダイは露光装置が一度に焼ける最大サイズ（レチクル限界）まで大きくし、それでも足りないメモリ帯域はすぐ隣の HBM が補います。",
      zh: "CPU 用少数高速核心处理任务，GPU 则铺开数万个简单核心同时做同样的计算——非常适合 AI 训练、图形渲染这类\"同样的活儿要干海量次\"的工作。裸片做到光刻机一次能曝光的最大尺寸（光罩极限），仍不够的内存带宽由紧邻的 HBM 补足。",
    },
    facts: {
      ko: ["역할 — 대규모 병렬 연산", "노광 한계(레티클)까지 키운 다이", "부족한 대역폭은 옆 HBM이 공급"],
      en: ["Role — massive parallel compute", "Die grown to the reticle limit", "HBM next door feeds its bandwidth"],
      ja: ["役割 — 大規模並列演算", "レチクル限界まで大きくしたダイ", "帯域は隣の HBM が供給"],
      zh: ["作用 — 大规模并行运算", "裸片做到光罩极限", "带宽由旁边的 HBM 供给"],
    },
  },
  hbm: {
    tag: { ko: "HBM STACK", en: "HBM STACK", ja: "HBM STACK", zh: "HBM STACK" },
    spec: "8-Hi DRAM stack · ≈ 1 TB/s / stack",
    sources: [
      { label: "Wikipedia · High Bandwidth Memory", url: "https://en.wikipedia.org/wiki/High_Bandwidth_Memory" },
      { label: "JEDEC · JESD235 (HBM standard)", url: "https://www.jedec.org/standards-documents/docs/jesd235a" },
    ],
    title: {
      ko: "HBM 스택 (적층 메모리)",
      en: "HBM Stack (Stacked Memory)",
      ja: "HBM スタック（積層メモリ）",
      zh: "HBM 堆栈（堆叠内存）",
    },
    lead: {
      ko: "GPU 다이 양옆에 붙은 적층 메모리 타워예요. DRAM을 수직으로 쌓았습니다.",
      en: "The stacked-memory towers flanking the GPU die — DRAM dies piled vertically.",
      ja: "GPU ダイの両脇に並ぶ積層メモリのタワー。DRAM を垂直に積んでいます。",
      zh: "GPU 裸片两侧的堆叠内存塔，DRAM 垂直堆叠而成。",
    },
    detail: {
      ko: "메모리가 멀리 있으면 데이터가 오가는 데 시간과 전력이 듭니다. HBM은 DRAM을 쌓아 부피를 줄이고, GPU 바로 옆 몇 mm 거리에 둬서 데이터 통로를 극단적으로 넓고 짧게 만들어요. 그래서 보드 위 일반 메모리(GDDR)보다 대역폭은 훨씬 크고 전력은 적게 듭니다. 스택 내부 구조는 HBM 모델에서 층별로 분해해 볼 수 있어요.",
      en: "When memory sits far away, moving data costs time and power. HBM stacks DRAM to shrink its footprint and parks it just millimeters from the GPU, making the data path extremely wide and short — far more bandwidth at lower power than regular on-board memory (GDDR). You can explode a stack layer by layer in the HBM model.",
      ja: "メモリが遠いと、データの往復に時間と電力がかかります。HBM は DRAM を積んで面積を抑え、GPU のすぐ隣・数 mm の距離に置くことで、データ経路を極端に広く短くします。基板上の通常メモリ（GDDR）より帯域は大きく、電力は少ない。スタック内部は HBM モデルで層ごとに分解して見られます。",
      zh: "内存离得远，数据往返就要花时间和电力。HBM 把 DRAM 堆叠起来缩小占地，并放在距 GPU 仅几毫米处，让数据通道既宽又短——比板载普通内存（GDDR）带宽大得多、功耗更低。堆栈内部结构可在 HBM 模型中逐层分解查看。",
    },
    facts: {
      ko: ["역할 — GPU 전용 초광대역 메모리", "가까이 두면 대역폭↑ · 전력↓", "내부 구조는 HBM 모델 참고"],
      en: ["Role — ultra-wide memory for the GPU", "Closer → more bandwidth, less power", "See the HBM model for the inside"],
      ja: ["役割 — GPU 専用の超広帯域メモリ", "近いほど帯域↑・電力↓", "内部は HBM モデルを参照"],
      zh: ["作用 — GPU 专属超宽带内存", "靠得近 → 带宽↑、功耗↓", "内部结构见 HBM 模型"],
    },
  },
  interposer: {
    tag: { ko: "2.5D BRIDGE", en: "2.5D BRIDGE", ja: "2.5D BRIDGE", zh: "2.5D BRIDGE" },
    spec: "Si · ≈ 2,500 mm² · t ≈ 100 μm",
    sources: [
      { label: "Wikipedia · Interposer", url: "https://en.wikipedia.org/wiki/Interposer" },
      { label: "TSMC · CoWoS (2.5D packaging)", url: "https://3dfabric.tsmc.com/english/dedicatedFoundry/technology/cowos.htm" },
    ],
    title: {
      ko: "실리콘 인터포저 (Interposer)",
      en: "Silicon Interposer",
      ja: "シリコンインターポーザ",
      zh: "硅转接板",
    },
    lead: {
      ko: "GPU와 HBM이 함께 올라타는 얇은 실리콘 판이에요. 두 칩을 수천 가닥 배선으로 잇습니다.",
      en: "The thin silicon slab that the GPU and HBM both sit on — linking them with thousands of wires.",
      ja: "GPU と HBM が一緒に載る薄いシリコン板。両者を数千本の配線でつなぎます。",
      zh: "GPU 与 HBM 共同安放的薄硅板，用数千条布线把两者连通。",
    },
    detail: {
      ko: "HBM의 데이터 핀은 스택당 1,000개가 넘어, 일반 패키지 기판의 굵은 배선으로는 다 이을 수 없습니다. 인터포저는 반도체 공정으로 만든 미세 배선층이라 칩 사이를 머리카락보다 가는 선 수천 가닥으로 연결해요. 칩을 위로 쌓는 3D와 구분해, 이렇게 옆에 놓고 실리콘으로 잇는 방식을 2.5D 패키징이라 부릅니다.",
      en: "Each HBM stack has over 1,000 data pins — too many for the coarse wiring of an ordinary package substrate. An interposer is a wiring layer made with chip-fabrication processes, so it can join the chips with thousands of traces finer than a hair. Placing chips side by side and linking them through silicon like this is called 2.5D packaging, as opposed to stacking them (3D).",
      ja: "HBM のデータピンはスタックあたり 1,000 本を超え、通常のパッケージ基板の太い配線では結びきれません。インターポーザは半導体プロセスで作った微細配線層で、髪より細い数千本の線でチップ間をつなぎます。チップを上に積む 3D と区別して、横に並べてシリコンで結ぶこの方式を 2.5D パッケージングと呼びます。",
      zh: "每个 HBM 堆栈的数据引脚超过 1,000 个，普通封装基板的粗布线根本接不完。转接板是用半导体工艺制造的布线层，能用数千条比头发还细的线连接芯片。与向上堆叠的 3D 不同，这种把芯片并排放、用硅连通的方式称为 2.5D 封装。",
    },
    facts: {
      ko: ["역할 — GPU ↔ HBM 수천 배선", "반도체 공정급 미세 배선", "옆에 놓고 잇는 방식 = 2.5D"],
      en: ["Role — 1,000s of GPU ↔ HBM wires", "Chip-grade fine wiring", "Side-by-side linking = 2.5D"],
      ja: ["役割 — GPU ↔ HBM の数千配線", "半導体プロセス級の微細配線", "横並びで結ぶ = 2.5D"],
      zh: ["作用 — GPU ↔ HBM 数千布线", "芯片级微细布线", "并排互连 = 2.5D"],
    },
  },
  substrate: {
    tag: { ko: "SUBSTRATE", en: "SUBSTRATE", ja: "SUBSTRATE", zh: "SUBSTRATE" },
    spec: "≈ 70 × 70 mm · multilayer organic",
    sources: [{ label: "Wikipedia · Integrated circuit packaging", url: "https://en.wikipedia.org/wiki/Integrated_circuit_packaging" }],
    title: {
      ko: "패키지 기판 (Substrate)",
      en: "Package Substrate",
      ja: "パッケージ基板",
      zh: "封装基板",
    },
    lead: {
      ko: "패키지 전체를 받치는 바닥판이자, 보드와 잇는 다리예요.",
      en: "The base plate carrying the whole package, and the bridge to the board.",
      ja: "パッケージ全体を支える土台であり、ボードへの橋渡しです。",
      zh: "承载整个封装的底板，也是连接电路板的桥梁。",
    },
    detail: {
      ko: "인터포저의 초미세 배선을 보드가 다룰 수 있는 굵기의 배선으로 점점 넓혀 주는 \"변환 계층\"입니다. 여러 층의 배선으로 신호를 풀어내고, 수백 와트를 쓰는 GPU에 전원을 공급하는 통로이기도 해요. 아랫면의 솔더 볼(BGA)로 가속기 보드에 붙습니다.",
      en: "It is the \"translation layer\" that fans the interposer's ultra-fine wiring out to traces coarse enough for a circuit board to handle. Its many wiring layers route the signals and also deliver power to a GPU that draws hundreds of watts. The solder balls (BGA) underneath attach it to the accelerator board.",
      ja: "インターポーザの超微細配線を、ボードが扱える太さの配線へ段階的に広げる「変換層」です。多層配線で信号を展開し、数百ワットを使う GPU へ電力を供給する通路でもあります。下面のはんだボール（BGA）でアクセラレータボードに付きます。",
      zh: "它是把转接板的超细布线逐级放大到电路板能处理的粗细的\"转换层\"。多层布线既疏导信号，也为功耗数百瓦的 GPU 输送电力。底面的焊球（BGA）将其固定在加速卡上。",
    },
    facts: {
      ko: ["역할 — 미세 배선 ↔ 보드 변환", "다층 배선 + 전원 공급 통로", "아래는 BGA 솔더 볼"],
      en: ["Role — fine wiring ↔ board fan-out", "Many layers + power delivery", "BGA balls underneath"],
      ja: ["役割 — 微細配線 ↔ ボード変換", "多層配線 + 電力供給", "下は BGA ボール"],
      zh: ["作用 — 细布线 ↔ 板级转换", "多层布线 + 供电通道", "下方为 BGA 焊球"],
    },
  },
  bga: {
    tag: { ko: "PACKAGE I/O", en: "PACKAGE I/O", ja: "PACKAGE I/O", zh: "PACKAGE I/O" },
    spec: "1,000+ balls · ∅ ≈ 0.5 mm",
    sources: [{ label: "Wikipedia · Ball grid array", url: "https://en.wikipedia.org/wiki/Ball_grid_array" }],
    title: {
      ko: "BGA 솔더 볼",
      en: "BGA Solder Balls",
      ja: "BGA はんだボール",
      zh: "BGA 焊球",
    },
    lead: {
      ko: "기판 바닥에 격자로 깔린 금속 구슬이에요. 녹여 붙여 보드와 연결합니다.",
      en: "The grid of metal balls under the substrate — melted to bond the package to the board.",
      ja: "基板の底に格子状に並ぶ金属球。溶かして付け、ボードと接続します。",
      zh: "基板底部网格排布的金属球，熔化后将封装焊接到电路板上。",
    },
    detail: {
      ko: "BGA(Ball Grid Array)는 패키지 바닥 전체를 격자로 써서 수천 개의 전원·신호 연결을 담는 방식입니다. 가장자리 핀만 쓰는 방식보다 훨씬 많은 연결을 좁은 면적에 넣을 수 있어요. 리플로우 공정에서 한 번에 녹아 보드에 영구 접합되므로, CPU의 LGA 소켓과 달리 떼었다 붙일 수 없습니다.",
      en: "BGA (Ball Grid Array) uses the entire bottom of the package as a grid, packing thousands of power and signal connections — far more than edge pins could fit. The balls melt together in a reflow oven and bond permanently to the board, so unlike a CPU's LGA socket, the package cannot be removed and reseated.",
      ja: "BGA（Ball Grid Array）はパッケージ底面全体を格子として使い、数千の電源・信号接続を収める方式です。縁のピンだけ使う方式よりはるかに多くの接続を狭い面積に詰められます。リフロー工程で一度に溶けてボードに恒久接合されるため、CPU の LGA ソケットと違い、外して付け直すことはできません。",
      zh: "BGA（球栅阵列）把封装整个底面当作网格，容纳数千个电源与信号连接，远多于只用边缘引脚的方式。焊球在回流焊中一次熔化并永久焊到板上，因此不像 CPU 的 LGA 插槽那样可以拆装。",
    },
    facts: {
      ko: ["역할 — 패키지 ↔ 보드 연결", "바닥 전체를 격자로 활용", "녹여 붙이는 영구 접합"],
      en: ["Role — package ↔ board link", "Uses the whole bottom as a grid", "Permanent reflow bond"],
      ja: ["役割 — パッケージ ↔ ボード接続", "底面全体を格子に活用", "溶かして付ける恒久接合"],
      zh: ["作用 — 封装 ↔ 电路板连接", "整个底面作网格", "回流焊永久接合"],
    },
  },
  lid: {
    tag: { ko: "HEAT SPREADER", en: "HEAT SPREADER", ja: "HEAT SPREADER", zh: "HEAT SPREADER" },
    spec: "Ni-plated Cu lid",
    sources: [{ label: "Wikipedia · Integrated heat spreader", url: "https://en.wikipedia.org/wiki/Integrated_heat_spreader" }],
    title: {
      ko: "히트 스프레더 리드 (Lid)",
      en: "Heat Spreader Lid",
      ja: "ヒートスプレッダリッド",
      zh: "散热盖 (Lid)",
    },
    lead: {
      ko: "패키지 전체를 덮는 금속 뚜껑이에요. GPU와 HBM의 열을 한 면으로 모아 퍼뜨립니다.",
      en: "The metal lid covering the whole package — gathering heat from the GPU and HBM into one surface.",
      ja: "パッケージ全体を覆う金属の蓋。GPU と HBM の熱を一つの面に集めて広げます。",
      zh: "覆盖整个封装的金属盖，把 GPU 和 HBM 的热量汇集到一个面上散开。",
    },
    detail: {
      ko: "GPU 다이와 HBM 스택은 높이가 미세하게 다르고, 각자 수백 와트급 열을 냅니다. 리드는 그 위를 평평한 금속 한 면으로 덮어 열을 받아 퍼뜨리고, 그 위에 거대한 히트싱크나 수랭 콜드플레이트가 올라탑니다. 얇은 다이와 메모리 스택을 충격에서 보호하는 역할도 해요.",
      en: "The GPU die and HBM stacks differ slightly in height, and together they emit hundreds of watts. The lid covers them with one flat metal surface that absorbs and spreads the heat, with a large heatsink or liquid-cooling cold plate mounting on top. It also shields the thin dies and memory stacks from damage.",
      ja: "GPU ダイと HBM スタックは高さが微妙に異なり、合わせて数百ワット級の熱を出します。リッドはその上を平らな金属面で覆って熱を受け広げ、その上に大型ヒートシンクや水冷コールドプレートが載ります。薄いダイとメモリスタックを衝撃から守る役割もあります。",
      zh: "GPU 裸片与 HBM 堆栈高度略有差异，且共同散发数百瓦热量。散热盖用一个平整金属面覆盖其上，吸收并摊开热量，再在上面安装大型散热器或水冷冷板。它还保护薄裸片和内存堆栈免受损伤。",
    },
    facts: {
      ko: ["역할 — 방열 + 보호", "GPU·HBM 열을 한 면으로", "위에 히트싱크/수랭이 붙는다"],
      en: ["Role — cooling + protection", "One surface for GPU + HBM heat", "Heatsink / cold plate mounts on top"],
      ja: ["役割 — 放熱 + 保護", "GPU・HBM の熱を一面に", "上にヒートシンク/水冷が載る"],
      zh: ["作用 — 散热 + 保护", "GPU·HBM 热量汇于一面", "其上安装散热器/水冷"],
    },
  },
};
