import type { PartInfoMap } from "@app/shared/r3f/model";

/**
 * HBM 부품 설명 (다국어). hbm-3d-space.html의 한글 설명을 옮기고 en/ja/zh를 추가했다.
 * 패널 형식: 태그 · 제목 · 한 줄 요약(lead) · 자세히(detail) · 핵심 항목(facts).
 */
export const hbmInfo: PartInfoMap = {
  substrate: {
    tag: { ko: "SUBSTRATE", en: "SUBSTRATE", ja: "SUBSTRATE", zh: "SUBSTRATE" },
    title: {
      ko: "패키지 기판 (Package Substrate)",
      en: "Package Substrate",
      ja: "パッケージ基板",
      zh: "封装基板",
    },
    lead: {
      ko: "칩 전체를 받치고 바깥 세상과 이어 주는 바닥판이에요.",
      en: "The base plate that carries the whole chip and links it to the outside world.",
      ja: "チップ全体を支え、外の世界とつなぐ土台の板です。",
      zh: "承载整颗芯片并将其连接到外部世界的底板。",
    },
    detail: {
      ko: "그 위로 인터포저와 칩들이 차례로 올라가고, 아래로는 BGA 솔더 볼을 통해 메인보드(PCB)에 연결됩니다. 전원을 공급하고 수많은 신호가 안팎으로 드나드는 통로 역할을 해요.",
      en: "The interposer and chips stack on top of it, while underneath it connects to the mainboard (PCB) through BGA solder balls. It delivers power and is the gateway for countless signals going in and out.",
      ja: "上にインターポーザとチップが順に載り、下は BGA はんだボールでメインボード（PCB）に接続します。電力を供給し、無数の信号が出入りする通り道になります。",
      zh: "其上依次叠放转接板与芯片，下方通过 BGA 焊球连接主板（PCB）。它供电，并是无数信号进出的通道。",
    },
    facts: {
      ko: ["역할 — 지지 + 외부 연결", "위: 인터포저·칩 / 아래: 솔더 볼", "전원과 신호의 관문"],
      en: ["Role — support + external link", "Top: interposer & chips / bottom: balls", "Gateway for power and signals"],
      ja: ["役割 — 支持 + 外部接続", "上: インターポーザ・チップ / 下: ボール", "電源と信号の関門"],
      zh: ["作用 — 支撑 + 对外连接", "上: 转接板·芯片 / 下: 焊球", "电源与信号的关口"],
    },
  },
  interposer: {
    tag: { ko: "INTERPOSER", en: "INTERPOSER", ja: "INTERPOSER", zh: "INTERPOSER" },
    title: {
      ko: "실리콘 인터포저 (Interposer)",
      en: "Silicon Interposer",
      ja: "シリコンインターポーザ",
      zh: "硅转接板",
    },
    lead: {
      ko: "HBM과 GPU를 한 패키지 안에서 아주 가깝게 이어 주는 얇은 실리콘 판이에요.",
      en: "A thin silicon plate that links HBM and the GPU very closely inside one package.",
      ja: "HBM と GPU を一つのパッケージ内で非常に近く結ぶ薄いシリコン板です。",
      zh: "在同一封装内将 HBM 与 GPU 极近相连的薄硅板。",
    },
    detail: {
      ko: "표면에 머리카락보다 훨씬 가는 배선이 수천 개 이상 깔려 있어, 두 칩 사이에 폭넓은 데이터 고속도로를 만듭니다. 이렇게 칩들을 옆으로 나란히 붙이는 방식을 2.5D 패키징이라고 불러요.",
      en: "Its surface carries thousands of wires far finer than a hair, forming a wide data highway between the two chips. Placing chips side by side like this is called 2.5D packaging.",
      ja: "表面には髪の毛よりはるかに細い配線が数千本以上敷かれ、2 つのチップの間に広いデータの高速道路を作ります。チップを横に並べるこの方式を 2.5D パッケージングと呼びます。",
      zh: "其表面铺设着数千条远比头发更细的布线，在两颗芯片间架起宽阔的数据高速路。这种把芯片并排相连的方式称为 2.5D 封装。",
    },
    facts: {
      ko: ["역할 — HBM ↔ GPU 초고속 연결", "수천 개 이상의 미세 배선", "2.5D 패키징의 핵심"],
      en: ["Role — ultra-fast HBM ↔ GPU link", "Thousands of fine wires", "Heart of 2.5D packaging"],
      ja: ["役割 — HBM ↔ GPU 超高速接続", "数千本以上の微細配線", "2.5D パッケージングの要"],
      zh: ["作用 — HBM ↔ GPU 超高速互联", "数千条微细布线", "2.5D 封装的核心"],
    },
  },
  base: {
    tag: { ko: "LOGIC DIE", en: "LOGIC DIE", ja: "LOGIC DIE", zh: "LOGIC DIE" },
    title: {
      ko: "베이스 다이 (Base / Logic Die)",
      en: "Base / Logic Die",
      ja: "ベースダイ (Logic Die)",
      zh: "基底裸片 (Logic Die)",
    },
    lead: {
      ko: "스택 맨 아래에서 위쪽 DRAM들을 지휘하는 “관제탑” 다이예요.",
      en: "The “control tower” die at the bottom of the stack that directs the DRAM above.",
      ja: "スタックの最下層で上の DRAM を統括する「管制塔」のダイです。",
      zh: "位于堆栈最底层、指挥上方 DRAM 的“控制塔”裸片。",
    },
    detail: {
      ko: "메모리 컨트롤러와 입출력 회로(PHY)가 들어 있어, 위에 쌓인 DRAM들이 주고받는 데이터를 정리해 인터포저 쪽으로 내보내고 받아들입니다. DRAM은 저장만 하고, 바깥과의 소통은 이 베이스 다이가 맡아요.",
      en: "It holds the memory controller and I/O circuitry (PHY), organizing the data the stacked DRAM exchanges and sending it to and from the interposer. The DRAM only stores; this base die handles all talk with the outside.",
      ja: "メモリコントローラと入出力回路（PHY）を備え、積まれた DRAM がやり取りするデータを整理してインターポーザへ送受信します。DRAM は保存だけを担い、外部との通信はこのベースダイが受け持ちます。",
      zh: "内含内存控制器与输入输出电路（PHY），负责整理上方 DRAM 收发的数据并与转接板互通。DRAM 只负责存储，与外界的沟通由这颗基底裸片承担。",
    },
    facts: {
      ko: ["역할 — 메모리 제어 + 입출력", "DRAM과 외부 사이의 중계소", "스택의 가장 아래층"],
      en: ["Role — memory control + I/O", "Relay between DRAM and outside", "Bottom layer of the stack"],
      ja: ["役割 — メモリ制御 + 入出力", "DRAM と外部の中継所", "スタックの最下層"],
      zh: ["作用 — 内存控制 + 输入输出", "DRAM 与外界之间的中继", "堆栈的最底层"],
    },
  },
  dram: {
    tag: { ko: "DRAM DIE", en: "DRAM DIE", ja: "DRAM DIE", zh: "DRAM DIE" },
    title: { ko: "DRAM 다이 (DRAM Die)", en: "DRAM Die", ja: "DRAM ダイ", zh: "DRAM 裸片" },
    lead: {
      ko: "실제로 데이터를 저장하는 메모리 셀이 빼곡히 들어 있는 층이에요.",
      en: "The layer packed with memory cells that actually store the data.",
      ja: "実際にデータを蓄えるメモリセルがぎっしり詰まった層です。",
      zh: "密布存储单元、真正保存数据的一层。",
    },
    detail: {
      ko: "HBM은 이런 얇은 DRAM 다이를 여러 장(보통 8~12층, 최신 세대는 16층까지) 수직으로 쌓습니다. 넓게 까는 대신 위로 쌓기 때문에, 좁은 면적에 큰 용량과 넓은 데이터 통로(대역폭)를 동시에 얻을 수 있어요.",
      en: "HBM stacks many of these thin DRAM dies vertically (usually 8–12, up to 16 in the latest generation). By stacking up instead of spreading out, it gains large capacity and a wide data path (bandwidth) in a small footprint.",
      ja: "HBM はこの薄い DRAM ダイを何枚も（通常 8〜12 層、最新世代は 16 層まで）垂直に積みます。広げる代わりに上へ積むことで、狭い面積に大容量と広いデータ経路（帯域幅）を同時に得られます。",
      zh: "HBM 将这种薄 DRAM 裸片垂直堆叠多层（通常 8～12 层，最新世代可达 16 层）。以向上堆叠取代横向铺开，在很小的面积内同时获得大容量与宽数据通道（带宽）。",
    },
    facts: {
      ko: ["역할 — 데이터 저장", "보통 8~12층, 최신 16층", "쌓을수록 용량·대역폭 ↑"],
      en: ["Role — data storage", "Usually 8–12, up to 16 layers", "More layers → more capacity & bandwidth"],
      ja: ["役割 — データ保存", "通常 8〜12 層、最新 16 層", "積むほど容量・帯域幅 ↑"],
      zh: ["作用 — 数据存储", "通常 8～12 层，最新 16 层", "层数越多，容量与带宽越高"],
    },
  },
  tsv: {
    tag: { ko: "CORE TECH", en: "CORE TECH", ja: "CORE TECH", zh: "CORE TECH" },
    title: {
      ko: "TSV · 실리콘 관통 전극",
      en: "TSV · Through-Silicon Via",
      ja: "TSV・シリコン貫通電極",
      zh: "TSV · 硅通孔",
    },
    lead: {
      ko: "쌓인 다이들을 위아래로 곧장 꿰뚫는 구리 기둥이에요. HBM을 가능하게 한 핵심 기술입니다.",
      en: "Copper pillars that pierce straight up and down through the stacked dies — the key technology that makes HBM possible.",
      ja: "積まれたダイを上下に真っ直ぐ貫く銅の柱です。HBM を可能にした核心技術です。",
      zh: "笔直贯穿层层裸片的铜柱——让 HBM 成为可能的核心技术。",
    },
    detail: {
      ko: "예전에는 칩 옆으로 전선을 둘러 연결했지만, TSV는 다이를 수직으로 관통해 가장 짧은 길로 모든 층을 잇습니다. 길이 짧아지니 데이터가 더 빠르게 오가고 전력도 덜 써요. 한 스택에 수천 개가 들어갑니다.",
      en: "Older designs routed wires around the side of the chip, but TSVs go vertically through the die, linking every layer by the shortest path. Shorter paths move data faster and use less power. A single stack holds thousands of them.",
      ja: "以前はチップの脇に配線を回して接続しましたが、TSV はダイを垂直に貫通し最短経路で全層をつなぎます。経路が短いほどデータは速く流れ、電力も少なくて済みます。1 スタックに数千本入ります。",
      zh: "过去要绕到芯片侧面走线，而 TSV 垂直贯穿裸片，以最短路径连通每一层。路径更短，数据更快、更省电。单个堆栈中有数千个。",
    },
    facts: {
      ko: ["역할 — 층과 층을 수직 연결", "기존 방식보다 빠르고 저전력", "한 스택에 수천 개"],
      en: ["Role — vertical layer-to-layer link", "Faster and lower-power than older ways", "Thousands per stack"],
      ja: ["役割 — 層と層を垂直に接続", "従来方式より速く低消費電力", "1 スタックに数千本"],
      zh: ["作用 — 层与层垂直互联", "比传统方式更快更省电", "单堆栈数千个"],
    },
  },
  microbump: {
    tag: { ko: "BONDING", en: "BONDING", ja: "BONDING", zh: "BONDING" },
    title: {
      ko: "마이크로 범프 (Micro Bump)",
      en: "Micro Bump",
      ja: "マイクロバンプ",
      zh: "微凸点 (Micro Bump)",
    },
    lead: {
      ko: "다이와 다이 사이를 붙여 주는 아주 작은 솔더 공이에요.",
      en: "Tiny solder balls that bond one die to the next.",
      ja: "ダイとダイの間を接合するごく小さなはんだの玉です。",
      zh: "把上下裸片粘接起来的极小焊球。",
    },
    detail: {
      ko: "TSV가 만든 수직 통로를 실제 층끼리 연결해, 다이 사이로 전기 신호가 건너가게 합니다. 머리카락 굵기 수준이라 한 층에 수천 개가 촘촘히 박혀요. 최신 세대는 범프 없이 두 면을 직접 붙이는 하이브리드 본딩으로 진화하고 있습니다.",
      en: "They connect the vertical paths made by TSVs between actual layers, letting electrical signals cross from die to die. About the thickness of a hair, thousands sit densely on each layer. The latest generation is moving to hybrid bonding, joining the two surfaces directly without bumps.",
      ja: "TSV が作った垂直の通路を実際の層どうしでつなぎ、ダイ間を電気信号が渡れるようにします。髪の毛ほどの太さで、1 層に数千個が密に並びます。最新世代はバンプなしで両面を直接接合するハイブリッドボンディングへ進化しています。",
      zh: "它们在实际层之间连接 TSV 形成的垂直通道，让电信号在裸片间穿行。仅头发般粗细，每层密布数千个。最新世代正演进为无凸点、直接贴合两面的混合键合。",
    },
    facts: {
      ko: ["역할 — 층 사이 물리·전기 연결", "머리카락 굵기의 솔더 공", "→ 하이브리드 본딩으로 진화 중"],
      en: ["Role — physical & electrical layer link", "Hair-thin solder balls", "→ evolving to hybrid bonding"],
      ja: ["役割 — 層間の物理・電気接続", "髪の毛ほどのはんだ玉", "→ ハイブリッドボンディングへ進化中"],
      zh: ["作用 — 层间物理与电气连接", "头发般粗细的焊球", "→ 正演进为混合键合"],
    },
  },
  bga: {
    tag: { ko: "PACKAGE I/O", en: "PACKAGE I/O", ja: "PACKAGE I/O", zh: "PACKAGE I/O" },
    title: {
      ko: "BGA 솔더 볼 (Solder Balls)",
      en: "BGA Solder Balls",
      ja: "BGA はんだボール",
      zh: "BGA 焊球",
    },
    lead: {
      ko: "패키지 맨 아래에 격자로 붙어, 메인보드와 연결되는 솔더 공이에요.",
      en: "Solder balls in a grid on the bottom of the package that connect to the mainboard.",
      ja: "パッケージの底に格子状に付き、メインボードとつながるはんだの玉です。",
      zh: "以网格排布在封装底部、连接主板的焊球。",
    },
    detail: {
      ko: "이 공들이 기판(PCB) 위에서 녹아 붙으며 패키지를 고정하고, 전원과 수많은 신호를 외부와 주고받습니다. 다리(핀)를 가장자리에만 두는 대신 바닥 면 전체를 격자로 쓰기 때문에, 같은 면적에 훨씬 많은 연결을 담을 수 있어요. BGA = Ball Grid Array.",
      en: "These balls melt onto the PCB to fix the package in place and exchange power and many signals with the outside. Using the whole bottom surface as a grid — instead of pins only along the edges — packs far more connections into the same area. BGA = Ball Grid Array.",
      ja: "これらの玉が基板（PCB）上で溶けて付き、パッケージを固定しつつ電源と多数の信号を外部とやり取りします。ピンを縁だけに置く代わりに底面全体を格子に使うため、同じ面積にずっと多くの接続を収められます。BGA = Ball Grid Array。",
      zh: "这些焊球在 PCB 上熔接，固定封装并与外部交换电源和大量信号。以整个底面作网格、而非仅在边缘布脚，可在相同面积内容纳多得多的连接。BGA = Ball Grid Array。",
    },
    facts: {
      ko: ["역할 — 패키지 ↔ 메인보드 연결", "바닥 전체를 격자로 활용", "BGA = Ball Grid Array"],
      en: ["Role — package ↔ mainboard link", "Uses the whole bottom as a grid", "BGA = Ball Grid Array"],
      ja: ["役割 — パッケージ ↔ メインボード接続", "底面全体を格子に活用", "BGA = Ball Grid Array"],
      zh: ["作用 — 封装 ↔ 主板连接", "充分利用整个底面网格", "BGA = Ball Grid Array"],
    },
  },
};
