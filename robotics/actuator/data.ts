import type { PartInfoMap } from "@app/shared/r3f/model";

/**
 * 로봇 관절 액추에이터 부품 설명 (다국어).
 * 핵심 학습 포인트: 모터의 빠른 회전을 하모닉 드라이브가 ≈100:1로 줄여
 * 크고 정밀한 토크로 바꾼다 — 로봇 관절 하나에 모터·감속기·센서·베어링이 모두 들어 있다.
 */
export const actuatorInfo: PartInfoMap = {
  housing: {
    tag: { ko: "HOUSING", en: "HOUSING", ja: "HOUSING", zh: "HOUSING" },
    spec: "Al · joint module shell",
    sources: [{ label: "Wikipedia · Actuator", url: "https://en.wikipedia.org/wiki/Actuator" }],
    title: { ko: "하우징 (Housing)", en: "Housing", ja: "ハウジング", zh: "壳体" },
    lead: {
      ko: "관절 모듈 전체를 감싸는 알루미늄 원통이에요. 로봇 팔의 뼈대에 바로 볼트로 고정됩니다.",
      en: "The aluminum cylinder wrapping the whole joint module — it bolts straight into the robot's arm structure.",
      ja: "関節モジュール全体を包むアルミの円筒。ロボットアームの骨格に直接ボルトで固定されます。",
      zh: "包裹整个关节模块的铝制圆筒，直接用螺栓固定在机器人手臂的骨架上。",
    },
    detail: {
      ko: "모터·감속기·센서를 한 통에 모은 ‘일체형 관절(joint module)’의 껍데기입니다. 로봇 팔은 이런 모듈을 어깨·팔꿈치·손목에 하나씩 끼워 만들어요. 옆의 구멍(그로밋)으로 전원·신호 케이블이 들어가는데, 보통 모듈 중심의 빈 축(중공축)을 따라 다음 관절로 이어집니다.",
      en: "It is the shell of an integrated 'joint module' that packs motor, gear and sensors into one can. A robot arm is built by fitting one of these at the shoulder, elbow and wrist. Power and signal cables enter through the side grommet and usually run on to the next joint through the hollow bore at the module's center.",
      ja: "モーター・減速機・センサーを一つの筒に収めた『一体型関節（ジョイントモジュール）』の外殻です。ロボットアームは肩・肘・手首にこのモジュールを一つずつ組み込んで作られます。側面の穴（グロメット）から電源・信号ケーブルが入り、通常はモジュール中心の中空軸を通って次の関節へつながります。",
      zh: "它是把电机、减速器、传感器装进一个筒里的“一体化关节模块”的外壳。机器人手臂就是在肩、肘、腕各装一个这样的模块组成的。电源与信号线从侧面的护线孔进入，通常沿模块中心的中空轴通向下一个关节。",
    },
    facts: {
      ko: ["역할 — 관절 모듈의 골격", "어깨·팔꿈치·손목에 하나씩", "케이블은 중공축으로 통과"],
      en: ["Role — the joint module's frame", "One per shoulder, elbow, wrist", "Cables pass through the hollow bore"],
      ja: ["役割 — 関節モジュールの骨格", "肩・肘・手首に一つずつ", "ケーブルは中空軸を通る"],
      zh: ["作用 — 关节模块的骨架", "肩/肘/腕各一个", "线缆穿过中空轴"],
    },
  },
  encoder: {
    tag: { ko: "SENSOR", en: "SENSOR", ja: "SENSOR", zh: "SENSOR" },
    spec: "absolute · 17–20 bit",
    sources: [{ label: "Wikipedia · Rotary encoder", url: "https://en.wikipedia.org/wiki/Rotary_encoder" }],
    title: { ko: "엔코더 (Encoder)", en: "Encoder", ja: "エンコーダ", zh: "编码器" },
    lead: {
      ko: "축이 지금 몇 도에 있는지 읽는 ‘관절의 눈’이에요. 눈금 디스크를 센서가 셉니다.",
      en: "The 'eye of the joint' that reads the shaft's exact angle — a sensor counts marks on a coded disc.",
      ja: "軸が今何度にあるかを読む『関節の目』。目盛りディスクをセンサーが数えます。",
      zh: "读取轴当前角度的“关节之眼”——传感器读取码盘上的刻度。",
    },
    detail: {
      ko: "로봇이 팔을 정확한 위치로 보내려면 매 순간 관절 각도를 알아야 합니다. 엔코더 디스크의 미세한 눈금을 광학·자기 센서가 읽어 17~20비트(한 바퀴를 13만~100만 칸으로 쪼개는) 정밀도로 각도를 보고해요. 전원이 꺼졌다 켜져도 절대 위치를 기억하는 앱솔루트 방식이 로봇 관절의 표준입니다.",
      en: "To place its arm precisely, a robot must know every joint's angle at every instant. Optical or magnetic sensors read fine marks on the encoder disc, reporting the angle with 17–20 bit precision — dividing one turn into 130 thousand to a million steps. Absolute encoders, which remember their position even through a power cycle, are the standard in robot joints.",
      ja: "ロボットが腕を正確な位置へ動かすには、毎瞬間すべての関節角度を知る必要があります。エンコーダディスクの微細な目盛りを光学・磁気センサーが読み、17〜20 ビット（1 回転を 13 万〜100 万分割）の精度で角度を報告します。電源を切っても絶対位置を覚えているアブソリュート方式がロボット関節の標準です。",
      zh: "机器人要把手臂送到准确位置，必须时刻知道每个关节的角度。光学或磁性传感器读取码盘上的细微刻度，以 17–20 位精度（把一圈分成 13 万到 100 万格）报告角度。断电重启仍能记住绝对位置的绝对式编码器是机器人关节的标准。",
    },
    facts: {
      ko: ["역할 — 관절 각도 측정", "한 바퀴를 수십만 칸으로", "절대(absolute) 방식이 표준"],
      en: ["Role — measure joint angle", "Splits a turn into 100k+ steps", "Absolute type is the norm"],
      ja: ["役割 — 関節角度の計測", "1回転を数十万分割", "アブソリュート方式が標準"],
      zh: ["作用 — 测量关节角度", "一圈分成数十万格", "绝对式为标准"],
    },
  },
  motor: {
    tag: { ko: "MOTOR", en: "MOTOR", ja: "MOTOR", zh: "MOTOR" },
    spec: "frameless BLDC · high pole-count",
    sources: [{ label: "Wikipedia · Brushless DC electric motor", url: "https://en.wikipedia.org/wiki/Brushless_DC_electric_motor" }],
    title: { ko: "프레임리스 BLDC 모터", en: "Frameless BLDC Motor", ja: "フレームレス BLDC モーター", zh: "无框 BLDC 电机" },
    lead: {
      ko: "케이스 없이 고정자·로터 링만 있는 모터예요. 하우징에 바로 끼워 공간을 아낍니다.",
      en: "A motor that is just a stator and rotor ring with no case of its own — it presses straight into the housing to save space.",
      ja: "ケースのないステーター・ローターリングだけのモーター。ハウジングに直接組み込み空間を節約します。",
      zh: "没有自身外壳、只有定子和转子环的电机——直接压入壳体以节省空间。",
    },
    detail: {
      ko: "원리는 EV 구동 모터와 같지만(전자석이 자석 로터를 끌고 돈다), 관절 모듈에 넣기 위해 껍데기를 벗기고 도넛처럼 납작하게 만들었습니다. 가운데가 비어 있어 케이블이 지나가는 중공축이 됩니다. 모터 자체는 빠르고 힘이 약해서, 바로 뒤의 하모닉 드라이브가 회전을 토크로 바꿔 줍니다.",
      en: "It works like an EV drive motor — electromagnets pull a magnet rotor around — but it is stripped of its case and flattened like a donut to fit the joint module. Its empty center becomes the hollow bore that cables pass through. The motor alone is fast but weak, so the strain wave gear right behind it trades that speed for torque.",
      ja: "原理は EV の駆動モーターと同じ（電磁石が磁石ローターを引いて回す）ですが、関節モジュールに収めるためケースを外しドーナツ状に平たくしてあります。中央が空いており、ケーブルが通る中空軸になります。モーター単体は速いが力が弱いため、すぐ後ろのハーモニックドライブが回転をトルクに変えます。",
      zh: "原理与电动车驱动电机相同——电磁铁拉着磁体转子旋转——但为装入关节模块去掉了外壳、压扁成甜甜圈状。中心是空的，成为线缆通过的中空轴。电机本身转得快但力气小，紧随其后的谐波减速器把转速换成扭矩。",
    },
    facts: {
      ko: ["역할 — 회전의 원천(빠름·약함)", "케이스 없는 도넛형 = 공간 절약", "가운데 구멍 = 케이블 중공축"],
      en: ["Role — the source of spin (fast, weak)", "Caseless donut shape saves space", "Center hole = cable bore"],
      ja: ["役割 — 回転の源（速い・弱い）", "ケースレスのドーナツ形 = 省スペース", "中央の穴 = ケーブル中空軸"],
      zh: ["作用 — 旋转之源（快而弱）", "无壳甜甜圈形省空间", "中心孔 = 线缆通道"],
    },
  },
  wavegen: {
    tag: { ko: "STRAIN WAVE", en: "STRAIN WAVE", ja: "STRAIN WAVE", zh: "STRAIN WAVE" },
    spec: "elliptical cam · input",
    sources: [{ label: "Wikipedia · Strain wave gearing", url: "https://en.wikipedia.org/wiki/Strain_wave_gearing" }],
    title: { ko: "웨이브 제너레이터", en: "Wave Generator", ja: "ウェーブジェネレータ", zh: "波发生器" },
    lead: {
      ko: "하모닉 드라이브의 입력 — 모터가 돌리는 타원 캠이에요. 컵을 타원으로 눌러 변형시킵니다.",
      en: "The input of the strain wave gear — an elliptical cam spun by the motor that squeezes the cup into an oval.",
      ja: "ハーモニックドライブの入力 — モーターが回す楕円カム。カップを楕円に押し広げます。",
      zh: "谐波减速器的输入端——电机驱动的椭圆凸轮，把柔轮压成椭圆形。",
    },
    detail: {
      ko: "둥근 베어링을 두른 타원판이 플렉스플라인(유연한 컵) 안에서 돌면, 컵이 타원 모양으로 출렁이며 긴 쪽 두 지점만 바깥 기어와 맞물립니다. 캠이 돌 때마다 그 맞물림 지점이 물결(wave)처럼 옮겨 다녀서 ‘웨이브 제너레이터’라는 이름이 붙었어요. 모터의 빠른 회전이 여기로 들어옵니다.",
      en: "An elliptical disc wrapped in a flexible bearing spins inside the flexspline (the flexible cup), rippling it into an oval so that only the two points on the long axis mesh with the outer gear. As the cam turns, that meshing point travels around like a wave — hence 'wave generator'. The motor's fast rotation enters here.",
      ja: "柔軟なベアリングを巻いた楕円板がフレクスプライン（柔らかいカップ）の中で回ると、カップが楕円に波打ち、長軸の 2 点だけが外側のギアと噛み合います。カムが回るたびにその噛み合い点が波のように移動するため『ウェーブジェネレータ』と呼ばれます。モーターの速い回転がここに入ります。",
      zh: "包着柔性轴承的椭圆盘在柔轮（柔性杯）内旋转，把杯体压成椭圆，使只有长轴上的两点与外侧齿轮啮合。凸轮每转一圈，啮合点就像波浪一样移动——“波发生器”因此得名。电机的高速旋转从这里输入。",
    },
    facts: {
      ko: ["역할 — 감속기의 입력(고속)", "타원 캠이 컵을 변형", "맞물림 지점이 물결처럼 이동"],
      en: ["Role — the gear's input (fast)", "Elliptical cam deforms the cup", "Mesh point travels like a wave"],
      ja: ["役割 — 減速機の入力（高速）", "楕円カムがカップを変形", "噛み合い点が波のように移動"],
      zh: ["作用 — 减速器输入（高速）", "椭圆凸轮使杯体变形", "啮合点如波浪移动"],
    },
  },
  flexspline: {
    tag: { ko: "STRAIN WAVE", en: "STRAIN WAVE", ja: "STRAIN WAVE", zh: "STRAIN WAVE" },
    spec: "flexible steel cup · output",
    sources: [{ label: "Wikipedia · Strain wave gearing", url: "https://en.wikipedia.org/wiki/Strain_wave_gearing" }],
    title: { ko: "플렉스플라인 (유연 컵)", en: "Flexspline (Flexible Cup)", ja: "フレクスプライン（柔軟カップ）", zh: "柔轮（柔性杯）" },
    lead: {
      ko: "출렁이며 도는 얇은 강철 컵이에요. 하모닉 드라이브의 출력이자 핵심 부품입니다.",
      en: "A thin steel cup that flexes as it turns — the output and the heart of the strain wave gear.",
      ja: "波打ちながら回る薄い鋼のカップ。ハーモニックドライブの出力であり核心部品です。",
      zh: "边变形边旋转的薄钢杯——谐波减速器的输出端与核心部件。",
    },
    detail: {
      ko: "컵 바깥에는 바깥 링(서큘러 스플라인)보다 이가 2개 적게 새겨져 있습니다. 안의 타원 캠이 한 바퀴 돌 때마다 컵은 그 ‘2개 차이’만큼만 살짝 반대 방향으로 돌아요 — 이가 100개라면 100바퀴에 2바퀴, 즉 감속비 100:1입니다. 기어 수십 개를 쌓을 일을 부품 3개로 해내고, 이가 동시에 많이 맞물려 백래시(헐거움)가 거의 없습니다. 출력은 컵 바닥에서 플랜지로 나갑니다.",
      en: "The cup's outside carries two fewer teeth than the outer ring (the circular spline). Each time the elliptical cam inside makes a full turn, the cup creeps backward by just that two-tooth difference — with 100 teeth, that's 2 turns per 100, a 100:1 reduction. Three parts do the work of a stack of gears, and because many teeth mesh at once there is almost no backlash. The output leaves through the cup's bottom to the flange.",
      ja: "カップの外側には外輪（サーキュラスプライン）より 2 枚少ない歯が刻まれています。中の楕円カムが 1 回転するたび、カップはその『2 枚の差』だけ逆方向にわずかに回ります — 歯が 100 枚なら 100 回転で 2 回転、つまり減速比 100:1。歯車を何段も重ねる仕事を部品 3 つでこなし、多くの歯が同時に噛み合うためバックラッシュがほぼありません。出力はカップ底からフランジへ出ます。",
      zh: "杯体外侧的齿比外圈（刚轮）少两个。内部椭圆凸轮每转一整圈，杯体只朝反方向爬过这“两齿之差”——若有 100 个齿，就是 100 圈走 2 圈，即 100:1 的减速比。三个零件完成了一摞齿轮的工作，且多齿同时啮合，几乎没有背隙。输出从杯底传到法兰。",
    },
    facts: {
      ko: ["역할 — 감속기의 출력(느림·강함)", "이 2개 차이 = 감속비 ≈100:1", "다점 맞물림 = 백래시 ≈0"],
      en: ["Role — the gear's output (slow, strong)", "Two-tooth difference = ≈100:1", "Many-tooth mesh = near-zero backlash"],
      ja: ["役割 — 減速機の出力（遅い・強い）", "歯2枚の差 = 減速比 ≈100:1", "多点噛み合い = バックラッシュ≈0"],
      zh: ["作用 — 减速器输出（慢而强）", "两齿之差 = ≈100:1", "多齿啮合 = 背隙趋零"],
    },
  },
  circspline: {
    tag: { ko: "STRAIN WAVE", en: "STRAIN WAVE", ja: "STRAIN WAVE", zh: "STRAIN WAVE" },
    spec: "rigid ring gear · fixed",
    sources: [{ label: "Wikipedia · Strain wave gearing", url: "https://en.wikipedia.org/wiki/Strain_wave_gearing" }],
    title: { ko: "서큘러 스플라인 (고정 링)", en: "Circular Spline (Fixed Ring)", ja: "サーキュラスプライン（固定リング）", zh: "刚轮（固定环）" },
    lead: {
      ko: "안쪽에 이가 새겨진 단단한 강철 링이에요. 움직이지 않는 기준이 됩니다.",
      en: "A rigid steel ring with teeth on its inside — the fixed reference everything else works against.",
      ja: "内側に歯を刻んだ硬い鋼のリング。動かない基準になります。",
      zh: "内侧带齿的刚性钢环——其他部件运动的固定基准。",
    },
    detail: {
      ko: "하우징에 고정되어 절대 돌지 않습니다. 플렉스플라인보다 이가 2개 많고, 타원으로 출렁이는 컵의 긴 쪽 두 지점과만 맞물려요. 컵이 ‘기준(이 링)’ 대비 이 2개씩 미끄러지는 것이 감속의 본질입니다. 셋 중 하나를 고정하고, 하나로 넣고, 하나로 빼는 구성 — 입력은 캠, 기준은 이 링, 출력은 컵입니다.",
      en: "Bolted to the housing, it never turns. It has two more teeth than the flexspline and meshes only with the two long-axis points of the rippling cup. The cup slipping two teeth per turn relative to this fixed reference is the essence of the reduction. Of the three parts, one is held, one drives, one is driven — the cam is input, this ring is the reference, the cup is output.",
      ja: "ハウジングに固定され、決して回りません。フレクスプラインより歯が 2 枚多く、楕円に波打つカップの長軸 2 点とだけ噛み合います。カップがこの『基準（このリング）』に対して 1 回転あたり歯 2 枚ずつ滑るのが減速の本質です。3 つのうち 1 つを固定し、1 つで入れ、1 つで出す構成 — 入力はカム、基準はこのリング、出力はカップです。",
      zh: "它固定在壳体上，永不转动。其齿比柔轮多两个，只与呈椭圆波动的杯体长轴两点啮合。杯体相对这个“基准环”每圈滑过两齿，正是减速的本质。三件中一件固定、一件输入、一件输出——凸轮是输入，此环是基准，杯体是输出。",
    },
    facts: {
      ko: ["역할 — 고정된 기준 기어", "플렉스플라인보다 이 2개 많음", "긴 축 2점에서만 맞물림"],
      en: ["Role — the fixed reference gear", "Two more teeth than the flexspline", "Meshes only at two points"],
      ja: ["役割 — 固定された基準ギア", "フレクスプラインより歯2枚多い", "長軸2点のみで噛み合う"],
      zh: ["作用 — 固定的基准齿轮", "比柔轮多两个齿", "仅在两点啮合"],
    },
  },
  crossroller: {
    tag: { ko: "BEARING", en: "BEARING", ja: "BEARING", zh: "BEARING" },
    spec: "cross-roller · 90° alternating",
    sources: [{ label: "Wikipedia · Rolling-element bearing", url: "https://en.wikipedia.org/wiki/Rolling-element_bearing" }],
    title: { ko: "크로스롤러 베어링", en: "Cross-Roller Bearing", ja: "クロスローラーベアリング", zh: "交叉滚子轴承" },
    lead: {
      ko: "롤러가 90°씩 엇갈려 배열된 출력측 베어링이에요. 하나로 모든 방향의 힘을 받칩니다.",
      en: "The output bearing whose rollers alternate at 90° — one bearing that resists loads from every direction.",
      ja: "ローラーが 90° ずつ交差して並ぶ出力側ベアリング。一つであらゆる方向の力を支えます。",
      zh: "滚子呈 90° 交错排列的输出轴承——一个轴承承受各个方向的载荷。",
    },
    detail: {
      ko: "로봇 팔 관절에는 비트는 힘만 오는 게 아닙니다 — 들고 있는 물건의 무게가 축을 휘게 하는 모멘트로 걸려요. 보통 베어링은 한 방향 하중에 강한 대신 다른 방향에 약해 두 개를 마주 보게 써야 하지만, 크로스롤러는 롤러를 하나 걸러 90°로 교차시켜 베어링 하나로 축·반경·모멘트 하중을 모두 받습니다. 관절을 짧고 단단하게 만드는 비결입니다.",
      en: "A robot joint doesn't just see twisting forces — the weight of whatever the arm holds bends the axis as a moment load. Ordinary bearings resist one direction well but need to be paired face-to-face for the rest; a cross-roller bearing crosses every other roller at 90°, so a single bearing takes axial, radial and moment loads at once. It's the trick that keeps joints short and stiff.",
      ja: "ロボットの関節にはねじる力だけでなく、持っている物の重さが軸を曲げるモーメントとして掛かります。通常のベアリングは一方向に強い代わりに他方向に弱く 2 個を向かい合わせて使う必要がありますが、クロスローラーはローラーを 1 つおきに 90° 交差させ、1 個で軸方向・径方向・モーメント荷重をすべて受けます。関節を短く硬く作る秘訣です。",
      zh: "机器人关节承受的不只是扭转力——手臂所持物体的重量会作为弯矩压弯轴线。普通轴承只擅长一个方向、需要成对面对面使用；交叉滚子轴承让滚子每隔一个旋转 90° 交叉，单个轴承即可同时承受轴向、径向与弯矩载荷。这是让关节又短又刚的诀窍。",
    },
    facts: {
      ko: ["역할 — 출력측 하중 지지", "롤러 90° 교차 배열", "축·반경·모멘트를 하나로"],
      en: ["Role — carry the output loads", "Rollers cross at 90°", "Axial + radial + moment in one"],
      ja: ["役割 — 出力側の荷重支持", "ローラー90°交差配列", "軸·径·モーメントを1個で"],
      zh: ["作用 — 支撑输出载荷", "滚子 90° 交叉", "轴向+径向+弯矩一体"],
    },
  },
  flange: {
    tag: { ko: "OUTPUT", en: "OUTPUT", ja: "OUTPUT", zh: "OUTPUT" },
    spec: "bolt circle · → next link",
    sources: [{ label: "Wikipedia · Industrial robot", url: "https://en.wikipedia.org/wiki/Industrial_robot" }],
    title: { ko: "출력 플랜지 (Output Flange)", en: "Output Flange", ja: "出力フランジ", zh: "输出法兰" },
    lead: {
      ko: "감속된 회전이 최종적으로 나가는 접시예요. 다음 링크(팔뼈)가 여기 볼트로 붙습니다.",
      en: "The plate where the reduced rotation finally leaves — the next link of the arm bolts on here.",
      ja: "減速された回転が最終的に出ていく皿。次のリンク（腕の骨）がここにボルトで付きます。",
      zh: "减速后的旋转最终输出的盘面——手臂的下一节就用螺栓固定在这里。",
    },
    detail: {
      ko: "플렉스플라인 바닥에서 받은 느리고 강한 회전을 볼트 원을 통해 다음 팔 링크로 전달합니다. 가운데 구멍은 중공축의 출구 — 케이블이 관절을 통과해 다음 모듈로 이어지는 길이에요. 관절 하나의 이야기가 여기서 끝나고, 로봇 팔에서는 이런 모듈 6~7개가 연결되어 사람 팔 같은 움직임(자유도 6~7)을 만듭니다.",
      en: "It passes the slow, strong rotation received from the flexspline's bottom to the next arm link through its bolt circle. The center hole is the exit of the hollow bore — the path cables take through the joint to the next module. One joint's story ends here; in a robot arm, six or seven of these modules chain together to create human-arm-like motion (6–7 degrees of freedom).",
      ja: "フレクスプラインの底から受けた遅く強い回転を、ボルト円を通じて次のアームリンクへ伝えます。中央の穴は中空軸の出口 — ケーブルが関節を貫通して次のモジュールへつながる道です。関節一つの物語はここで終わり、ロボットアームではこのモジュールが 6〜7 個連結され、人の腕のような動き（自由度 6〜7）を作ります。",
      zh: "它把从柔轮底部接收的低速大扭矩旋转，经螺栓圆传给下一节手臂。中心孔是中空轴的出口——线缆穿过关节通向下一个模块的通道。一个关节的故事到此结束；在机械臂上，6–7 个这样的模块串联起来，构成像人臂一样的运动（6–7 个自由度）。",
    },
    facts: {
      ko: ["역할 — 토크의 최종 출구", "다음 링크가 볼트로 결합", "관절 6~7개 = 팔의 자유도"],
      en: ["Role — torque's final exit", "Next link bolts on", "6–7 joints = an arm's freedom"],
      ja: ["役割 — トルクの最終出口", "次のリンクをボルト結合", "関節6〜7個 = 腕の自由度"],
      zh: ["作用 — 扭矩的最终出口", "下一节用螺栓连接", "6–7 个关节 = 手臂自由度"],
    },
  },
};
