import type { PartInfoMap } from "@app/shared/r3f/model";
import { commonSatInfo } from "../satellite/info";

/**
 * 통신 위성(GEO) 부품 설명 — 공통(버스·태양전지판·반작용 휠·추진·배터리)에
 * 이 위성만의 안테나(대형 반사판 ×2)와 탑재체(중계기 transponder)를 더한다.
 */
export const comsatInfo: PartInfoMap = {
  ...commonSatInfo,
  antenna: {
    tag: { ko: "COMMS · KU/KA-BAND", en: "COMMS · KU/KA-BAND", ja: "COMMS · KU/KA-BAND", zh: "COMMS · KU/KA-BAND" },
    spec: "reflectors ∅ ≈ 2.5 m ×2 · Ku/Ka-band",
    sources: [
      { label: "Wikipedia · Communications satellite", url: "https://en.wikipedia.org/wiki/Communications_satellite" },
      { label: "Wikipedia · Parabolic antenna", url: "https://en.wikipedia.org/wiki/Parabolic_antenna" },
    ],
    title: { ko: "대형 반사판 안테나 (Antenna)", en: "Reflector Antennas", ja: "大型反射鏡アンテナ", zh: "大型反射面天线" },
    lead: {
      ko: "지구를 향한 큰 접시들이에요. 넓은 지역에 신호를 뿌리고 받습니다.",
      en: "The big dishes pointed at Earth — they beam signals down over a wide area and receive them back.",
      ja: "地球を向いた大きな皿。広い地域へ信号を放ち、受け取ります。",
      zh: "朝向地球的大碟——向广阔区域发射并接收信号。",
    },
    detail: {
      ko: "통신 위성의 본업은 신호 중계라서, 안테나가 곧 핵심 장비입니다. 큰 포물면 반사판이 전파를 모아, 지상의 작은 접시도 받을 수 있을 만큼 강하고 정해진 모양(빔)으로 특정 지역(서비스 영역)에 쏩니다. 받는 빔과 보내는 빔, 또는 여러 지역용 빔을 나누려고 보통 반사판을 둘 이상 답니다. 정지궤도에서는 위성이 지표의 한 점 위에 멈춘 듯 보이므로, 안테나를 한 번 겨눠 두면 계속 같은 지역을 덮을 수 있어요.",
      en: "A comms satellite's whole job is relaying signals, so the antenna *is* the key instrument. Large parabolic reflectors gather the radio waves into a strong, shaped beam aimed at a specific service area — strong enough for even a small dish on the ground to receive. Two or more reflectors are usually fitted to separate the receive and transmit beams, or to cover several regions. From geostationary orbit the satellite appears to hover over one spot on Earth, so once aimed the antennas keep covering the same area.",
      ja: "通信衛星の本業は信号中継であり、アンテナこそが中核機器です。大きな放物面反射鏡が電波を集め、地上の小さな皿でも受信できるほど強く、決まった形（ビーム）で特定地域（サービスエリア）へ放ちます。受信ビームと送信ビーム、あるいは複数地域用ビームを分けるため、通常は反射鏡を 2 つ以上備えます。静止軌道では衛星が地表の一点上に止まって見えるので、一度向ければ同じ地域を覆い続けられます。",
      zh: "通信卫星的本职就是中继信号，因此天线正是核心设备。大型抛物面反射器把电波汇聚成强而成形的波束，对准特定服务区——强到地面的小碟也能接收。为分开接收与发射波束、或覆盖多个区域，通常配备两个以上反射器。在地球静止轨道上，卫星看起来悬停在地表某一点之上，因此一次对准后就能持续覆盖同一区域。",
    },
    facts: {
      ko: ["역할 — 신호 중계(핵심 장비)", "반사판이 강한 빔으로 지역을 덮음", "송·수신 분리 위해 보통 2개 이상"],
      en: ["Role — relay signals (key instrument)", "Reflectors beam strongly over a region", "Usually 2+ to split Tx/Rx"],
      ja: ["役割 — 信号中継（中核機器）", "反射鏡が強いビームで地域を覆う", "送受信分離で通常 2 つ以上"],
      zh: ["作用 — 中继信号（核心设备）", "反射器以强波束覆盖区域", "为分收发通常 2 个以上"],
    },
  },
  payload: {
    tag: { ko: "PAYLOAD · TRANSPONDER", en: "PAYLOAD · TRANSPONDER", ja: "PAYLOAD · TRANSPONDER", zh: "PAYLOAD · TRANSPONDER" },
    spec: "multi-transponder repeater",
    sources: [{ label: "Wikipedia · Transponder (satellite communications)", url: "https://en.wikipedia.org/wiki/Transponder_(satellite_communications)" }],
    title: { ko: "탑재체 — 중계기 (Payload)", en: "Payload — Transponder", ja: "ペイロード — 中継器", zh: "载荷 — 转发器" },
    lead: {
      ko: "이 위성의 임무 장비예요. 올라온 신호를 받아 증폭해 다시 내려보냅니다.",
      en: "The satellite's mission instrument — it receives the uplink signal, amplifies it, and sends it back down.",
      ja: "この衛星の任務機器。上がってきた信号を受けて増幅し、再び下ろします。",
      zh: "这颗卫星的任务设备——接收上行信号、放大后再发回地面。",
    },
    detail: {
      ko: "지상에서 올라온(업링크) 전파는 36,000 km를 날아오며 아주 약해집니다. 중계기는 이 약한 신호를 받아 다른 주파수로 바꾸고 강하게 증폭한 뒤, 안테나로 다시 지상에 뿌려요(다운링크). 위성 하나에 이런 통로(트랜스폰더)를 수십 개 두어 방송·인터넷·통신을 동시에 중계합니다. 카메라처럼 무언가를 \"관측\"하는 게 아니라 신호를 \"중계\"하는 게 임무라서, 통신 위성은 한자리(정지궤도)에 머물며 넓은 지역을 항상 바라보는 편이 유리합니다.",
      en: "Radio waves coming up from the ground (uplink) travel 36,000 km and arrive very weak. The transponder receives this faint signal, shifts it to a different frequency, amplifies it strongly, and sends it back down through the antenna (downlink). A single satellite carries dozens of such channels (transponders) to relay broadcast, internet and communications at once. Its mission is to *relay* signals, not to *observe* like a camera — which is why a comms satellite benefits from staying in one place (geostationary), always facing a wide region.",
      ja: "地上から上がる（アップリンク）電波は 36,000 km を飛び、非常に弱くなります。中継器はこの微弱な信号を受け、別の周波数に変えて強く増幅し、アンテナから再び地上へ放ちます（ダウンリンク）。1 機にこうした通路（トランスポンダ）を数十持ち、放送・インターネット・通信を同時に中継します。任務はカメラのように「観測」することではなく信号を「中継」することなので、通信衛星は一か所（静止軌道）に留まり広い地域を常に見続ける方が有利です。",
      zh: "从地面上行（uplink）的电波要飞 36,000 km，到达时非常微弱。转发器接收这一微弱信号，转换到另一频率并强力放大，再经天线发回地面（downlink）。一颗卫星携带数十条这样的通道（转发器），同时中继广播、互联网与通信。它的任务是“中继”信号，而非像相机那样“观测”——因此通信卫星更适合停在一处（地球静止轨道），始终面向广阔区域。",
    },
    facts: {
      ko: ["역할 — 신호 수신·증폭·재송신", "위성당 트랜스폰더 수십 개", "'관측' 아닌 '중계' → 정지궤도 유리"],
      en: ["Role — receive, amplify, retransmit", "Dozens of transponders per satellite", "'Relay' not 'observe' → GEO suits it"],
      ja: ["役割 — 受信・増幅・再送信", "1機にトランスポンダ数十", "「観測」でなく「中継」→ 静止軌道が有利"],
      zh: ["作用 — 接收、放大、再发射", "每星数十个转发器", "“中继”而非“观测”→ 适合静止轨道"],
    },
  },
};
