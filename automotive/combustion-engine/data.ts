import type { PartInfoMap } from "@app/shared/r3f/model";

/**
 * 내연기관 엔진(직렬 4기통 DOHC) 부품 설명 (다국어).
 * 핵심 학습 포인트: 4행정(흡입-압축-폭발-배기) 사이클 —
 * 연료의 폭발(직선 운동)을 크랭크샤프트가 회전 운동으로 바꾼다. 전기 동력계와의 대비.
 */
export const combustionEngineInfo: PartInfoMap = {
  valvecover: {
    tag: { ko: "COVER", en: "COVER", ja: "COVER", zh: "COVER" },
    spec: "cast Al/Mg · sealed",
    sources: [{ label: "Wikipedia · Rocker cover", url: "https://en.wikipedia.org/wiki/Rocker_cover" }],
    title: { ko: "밸브 커버 (Valve Cover)", en: "Valve Cover", ja: "バルブカバー", zh: "气门室盖" },
    lead: {
      ko: "엔진 맨 위를 덮는 뚜껑이에요. 캠샤프트와 밸브 기구를 보호합니다.",
      en: "The lid on top of the engine — it shields the camshafts and valve gear.",
      ja: "エンジンの最上部を覆う蓋。カムシャフトとバルブ機構を守ります。",
      zh: "发动机顶部的盖子，保护凸轮轴与气门机构。",
    },
    detail: {
      ko: "그 아래의 캠샤프트·밸브는 윤활유를 뒤집어쓰며 빠르게 움직입니다. 밸브 커버는 그 오일이 튀어 나가지 않게 가두고, 먼지가 들어가지 않게 막아요. 엔진을 분해할 때 가장 먼저 여는 부품이라, 정비의 출발점이기도 합니다.",
      en: "Beneath it, the camshafts and valves move fast while bathed in oil. The cover keeps that oil in and dirt out. It is the first part removed when tearing an engine down — the starting point of any service.",
      ja: "その下ではカムシャフトとバルブが潤滑油を浴びながら高速で動きます。バルブカバーはそのオイルを閉じ込め、埃の侵入を防ぎます。エンジン分解で最初に外す部品であり、整備の出発点です。",
      zh: "盖下的凸轮轴与气门浸着机油高速运动。气门室盖把机油留在里面、把灰尘挡在外面。它是拆解发动机时最先卸下的部件——维修的起点。",
    },
    facts: {
      ko: ["역할 — 밸브 기구 보호·오일 밀봉", "분해의 시작점", "주조 알루미늄/마그네슘"],
      en: ["Role — protect valve gear, seal oil", "First step of teardown", "Cast aluminum/magnesium"],
      ja: ["役割 — バルブ機構の保護・オイル密封", "分解の出発点", "鋳造アルミ/マグネシウム"],
      zh: ["作用 — 保护气门机构·密封机油", "拆解的起点", "铸铝/镁"],
    },
  },
  camshaft: {
    tag: { ko: "VALVETRAIN", en: "VALVETRAIN", ja: "VALVETRAIN", zh: "VALVETRAIN" },
    spec: "DOHC ×2 · ½ crank speed",
    sources: [{ label: "Wikipedia · Camshaft", url: "https://en.wikipedia.org/wiki/Camshaft" }],
    title: { ko: "캠샤프트 (Camshaft)", en: "Camshaft", ja: "カムシャフト", zh: "凸轮轴" },
    lead: {
      ko: "달걀 모양 돌기(캠)가 달린 축이에요. 돌면서 밸브를 정확한 타이밍에 여닫습니다.",
      en: "Shafts with egg-shaped lobes that open and close the valves at exactly the right time.",
      ja: "卵形の突起（カム）が付いた軸。回転しながらバルブを正確なタイミングで開閉します。",
      zh: "带蛋形凸起（凸轮）的轴，旋转时按精确时机开闭气门。",
    },
    detail: {
      ko: "실린더마다 공기를 들이는 흡기 밸브와 배기가스를 내보내는 배기 밸브가 있고, 캠 로브가 회전하며 그것들을 밀어 엽니다. 흡기·배기 캠을 따로 두는 방식이 DOHC예요. 타이밍 벨트/체인으로 크랭크샤프트와 묶여 정확히 절반 속도로 돕니다 — 4행정은 크랭크 2회전에 밸브가 1번씩만 열려야 하기 때문입니다.",
      en: "Each cylinder has intake valves that let air in and exhaust valves that let burnt gas out; the rotating lobes push them open. Having separate intake and exhaust camshafts is the DOHC layout. A timing belt or chain ties them to the crankshaft at exactly half its speed — in a four-stroke engine each valve must open once per two crank revolutions.",
      ja: "各シリンダーには空気を入れる吸気バルブと排気ガスを出す排気バルブがあり、回転するカムロブがそれらを押し開けます。吸気・排気カムを別々に持つのが DOHC です。タイミングベルト/チェーンでクランクシャフトと結ばれ、正確にその半分の速度で回ります — 4 ストロークではクランク 2 回転にバルブが 1 回だけ開く必要があるためです。",
      zh: "每个气缸都有进气门（进空气）和排气门（排废气），旋转的凸轮把它们顶开。进、排气凸轮轴分开布置就是 DOHC。它由正时皮带/链条与曲轴相连，转速恰为曲轴一半——因为四冲程中每两圈曲轴气门只开一次。",
    },
    facts: {
      ko: ["역할 — 밸브 개폐 타이밍", "DOHC = 흡기·배기 캠 분리", "크랭크의 절반 속도로 회전"],
      en: ["Role — time the valves", "DOHC = separate intake/exhaust cams", "Spins at half crank speed"],
      ja: ["役割 — バルブ開閉のタイミング", "DOHC = 吸排気カム分離", "クランクの半分の速度で回転"],
      zh: ["作用 — 控制气门时机", "DOHC = 进排气凸轮分离", "转速为曲轴一半"],
    },
  },
  head: {
    tag: { ko: "CYLINDER HEAD", en: "CYLINDER HEAD", ja: "CYLINDER HEAD", zh: "CYLINDER HEAD" },
    spec: "cast Al · combustion chambers",
    sources: [{ label: "Wikipedia · Cylinder head", url: "https://en.wikipedia.org/wiki/Cylinder_head" }],
    title: { ko: "실린더 헤드 (Cylinder Head)", en: "Cylinder Head", ja: "シリンダーヘッド", zh: "气缸盖" },
    lead: {
      ko: "실린더 위를 덮어 연소실을 만드는 부품이에요. 점화플러그와 밸브가 여기 박혀 있습니다.",
      en: "It caps the cylinders to form the combustion chambers — the spark plugs and valves live here.",
      ja: "シリンダーの上を覆い燃焼室を作る部品。点火プラグとバルブがここに収まります。",
      zh: "盖住气缸顶部、构成燃烧室的部件——火花塞与气门都装在这里。",
    },
    detail: {
      ko: "피스톤이 압축한 혼합기가 폭발하는 ‘방’의 천장이 바로 헤드 아랫면의 연소실입니다. 공기·연료가 드나드는 흡기·배기 포트, 불꽃을 튀기는 점화플러그, 밸브가 전부 여기 모여 있어요. 폭발 압력과 열을 정면으로 받기 때문에 냉각수 통로가 안에 깔려 있습니다.",
      en: "The 'room' where the compressed mixture explodes has its ceiling in the head's underside — the combustion chambers. The intake and exhaust ports, the spark plugs and the valves all gather here. Facing the full force and heat of combustion, it carries coolant passages inside.",
      ja: "ピストンが圧縮した混合気が爆発する『部屋』の天井が、ヘッド下面の燃焼室です。空気と燃料が出入りする吸排気ポート、火花を飛ばす点火プラグ、バルブがすべてここに集まります。爆発の圧力と熱を正面から受けるため、内部に冷却水路が通っています。",
      zh: "压缩混合气爆燃的“房间”，其天花板就是缸盖底面的燃烧室。进排气道、火花塞、气门全都汇集于此。它直面爆燃的压力与高温，内部布有冷却水道。",
    },
    facts: {
      ko: ["역할 — 연소실 형성", "포트·플러그·밸브의 집", "내부에 냉각수 통로"],
      en: ["Role — form the combustion chambers", "Home of ports, plugs and valves", "Coolant passages inside"],
      ja: ["役割 — 燃焼室の形成", "ポート・プラグ・バルブの家", "内部に冷却水路"],
      zh: ["作用 — 构成燃烧室", "气道·火花塞·气门之家", "内置冷却水道"],
    },
  },
  block: {
    tag: { ko: "BLOCK", en: "BLOCK", ja: "BLOCK", zh: "BLOCK" },
    spec: "inline-4 · ≈ 2.0 L",
    sources: [{ label: "Wikipedia · Engine block", url: "https://en.wikipedia.org/wiki/Engine_block" }],
    title: { ko: "실린더 블록 (Engine Block)", en: "Engine Block", ja: "シリンダーブロック", zh: "气缸体" },
    lead: {
      ko: "엔진의 몸통이에요. 피스톤이 오르내리는 매끈한 원통(보어) 4개가 파여 있습니다.",
      en: "The engine's body — bored with four smooth cylinders where the pistons travel.",
      ja: "エンジンの胴体。ピストンが上下する滑らかな円筒（ボア）が 4 つ掘られています。",
      zh: "发动机的躯干，镗有四个供活塞上下运动的光滑圆筒（缸膛）。",
    },
    detail: {
      ko: "모든 부품이 이 블록에 조립되고, 폭발의 힘도 결국 블록이 버팁니다. 보어 안쪽 벽은 피스톤이 수억 번 왕복해도 닳지 않게 정밀 가공·코팅되고, 벽 사이에는 냉각수가 도는 워터재킷이 숨어 있어요. 배기량(예: 2.0 L)은 이 보어 4개의 부피를 합한 값입니다.",
      en: "Every part bolts to this block, and the force of combustion is ultimately braced by it. The bore walls are precision-machined and coated to survive hundreds of millions of piston strokes, and water jackets for coolant hide between the walls. Displacement (e.g. 2.0 L) is the combined volume of these four bores.",
      ja: "すべての部品がこのブロックに組み付けられ、爆発の力も最終的にブロックが受け止めます。ボアの内壁はピストンが数億回往復しても摩耗しないよう精密加工・コーティングされ、壁の間には冷却水が巡るウォータージャケットが隠れています。排気量（例: 2.0 L）はこのボア 4 本の容積の合計です。",
      zh: "所有部件都装配在缸体上，爆燃之力最终也由它承受。缸膛内壁经精密加工与涂层处理，可承受活塞数亿次往复；壁间藏有冷却水套。排量（如 2.0 L）就是这四个缸膛容积之和。",
    },
    facts: {
      ko: ["역할 — 엔진의 골격·보어 제공", "벽 사이 워터재킷(냉각)", "보어 4개 부피 = 배기량"],
      en: ["Role — the engine's skeleton & bores", "Water jackets between walls", "Four bores' volume = displacement"],
      ja: ["役割 — エンジンの骨格・ボア提供", "壁間にウォータージャケット", "ボア4本の容積 = 排気量"],
      zh: ["作用 — 发动机骨架与缸膛", "壁间水套冷却", "四缸容积 = 排量"],
    },
  },
  piston: {
    tag: { ko: "PISTON", en: "PISTON", ja: "PISTON", zh: "PISTON" },
    spec: "forged Al · 4-stroke cycle",
    sources: [{ label: "Wikipedia · Four-stroke engine", url: "https://en.wikipedia.org/wiki/Four-stroke_engine" }],
    title: { ko: "피스톤 (Piston)", en: "Piston", ja: "ピストン", zh: "活塞" },
    lead: {
      ko: "폭발의 압력을 정면으로 받아 직선 운동을 만드는 부품이에요. 4행정의 주인공입니다.",
      en: "The part that takes the blast head-on and turns it into straight-line motion — the star of the four-stroke cycle.",
      ja: "爆発の圧力を正面から受けて直線運動を生む部品。4 ストロークの主役です。",
      zh: "正面承受爆燃压力、产生直线运动的部件——四冲程的主角。",
    },
    detail: {
      ko: "피스톤은 한 사이클에 네 번 움직입니다(4행정): ① 흡입 — 내려가며 혼합기를 빨아들이고 ② 압축 — 올라가며 좁게 짓누르고 ③ 폭발 — 점화로 터진 가스에 밀려 내려가고(여기서만 힘이 나옵니다) ④ 배기 — 올라가며 연소 가스를 밀어냅니다. 이 모델의 피스톤 4개 높이가 다른 건 크랭크 위상(1·4 위, 2·3 아래) 때문이에요 — 네 실린더가 폭발을 번갈아 맡아 회전이 끊기지 않습니다.",
      en: "A piston moves four times per cycle (the four strokes): ① intake — it descends, drawing in the mixture; ② compression — it rises, squeezing it tight; ③ power — ignited gas blasts it down (the only stroke that makes power); ④ exhaust — it rises, pushing the burnt gas out. The four pistons in this model sit at different heights because of crank phasing (1 & 4 up, 2 & 3 down) — the cylinders take turns firing so rotation never stalls.",
      ja: "ピストンは 1 サイクルに 4 回動きます（4 ストローク）: ① 吸気 — 下がって混合気を吸い込み ② 圧縮 — 上がって押し縮め ③ 燃焼（爆発）— 点火で膨張したガスに押されて下がり（ここでだけ力が出ます）④ 排気 — 上がって燃焼ガスを押し出します。このモデルの 4 つのピストンの高さが違うのはクランク位相（1・4 上、2・3 下）のため — 4 気筒が交代で爆発を受け持ち、回転が途切れません。",
      zh: "活塞每个循环动四次（四冲程）：① 进气——下行吸入混合气；② 压缩——上行将其压紧；③ 做功——点火后的燃气把它推下（唯一输出动力的冲程）；④ 排气——上行排出废气。本模型四个活塞高度不同，是因为曲轴相位（1、4 在上，2、3 在下）——四缸轮流做功，旋转永不间断。",
    },
    facts: {
      ko: ["역할 — 폭발 → 직선 운동", "흡입·압축·폭발·배기 4행정", "4기통이 번갈아 폭발(1-3-4-2)"],
      en: ["Role — blast → linear motion", "Intake·compress·power·exhaust", "Cylinders fire in turn (1-3-4-2)"],
      ja: ["役割 — 爆発 → 直線運動", "吸気・圧縮・燃焼・排気の4行程", "4気筒が交代で燃焼(1-3-4-2)"],
      zh: ["作用 — 爆燃 → 直线运动", "进气·压缩·做功·排气", "四缸轮流做功(1-3-4-2)"],
    },
  },
  conrod: {
    tag: { ko: "LINKAGE", en: "LINKAGE", ja: "LINKAGE", zh: "LINKAGE" },
    spec: "forged steel · I-beam",
    sources: [{ label: "Wikipedia · Connecting rod", url: "https://en.wikipedia.org/wiki/Connecting_rod" }],
    title: { ko: "커넥팅 로드 (Connecting Rod)", en: "Connecting Rod", ja: "コネクティングロッド", zh: "连杆" },
    lead: {
      ko: "피스톤과 크랭크샤프트를 잇는 막대예요. 직선 운동을 회전으로 넘겨줍니다.",
      en: "The rod linking piston to crankshaft — it hands straight-line motion over to rotation.",
      ja: "ピストンとクランクシャフトを結ぶ棒。直線運動を回転へ受け渡します。",
      zh: "连接活塞与曲轴的杆，把直线运动传递为旋转。",
    },
    detail: {
      ko: "위쪽 작은 구멍(소단부)은 피스톤 핀에, 아래 큰 구멍(대단부)은 크랭크 핀에 걸립니다. 자전거 페달을 밟는 다리와 같은 원리예요 — 위아래로 미는 힘이 빙글 도는 힘이 됩니다. 폭발 때마다 수 톤의 힘으로 당겨지고 눌리기 때문에, 가벼우면서 강한 단조강 I빔 단면으로 만듭니다.",
      en: "Its small end grips the piston pin; its big end wraps the crank pin. It works like your leg on a bicycle pedal — an up-and-down push becomes a circular drive. Slammed and stretched by tons of force at every firing, it is forged steel with an I-beam cross-section: light yet strong.",
      ja: "上の小さい穴（小端部）はピストンピンに、下の大きい穴（大端部）はクランクピンに掛かります。自転車のペダルを踏む脚と同じ原理 — 上下に押す力が回る力になります。爆発のたびに数トンの力で引かれ押されるため、軽くて強い鍛造鋼の I ビーム断面で作られます。",
      zh: "上端小孔（小头）套在活塞销上，下端大孔（大头）抱住曲柄销。原理如同蹬自行车的腿——上下的推力变成转圈的力。每次做功都承受数吨的拉压，因此用锻钢制成 I 形截面：轻而强。",
    },
    facts: {
      ko: ["역할 — 직선 → 회전 전달", "자전거 페달·다리와 같은 원리", "단조강 I빔 = 가볍고 강함"],
      en: ["Role — linear → rotary handoff", "Same idea as a leg on a pedal", "Forged I-beam: light & strong"],
      ja: ["役割 — 直線 → 回転の伝達", "自転車のペダルと同じ原理", "鍛造Iビーム = 軽くて強い"],
      zh: ["作用 — 直线 → 旋转传递", "原理同蹬车的腿", "锻造工字梁：轻且强"],
    },
  },
  crankshaft: {
    tag: { ko: "CRANKSHAFT", en: "CRANKSHAFT", ja: "CRANKSHAFT", zh: "CRANKSHAFT" },
    spec: "forged steel · → flywheel",
    sources: [{ label: "Wikipedia · Crankshaft", url: "https://en.wikipedia.org/wiki/Crankshaft" }],
    title: { ko: "크랭크샤프트 (Crankshaft)", en: "Crankshaft", ja: "クランクシャフト", zh: "曲轴" },
    lead: {
      ko: "네 피스톤의 직선 운동을 하나의 회전으로 모으는 굽은 축이에요. 엔진의 최종 출력축입니다.",
      en: "The cranked shaft that gathers four pistons' strokes into one rotation — the engine's final output.",
      ja: "4 つのピストンの直線運動を一つの回転にまとめる曲がった軸。エンジンの最終出力軸です。",
      zh: "把四个活塞的直线运动汇成一个旋转的曲折轴——发动机的最终输出轴。",
    },
    detail: {
      ko: "축이 지그재그로 굽어 있어, 각 굽이(크랭크 핀)에 커넥팅 로드가 걸립니다. 핀들이 서로 다른 각도에 있어 네 실린더의 폭발이 번갈아 축을 돌려요(점화순서 1-3-4-2). 굽이 옆의 둥근 추(카운터웨이트)가 흔들림을 상쇄하고, 끝의 무거운 플라이휠이 폭발 사이의 회전을 매끄럽게 이어줍니다. 이 회전이 변속기를 거쳐 바퀴로 갑니다.",
      en: "The shaft zigzags, and each crank pin carries a connecting rod. The pins sit at different angles so the four cylinders take turns spinning the shaft (firing order 1-3-4-2). Rounded counterweights beside each throw cancel the shaking, and the heavy flywheel at the end smooths rotation between power strokes. This spin goes through the transmission to the wheels.",
      ja: "軸はジグザグに曲がり、各クランクピンにコネクティングロッドが掛かります。ピンが互いに異なる角度にあるため、4 気筒の爆発が交代で軸を回します（点火順序 1-3-4-2）。曲がりの脇の丸い錘（カウンターウェイト）が振動を打ち消し、端の重いフライホイールが爆発の合間の回転を滑らかにつなぎます。この回転が変速機を経て車輪へ伝わります。",
      zh: "轴身呈之字形弯曲，每个曲柄销上挂着一根连杆。各销角度不同，四缸便轮流驱动曲轴（点火顺序 1-3-4-2）。弯臂旁的圆形配重抵消振动，末端沉重的飞轮在做功间隔间维持平稳旋转。这股旋转经变速器传向车轮。",
    },
    facts: {
      ko: ["역할 — 4기통 직선력 → 한 회전", "점화순서 1-3-4-2", "카운터웨이트·플라이휠로 진동↓"],
      en: ["Role — four strokes → one spin", "Firing order 1-3-4-2", "Counterweights & flywheel kill vibration"],
      ja: ["役割 — 4気筒の直線力 → 一つの回転", "点火順序 1-3-4-2", "錘とフライホイールで振動↓"],
      zh: ["作用 — 四缸直线力 → 一个旋转", "点火顺序 1-3-4-2", "配重与飞轮减振"],
    },
  },
  oilpan: {
    tag: { ko: "LUBRICATION", en: "LUBRICATION", ja: "LUBRICATION", zh: "LUBRICATION" },
    spec: "≈ 4–5 L oil reservoir",
    sources: [{ label: "Wikipedia · Sump", url: "https://en.wikipedia.org/wiki/Sump" }],
    title: { ko: "오일팬 (Oil Pan)", en: "Oil Pan (Sump)", ja: "オイルパン", zh: "油底壳" },
    lead: {
      ko: "엔진 맨 아래에서 윤활유를 받아 모으는 그릇이에요.",
      en: "The basin at the very bottom that collects and holds the engine oil.",
      ja: "エンジンの最下部で潤滑油を受けて溜める容器です。",
      zh: "位于发动机最底部、汇集并储存机油的盆。",
    },
    detail: {
      ko: "엔진 곳곳을 돌며 마찰을 줄이고 열을 식힌 오일은 중력으로 이곳에 모입니다. 오일 펌프가 여기서 다시 빨아올려 크랭크 저널·캠·피스톤 벽으로 순환시켜요. 금속 부품끼리 직접 닿으면 몇 분 만에 눌어붙기 때문에, 이 순환이 멈추면 엔진도 끝납니다. 바닥의 드레인 플러그를 풀면 오일이 교환됩니다.",
      en: "Oil that has circulated the engine — cutting friction and carrying away heat — drains back here by gravity. The oil pump draws it up again and sends it to the crank journals, cams and cylinder walls. Metal touching metal seizes within minutes, so when this loop stops, the engine is finished. The drain plug at the bottom is opened to change the oil.",
      ja: "エンジン各所を巡って摩擦を減らし熱を運んだオイルは、重力でここに戻ります。オイルポンプが再び吸い上げ、クランクジャーナル・カム・シリンダー壁へ循環させます。金属同士が直接触れれば数分で焼き付くため、この循環が止まればエンジンも終わりです。底のドレンプラグを外せばオイル交換ができます。",
      zh: "在发动机各处润滑减摩、带走热量的机油，靠重力流回这里。机油泵再把它吸上去，送往曲轴轴颈、凸轮和缸壁。金属直接接触几分钟就会咬死，所以一旦这条循环停止，发动机也就报废了。拧开底部的放油螺塞即可换油。",
    },
    facts: {
      ko: ["역할 — 오일 저장·회수", "펌프가 퍼올려 전체 순환", "윤활 멈춤 = 엔진 소착"],
      en: ["Role — store & reclaim oil", "Pump recirculates it everywhere", "No lubrication = seizure"],
      ja: ["役割 — オイルの貯蔵・回収", "ポンプで全体に再循環", "潤滑停止 = 焼き付き"],
      zh: ["作用 — 储存与回收机油", "油泵将其循环全机", "断油 = 拉缸咬死"],
    },
  },
};
