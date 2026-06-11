import type { PartInfoMap } from "@app/shared/r3f/model";

/**
 * EV 배터리 팩 부품 설명 (다국어).
 * 핵심 학습 포인트: 셀 → 모듈 → 팩의 3단 계층, 냉각·BMS가 안전과 수명을 좌우.
 */
export const evBatteryInfo: PartInfoMap = {
  enclosure: {
    tag: { ko: "ENCLOSURE", en: "ENCLOSURE", ja: "ENCLOSURE", zh: "ENCLOSURE" },
    spec: "≈ 2.0 × 1.5 m · aluminum tray",
    sources: [{ label: "Wikipedia · Electric vehicle battery", url: "https://en.wikipedia.org/wiki/Electric_vehicle_battery" }],
    title: { ko: "팩 하우징 (Enclosure)", en: "Pack Enclosure", ja: "パックハウジング", zh: "电池包外壳" },
    lead: {
      ko: "모든 모듈을 담아 차체 바닥에 고정되는 큰 금속 트레이예요.",
      en: "The large metal tray that holds all the modules and bolts to the vehicle floor.",
      ja: "全モジュールを収め、車体の床に固定される大きな金属トレイです。",
      zh: "容纳所有模组并固定在车身底板上的大型金属托盘。",
    },
    detail: {
      ko: "전기차 배터리는 보통 차 바닥 전체에 까는 ‘스케이트보드’ 형태예요. 하우징은 모듈을 외부 충격·물·먼지로부터 보호하고(방수·방진), 사고 시 셀을 가두는 안전 구조이자 차체 강성에도 기여합니다. 무게를 줄이려 알루미늄을 많이 씁니다.",
      en: "An EV battery is usually a flat ‘skateboard’ spread across the floor. The enclosure protects the modules from impact, water and dust (sealed), contains the cells in a crash, and even adds stiffness to the body. Aluminum is common to save weight.",
      ja: "EV のバッテリーは通常、床全体に敷く『スケートボード』型です。ハウジングはモジュールを衝撃・水・埃から守り（防水防塵）、事故時にセルを閉じ込める安全構造であり、車体剛性にも寄与します。軽量化のためアルミが多用されます。",
      zh: "电动车电池通常是铺满底板的“滑板”造型。外壳保护模组免受冲击、水与灰尘（密封），在碰撞时约束电芯，还能增强车身刚性。为减重多采用铝合金。",
    },
    facts: {
      ko: ["역할 — 모듈 보호 + 차체 고정", "방수·방진 밀폐 구조", "경량 알루미늄"],
      en: ["Role — protect modules + mount to body", "Sealed against water & dust", "Lightweight aluminum"],
      ja: ["役割 — モジュール保護 + 車体固定", "防水防塵の密閉構造", "軽量アルミ"],
      zh: ["作用 — 保护模组 + 固定车身", "防水防尘密封结构", "轻量铝合金"],
    },
  },
  coldplate: {
    tag: { ko: "THERMAL", en: "THERMAL", ja: "THERMAL", zh: "THERMAL" },
    spec: "liquid-cooled · glycol/water",
    sources: [{ label: "Wikipedia · Battery thermal management", url: "https://en.wikipedia.org/wiki/Automotive_battery#Thermal_management" }],
    title: { ko: "냉각판 (Cold Plate)", en: "Cold Plate", ja: "冷却プレート", zh: "冷却板" },
    lead: {
      ko: "모듈 아래에 깔려 냉각수를 흘려 셀의 열을 빼는 판이에요.",
      en: "A plate under the modules that runs coolant to pull heat out of the cells.",
      ja: "モジュールの下に敷き、冷却液を流してセルの熱を抜く板です。",
      zh: "铺在模组下方、通过冷却液带走电芯热量的板。",
    },
    detail: {
      ko: "리튬이온 셀은 너무 뜨겁거나 차가우면 수명이 줄고 위험해집니다. 냉각판 안의 구불구불한 채널로 냉각수(보통 글리콜+물)가 흐르며 셀을 좁은 온도 범위에 유지해요. 추울 땐 같은 경로로 데우기도 합니다(가열·냉각 겸용).",
      en: "Lithium-ion cells lose life and become unsafe if too hot or too cold. Coolant (usually glycol + water) flows through serpentine channels in the plate, keeping the cells in a narrow temperature band. In the cold it can also warm them through the same loop.",
      ja: "リチウムイオンセルは熱すぎても冷たすぎても寿命が縮み危険になります。プレート内の蛇行チャネルを冷却液（通常グリコール+水）が流れ、セルを狭い温度域に保ちます。寒冷時は同じ経路で加熱もします。",
      zh: "锂离子电芯过热或过冷都会折寿并带来危险。冷却液（通常乙二醇+水）流经板内蛇形通道，把电芯维持在狭窄温度区间。寒冷时还能通过同一回路加热。",
    },
    facts: {
      ko: ["역할 — 셀 온도 관리", "구불구불한 냉각수 채널", "가열·냉각 겸용"],
      en: ["Role — manage cell temperature", "Serpentine coolant channels", "Heats and cools"],
      ja: ["役割 — セル温度管理", "蛇行する冷却チャネル", "加熱・冷却兼用"],
      zh: ["作用 — 管理电芯温度", "蛇形冷却通道", "可加热可冷却"],
    },
  },
  module: {
    tag: { ko: "MODULE", en: "MODULE", ja: "MODULE", zh: "MODULE" },
    spec: "≈ 12–24 cells · steel end-plates",
    sources: [{ label: "Wikipedia · Battery pack", url: "https://en.wikipedia.org/wiki/Battery_pack" }],
    title: { ko: "배터리 모듈 (Module)", en: "Battery Module", ja: "バッテリーモジュール", zh: "电池模组" },
    lead: {
      ko: "여러 셀을 한 묶음으로 압축해 잡아 둔 중간 단위예요.",
      en: "A mid-level unit that clamps a group of cells together.",
      ja: "複数のセルを一つに圧縮して束ねた中間単位です。",
      zh: "把若干电芯压紧成一束的中间单元。",
    },
    detail: {
      ko: "셀을 곧장 팩에 넣지 않고 모듈로 묶는 이유는 조립·교체·관리가 쉬워지기 때문이에요. 양옆 금속 엔드플레이트가 셀을 일정한 압력으로 눌러(셀은 충방전하며 부풀어요) 형태와 접촉을 안정시킵니다. 팩 = 모듈 여러 개, 모듈 = 셀 여러 개의 3단 계층입니다.",
      en: "Cells are grouped into modules — rather than dropped straight into the pack — to make assembly, replacement and management easier. Metal end-plates squeeze the cells at a steady pressure (cells swell as they charge and discharge), stabilizing their shape and contact. Pack = many modules, module = many cells: a three-level hierarchy.",
      ja: "セルを直接パックに入れず、モジュールに束ねるのは組立・交換・管理が容易になるためです。両端の金属エンドプレートがセルを一定の圧力で押さえ（セルは充放電で膨らむ）、形状と接触を安定させます。パック=複数モジュール、モジュール=複数セルの三層構造です。",
      zh: "把电芯先组成模组、而非直接装入电池包，是为了便于组装、更换与管理。两端的金属端板以恒定压力压紧电芯（电芯充放电时会膨胀），稳定其形状与接触。电池包=多个模组，模组=多个电芯，构成三层层级。",
    },
    facts: {
      ko: ["역할 — 셀 묶음 + 압축 고정", "조립·교체·관리 단위", "팩>모듈>셀 3단 계층"],
      en: ["Role — clamp & group cells", "Unit of assembly & service", "Pack > module > cell"],
      ja: ["役割 — セルの束ね・圧縮固定", "組立・交換の単位", "パック>モジュール>セル"],
      zh: ["作用 — 压紧并成组电芯", "组装与维修的单元", "包>模组>电芯三层"],
    },
  },
  cell: {
    tag: { ko: "CELL", en: "CELL", ja: "CELL", zh: "CELL" },
    spec: "prismatic Li-ion · ≈ 3.7 V",
    sources: [{ label: "Wikipedia · Lithium-ion battery", url: "https://en.wikipedia.org/wiki/Lithium-ion_battery" }],
    title: { ko: "배터리 셀 (Cell)", en: "Battery Cell", ja: "バッテリーセル", zh: "电芯" },
    lead: {
      ko: "실제로 전기를 저장하는 가장 작은 단위예요. 여기서는 각형(prismatic) 셀입니다.",
      en: "The smallest unit that actually stores energy — here, a prismatic cell.",
      ja: "実際に電気を蓄える最小単位。ここでは角形（prismatic）セルです。",
      zh: "真正储存电能的最小单元——这里是方形（prismatic）电芯。",
    },
    detail: {
      ko: "한 셀의 전압은 약 3.7 V로 낮아, 차를 움직일 수백 V를 만들려면 셀을 직렬로 길게 잇습니다. 용량을 늘리려면 병렬로도 잇고요. 모양은 각형·원통형·파우치형이 있는데, 각형은 단단한 금속 캔에 담겨 쌓기 좋고 구조가 튼튼합니다.",
      en: "A single cell is only about 3.7 V, so to reach the hundreds of volts that move a car, cells are wired in long series strings; to add capacity they are also wired in parallel. Cells come as prismatic, cylindrical or pouch — the prismatic type sits in a rigid metal can that stacks neatly and is structurally strong.",
      ja: "1 セルの電圧は約 3.7 V と低く、車を動かす数百 V を得るにはセルを直列に長くつなぎます。容量を増やすには並列にもつなぎます。形状は角形・円筒・パウチがあり、角形は硬い金属缶に収まり積みやすく頑丈です。",
      zh: "单颗电芯仅约 3.7 V，要达到驱动汽车的数百伏，需将电芯串联成长串；要增加容量还会并联。电芯有方形、圆柱、软包之分——方形装在坚固金属壳中，便于堆叠且结构强。",
    },
    facts: {
      ko: ["역할 — 에너지 저장 최소 단위", "한 셀 ≈ 3.7 V → 직렬로 수백 V", "각형·원통·파우치"],
      en: ["Role — smallest energy unit", "≈ 3.7 V each → series to 100s V", "Prismatic / cylindrical / pouch"],
      ja: ["役割 — エネルギー貯蔵の最小単位", "1 セル ≈ 3.7 V → 直列で数百 V", "角形・円筒・パウチ"],
      zh: ["作用 — 储能最小单元", "每颗 ≈ 3.7 V → 串联到数百伏", "方形/圆柱/软包"],
    },
  },
  busbar: {
    tag: { ko: "INTERCONNECT", en: "INTERCONNECT", ja: "INTERCONNECT", zh: "INTERCONNECT" },
    spec: "Cu / Al · high-current",
    sources: [{ label: "Wikipedia · Busbar", url: "https://en.wikipedia.org/wiki/Busbar" }],
    title: { ko: "버스바 (Busbar)", en: "Busbar", ja: "バスバー", zh: "汇流排" },
    lead: {
      ko: "셀과 모듈의 단자를 잇는 두꺼운 금속 막대예요.",
      en: "Thick metal bars that connect the terminals of cells and modules.",
      ja: "セルとモジュールの端子をつなぐ厚い金属の棒です。",
      zh: "连接电芯与模组端子的厚金属条。",
    },
    detail: {
      ko: "배터리에는 수백 암페어의 큰 전류가 흐르기 때문에, 가는 전선 대신 단면이 넓은 구리·알루미늄 막대(버스바)로 잇습니다. 단면이 넓어야 저항으로 인한 발열과 손실이 줄어요. 모듈들을 직렬로 연결해 팩 전체 전압을 만드는 통로입니다.",
      en: "Batteries carry hundreds of amps, so instead of thin wires they use wide-section copper or aluminum bars (busbars). A large cross-section keeps resistance — and the heat and loss it causes — low. They wire the modules in series to build the pack’s full voltage.",
      ja: "バッテリーには数百アンペアの大電流が流れるため、細い電線でなく断面の広い銅・アルミの棒（バスバー）でつなぎます。断面が広いほど抵抗による発熱と損失が減ります。モジュールを直列につなぎ、パック全体の電圧を作る通路です。",
      zh: "电池要通过数百安培的大电流，因此不用细导线，而用大截面的铜或铝条（汇流排）连接。截面越大，电阻及其带来的发热与损耗越小。它把模组串联起来，构成电池包的总电压。",
    },
    facts: {
      ko: ["역할 — 대전류 연결 통로", "넓은 단면 = 저저항·저발열", "모듈을 직렬로 연결"],
      en: ["Role — high-current path", "Wide section = low resistance/heat", "Wires modules in series"],
      ja: ["役割 — 大電流の通路", "広い断面 = 低抵抗・低発熱", "モジュールを直列接続"],
      zh: ["作用 — 大电流通路", "大截面 = 低电阻低发热", "将模组串联"],
    },
  },
  bms: {
    tag: { ko: "CONTROL", en: "CONTROL", ja: "CONTROL", zh: "CONTROL" },
    spec: "BMS board · monitors V/T/I",
    sources: [{ label: "Wikipedia · Battery management system", url: "https://en.wikipedia.org/wiki/Battery_management_system" }],
    title: { ko: "BMS · 배터리 관리 시스템", en: "BMS · Battery Management System", ja: "BMS・バッテリー管理システム", zh: "BMS · 电池管理系统" },
    lead: {
      ko: "셀 하나하나의 전압·온도를 감시하고 지키는 ‘두뇌’ 보드예요.",
      en: "The ‘brain’ board that watches and protects every cell’s voltage and temperature.",
      ja: "各セルの電圧・温度を監視し守る『頭脳』のボードです。",
      zh: "监控并保护每颗电芯电压与温度的“大脑”板。",
    },
    detail: {
      ko: "수많은 셀이 직렬로 묶이면, 한 셀만 과충전·과방전·과열돼도 위험합니다. BMS는 모든 셀의 전압·온도·전류를 실시간 감시해 한계를 넘지 않게 막고, 셀들의 충전 상태를 고르게 맞춰(밸런싱) 수명을 늘립니다. 남은 주행거리(SOC) 추정도 BMS가 합니다.",
      en: "When many cells are wired in series, a single cell that overcharges, over-discharges or overheats is dangerous. The BMS monitors every cell’s voltage, temperature and current in real time to keep them within limits, and balances the cells’ charge levels to extend life. It also estimates remaining range (state of charge).",
      ja: "多数のセルを直列にすると、1 セルでも過充電・過放電・過熱すれば危険です。BMS は全セルの電圧・温度・電流をリアルタイム監視して限界を超えさせず、セルの充電状態を均等化（バランシング）して寿命を延ばします。残り航続（SOC）の推定も行います。",
      zh: "众多电芯串联时，哪怕一颗过充、过放或过热都很危险。BMS 实时监控每颗电芯的电压、温度与电流，使其不越限，并均衡各电芯的电量（均衡）以延长寿命。它还估算剩余续航（SOC）。",
    },
    facts: {
      ko: ["역할 — 셀 감시·보호·밸런싱", "과충전·과열 차단", "주행거리(SOC) 추정"],
      en: ["Role — monitor, protect, balance", "Blocks overcharge & overheat", "Estimates range (SOC)"],
      ja: ["役割 — 監視・保護・バランシング", "過充電・過熱を遮断", "航続(SOC)推定"],
      zh: ["作用 — 监控·保护·均衡", "阻断过充与过热", "估算续航(SOC)"],
    },
  },
  lid: {
    tag: { ko: "COVER", en: "COVER", ja: "COVER", zh: "COVER" },
    spec: "sealed · Ni/Al",
    sources: [{ label: "Wikipedia · Electric vehicle battery", url: "https://en.wikipedia.org/wiki/Electric_vehicle_battery" }],
    title: { ko: "상단 커버 (Lid)", en: "Top Cover", ja: "トップカバー", zh: "顶盖" },
    lead: {
      ko: "팩 위를 덮어 내부를 밀폐하는 금속 뚜껑이에요.",
      en: "The metal lid that closes the top of the pack and seals the inside.",
      ja: "パックの上を覆い内部を密閉する金属の蓋です。",
      zh: "盖在电池包顶部、密封内部的金属盖。",
    },
    detail: {
      ko: "하우징과 맞물려 가스켓으로 밀봉되어 물·먼지를 막고, 내부 모듈을 위쪽 충격으로부터 보호합니다. 사고나 열폭주 시 압력을 정해진 방향으로 빼는 벤트(배출구)가 달리기도 해요. 점검 때 이 커버만 열면 모듈에 접근할 수 있습니다.",
      en: "It mates with the enclosure and is sealed with a gasket to keep out water and dust, while protecting the modules from impacts from above. It often carries a vent that releases pressure in a controlled direction during a fault or thermal runaway. For service, opening just this cover gives access to the modules.",
      ja: "ハウジングとかみ合いガスケットで密封し、水・埃を防ぎつつ、上方からの衝撃からモジュールを守ります。事故や熱暴走時に圧力を所定方向へ逃がすベント（排出口）が付くこともあります。点検時はこのカバーを開けるだけでモジュールにアクセスできます。",
      zh: "它与外壳咬合并用密封垫密封，阻挡水与灰尘，同时保护模组免受上方冲击。常带有泄压阀，在故障或热失控时将压力按设定方向排出。维修时只需打开此盖即可接触模组。",
    },
    facts: {
      ko: ["역할 — 밀폐 + 상부 보호", "가스켓 방수·방진", "열폭주 압력 벤트"],
      en: ["Role — seal + top protection", "Gasket against water/dust", "Vents thermal-runaway pressure"],
      ja: ["役割 — 密閉 + 上部保護", "ガスケットで防水防塵", "熱暴走の圧力ベント"],
      zh: ["作用 — 密封 + 顶部保护", "密封垫防水防尘", "热失控泄压"],
    },
  },
};
