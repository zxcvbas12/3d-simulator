import type { Lang } from "@locales/index";
import type { ModelModule } from "@shared/model";

/**
 * 사이트 콘텐츠 카탈로그 — 카테고리와 모델 목록.
 * 새 모델 추가 = 여기 MODELS에 한 줄 + <카테고리>/<모델>/ 폴더.
 * 카테고리명은 i18n(cat.*)에서, 모델명/짧은설명은 카탈로그에 직접 둔다(모델별 메타데이터).
 * 부품별 상세 설명은 각 모델의 data.ts에 따로 둔다(이 파일에는 두지 않는다).
 */

export type CategoryId =
  | "semiconductor"
  | "space"
  | "automotive"
  | "appliance"
  | "aviation"
  | "medical"
  | "energy"
  | "robotics";

/** 카드/뷰어 썸네일 모티프 종류. */
export type ThumbType = "layers" | "orbit" | "cells" | "coil" | "blades" | "wave" | "joint";

export type Status = "live" | "soon";

/** 4개 언어 텍스트. Lang 키와 묶어 두어 언어 추가 시 컴파일로 누락을 잡는다. */
export type LocalizedText = Record<Lang, string>;

export interface CategoryEntry {
  id: CategoryId; // 폴더명 + i18n cat.* 키와 동일
  thumb: ThumbType;
}

export interface ModelEntry {
  cat: CategoryId;
  id: string; // 카테고리 안에서의 모델 슬러그(= 폴더명)
  status: Status;
  thumb: ThumbType;
  name: LocalizedText;
  desc: LocalizedText;
  /** 모델의 model.ts를 동적 import 하는 로더. 없으면 뷰어는 검증용 더미 모델을 띄운다.
   *  (각 모델 폴더에 model.ts가 생기면 여기에 () => import("../<cat>/<id>/model") 를 단다.) */
  load?: () => Promise<ModelModule>;
}

export const CATEGORIES: CategoryEntry[] = [
  { id: "semiconductor", thumb: "layers" },
  { id: "space", thumb: "orbit" },
  { id: "automotive", thumb: "cells" },
  { id: "appliance", thumb: "coil" },
  { id: "aviation", thumb: "blades" },
  { id: "medical", thumb: "wave" },
  { id: "energy", thumb: "cells" },
  { id: "robotics", thumb: "joint" },
];

export const MODELS: ModelEntry[] = [
  // ── 반도체 ──
  { cat: "semiconductor", id: "hbm", status: "live", thumb: "layers",
    name: { ko: "HBM 고대역폭 메모리", en: "HBM High-Bandwidth Memory", ja: "HBM 広帯域メモリ", zh: "HBM 高带宽内存" },
    desc: { ko: "수직으로 쌓은 적층 DRAM", en: "Vertically stacked DRAM", ja: "積層型DRAM", zh: "垂直堆叠DRAM" } },
  { cat: "semiconductor", id: "gpu", status: "soon", thumb: "layers",
    name: { ko: "GPU 패키지", en: "GPU Package", ja: "GPUパッケージ", zh: "GPU封装" },
    desc: { ko: "그래픽 처리 장치 구조", en: "Graphics processor anatomy", ja: "GPUの構造", zh: "图形处理器结构" } },
  { cat: "semiconductor", id: "cpu", status: "live", thumb: "layers",
    name: { ko: "CPU 칩렛 패키지", en: "CPU Chiplet Package", ja: "CPUチップレット", zh: "CPU芯粒封装" },
    desc: { ko: "여러 칩렛을 모은 구조", en: "Multiple chiplets in one package", ja: "複数チップレット構成", zh: "多芯粒封装结构" } },

  // ── 우주 ──
  { cat: "space", id: "rocket-engine", status: "soon", thumb: "orbit",
    name: { ko: "로켓 엔진", en: "Rocket Engine", ja: "ロケットエンジン", zh: "火箭发动机" },
    desc: { ko: "추진 시스템 단면", en: "Propulsion cutaway", ja: "推進システム断面", zh: "推进系统剖面" } },
  { cat: "space", id: "satellite", status: "soon", thumb: "orbit",
    name: { ko: "인공위성", en: "Satellite", ja: "人工衛星", zh: "人造卫星" },
    desc: { ko: "궤도 위성 모듈", en: "Orbital satellite", ja: "軌道衛星", zh: "轨道卫星模块" } },
  { cat: "space", id: "reentry-capsule", status: "soon", thumb: "orbit",
    name: { ko: "재진입 캡슐", en: "Reentry Capsule", ja: "再突入カプセル", zh: "返回舱" },
    desc: { ko: "대기권 재진입 구조", en: "Atmospheric reentry", ja: "大気圏再突入", zh: "大气层返回" } },

  // ── 자동차 ──
  { cat: "automotive", id: "ev-battery", status: "soon", thumb: "cells",
    name: { ko: "EV 배터리 팩", en: "EV Battery Pack", ja: "EVバッテリーパック", zh: "电动汽车电池组" },
    desc: { ko: "전기차 에너지 저장", en: "EV energy storage", ja: "EVのエネルギー貯蔵", zh: "电动车储能" } },
  { cat: "automotive", id: "combustion-engine", status: "soon", thumb: "cells",
    name: { ko: "내연기관 엔진", en: "Combustion Engine", ja: "内燃エンジン", zh: "内燃机" },
    desc: { ko: "4행정 작동 원리", en: "Four-stroke cycle", ja: "4ストロークの原理", zh: "四冲程原理" } },
  { cat: "automotive", id: "drive-motor", status: "soon", thumb: "cells",
    name: { ko: "구동 모터", en: "Drive Motor", ja: "駆動モーター", zh: "驱动电机" },
    desc: { ko: "전기 구동 장치", en: "Electric drive unit", ja: "電動駆動装置", zh: "电力驱动装置" } },

  // ── 가전 ──
  { cat: "appliance", id: "cooling-compressor", status: "soon", thumb: "coil",
    name: { ko: "냉각 컴프레서", en: "Cooling Compressor", ja: "冷却コンプレッサー", zh: "制冷压缩机" },
    desc: { ko: "냉장·냉방의 심장부", en: "The heart of cooling", ja: "冷却の心臓部", zh: "制冷核心" } },
  { cat: "appliance", id: "electric-motor", status: "soon", thumb: "coil",
    name: { ko: "전기 모터", en: "Electric Motor", ja: "電動モーター", zh: "电动机" },
    desc: { ko: "회전 동력 장치", en: "Rotary drive", ja: "回転駆動", zh: "旋转动力" } },
  { cat: "appliance", id: "microwave", status: "soon", thumb: "coil",
    name: { ko: "전자레인지", en: "Microwave Oven", ja: "電子レンジ", zh: "微波炉" },
    desc: { ko: "마그네트론 작동 원리", en: "How a magnetron works", ja: "マグネトロンの仕組み", zh: "磁控管原理" } },

  // ── 항공 ──
  { cat: "aviation", id: "jet-engine", status: "soon", thumb: "blades",
    name: { ko: "제트 엔진", en: "Jet Engine", ja: "ジェットエンジン", zh: "喷气发动机" },
    desc: { ko: "터보팬 구조", en: "Turbofan anatomy", ja: "ターボファン構造", zh: "涡扇结构" } },
  { cat: "aviation", id: "landing-gear", status: "soon", thumb: "blades",
    name: { ko: "랜딩기어", en: "Landing Gear", ja: "着陸装置", zh: "起落架" },
    desc: { ko: "이착륙 장치", en: "Takeoff & landing gear", ja: "離着陸装置", zh: "起降装置" } },
  { cat: "aviation", id: "wing", status: "soon", thumb: "blades",
    name: { ko: "날개 구조", en: "Wing Structure", ja: "主翼構造", zh: "机翼结构" },
    desc: { ko: "항공기 날개 내부", en: "Inside an aircraft wing", ja: "主翼の内部", zh: "机翼内部" } },

  // ── 의료기기 ──
  { cat: "medical", id: "mri", status: "soon", thumb: "wave",
    name: { ko: "MRI 스캐너", en: "MRI Scanner", ja: "MRIスキャナー", zh: "磁共振扫描仪" },
    desc: { ko: "자기공명영상 장치", en: "Magnetic resonance imaging", ja: "磁気共鳴画像", zh: "磁共振成像" } },
  { cat: "medical", id: "pacemaker", status: "soon", thumb: "wave",
    name: { ko: "페이스메이커", en: "Pacemaker", ja: "ペースメーカー", zh: "心脏起搏器" },
    desc: { ko: "인공 심장박동 조율기", en: "Cardiac rhythm device", ja: "心臓ペースメーカー", zh: "心律调节器" } },
  { cat: "medical", id: "insulin-pump", status: "soon", thumb: "wave",
    name: { ko: "인슐린 펌프", en: "Insulin Pump", ja: "インスリンポンプ", zh: "胰岛素泵" },
    desc: { ko: "자동 인슐린 주입", en: "Automated insulin delivery", ja: "自動インスリン注入", zh: "自动注射胰岛素" } },

  // ── 에너지 ──
  { cat: "energy", id: "lithium-ion", status: "soon", thumb: "cells",
    name: { ko: "리튬이온 배터리", en: "Lithium-Ion Cell", ja: "リチウムイオン電池", zh: "锂离子电池" },
    desc: { ko: "충전식 배터리 셀", en: "Rechargeable battery cell", ja: "充電式電池セル", zh: "可充电电芯" } },
  { cat: "energy", id: "solar-panel", status: "soon", thumb: "cells",
    name: { ko: "태양광 패널", en: "Solar Panel", ja: "太陽光パネル", zh: "太阳能板" },
    desc: { ko: "광전지 변환 구조", en: "Photovoltaic conversion", ja: "太陽光発電", zh: "光伏转换" } },
  { cat: "energy", id: "wind-turbine", status: "soon", thumb: "cells",
    name: { ko: "풍력 터빈", en: "Wind Turbine", ja: "風力タービン", zh: "风力涡轮机" },
    desc: { ko: "풍력 발전 장치", en: "Wind power generator", ja: "風力発電", zh: "风力发电" } },

  // ── 로보틱스 ──
  { cat: "robotics", id: "actuator", status: "soon", thumb: "joint",
    name: { ko: "로봇 액추에이터", en: "Robotic Actuator", ja: "ロボットアクチュエータ", zh: "机器人执行器" },
    desc: { ko: "로봇 관절 구동부", en: "Robot joint drive", ja: "関節駆動部", zh: "关节驱动" } },
  { cat: "robotics", id: "humanoid-hand", status: "soon", thumb: "joint",
    name: { ko: "휴머노이드 손", en: "Humanoid Hand", ja: "ヒューマノイドハンド", zh: "仿生机械手" },
    desc: { ko: "다관절 로봇 손", en: "Multi-joint robot hand", ja: "多関節ロボットハンド", zh: "多关节机械手" } },
  { cat: "robotics", id: "lidar", status: "soon", thumb: "joint",
    name: { ko: "라이다", en: "LiDAR Sensor", ja: "LiDARセンサー", zh: "激光雷达" },
    desc: { ko: "자율주행 거리 센서", en: "Self-driving range sensor", ja: "自動運転センサー", zh: "自动驾驶传感器" } },
];

/** 한 카테고리의 모델만 추린다. */
export function modelsOf(cat: CategoryId): ModelEntry[] {
  return MODELS.filter((m) => m.cat === cat);
}

/** cat/id 로 모델 하나 찾기. */
export function findModel(cat: string, id: string): ModelEntry | undefined {
  return MODELS.find((m) => m.cat === cat && m.id === id);
}
