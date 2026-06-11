import type { PartInfoMap } from "@app/shared/r3f/model";

/**
 * 인공위성 공통 부품 설명(다국어) — 두 모델(eo-satellite·comsat)이 공유.
 * 각 모델 data.ts가 `...commonSatInfo`로 펼친 뒤 자기 antenna·payload만 덧붙인다.
 * 버스(MLI 포함)·태양전지판·반작용 휠(자세)·추진·배터리(전력 저장).
 */
export const commonSatInfo: PartInfoMap = {
  bus: {
    tag: { ko: "SATELLITE BUS", en: "SATELLITE BUS", ja: "SATELLITE BUS", zh: "SATELLITE BUS" },
    spec: "≈ 2 × 2 × 3 m · ≈ 2,000 kg · MLI-wrapped",
    sources: [
      { label: "Wikipedia · Satellite bus", url: "https://en.wikipedia.org/wiki/Satellite_bus" },
      { label: "Wikipedia · Multilayer insulation", url: "https://en.wikipedia.org/wiki/Multi-layer_insulation" },
    ],
    title: { ko: "본체 / 버스 (Bus)", en: "Satellite Bus", ja: "衛星バス（本体）", zh: "卫星平台（本体）" },
    lead: {
      ko: "위성의 몸체예요. 금박으로 감싼 이 상자 안에 거의 모든 장비가 들어갑니다.",
      en: "The body of the satellite — this gold-wrapped box holds nearly all the equipment.",
      ja: "衛星の本体。金箔で包まれたこの箱に、ほぼ全ての機器が収まります。",
      zh: "卫星的主体——这个包着金箔的箱子里装着几乎所有设备。",
    },
    detail: {
      ko: "버스는 임무 장비(탑재체)를 뺀 \"공통 부분\"으로, 전력·자세 제어·통신·추진·열 관리를 모두 책임지는 트럭 같은 토대입니다. 같은 버스에 카메라를 실으면 관측 위성, 중계기를 실으면 통신 위성이 되죠. 겉을 감싼 번쩍이는 금색은 장식이 아니라 다층 단열재(MLI)예요. 얇은 막을 여러 겹 겹쳐, 햇빛을 받는 면(120°C 이상)과 그늘진 면(영하 100°C 이하)의 극단적인 온도차로부터 내부 전자장비를 지킵니다.",
      en: "The bus is the \"common part\" — everything except the mission payload — a truck-like foundation that handles power, attitude control, communications, propulsion and thermal management. Put a camera on the same bus and it is an observation satellite; put a transponder on it and it is a comms satellite. The shiny gold skin is not decoration but multi-layer insulation (MLI): many thin films stacked together that protect the electronics from the extreme swing between the sunlit side (over 120°C) and the shaded side (below −100°C).",
      ja: "バスは任務機器（ペイロード）を除いた「共通部分」で、電力・姿勢制御・通信・推進・熱管理を担うトラックのような土台です。同じバスにカメラを載せれば観測衛星、中継器を載せれば通信衛星になります。表面の輝く金色は装飾ではなく多層断熱材（MLI）。薄い膜を何層も重ね、日向（120°C 超）と日陰（−100°C 以下）の極端な温度差から内部の電子機器を守ります。",
      zh: "平台是除任务载荷外的“通用部分”，像卡车一样的底座，负责供电、姿态控制、通信、推进与热管理。同一平台装上相机就是观测卫星，装上转发器就是通信卫星。表面闪亮的金色不是装饰，而是多层隔热材料（MLI）：把许多薄膜叠在一起，保护内部电子设备免受向阳面（超过 120°C）与背阴面（低于 −100°C）之间剧烈温差的影响。",
    },
    facts: {
      ko: ["역할 — 모든 서브시스템의 토대", "탑재체만 바꾸면 임무가 바뀜", "금색 = MLI 다층 단열(장식 아님)"],
      en: ["Role — foundation for all subsystems", "Swap the payload, swap the mission", "Gold = MLI thermal insulation, not decor"],
      ja: ["役割 — 全サブシステムの土台", "ペイロードを替えれば任務が変わる", "金色 = MLI 多層断熱（装飾でない）"],
      zh: ["作用 — 所有分系统的底座", "换载荷即换任务", "金色 = MLI 多层隔热（非装饰）"],
    },
  },
  solar: {
    tag: { ko: "POWER · SOLAR", en: "POWER · SOLAR", ja: "POWER · SOLAR", zh: "POWER · SOLAR" },
    spec: "deployed span ≈ 20 m · ≈ 8 kW",
    sources: [{ label: "Wikipedia · Solar panels on spacecraft", url: "https://en.wikipedia.org/wiki/Solar_panels_on_spacecraft" }],
    title: { ko: "태양전지판 (Solar Array)", en: "Solar Array", ja: "太陽電池パドル", zh: "太阳能电池阵" },
    lead: {
      ko: "햇빛을 전기로 바꾸는 날개예요. 위성의 모든 전력이 여기서 나옵니다.",
      en: "The wings that turn sunlight into electricity — all the satellite's power starts here.",
      ja: "太陽光を電気に変える翼。衛星の全電力はここから生まれます。",
      zh: "把阳光转化为电的翅膀——卫星的全部电力都从这里来。",
    },
    detail: {
      ko: "우주에는 연료를 태울 공기가 없으니, 위성은 태양전지로 전기를 만듭니다. 발사 때는 접어 두었다가 궤도에서 양쪽으로 길게 펼쳐 햇빛을 최대한 받아요. 패널은 작은 셀 수천 개를 잇고, 보통 태양을 따라 천천히 회전(추적)해 효율을 유지합니다. 만든 전기는 장비를 돌리고, 남는 건 배터리에 저장해 위성이 지구 그림자(음지)에 들어갔을 때 씁니다.",
      en: "There is no air in space to burn fuel, so a satellite makes electricity from solar cells. The arrays are folded at launch, then deployed into long wings in orbit to catch as much sunlight as possible. A panel wires together thousands of small cells and usually rotates slowly to track the Sun for efficiency. The power runs the equipment, and the surplus is stored in batteries for when the satellite passes through Earth's shadow (eclipse).",
      ja: "宇宙には燃料を燃やす空気がないため、衛星は太陽電池で電気を作ります。打ち上げ時は畳んでおき、軌道で両側に長く広げて太陽光を最大限受けます。パネルは小さなセルを数千個つなぎ、通常は太陽を追って（追尾）効率を保ちます。作った電気は機器を動かし、余りはバッテリーに蓄えて、衛星が地球の影（食）に入った時に使います。",
      zh: "太空中没有空气燃烧燃料，所以卫星用太阳能电池发电。发射时折叠，入轨后向两侧展开成长翼，尽量多接收阳光。一块板把数千个小电池片连在一起，通常缓慢转动追踪太阳以保持效率。所发的电驱动设备，多余的存入电池，供卫星进入地球阴影（食）时使用。",
    },
    facts: {
      ko: ["역할 — 햇빛 → 전기(주 전원)", "궤도에서 펼쳐 태양 추적", "남는 전력은 배터리에 저장"],
      en: ["Role — sunlight → electricity (main power)", "Deploys in orbit, tracks the Sun", "Surplus stored in batteries"],
      ja: ["役割 — 太陽光 → 電気（主電源）", "軌道で展開し太陽を追尾", "余剰はバッテリーへ貯蔵"],
      zh: ["作用 — 阳光 → 电（主电源）", "入轨展开并追踪太阳", "余电存入电池"],
    },
  },
  adcs: {
    tag: { ko: "ATTITUDE · ADCS", en: "ATTITUDE · ADCS", ja: "ATTITUDE · ADCS", zh: "ATTITUDE · ADCS" },
    spec: "reaction wheels ~ 6,000 rpm · pointing ~ 0.02°",
    sources: [
      { label: "Wikipedia · Reaction wheel", url: "https://en.wikipedia.org/wiki/Reaction_wheel" },
      { label: "Wikipedia · Attitude control", url: "https://en.wikipedia.org/wiki/Attitude_control" },
    ],
    title: { ko: "반작용 휠 (자세 제어)", en: "Reaction Wheels (ADCS)", ja: "リアクションホイール（姿勢制御）", zh: "反作用轮（姿态控制）" },
    lead: {
      ko: "위성이 어디를 바라볼지 정하는 장치예요. 연료 없이 바퀴를 돌려 방향을 바꿉니다.",
      en: "The device that decides where the satellite looks — it turns wheels to rotate without using fuel.",
      ja: "衛星がどこを向くかを決める装置。燃料を使わず、ホイールを回して向きを変えます。",
      zh: "决定卫星朝向的装置——靠转动飞轮改变方向，不消耗燃料。",
    },
    detail: {
      ko: "우주에는 발붙일 바닥이 없어서, 위성은 \"각운동량 보존\"을 이용해 자세를 바꿉니다. 안에 든 무거운 바퀴(반작용 휠)를 모터로 빠르게 돌리면, 그 반작용으로 위성 본체가 반대로 천천히 돕니다. 바퀴 속도를 조절하는 것만으로 연료 한 방울 없이 카메라나 안테나를 원하는 곳에 정밀하게(약 0.02°) 겨눌 수 있어요. 지금 어느 방향인지는 별의 위치를 읽는 별 추적기(star tracker) 같은 센서가 알려 줍니다.",
      en: "With no ground to push against in space, a satellite changes attitude using conservation of angular momentum. A motor spins heavy wheels (reaction wheels) inside; by reaction, the satellite body turns slowly the other way. Just by adjusting wheel speed it can aim a camera or antenna precisely (around 0.02°) without a drop of fuel. Which way it currently points is told by sensors such as a star tracker that reads the positions of stars.",
      ja: "宇宙には踏ん張る地面がないので、衛星は「角運動量保存」を使って姿勢を変えます。内部の重いホイール（リアクションホイール）をモーターで速く回すと、その反作用で衛星本体がゆっくり逆に回ります。ホイール速度を調整するだけで、燃料なしにカメラやアンテナを精密（約 0.02°）に向けられます。今どの向きかは、星の位置を読むスタートラッカーなどのセンサーが教えます。",
      zh: "太空中没有可借力的地面，卫星靠“角动量守恒”改变姿态。电机让内部的重飞轮（反作用轮）快速旋转，凭反作用使星体缓慢反向转动。只需调节飞轮转速，就能不耗一滴燃料地把相机或天线精确指向（约 0.02°）。当前朝向由星敏感器等传感器通过读取恒星位置来判定。",
    },
    facts: {
      ko: ["역할 — 자세(지향) 제어", "바퀴를 돌려 연료 없이 회전", "별 추적기로 방향을 인지"],
      en: ["Role — attitude (pointing) control", "Spins wheels to turn, no fuel", "Star tracker senses orientation"],
      ja: ["役割 — 姿勢（指向）制御", "ホイールを回し燃料なしで回転", "スタートラッカーで方向を認識"],
      zh: ["作用 — 姿态（指向）控制", "转动飞轮旋转，不耗燃料", "星敏感器感知朝向"],
    },
  },
  propulsion: {
    tag: { ko: "PROPULSION", en: "PROPULSION", ja: "PROPULSION", zh: "PROPULSION" },
    spec: "hydrazine thrusters · station-keeping ΔV",
    sources: [{ label: "Wikipedia · Spacecraft propulsion", url: "https://en.wikipedia.org/wiki/Spacecraft_propulsion" }],
    title: { ko: "추진 모듈 (Propulsion)", en: "Propulsion Module", ja: "推進モジュール", zh: "推进模块" },
    lead: {
      ko: "작은 추력기와 추진제 탱크예요. 궤도를 미세하게 유지·조정합니다.",
      en: "Small thrusters and a propellant tank — they keep and fine-tune the orbit.",
      ja: "小さなスラスタと推進剤タンク。軌道を微妙に維持・調整します。",
      zh: "小推力器和推进剂贮箱——用于维持和微调轨道。",
    },
    detail: {
      ko: "궤도에 한 번 올라가도 위성은 가만히 있지 못해요. 옅은 대기의 저항, 지구의 울퉁불퉁한 중력, 태양·달의 인력이 조금씩 궤도를 흐트러뜨립니다. 추진 모듈은 탱크의 추진제(흔히 하이드라진)를 작은 추력기로 내뿜어 이 흐트러짐을 보정하고(궤도 유지·station-keeping), 자세 제어를 돕거나 임무 말기에 궤도를 정리(폐기)합니다. 연료가 바닥나면 위성의 수명이 끝나므로, 추진제 양이 곧 위성의 \"남은 수명\"이에요.",
      en: "Even once in orbit, a satellite cannot just sit still. Thin atmospheric drag, Earth's lumpy gravity, and the pull of the Sun and Moon slowly disturb its orbit. The propulsion module fires propellant from its tank (often hydrazine) through small thrusters to correct this drift (station-keeping), assist attitude control, and dispose of the orbit at end of life. When the propellant runs out the satellite's life ends — so the amount of propellant is effectively its \"remaining lifetime.\"",
      ja: "軌道に乗っても衛星はじっとしていられません。希薄な大気抵抗、地球の凸凹な重力、太陽や月の引力が少しずつ軌道を乱します。推進モジュールはタンクの推進剤（多くはヒドラジン）を小さなスラスタから噴いてこのずれを補正し（軌道維持・station-keeping）、姿勢制御を助け、運用末期に軌道を片付けます。推進剤が尽きると衛星の寿命が終わるため、推進剤の量が事実上「残り寿命」です。",
      zh: "即使入轨，卫星也无法静止不动。稀薄大气阻力、地球不均匀的引力、日月引力都会一点点扰动其轨道。推进模块用小推力器从贮箱喷出推进剂（常为肼）来修正这种漂移（位置保持），辅助姿态控制，并在任务末期处置轨道。推进剂用尽时卫星寿命即终，因此推进剂量实际上就是它的“剩余寿命”。",
    },
    facts: {
      ko: ["역할 — 궤도 유지·조정", "대기저항·중력 섭동을 보정", "추진제 = 위성의 남은 수명"],
      en: ["Role — keep & adjust the orbit", "Corrects drag & gravity perturbations", "Propellant = remaining lifetime"],
      ja: ["役割 — 軌道の維持・調整", "大気抵抗・重力摂動を補正", "推進剤 = 残り寿命"],
      zh: ["作用 — 维持与调整轨道", "修正阻力与引力摄动", "推进剂 = 剩余寿命"],
    },
  },
  battery: {
    tag: { ko: "POWER · BATTERY", en: "POWER · BATTERY", ja: "POWER · BATTERY", zh: "POWER · BATTERY" },
    spec: "Li-ion pack · powers the eclipse",
    sources: [{ label: "Wikipedia · Satellite", url: "https://en.wikipedia.org/wiki/Satellite#Power" }],
    title: { ko: "배터리 (Battery)", en: "Battery", ja: "バッテリー", zh: "电池" },
    lead: {
      ko: "전력을 저장하는 팩이에요. 위성이 지구 그림자에 들어가면 여기서 전기를 씁니다.",
      en: "The pack that stores power — when the satellite enters Earth's shadow, it runs on this.",
      ja: "電力を蓄えるパック。衛星が地球の影に入ると、ここから電気を使います。",
      zh: "储存电力的电池组——当卫星进入地球阴影时，靠它供电。",
    },
    detail: {
      ko: "위성은 궤도를 돌며 주기적으로 지구 그림자(음지)에 들어가는데, 그동안은 햇빛이 없어 태양전지가 일을 못 합니다. 배터리는 햇빛이 있을 때 남는 전기를 저장해 두었다가, 음지 구간 동안 위성 전체에 전력을 공급해요. 저궤도 위성은 약 90분마다 한 번씩, 하루에 십수 번 충·방전을 반복하기 때문에 수명이 다할 때까지 수만 번을 버티는 내구성이 중요합니다. 요즘은 가볍고 효율 좋은 리튬이온을 주로 씁니다.",
      en: "As it orbits, a satellite periodically enters Earth's shadow (eclipse), where there is no sunlight and the solar arrays cannot work. The battery stores surplus power while in sunlight and supplies the whole satellite during eclipse. A low-orbit satellite charges and discharges once roughly every 90 minutes — over a dozen times a day — so enduring tens of thousands of cycles over its life matters. Modern satellites mostly use light, efficient lithium-ion cells.",
      ja: "周回するうちに衛星は周期的に地球の影（食）に入り、その間は太陽光がなく太陽電池が働けません。バッテリーは日照中の余剰電力を蓄え、食の間に衛星全体へ給電します。低軌道衛星は約 90 分ごと・1 日に十数回も充放電を繰り返すため、寿命まで数万回耐える耐久性が重要です。近年は軽く効率の良いリチウムイオンが主流です。",
      zh: "在环绕过程中，卫星会周期性进入地球阴影（食），此时没有阳光、太阳能电池无法工作。电池在日照时储存多余电力，在食期间为整星供电。低轨卫星约每 90 分钟充放电一次、一天十几次，因此在寿命内承受数万次循环的耐久性很重要。如今多采用轻便高效的锂离子电池。",
    },
    facts: {
      ko: ["역할 — 음지 구간 전력 공급", "햇빛 때 충전 → 그림자 때 방전", "하루 십수 번, 수만 회 충·방전"],
      en: ["Role — power during eclipse", "Charge in sun → discharge in shadow", "Dozens/day, tens of thousands of cycles"],
      ja: ["役割 — 食の間の給電", "日照で充電 → 影で放電", "1日十数回・数万サイクル"],
      zh: ["作用 — 食期间供电", "日照充电 → 阴影放电", "每天十几次、数万次循环"],
    },
  },
};
