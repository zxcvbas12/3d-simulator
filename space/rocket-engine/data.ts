import type { PartInfoMap } from "@app/shared/r3f/model";

/**
 * 로켓 엔진(액체, 가스 발생기 사이클 · LOX/RP-1) 부품 설명 (다국어).
 * 핵심 학습 포인트: 연료를 태운 가스를 노즐로 초음속 가속해 그 반작용으로 추력을 만든다.
 * 터보펌프가 추진제를 고압으로 밀고, 재생냉각이 벽을 지키며, 짐벌이 방향을 잡는다.
 */
export const rocketEngineInfo: PartInfoMap = {
  nozzle: {
    tag: { ko: "NOZZLE", en: "NOZZLE", ja: "NOZZLE", zh: "NOZZLE" },
    spec: "exit ∅ ≈ 0.92 m · ε ≈ 16 · regen-cooled",
    sources: [
      { label: "Wikipedia · De Laval nozzle", url: "https://en.wikipedia.org/wiki/De_Laval_nozzle" },
      { label: "Wikipedia · Rocket engine nozzle", url: "https://en.wikipedia.org/wiki/Rocket_engine_nozzle" },
    ],
    title: {
      ko: "노즐 벨 (Nozzle)",
      en: "Nozzle Bell",
      ja: "ノズルベル",
      zh: "喷管 (钟形喷口)",
    },
    lead: {
      ko: "엔진 맨 아래의 나팔 모양 부품이에요. 뜨거운 가스를 초음속으로 가속해 추력을 만듭니다.",
      en: "The bell-shaped part at the bottom — it accelerates the hot gas to supersonic speed to make thrust.",
      ja: "エンジン下端のラッパ状の部品。高温ガスを超音速まで加速して推力を生みます。",
      zh: "发动机底部的喇叭状部件，把高温燃气加速到超音速以产生推力。",
    },
    detail: {
      ko: "연소실에서 만든 고온·고압 가스는 좁은 목(throat)을 지나며 음속이 되고, 넓어지는 벨에서 팽창하며 더 빨라져 초음속으로 뿜어집니다. 이렇게 열과 압력을 \"한 방향 속도\"로 바꾸는 모양을 드 라발 노즐이라 해요. 가스를 빠르게 뒤로 밀수록 그 반작용으로 엔진이 앞으로 밀립니다(작용·반작용). 벨 안쪽 벽은 3,000 K가 넘는 가스에 닿으므로, 표면의 가는 세로 채널로 차가운 연료를 흘려 식히는 재생냉각을 씁니다.",
      en: "The hot, high-pressure gas from the chamber reaches the speed of sound as it passes the narrow throat, then expands and speeds up further in the widening bell, leaving supersonically. This shape — which converts heat and pressure into directed velocity — is a de Laval nozzle. The faster the gas is thrown backward, the harder the engine is pushed forward (action–reaction). Because the inner wall meets gas above 3,000 K, cold fuel is run through fine vertical channels on its surface to cool it (regenerative cooling).",
      ja: "燃焼室で作られた高温・高圧ガスは、狭いスロート（throat）を通る時に音速に達し、広がるベルで膨張してさらに加速し、超音速で噴出します。熱と圧力を「一方向の速度」に変えるこの形をドラバルノズルと呼びます。ガスを速く後ろへ押すほど、その反作用でエンジンは前へ押されます（作用・反作用）。ベル内壁は 3,000 K を超えるガスに触れるため、表面の細い縦チャンネルに冷たい燃料を流して冷やす再生冷却を用います。",
      zh: "燃烧室产生的高温高压燃气在通过狭窄的喉部时达到音速，再在逐渐扩张的钟形喷口中膨胀、进一步加速，以超音速喷出。这种把热与压力转化为定向速度的形状称为拉瓦尔喷管。燃气向后喷得越快，反作用就把发动机推得越向前（作用与反作用）。由于内壁接触超过 3,000 K 的燃气，会让冷燃料流过其表面的细竖向通道来冷却（再生冷却）。",
    },
    facts: {
      ko: ["역할 — 가스를 초음속 가속 → 추력", "목 → 벨: 드 라발 노즐", "표면 채널로 재생냉각"],
      en: ["Role — accelerate gas → thrust", "Throat → bell: de Laval nozzle", "Surface channels cool it (regen)"],
      ja: ["役割 — ガスを超音速加速 → 推力", "スロート → ベル：ドラバルノズル", "表面チャンネルで再生冷却"],
      zh: ["作用 — 加速燃气至超音速 → 推力", "喉部 → 钟形：拉瓦尔喷管", "表面通道实现再生冷却"],
    },
  },
  chamber: {
    tag: { ko: "COMBUSTION", en: "COMBUSTION", ja: "COMBUSTION", zh: "COMBUSTION" },
    spec: "Pc ≈ 100 bar · Tgas ≈ 3,500 K · Cu alloy",
    sources: [
      { label: "Wikipedia · Rocket engine", url: "https://en.wikipedia.org/wiki/Rocket_engine" },
      { label: "Wikipedia · Regenerative cooling (rocket)", url: "https://en.wikipedia.org/wiki/Regenerative_cooling_(rocket)" },
    ],
    title: {
      ko: "연소실 (Combustion Chamber)",
      en: "Combustion Chamber",
      ja: "燃焼室",
      zh: "燃烧室",
    },
    lead: {
      ko: "연료와 산화제가 만나 타오르는 방이에요. 엔진에서 가장 뜨겁고 압력이 높습니다.",
      en: "The room where fuel and oxidizer meet and burn — the hottest, highest-pressure part of the engine.",
      ja: "燃料と酸化剤が出会って燃える部屋。エンジンで最も高温・高圧の場所です。",
      zh: "燃料与氧化剂相遇燃烧的腔室，是发动机中最热、压力最高的地方。",
    },
    detail: {
      ko: "위쪽 인젝터가 뿌린 연료와 산화제가 여기서 100기압 안팎의 압력으로 격렬히 탑니다. 가스 온도는 3,500 K에 가까워 어떤 금속의 녹는점보다도 높지만, 벽을 구리합금으로 만들고 그 속에 차가운 연료를 흘려(재생냉각) 견딥니다. 압력이 높을수록 같은 크기에서 더 큰 추력을 낼 수 있어, 연소실 압력은 엔진 성능을 가르는 핵심 수치예요. 방 아래는 좁은 목으로 이어져 가스를 노즐로 보냅니다.",
      en: "The fuel and oxidizer sprayed by the injector above burn fiercely here at around 100 atmospheres. The gas nears 3,500 K — hotter than the melting point of any metal — yet the wall survives because it is a copper alloy with cold fuel flowing inside it (regenerative cooling). Higher pressure means more thrust from the same size, so chamber pressure is a defining performance number. The bottom of the room narrows into the throat, sending the gas to the nozzle.",
      ja: "上のインジェクタが噴いた燃料と酸化剤が、ここで 100 気圧前後の圧力で激しく燃えます。ガス温度は 3,500 K 近く、どんな金属の融点より高いのに、壁を銅合金で作り、その中に冷たい燃料を流して（再生冷却）耐えます。圧力が高いほど同じ大きさで大きな推力を出せるため、燃焼室圧はエンジン性能を分ける重要な数値です。部屋の下は狭いスロートに続き、ガスをノズルへ送ります。",
      zh: "上方喷注器喷出的燃料与氧化剂在此以约 100 个大气压剧烈燃烧。燃气接近 3,500 K——高于任何金属的熔点——但壁体用铜合金制成、内部流过冷燃料（再生冷却）得以承受。压力越高，同样体积就能产生更大推力，因此室压是决定发动机性能的关键数字。腔室底部收窄为喉部，把燃气送向喷管。",
    },
    facts: {
      ko: ["역할 — 추진제를 태워 고압 가스 생성", "≈ 100 bar · ≈ 3,500 K", "구리합금 벽 + 재생냉각으로 견딤"],
      en: ["Role — burn propellant into high-P gas", "≈ 100 bar · ≈ 3,500 K", "Copper wall + regen cooling survives it"],
      ja: ["役割 — 推進剤を燃やし高圧ガス生成", "≈ 100 bar · ≈ 3,500 K", "銅合金壁 + 再生冷却で耐える"],
      zh: ["作用 — 燃烧推进剂生成高压燃气", "≈ 100 bar · ≈ 3,500 K", "铜合金壁 + 再生冷却承受"],
    },
  },
  injector: {
    tag: { ko: "INJECTOR", en: "INJECTOR", ja: "INJECTOR", zh: "INJECTOR" },
    spec: "coaxial/pintle spray · O/F ≈ 2.3",
    sources: [
      { label: "Wikipedia · Injector (rocket)", url: "https://en.wikipedia.org/wiki/Injector#Rocket_engines" },
      { label: "Wikipedia · Pintle injector", url: "https://en.wikipedia.org/wiki/Pintle_injector" },
    ],
    title: {
      ko: "인젝터 돔 (Injector)",
      en: "Injector Dome",
      ja: "インジェクタドーム",
      zh: "喷注器穹顶",
    },
    lead: {
      ko: "연소실 천장에서 연료와 산화제를 안개처럼 뿜어 섞어 주는 부품이에요.",
      en: "The part at the top of the chamber that sprays and mixes fuel and oxidizer into a fine mist.",
      ja: "燃焼室の天井で燃料と酸化剤を霧状に噴いて混ぜる部品です。",
      zh: "位于燃烧室顶部、把燃料与氧化剂喷成细雾并混合的部件。",
    },
    detail: {
      ko: "잘 타려면 연료와 산화제가 아주 곱게 섞여야 합니다. 인젝터 면에는 수백 개의 작은 구멍(오리피스)이 격자로 뚫려 있어, 두 추진제를 가는 줄기나 안개로 뿜어 충돌·혼합시켜요. 섞이는 비율(혼합비 O/F)과 골고루 퍼지는 정도가 연소의 안정성과 효율을 좌우합니다. 잘못 설계하면 연소가 진동하며 엔진을 부수는 \"연소 불안정\"이 생기기 때문에, 인젝터는 로켓 엔진에서 가장 까다로운 부품 중 하나로 꼽힙니다.",
      en: "To burn well, fuel and oxidizer must mix very finely. The injector face carries hundreds of tiny holes (orifices) in a grid, spraying the two propellants as thin jets or mist that collide and mix. The mixing ratio (O/F) and how evenly it spreads decide how stable and efficient combustion is. A poor design can make combustion oscillate and tear the engine apart — \"combustion instability\" — which is why the injector is one of the trickiest parts of a rocket engine.",
      ja: "よく燃やすには燃料と酸化剤を非常に細かく混ぜる必要があります。インジェクタ面には数百の小さな穴（オリフィス）が格子状に開き、2 つの推進剤を細い噴流や霧として噴き、衝突・混合させます。混合比（O/F）と均一さが燃焼の安定性と効率を左右します。設計を誤ると燃焼が振動してエンジンを壊す「燃焼不安定」が起きるため、インジェクタはロケットエンジンで最も難しい部品の一つとされます。",
      zh: "要充分燃烧，燃料与氧化剂必须混合得非常细密。喷注器面板上有数百个排成网格的小孔（喷孔），把两种推进剂喷成细射流或雾，使其碰撞混合。混合比（O/F）和喷洒是否均匀决定了燃烧的稳定性与效率。设计不当会使燃烧振荡、撕裂发动机——即“燃烧不稳定”——因此喷注器是火箭发动机中最棘手的部件之一。",
    },
    facts: {
      ko: ["역할 — 연료·산화제 분사·혼합", "수백 개 오리피스 격자", "연소 안정성을 좌우(가장 까다로움)"],
      en: ["Role — spray & mix propellants", "Hundreds of orifices in a grid", "Sets combustion stability (trickiest)"],
      ja: ["役割 — 推進剤の噴射・混合", "数百のオリフィス格子", "燃焼安定性を左右（最難関）"],
      zh: ["作用 — 喷射并混合推进剂", "数百个喷孔网格", "决定燃烧稳定性（最棘手）"],
    },
  },
  turbopump: {
    tag: { ko: "TURBOPUMP", en: "TURBOPUMP", ja: "TURBOPUMP", zh: "TURBOPUMP" },
    spec: "≈ 36,000 rpm · ≈ 7,500 kW · gas-generator driven",
    sources: [
      { label: "Wikipedia · Turbopump", url: "https://en.wikipedia.org/wiki/Turbopump" },
      { label: "Wikipedia · Gas-generator cycle", url: "https://en.wikipedia.org/wiki/Gas-generator_cycle" },
    ],
    title: {
      ko: "터보펌프 (Turbopump)",
      en: "Turbopump",
      ja: "ターボポンプ",
      zh: "涡轮泵",
    },
    lead: {
      ko: "추진제를 고압으로 밀어 넣는 펌프예요. 작은 가스 터빈이 펌프를 돌립니다.",
      en: "The pump that forces propellant in at high pressure — a small gas turbine spins it.",
      ja: "推進剤を高圧で押し込むポンプ。小さなガスタービンが回します。",
      zh: "把推进剂高压泵入的泵，由一台小型燃气涡轮带动旋转。",
    },
    detail: {
      ko: "연소실이 100기압이라면, 연료와 산화제를 그보다 더 높은 압력으로 밀어 넣어야 합니다. 초당 수백 kg을 그 압력으로 보내려면 엄청난 동력이 필요해요. 그래서 추진제 일부를 따로 조금 태우는 \"가스 발생기\"의 배기로 터빈을 분당 수만 회 돌리고, 그 축에 연료 펌프와 산화제 펌프를 함께 매답니다. 이 가스 발생기 사이클은 구조가 단순해 널리 쓰이지만, 터빈을 돌린 가스를 그냥 버리므로 효율은 조금 손해를 봅니다. 터보펌프는 로켓 엔진에서 가장 만들기 어려운 부품으로 꼽혀요.",
      en: "If the chamber runs at 100 atmospheres, the fuel and oxidizer must be pushed in at even higher pressure — and moving hundreds of kilograms per second at that pressure takes enormous power. So a \"gas generator\" burns a little propellant on the side, and its exhaust spins a turbine tens of thousands of times per minute; on the same shaft hang the fuel pump and the oxidizer pump. This gas-generator cycle is simple and widely used, but it throws away the turbine exhaust, costing a little efficiency. The turbopump is considered the hardest part of a rocket engine to build.",
      ja: "燃焼室が 100 気圧なら、燃料と酸化剤はそれより高い圧力で押し込まねばならず、毎秒数百 kg をその圧力で送るには莫大な動力が要ります。そこで推進剤の一部を別に少し燃やす「ガスジェネレータ」の排気でタービンを毎分数万回転させ、同じ軸に燃料ポンプと酸化剤ポンプを付けます。このガスジェネレータサイクルは構造が単純で広く使われますが、タービン排気を捨てるため効率を少し損ないます。ターボポンプはロケットエンジンで最も製作が難しい部品とされます。",
      zh: "如果燃烧室是 100 个大气压，燃料和氧化剂就必须以更高的压力压入——而以该压力每秒输送数百公斤需要巨大的功率。于是用一台“燃气发生器”单独少量燃烧推进剂，其废气驱动涡轮每分钟旋转数万转，同一根轴上挂着燃料泵和氧化剂泵。这种燃气发生器循环结构简单、应用广泛，但会排掉涡轮废气，损失一点效率。涡轮泵被认为是火箭发动机中最难制造的部件。",
    },
    facts: {
      ko: ["역할 — 추진제 고압 가압", "가스 발생기 배기로 터빈 구동", "≈ 36,000 rpm · 가장 만들기 어려움"],
      en: ["Role — pressurize propellant", "Gas-generator exhaust drives turbine", "≈ 36,000 rpm · hardest to build"],
      ja: ["役割 — 推進剤を高圧化", "ガスジェネレータ排気でタービン駆動", "≈ 36,000 rpm · 最も難しい"],
      zh: ["作用 — 加压推进剂", "燃气发生器废气驱动涡轮", "≈ 36,000 rpm · 最难制造"],
    },
  },
  feedlines: {
    tag: { ko: "PROPELLANT FEED", en: "PROPELLANT FEED", ja: "PROPELLANT FEED", zh: "PROPELLANT FEED" },
    spec: "LOX + RP-1 · O/F ≈ 2.3",
    sources: [
      { label: "Wikipedia · Liquid-propellant rocket", url: "https://en.wikipedia.org/wiki/Liquid-propellant_rocket" },
      { label: "Wikipedia · RP-1", url: "https://en.wikipedia.org/wiki/RP-1" },
    ],
    title: {
      ko: "추진제 배관 (Feed Lines)",
      en: "Propellant Feed Lines",
      ja: "推進剤フィードライン",
      zh: "推进剂供应管路",
    },
    lead: {
      ko: "산화제와 연료를 펌프에서 엔진 각 부위로 나르는 관이에요. 색으로 두 경로를 구분했습니다.",
      en: "The pipes carrying oxidizer and fuel from the pumps to the engine — colored to tell the two paths apart.",
      ja: "酸化剤と燃料をポンプからエンジン各部へ運ぶ管。色で 2 つの経路を区別しています。",
      zh: "把氧化剂和燃料从泵输送到发动机各处的管路，用颜色区分两条通道。",
    },
    detail: {
      ko: "이 엔진은 액체산소(LOX)와 정제 케로신(RP-1) 두 가지를 씁니다. 산화제 라인(골드)과 연료 라인(블루)은 터보펌프에서 나와, 연료는 먼저 연소실·노즐 벽의 냉각 채널을 한 바퀴 돌며 벽을 식힌 뒤(재생냉각) 인젝터로 가고, 산화제는 곧장 인젝터로 갑니다. 둘이 섞이는 비율(혼합비 O/F)은 약 2.3 — 산화제가 연료보다 무겁게 들어가요. 매니폴드는 이 흐름을 인젝터 면 전체에 고르게 나눠 줍니다.",
      en: "This engine uses two liquids: liquid oxygen (LOX) and refined kerosene (RP-1). The oxidizer line (gold) and fuel line (blue) leave the turbopump; the fuel first loops through the cooling channels in the chamber and nozzle walls to cool them (regenerative cooling) before reaching the injector, while the oxidizer goes straight there. Their mixing ratio (O/F) is about 2.3 — more oxidizer than fuel by mass. The manifold spreads this flow evenly across the whole injector face.",
      ja: "このエンジンは液体酸素（LOX）と精製ケロシン（RP-1）の 2 つを使います。酸化剤ライン（ゴールド）と燃料ライン（ブルー）はターボポンプから出て、燃料はまず燃焼室・ノズル壁の冷却チャンネルを一巡して壁を冷やし（再生冷却）からインジェクタへ、酸化剤はそのままインジェクタへ向かいます。混合比（O/F）は約 2.3 — 酸化剤が燃料より重く入ります。マニホールドはこの流れをインジェクタ面全体へ均等に分けます。",
      zh: "这台发动机使用两种液体：液氧（LOX）和精炼煤油（RP-1）。氧化剂管路（金色）与燃料管路（蓝色）从涡轮泵引出；燃料先绕行燃烧室和喷管壁内的冷却通道为其降温（再生冷却）再进入喷注器，氧化剂则直接进入。两者的混合比（O/F）约为 2.3——按质量氧化剂多于燃料。歧管把这股流均匀分配到整个喷注器面板。",
    },
    facts: {
      ko: ["역할 — 추진제 운반·분배", "산화제(골드) · 연료(블루) 경로", "연료가 벽을 식히고 들어감(O/F ≈ 2.3)"],
      en: ["Role — carry & distribute propellant", "Oxidizer (gold) · fuel (blue) paths", "Fuel cools the walls first (O/F ≈ 2.3)"],
      ja: ["役割 — 推進剤の運搬・分配", "酸化剤（ゴールド）· 燃料（ブルー）経路", "燃料が壁を冷やしてから供給（O/F ≈ 2.3）"],
      zh: ["作用 — 输送与分配推进剂", "氧化剂（金）· 燃料（蓝）通道", "燃料先冷却壁体再供入（O/F ≈ 2.3）"],
    },
  },
  gimbal: {
    tag: { ko: "GIMBAL MOUNT", en: "GIMBAL MOUNT", ja: "GIMBAL MOUNT", zh: "GIMBAL MOUNT" },
    spec: "TVC ±5–8° · thrust mount",
    sources: [
      { label: "Wikipedia · Gimbaled thrust", url: "https://en.wikipedia.org/wiki/Gimbaled_thrust" },
      { label: "Wikipedia · Thrust vectoring", url: "https://en.wikipedia.org/wiki/Thrust_vectoring" },
    ],
    title: {
      ko: "짐벌 마운트 (Gimbal)",
      en: "Gimbal Mount",
      ja: "ジンバルマウント",
      zh: "万向架 (Gimbal)",
    },
    lead: {
      ko: "엔진을 로켓에 매다는 맨 위 구조물이에요. 엔진을 기울여 비행 방향을 잡습니다.",
      en: "The structure at the top that hangs the engine on the rocket — tilting it to steer the flight.",
      ja: "エンジンをロケットに取り付ける最上部の構造。エンジンを傾けて飛行方向を制御します。",
      zh: "把发动机挂在火箭上的顶部结构，通过倾斜发动机来操控飞行方向。",
    },
    detail: {
      ko: "엔진의 모든 추력은 이 마운트를 통해 로켓 본체로 전달됩니다. 동시에 짐벌은 엔진 전체가 몇 도씩 좌우로 기울 수 있게 해, 추력의 방향을 바꿔 로켓을 조종해요(추력 벡터 제어, TVC). 화살을 꼬리 깃으로 잡는 것과 달리, 로켓은 무게중심 아래에서 미는 힘의 방향을 틀어 균형을 잡습니다. 유압이나 전기 액추에이터가 짐벌을 밀어 매 순간 자세를 미세하게 보정해요. 이 한 점에 수백 톤의 추력과 진동이 모이므로 매우 튼튼하게 만듭니다.",
      en: "All of the engine's thrust passes through this mount into the rocket's body. At the same time, the gimbal lets the whole engine tilt a few degrees, redirecting the thrust to steer the rocket (thrust vector control, TVC). Unlike an arrow steadied by tail feathers, a rocket balances by aiming the pushing force below its center of mass. Hydraulic or electric actuators nudge the gimbal to trim the attitude moment by moment. Hundreds of tonnes of thrust and vibration converge on this one point, so it is built to be extremely strong.",
      ja: "エンジンの全推力はこのマウントを通ってロケット本体へ伝わります。同時にジンバルはエンジン全体を数度傾けられるようにし、推力の向きを変えてロケットを操縦します（推力偏向制御、TVC）。尾羽で安定させる矢と違い、ロケットは重心の下で押す力の向きを変えてバランスを取ります。油圧や電動アクチュエータがジンバルを押し、姿勢を刻々と微修正します。数百トンの推力と振動がこの一点に集まるため、極めて頑丈に作られます。",
      zh: "发动机的全部推力都经由这个安装座传入火箭主体。同时，万向架让整台发动机能倾斜几度，改变推力方向来操控火箭（推力矢量控制，TVC）。与靠尾羽稳定的箭不同，火箭是通过调整重心之下推力的方向来保持平衡。液压或电动作动器推动万向架，时刻微调姿态。数百吨的推力与振动汇集于这一点，因此造得极为坚固。",
    },
    facts: {
      ko: ["역할 — 추력 전달 + 방향 조종(TVC)", "엔진을 기울여 추력 방향을 바꿈", "수백 톤 추력이 모이는 구조점"],
      en: ["Role — carry thrust + steer (TVC)", "Tilts the engine to aim the thrust", "Where hundreds of tonnes converge"],
      ja: ["役割 — 推力伝達 + 操舵（TVC）", "エンジンを傾け推力方向を変える", "数百トンが集まる構造点"],
      zh: ["作用 — 传递推力 + 操控方向（TVC）", "倾斜发动机改变推力方向", "数百吨推力汇集的结构点"],
    },
  },
};
