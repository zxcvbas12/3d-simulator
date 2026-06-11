import type { PartInfoMap } from "@app/shared/r3f/model";
import { commonSatInfo } from "../satellite/info";

/**
 * 지구관측 위성(LEO) 부품 설명 — 공통(버스·태양전지판·반작용 휠·추진·배터리)에
 * 이 위성만의 안테나(고이득 dish)와 탑재체(관측 카메라)를 더한다.
 */
export const eoSatInfo: PartInfoMap = {
  ...commonSatInfo,
  antenna: {
    tag: { ko: "COMMS · X-BAND", en: "COMMS · X-BAND", ja: "COMMS · X-BAND", zh: "COMMS · X-BAND" },
    spec: "high-gain dish ∅ ≈ 2 m · X-band",
    sources: [{ label: "Wikipedia · Satellite dish", url: "https://en.wikipedia.org/wiki/Satellite_dish" }],
    title: { ko: "고이득 안테나 (Antenna)", en: "High-Gain Antenna", ja: "高利得アンテナ", zh: "高增益天线" },
    lead: {
      ko: "찍은 영상을 지상으로 내려보내는 접시 안테나예요. 한 방향으로 신호를 모읍니다.",
      en: "The dish that sends captured images down to the ground — focusing the signal in one direction.",
      ja: "撮影した画像を地上へ送る皿アンテナ。信号を一方向に集めます。",
      zh: "把拍摄的影像传回地面的碟形天线，把信号集中到一个方向。",
    },
    detail: {
      ko: "관측 위성은 고해상도 영상이라는 엄청난 양의 데이터를 짧은 통과 시간 안에 지상국으로 내려보내야 합니다. 포물면 접시는 전파를 좁은 빔으로 모아(고이득) 멀리 있는 지상 안테나에 강하게 꽂아 주는데, 그만큼 정확히 겨눠야 해서 반작용 휠의 정밀 지향과 짝을 이룹니다. 빠른 X-밴드 주파수를 써서 한 번 지나갈 때 많은 영상을 쏟아내요. 일부 위성은 더 자주 보내려고 정지궤도 중계 위성을 거치기도 합니다.",
      en: "An observation satellite must dump a huge amount of data — high-resolution imagery — to a ground station within a short pass. A parabolic dish concentrates the radio waves into a narrow beam (high gain) that hits a distant ground antenna strongly; that precision means it must be aimed accurately, pairing with the reaction wheels' fine pointing. It uses fast X-band frequencies to pour down many images per pass. Some satellites relay through a geostationary satellite to downlink more often.",
      ja: "観測衛星は高解像度画像という膨大なデータを、短い通過時間内に地上局へ送らねばなりません。放物面の皿は電波を狭いビームに集め（高利得）、遠くの地上アンテナへ強く届けます。その分正確に向ける必要があり、リアクションホイールの精密指向と対になります。高速の X バンドを使い、一度の通過で多くの画像を送ります。一部は静止軌道の中継衛星を介してより頻繁に送ります。",
      zh: "观测卫星必须在短暂的过境时间内，把高分辨率影像这种海量数据传给地面站。抛物面碟把电波汇聚成窄波束（高增益），强力打到远处的地面天线；正因如此必须精确指向，与反作用轮的精密指向相配合。它使用高速的 X 频段，一次过境就能传下大量影像。部分卫星还通过地球静止轨道的中继卫星更频繁地下传。",
    },
    facts: {
      ko: ["역할 — 관측 영상 지상 전송", "포물면이 신호를 좁은 빔으로(고이득)", "정밀 지향 필요 → 반작용 휠과 짝"],
      en: ["Role — downlink imagery to ground", "Dish focuses signal into a beam (high gain)", "Needs precise aim → pairs with wheels"],
      ja: ["役割 — 観測画像を地上へ送信", "皿が信号を狭ビームに（高利得）", "精密指向が必要 → ホイールと対"],
      zh: ["作用 — 把影像下传地面", "碟把信号聚成窄波束（高增益）", "需精确指向 → 与飞轮配合"],
    },
  },
  payload: {
    tag: { ko: "PAYLOAD · CAMERA", en: "PAYLOAD · CAMERA", ja: "PAYLOAD · CAMERA", zh: "PAYLOAD · CAMERA" },
    spec: "aperture ∅ ≈ 0.8 m · GSD ~ 0.5 m",
    sources: [
      { label: "Wikipedia · Earth observation satellite", url: "https://en.wikipedia.org/wiki/Earth_observation_satellite" },
      { label: "Wikipedia · Ground sample distance", url: "https://en.wikipedia.org/wiki/Ground_sample_distance" },
    ],
    title: { ko: "탑재체 — 관측 카메라 (Payload)", en: "Payload — Observation Camera", ja: "ペイロード — 観測カメラ", zh: "载荷 — 观测相机" },
    lead: {
      ko: "이 위성의 임무 장비예요. 지구를 향한 망원경으로 지표를 촬영합니다.",
      en: "The satellite's mission instrument — a telescope pointed at Earth to photograph the surface.",
      ja: "この衛星の任務機器。地球を向いた望遠鏡で地表を撮影します。",
      zh: "这颗卫星的任务设备——朝向地球的望远镜，拍摄地表。",
    },
    detail: {
      ko: "관측 카메라는 사실상 우주에 띄운 망원경입니다. 거울(구경)이 클수록 더 작은 것까지 또렷이 보여, 지상 분해능(GSD — 픽셀 하나가 덮는 지상 거리)이 좋아져요. 그래서 낮은 궤도(LEO)를 도는데, 지표에 가까울수록 같은 망원경으로 더 자세히 찍을 수 있기 때문입니다. 위성이 워낙 빠르게 지나가므로(초속 ~7.5 km) 흔들리면 영상이 번지니, 반작용 휠로 카메라를 목표에 딱 고정한 채 촬영합니다. 아래쪽 골드 링은 빛 반사를 막는 차양·렌즈부예요.",
      en: "An observation camera is essentially a telescope flown in space. The bigger its mirror (aperture), the finer the detail it resolves, improving ground sample distance (GSD — the ground distance one pixel covers). That is why it orbits low (LEO): closer to the surface, the same telescope sees more detail. Because the satellite races by (about 7.5 km/s), any wobble smears the image, so the reaction wheels lock the camera onto the target while it shoots. The gold ring below is the sunshade and lens assembly that blocks stray light.",
      ja: "観測カメラは実質、宇宙に上げた望遠鏡です。鏡（口径）が大きいほど細かいものまで解像でき、地上分解能（GSD — 1 ピクセルが覆う地上距離）が良くなります。だから低軌道（LEO）を回ります。地表に近いほど同じ望遠鏡でより詳しく撮れるからです。衛星は猛速で通過する（秒速約 7.5 km）ため、ぶれると画像が滲みます。よってリアクションホイールでカメラを目標に固定して撮影します。下のゴールドのリングは迷光を防ぐ遮光・レンズ部です。",
      zh: "观测相机本质上是放到太空的望远镜。镜面（口径）越大，能分辨的细节越细，地面采样距离（GSD——一个像素覆盖的地面距离）越好。这就是它在低轨（LEO）运行的原因：离地表越近，同一望远镜看得越细。由于卫星飞掠极快（约 7.5 km/s），抖动会使影像拖糊，所以拍摄时用反作用轮把相机锁定在目标上。下方的金色环是遮挡杂光的遮光罩与镜头组件。",
    },
    facts: {
      ko: ["역할 — 지표 촬영(임무 장비)", "구경 클수록·궤도 낮을수록 또렷", "촬영 중 반작용 휠로 고정"],
      en: ["Role — image the surface (mission)", "Bigger aperture / lower orbit = sharper", "Wheels lock it steady while shooting"],
      ja: ["役割 — 地表撮影（任務機器）", "口径大・軌道低ほど鮮明", "撮影中はホイールで固定"],
      zh: ["作用 — 拍摄地表（任务设备）", "口径越大、轨道越低越清晰", "拍摄时由飞轮锁定"],
    },
  },
};
