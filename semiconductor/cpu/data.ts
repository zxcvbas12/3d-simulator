import type { PartInfoMap } from "@app/shared/r3f/model";

/**
 * CPU(칩렛 패키지) 부품 설명 (다국어).
 * 핵심 학습 포인트: 큰 다이를 여러 작은 칩렛으로 나누면 수율↑·비용↓·확장 유연.
 * I/O 다이가 칩렛과 메모리·외부를 잇는 허브, IHS·TIM이 열을 퍼뜨린다.
 */
export const cpuInfo: PartInfoMap = {
  ihs: {
    tag: { ko: "HEAT SPREADER", en: "HEAT SPREADER", ja: "HEAT SPREADER", zh: "HEAT SPREADER" },
    title: {
      ko: "통합 히트 스프레더 (IHS)",
      en: "Integrated Heat Spreader (IHS)",
      ja: "統合ヒートスプレッダ (IHS)",
      zh: "整合式散热盖 (IHS)",
    },
    lead: {
      ko: "칩 위를 덮는 금속 뚜껑이에요. 다이의 열을 받아 넓게 펴 줍니다.",
      en: "The metal lid over the chip — it takes heat from the dies and spreads it out.",
      ja: "チップを覆う金属の蓋。ダイの熱を受けて広く拡散します。",
      zh: "覆盖芯片的金属盖，把裸片的热量摊开散出。",
    },
    detail: {
      ko: "다이는 아주 작아서 열이 한 점에 몰립니다. IHS가 그 열을 받아 넓은 금속 면으로 퍼뜨리면, 그 위에 얹는 쿨러(히트싱크)가 훨씬 효율적으로 식힐 수 있어요. 다이를 충격·손상에서 보호하는 역할도 합니다.",
      en: "A die is tiny, so heat concentrates at a point. The IHS takes that heat and spreads it across a wide metal surface, so the cooler (heatsink) on top can remove it far more effectively. It also protects the dies from damage.",
      ja: "ダイは非常に小さく熱が一点に集中します。IHS がその熱を広い金属面に拡散することで、上に載せるクーラー（ヒートシンク）が効率よく冷やせます。ダイを衝撃や損傷から守る役割もあります。",
      zh: "裸片很小，热量集中在一点。IHS 把热量摊到大面积金属上，使其上的散热器能更高效地带走热量。它还保护裸片免受损伤。",
    },
    facts: {
      ko: ["역할 — 방열 + 보호", "열을 넓은 면으로 분산", "위에 쿨러가 붙는다"],
      en: ["Role — cooling + protection", "Spreads heat over a wide area", "The cooler mounts on top"],
      ja: ["役割 — 放熱 + 保護", "熱を広い面に分散", "上にクーラーが載る"],
      zh: ["作用 — 散热 + 保护", "将热量分散到大面积", "其上安装散热器"],
    },
  },
  tim: {
    tag: { ko: "THERMAL", en: "THERMAL", ja: "THERMAL", zh: "THERMAL" },
    title: {
      ko: "TIM · 열전달 물질",
      en: "TIM · Thermal Interface Material",
      ja: "TIM・熱伝導材",
      zh: "TIM · 导热材料",
    },
    lead: {
      ko: "다이와 뚜껑(IHS) 사이를 메우는 얇은 열전달 층이에요.",
      en: "A thin heat-conducting layer filling the gap between the die and the lid (IHS).",
      ja: "ダイと蓋（IHS）の間を埋める薄い熱伝導層です。",
      zh: "填充裸片与盖（IHS）之间缝隙的薄导热层。",
    },
    detail: {
      ko: "아무리 평평해 보여도 금속 표면엔 미세한 틈이 있어 공기가 끼면 열이 잘 안 통합니다. TIM(써멀 그리스나 솔더)이 그 틈을 메워 다이의 열을 IHS로 매끄럽게 넘겨줘요. 고급 제품은 액체금속이나 솔더 TIM을 씁니다.",
      en: "Even flat-looking metal surfaces have microscopic gaps; trapped air blocks heat. TIM (thermal grease or solder) fills those gaps so heat passes smoothly from the die to the IHS. High-end parts use liquid-metal or soldered TIM.",
      ja: "平らに見える金属面にも微細な隙間があり、空気が入ると熱が伝わりません。TIM（サーマルグリスやはんだ）がその隙間を埋め、ダイの熱を IHS へ滑らかに渡します。高級品は液体金属やはんだ TIM を使います。",
      zh: "看似平整的金属面也有微小缝隙，夹入空气会阻碍传热。TIM（导热硅脂或焊料）填满缝隙，让热量从裸片顺畅传到 IHS。高端产品采用液态金属或钎焊 TIM。",
    },
    facts: {
      ko: ["역할 — 다이 ↔ IHS 열 연결", "미세 틈의 공기를 밀어냄", "그리스 / 솔더 / 액체금속"],
      en: ["Role — die ↔ IHS heat link", "Pushes out air in micro-gaps", "Grease / solder / liquid metal"],
      ja: ["役割 — ダイ ↔ IHS の熱接続", "微細な隙間の空気を排除", "グリス / はんだ / 液体金属"],
      zh: ["作用 — 裸片 ↔ IHS 导热", "排出微缝中的空气", "硅脂 / 焊料 / 液态金属"],
    },
  },
  ccd: {
    tag: { ko: "COMPUTE CHIPLET", en: "COMPUTE CHIPLET", ja: "COMPUTE CHIPLET", zh: "COMPUTE CHIPLET" },
    title: {
      ko: "컴퓨트 칩렛 (CCD)",
      en: "Compute Chiplet (CCD)",
      ja: "コンピュートチップレット (CCD)",
      zh: "计算芯粒 (CCD)",
    },
    lead: {
      ko: "CPU 코어가 들어있는 작은 다이예요. 한 패키지에 여러 개를 붙입니다.",
      en: "A small die holding the CPU cores — several are placed in one package.",
      ja: "CPU コアが入った小さなダイ。1 つのパッケージに複数載せます。",
      zh: "装有 CPU 核心的小裸片，一个封装中放置多颗。",
    },
    detail: {
      ko: "예전엔 모든 코어를 하나의 큰 다이에 담았지만, 다이가 클수록 불량 확률이 커져 수율이 떨어집니다. 코어를 작은 칩렛으로 나누면 불량 다이만 버리면 되니 수율이 오르고 비용이 내려가요. 코어 수를 늘리려면 칩렛을 더 붙이면 됩니다.",
      en: "Older CPUs put all cores on one big die, but bigger dies have a higher chance of defects, lowering yield. Splitting cores into small chiplets means only a faulty chiplet is discarded — raising yield and cutting cost. To add cores, you just add more chiplets.",
      ja: "以前は全コアを一つの大きなダイに載せましたが、ダイが大きいほど不良率が上がり歩留まりが下がります。コアを小さなチップレットに分ければ不良のものだけ捨てればよく、歩留まりが上がりコストが下がります。コアを増やすにはチップレットを足すだけです。",
      zh: "过去把所有核心放在一颗大裸片上，但裸片越大缺陷概率越高、良率越低。把核心拆成小芯粒，只需丢弃有缺陷的那颗，从而提升良率、降低成本。要加核心，只需多放几颗芯粒。",
    },
    facts: {
      ko: ["역할 — CPU 코어 묶음", "작게 나눠 수율↑·비용↓", "더 붙이면 코어 수↑"],
      en: ["Role — a cluster of CPU cores", "Smaller dies → higher yield, lower cost", "Add more for more cores"],
      ja: ["役割 — CPU コアの集まり", "小さく分けて歩留まり↑・コスト↓", "足せばコア数↑"],
      zh: ["作用 — CPU 核心集群", "拆小 → 良率↑、成本↓", "多放即增核心"],
    },
  },
  iod: {
    tag: { ko: "I/O DIE", en: "I/O DIE", ja: "I/O DIE", zh: "I/O DIE" },
    title: { ko: "I/O 다이 (IOD)", en: "I/O Die (IOD)", ja: "I/O ダイ (IOD)", zh: "I/O 裸片 (IOD)" },
    lead: {
      ko: "칩렛들과 메모리·외부 장치를 잇는 “허브” 다이예요.",
      en: "The “hub” die that links the chiplets to memory and the outside world.",
      ja: "チップレットとメモリ・外部機器をつなぐ「ハブ」のダイです。",
      zh: "把各芯粒与内存、外部设备连接起来的“枢纽”裸片。",
    },
    detail: {
      ko: "메모리 컨트롤러, PCIe 같은 입출력, 그리고 칩렛 간 통신을 담당합니다. 컴퓨트 칩렛은 계산에 집중하고, 바깥과 주고받는 일은 I/O 다이가 모아서 처리해요. 그래서 칩렛이 몇 개든 한 곳을 통해 메모리·외부와 연결됩니다.",
      en: "It handles the memory controller, I/O such as PCIe, and communication between chiplets. The compute chiplets focus on calculation while the I/O die gathers and manages all traffic with the outside — so any number of chiplets connect to memory and peripherals through one place.",
      ja: "メモリコントローラ、PCIe などの入出力、そしてチップレット間の通信を担います。コンピュートチップレットは計算に専念し、外部とのやり取りは I/O ダイがまとめて処理します。だからチップレットが何個でも、一箇所を通してメモリ・外部とつながります。",
      zh: "负责内存控制器、PCIe 等输入输出，以及芯粒之间的通信。计算芯粒专注运算，而与外界的往来由 I/O 裸片统一处理——因此无论多少芯粒，都通过一处连接内存与外设。",
    },
    facts: {
      ko: ["역할 — 메모리·I/O·칩렛 연결 허브", "컴퓨트 칩렛은 계산에 집중", "외부 통신을 한곳에 모음"],
      en: ["Role — memory/I/O/chiplet hub", "Compute chiplets focus on math", "Funnels all external traffic"],
      ja: ["役割 — メモリ/I/O/チップレットのハブ", "演算はコンピュートチップレットに集約", "外部通信を一箇所に集める"],
      zh: ["作用 — 内存/IO/芯粒枢纽", "运算交给计算芯粒", "汇集所有对外通信"],
    },
  },
  substrate: {
    tag: { ko: "SUBSTRATE", en: "SUBSTRATE", ja: "SUBSTRATE", zh: "SUBSTRATE" },
    title: {
      ko: "패키지 기판 (Substrate)",
      en: "Package Substrate",
      ja: "パッケージ基板",
      zh: "封装基板",
    },
    lead: {
      ko: "칩렛들이 올라타는 바닥판이자, 메인보드와 잇는 다리예요.",
      en: "The base the chiplets sit on, and the bridge to the mainboard.",
      ja: "チップレットが載る土台であり、メインボードへの橋渡しです。",
      zh: "芯粒所在的底板，也是连接主板的桥梁。",
    },
    detail: {
      ko: "여러 층의 미세 배선이 들어 있어, 위에 놓인 칩렛들과 아래 랜드(접점)를 잇습니다. 칩렛끼리, 그리고 칩렛과 외부를 잇는 모든 신호가 이 기판을 지나갑니다.",
      en: "It contains many layers of fine wiring connecting the chiplets on top to the lands (contacts) underneath. Every signal between chiplets, and between chiplets and the outside, passes through this substrate.",
      ja: "多層の微細配線を備え、上のチップレットと下のランド（接点）をつなぎます。チップレット同士、そしてチップレットと外部のあらゆる信号がこの基板を通ります。",
      zh: "内含多层微细布线，连接上方芯粒与下方触点（land）。芯粒之间、以及芯粒与外部的所有信号都经过这块基板。",
    },
    facts: {
      ko: ["역할 — 칩렛 받침 + 외부 연결", "다층 미세 배선", "아래는 랜드(접점)"],
      en: ["Role — chiplet base + external link", "Many-layer fine wiring", "Lands (contacts) underneath"],
      ja: ["役割 — チップレットの土台 + 外部接続", "多層の微細配線", "下はランド（接点）"],
      zh: ["作用 — 芯粒底座 + 对外连接", "多层微细布线", "下方为触点（land）"],
    },
  },
  lga: {
    tag: { ko: "PACKAGE I/O", en: "PACKAGE I/O", ja: "PACKAGE I/O", zh: "PACKAGE I/O" },
    title: {
      ko: "LGA 랜드 (접점)",
      en: "LGA Lands (Contacts)",
      ja: "LGA ランド（接点）",
      zh: "LGA 触点",
    },
    lead: {
      ko: "패키지 바닥에 격자로 깔린 금색 접점이에요. 소켓의 핀과 맞닿습니다.",
      en: "Gold contacts in a grid on the bottom of the package — they meet the pins in the socket.",
      ja: "パッケージ底に格子状に並ぶ金色の接点。ソケットのピンと触れます。",
      zh: "封装底部网格排布的金色触点，与插槽的针脚接触。",
    },
    detail: {
      ko: "LGA(Land Grid Array)는 패키지에 평평한 금색 랜드만 두고, 뾰족한 핀은 메인보드 소켓 쪽에 둔 방식입니다. 바닥 면 전체를 격자로 써서 수천 개의 전원·신호 연결을 담아요. 핀을 패키지에 둔 방식은 PGA, 솔더 볼을 쓰면 BGA라고 부릅니다.",
      en: "LGA (Land Grid Array) puts only flat gold lands on the package, with the springy pins on the mainboard socket instead. Using the whole bottom as a grid packs thousands of power and signal connections. Putting pins on the package is PGA; using solder balls is BGA.",
      ja: "LGA（Land Grid Array）はパッケージ側に平らな金色のランドだけを置き、尖ったピンはメインボードのソケット側に置く方式です。底面全体を格子に使い、数千の電源・信号接続を収めます。ピンをパッケージに置くと PGA、はんだボールなら BGA と呼びます。",
      zh: "LGA（触点阵列）只在封装上放平的金色触点，而把弹性针脚放在主板插槽一侧。以整个底面作网格，容纳数千个电源与信号连接。把针脚放在封装上称为 PGA，用焊球则为 BGA。",
    },
    facts: {
      ko: ["역할 — 패키지 ↔ 소켓 연결", "평평한 랜드, 핀은 소켓에", "PGA·BGA와 대비되는 방식"],
      en: ["Role — package ↔ socket link", "Flat lands; pins live in the socket", "Contrast with PGA / BGA"],
      ja: ["役割 — パッケージ ↔ ソケット接続", "平らなランド、ピンはソケット側", "PGA・BGA と対比される方式"],
      zh: ["作用 — 封装 ↔ 插槽连接", "平触点；针脚在插槽侧", "与 PGA / BGA 相对"],
    },
  },
};
