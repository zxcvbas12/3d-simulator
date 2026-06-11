import type { PartInfoMap } from "@app/shared/r3f/model";

/**
 * 구동 모터(PMSM) 부품 설명 (다국어).
 * 핵심 학습 포인트: 고정자의 회전 자기장이 영구자석 회전자를 끌고 돈다 —
 * 전기(배터리) → 회전력(바퀴)의 변환 지점. EV 배터리 모델과 한 쌍.
 */
export const driveMotorInfo: PartInfoMap = {
  housing: {
    tag: { ko: "HOUSING", en: "HOUSING", ja: "HOUSING", zh: "HOUSING" },
    spec: "aluminum · liquid/oil cooled",
    sources: [{ label: "Wikipedia · Electric motor", url: "https://en.wikipedia.org/wiki/Electric_motor" }],
    title: { ko: "모터 하우징 (Housing)", en: "Motor Housing", ja: "モーターハウジング", zh: "电机壳体" },
    lead: {
      ko: "모터 전체를 감싸는 알루미늄 원통이에요. 냉각수가 흐르는 통로가 들어 있습니다.",
      en: "The aluminum cylinder that wraps the whole motor — with coolant passages inside.",
      ja: "モーター全体を包むアルミの円筒。内部に冷却液の通路があります。",
      zh: "包裹整台电机的铝制圆筒，内有冷却液通道。",
    },
    detail: {
      ko: "고정자를 단단히 붙잡아 차체에 고정하고, 내부를 물·먼지로부터 보호합니다. 모터는 출력의 일부를 열로 버리는데, 하우징의 워터재킷(또는 오일 분사)이 그 열을 식혀 연속 출력을 유지하게 해 줘요. 바깥 핀(fin)도 방열을 돕습니다.",
      en: "It clamps the stator, mounts the motor to the car, and seals the inside from water and dust. A motor sheds part of its power as heat, and the housing's water jacket (or oil spray) removes that heat so the motor can sustain its output. The outer fins help radiate heat too.",
      ja: "ステーターを固定して車体に取り付け、内部を水や埃から守ります。モーターは出力の一部を熱として捨てるため、ハウジングのウォータージャケット（またはオイル噴射）がその熱を除去し、連続出力を維持します。外側のフィンも放熱を助けます。",
      zh: "它夹紧定子、把电机固定到车身，并密封内部防水防尘。电机会把一部分功率以热量散失，壳体的水套（或喷油冷却）带走热量，使电机维持持续输出。外部散热片也辅助散热。",
    },
    facts: {
      ko: ["역할 — 고정·보호·냉각", "워터재킷/오일 냉각", "알루미늄 경량 구조"],
      en: ["Role — mount, protect, cool", "Water jacket / oil cooling", "Lightweight aluminum"],
      ja: ["役割 — 固定・保護・冷却", "ウォータージャケット/油冷", "軽量アルミ構造"],
      zh: ["作用 — 固定·保护·冷却", "水套/油冷", "轻量铝结构"],
    },
  },
  endcap: {
    tag: { ko: "END SHIELD", en: "END SHIELD", ja: "END SHIELD", zh: "END SHIELD" },
    spec: "cast Al · holds bearings",
    sources: [{ label: "Wikipedia · Electric motor", url: "https://en.wikipedia.org/wiki/Electric_motor" }],
    title: { ko: "엔드캡 (End Shield)", en: "End Shield (End Cap)", ja: "エンドシールド", zh: "端盖" },
    lead: {
      ko: "하우징 양끝을 막는 원판이에요. 가운데에 베어링이 박혀 샤프트를 받칩니다.",
      en: "The discs that close both ends of the housing — each holds a bearing that supports the shaft.",
      ja: "ハウジングの両端を塞ぐ円板。中央にベアリングが収まり、シャフトを支えます。",
      zh: "封住壳体两端的圆盘，中央嵌有支撑转轴的轴承。",
    },
    detail: {
      ko: "회전자가 고정자 안에서 닿지 않고 돌려면 그 중심축이 정확히 잡혀 있어야 합니다. 엔드캡은 베어링을 통해 샤프트의 양끝을 잡아, 회전자와 고정자 사이의 1mm도 안 되는 공극(air gap)을 유지해요. 모터를 분해할 때 가장 먼저 여는 부품이기도 합니다.",
      en: "For the rotor to spin inside the stator without touching it, its axis must be held precisely. The end shields grip both ends of the shaft through the bearings, maintaining the sub-millimeter air gap between rotor and stator. They are also the first parts removed when a motor is taken apart.",
      ja: "ローターがステーターの中で接触せずに回るには、その軸が正確に保持される必要があります。エンドシールドはベアリングを介してシャフトの両端を支え、ローターとステーターの 1mm 未満のエアギャップを維持します。モーター分解時に最初に外す部品でもあります。",
      zh: "转子要在定子内不接触地旋转，其轴线必须被精确固定。端盖通过轴承夹住转轴两端，维持转子与定子之间不足 1 毫米的气隙。它也是拆解电机时最先卸下的部件。",
    },
    facts: {
      ko: ["역할 — 샤프트 양끝 지지", "공극(air gap) 유지", "분해의 시작점"],
      en: ["Role — support shaft ends", "Maintains the air gap", "First step of disassembly"],
      ja: ["役割 — シャフト両端の支持", "エアギャップ維持", "分解の出発点"],
      zh: ["作用 — 支撑转轴两端", "维持气隙", "拆解的起点"],
    },
  },
  stator: {
    tag: { ko: "STATOR", en: "STATOR", ja: "STATOR", zh: "STATOR" },
    spec: "laminated steel ring · stays still",
    sources: [{ label: "Wikipedia · Stator", url: "https://en.wikipedia.org/wiki/Stator" }],
    title: { ko: "고정자 (Stator)", en: "Stator", ja: "ステーター（固定子）", zh: "定子" },
    lead: {
      ko: "움직이지 않는 강철 링이에요. 권선에 전류가 흐르면 회전하는 자기장을 만듭니다.",
      en: "The steel ring that never moves — when current flows in its windings, it creates a rotating magnetic field.",
      ja: "動かない鋼のリング。巻線に電流が流れると回転磁界を作ります。",
      zh: "静止不动的钢环。绕组通电后产生旋转磁场。",
    },
    detail: {
      ko: "안쪽에 파인 홈(슬롯)마다 구리 권선이 감겨 있고, 인버터가 세 가닥(3상)의 전류를 번갈아 흘리면 자기장이 링을 따라 빙글빙글 도는 효과가 생깁니다. 몸체를 통째로 깎지 않고 얇은 강판을 수백 장 쌓아(적층) 만드는데, 내부에 생기는 소용돌이 전류(와전류) 손실을 줄이기 위해서예요.",
      en: "Copper windings sit in slots on its inner face, and when the inverter feeds alternating current through three phases, the magnetic field effectively spins around the ring. The body is stacked from hundreds of thin steel sheets (laminations) instead of solid metal — to cut the eddy-current losses that would otherwise swirl inside.",
      ja: "内側の溝（スロット）に銅の巻線が収まり、インバーターが三相の電流を交互に流すと、磁界がリングに沿って回転する効果が生まれます。本体は無垢材でなく薄い鋼板を数百枚積層して作ります — 内部に生じる渦電流損失を抑えるためです。",
      zh: "内侧的槽中嵌着铜绕组，逆变器轮流馈入三相电流时，磁场便沿着钢环旋转。定子不用整块钢，而由数百片薄钢板叠压（叠片）而成——为的是抑制内部的涡流损耗。",
    },
    facts: {
      ko: ["역할 — 회전 자기장 생성", "3상 전류로 자기장 회전", "적층 강판 = 와전류 손실↓"],
      en: ["Role — make the rotating field", "Three-phase current spins the field", "Laminations cut eddy losses"],
      ja: ["役割 — 回転磁界の生成", "三相電流で磁界が回転", "積層鋼板 = 渦電流損↓"],
      zh: ["作用 — 产生旋转磁场", "三相电流驱动磁场旋转", "叠片钢板降低涡流损耗"],
    },
  },
  winding: {
    tag: { ko: "WINDING", en: "WINDING", ja: "WINDING", zh: "WINDING" },
    spec: "Cu · 3-phase · hairpin/wire",
    sources: [{ label: "Wikipedia · Electromagnetic coil", url: "https://en.wikipedia.org/wiki/Electromagnetic_coil" }],
    title: { ko: "권선 (Winding)", en: "Winding", ja: "巻線", zh: "绕组" },
    lead: {
      ko: "고정자 홈에 감긴 구리선이에요. 배터리의 전기가 실제로 흐르는 곳입니다.",
      en: "The copper wire wound through the stator slots — where the battery's electricity actually flows.",
      ja: "ステーターの溝に巻かれた銅線。バッテリーの電気が実際に流れる場所です。",
      zh: "缠绕在定子槽中的铜线——电池的电流真正流经之处。",
    },
    detail: {
      ko: "전류가 흐르는 도선은 자기장을 만듭니다(전자석의 원리). 인버터가 세 묶음(3상)의 권선에 타이밍을 바꿔 가며 전류를 흘리면, 합쳐진 자기장이 회전하게 돼요. 최신 EV 모터는 둥근 선 대신 납작한 사각 단면 구리(헤어핀)를 써서 같은 공간에 구리를 더 채워 효율을 높입니다. 양끝에 보이는 고리가 엔드와인딩이에요.",
      en: "A wire carrying current makes a magnetic field — the electromagnet principle. The inverter feeds three groups (phases) of windings with precisely timed currents, so their combined field rotates. Modern EV motors use flat rectangular copper (hairpin windings) instead of round wire, packing more copper into the same slots for higher efficiency. The loops visible at both ends are the end-windings.",
      ja: "電流が流れる導線は磁界を作ります（電磁石の原理）。インバーターが三組（三相）の巻線にタイミングをずらして電流を流すと、合成磁界が回転します。最新の EV モーターは丸線でなく平角銅線（ヘアピン巻線）を使い、同じスロットにより多くの銅を詰めて効率を高めます。両端に見える輪がエンドワインディングです。",
      zh: "通电导线会产生磁场——这就是电磁铁原理。逆变器按精确时序给三组（三相）绕组馈电，合成磁场便旋转起来。新一代电动车电机用扁平方形铜线（发卡式绕组）取代圆线，在同样的槽内塞入更多铜，效率更高。两端可见的环就是端部绕组。",
    },
    facts: {
      ko: ["역할 — 전류 → 자기장", "3상 권선의 합성 자기장", "헤어핀 권선 = 효율↑"],
      en: ["Role — current → magnetic field", "Three phases combine into one field", "Hairpin windings boost efficiency"],
      ja: ["役割 — 電流 → 磁界", "三相巻線の合成磁界", "ヘアピン巻線 = 効率↑"],
      zh: ["作用 — 电流 → 磁场", "三相绕组合成磁场", "发卡绕组提升效率"],
    },
  },
  rotor: {
    tag: { ko: "ROTOR", en: "ROTOR", ja: "ROTOR", zh: "ROTOR" },
    spec: "permanent magnets · ≤ ~16,000 rpm",
    sources: [{ label: "Wikipedia · Permanent magnet synchronous motor", url: "https://en.wikipedia.org/wiki/Synchronous_motor#Permanent-magnet_motors" }],
    title: { ko: "회전자 (Rotor)", en: "Rotor", ja: "ローター（回転子）", zh: "转子" },
    lead: {
      ko: "영구자석이 박힌 회전 원통이에요. 고정자의 회전 자기장을 따라 돕니다.",
      en: "The spinning cylinder studded with permanent magnets — it chases the stator's rotating field.",
      ja: "永久磁石を埋め込んだ回転円筒。ステーターの回転磁界を追って回ります。",
      zh: "嵌有永磁体的旋转圆筒，追随定子的旋转磁场转动。",
    },
    detail: {
      ko: "고정자가 만든 자기장이 돌면, 회전자의 영구자석(네오디뮴 등 희토류)이 자석의 인력·척력으로 그 자기장을 따라갑니다 — 이것이 ‘동기(synchronous)’ 모터라는 이름의 이유예요. 자석을 표면이 아니라 V자 모양으로 안에 묻으면(IPM) 고속에서도 자석이 버티고 효율 범위가 넓어져, 대부분의 EV가 이 방식을 씁니다.",
      en: "As the stator's field rotates, the rotor's permanent magnets (rare-earth, e.g. neodymium) are pulled along by magnetic attraction and repulsion — which is why it's called a 'synchronous' motor. Burying the magnets in V-shapes inside the rotor (IPM) instead of on its surface keeps them secure at high speed and widens the efficient operating range, so most EVs use this design.",
      ja: "ステーターの磁界が回ると、ローターの永久磁石（ネオジムなどの希土類）が磁力の吸引・反発でそれを追いかけます — これが『同期（synchronous）』モーターと呼ばれる理由です。磁石を表面でなく V 字型に内部へ埋め込む（IPM）と高速でも磁石が保持され、効率範囲が広がるため、ほとんどの EV がこの方式です。",
      zh: "定子磁场旋转时，转子的永磁体（钕等稀土材料）在磁吸引与排斥的作用下随之转动——这正是“同步”电机得名的原因。把磁体以 V 形埋入转子内部（IPM）而非贴在表面，高速下磁体更牢固、高效区间更宽，因此绝大多数电动车采用这种设计。",
    },
    facts: {
      ko: ["역할 — 자기장을 따라 회전", "희토류 영구자석(네오디뮴)", "자석 내장형(IPM)이 EV 표준"],
      en: ["Role — spins with the field", "Rare-earth magnets (neodymium)", "Interior magnets (IPM) are the EV norm"],
      ja: ["役割 — 磁界に同期して回転", "希土類磁石（ネオジム）", "磁石内蔵型(IPM)が EV 標準"],
      zh: ["作用 — 同步磁场旋转", "稀土永磁（钕）", "内置磁体(IPM)是主流"],
    },
  },
  shaft: {
    tag: { ko: "OUTPUT", en: "OUTPUT", ja: "OUTPUT", zh: "OUTPUT" },
    spec: "steel · → reduction gear",
    sources: [{ label: "Wikipedia · Drive shaft", url: "https://en.wikipedia.org/wiki/Drive_shaft" }],
    title: { ko: "샤프트 (출력축)", en: "Shaft (Output)", ja: "シャフト（出力軸）", zh: "转轴（输出轴）" },
    lead: {
      ko: "회전자 중심을 관통하는 강철 축이에요. 회전력이 바퀴로 나가는 출구입니다.",
      en: "The steel axle through the rotor's center — the exit where torque leaves for the wheels.",
      ja: "ローター中心を貫く鋼の軸。回転力が車輪へ出ていく出口です。",
      zh: "贯穿转子中心的钢轴——扭矩通向车轮的出口。",
    },
    detail: {
      ko: "회전자가 만든 회전력(토크)은 전부 이 축을 타고 나갑니다. EV 모터는 분당 1만 회 이상으로 아주 빨리 돌기 때문에, 바퀴에 바로 연결하지 않고 감속기(보통 약 9~10:1)를 거쳐 속도를 낮추고 토크를 키워서 전달해요. 끝의 굵은 스플라인 단이 감속기와 맞물리는 부분입니다.",
      en: "All the torque the rotor makes leaves through this axle. EV motors spin very fast — over 10,000 rpm — so instead of driving the wheels directly, the shaft feeds a reduction gear (typically ~9–10:1) that trades speed for torque. The thicker splined section at the end is what meshes with that gearbox.",
      ja: "ローターが生んだトルクはすべてこの軸を通って出ていきます。EV モーターは毎分 1 万回転以上と非常に速く回るため、車輪に直結せず減速機（通常約 9〜10:1）を介して速度を落としトルクを増やして伝えます。先端の太いスプライン部が減速機と噛み合う部分です。",
      zh: "转子产生的扭矩全部经此轴输出。电动车电机转速极高——超过每分钟一万转——因此不直接驱动车轮，而是经减速器（通常约 9–10:1）降速增扭后传出。轴端较粗的花键段就是与减速器啮合的部位。",
    },
    facts: {
      ko: ["역할 — 토크의 출구", "1만+ rpm → 감속기로 토크↑", "스플라인으로 감속기 연결"],
      en: ["Role — torque outlet", "10k+ rpm → gear trades speed for torque", "Splines mesh with the gearbox"],
      ja: ["役割 — トルクの出口", "1万+ rpm → 減速機でトルク↑", "スプラインで減速機と結合"],
      zh: ["作用 — 扭矩出口", "万转以上 → 减速器增扭", "花键连接减速器"],
    },
  },
  bearing: {
    tag: { ko: "BEARING", en: "BEARING", ja: "BEARING", zh: "BEARING" },
    spec: "ball bearing ×2 · both ends",
    sources: [{ label: "Wikipedia · Rolling-element bearing", url: "https://en.wikipedia.org/wiki/Rolling-element_bearing" }],
    title: { ko: "베어링 (Bearing)", en: "Bearing", ja: "ベアリング", zh: "轴承" },
    lead: {
      ko: "샤프트가 마찰 없이 매끄럽게 돌도록 받쳐 주는 구슬 링이에요.",
      en: "Rings of balls that let the shaft spin smoothly with almost no friction.",
      ja: "シャフトが摩擦なく滑らかに回るよう支える玉のリングです。",
      zh: "让转轴近乎无摩擦顺滑旋转的滚珠环。",
    },
    detail: {
      ko: "안쪽 링은 샤프트와, 바깥 링은 엔드캡과 함께 돌지 않게 고정되고, 사이의 강구들이 구르며 마찰을 미끄럼의 수십 분의 1로 줄입니다. 분당 1만 회 이상 도는 EV 모터에서 베어링은 수명과 소음을 좌우하는 부품이라, 전식(전류에 의한 부식)을 막는 절연 처리를 하기도 해요.",
      en: "The inner ring turns with the shaft, the outer ring sits fixed in the end shield, and the steel balls between them roll — cutting friction to a small fraction of sliding. In an EV motor spinning past 10,000 rpm, bearings govern lifespan and noise, and are sometimes insulated to prevent electrical erosion from stray currents.",
      ja: "内輪はシャフトと回り、外輪はエンドシールドに固定され、間の鋼球が転がることで摩擦を滑りの数十分の一に減らします。毎分 1 万回転を超える EV モーターでは、ベアリングが寿命と騒音を左右するため、漏れ電流による電食を防ぐ絶縁処理を施すこともあります。",
      zh: "内圈随轴转动，外圈固定在端盖中，其间的钢珠滚动，把摩擦降到滑动摩擦的几十分之一。在转速超万的电动车电机中，轴承决定寿命与噪音，有时还做绝缘处理以防杂散电流引起的电蚀。",
    },
    facts: {
      ko: ["역할 — 회전 마찰 최소화", "구름 마찰 ≪ 미끄럼 마찰", "고속 회전의 수명·소음 좌우"],
      en: ["Role — minimize spin friction", "Rolling ≪ sliding friction", "Governs life & noise at high rpm"],
      ja: ["役割 — 回転摩擦の最小化", "転がり ≪ 滑り摩擦", "高速回転の寿命・騒音を左右"],
      zh: ["作用 — 最小化旋转摩擦", "滚动摩擦 ≪ 滑动摩擦", "决定高速下的寿命与噪音"],
    },
  },
};
