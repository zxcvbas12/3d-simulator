# 인공위성 모델군 지침 (공유 코어 + 2종)

> 루트 `../../CLAUDE.md` + 카테고리 `../CLAUDE.md` 규칙 **위에** 적용. 충돌 시 이 파일 우선.
> **품질·연출·인터랙션은 기존 모델과 동일** — 공통 `<Viewer>` 엔진을 그대로 쓴다. 모델은 형상·설명만 제공.
> 이 폴더(`space/satellite/`)는 **모델이 아니라 공유 코어**다(등록 안 됨). 실제 등록 모델은 `eo-satellite`·`comsat` 두 개.

## 무엇을 만드나 — 위성 2종
전형적 지구 궤도 위성을 대표값으로 일반화. 두 변형이 **버스 코어를 공유**하고 **탑재체·안테나·궤도만** 다르다.
- **`eo-satellite`** — **지구관측 위성**(저궤도 LEO ~600 km). 탑재체 = 지구를 향한 망원 카메라(nadir), 안테나 = 고이득 dish ×1. 태양동기궤도.
- **`comsat`** — **통신 위성**(정지궤도 GEO 35,786 km). 탑재체 = 중계기(transponder), 안테나 = 지구를 향한 대형 반사판 ×2. 더 큼.

로켓 엔진(발사) → 위성(궤도)으로 이어지는 흐름. 사이트 **첫 모듈형(중앙 버스 + 면별 부속)** 유형.

## 공유 코어 (`space/satellite/core.tsx` + `core.ts`)
두 모델이 import해서 쓰는 공통 부품 빌더와 설명. **중복을 위로 모은다**(DRY, 1인 유지보수).
- `core.tsx` 빌더: `buildBus()`·`buildSolarWing()`·`buildReactionWheels()`·`buildPropulsion()`·`buildBattery()`·`buildDish(params)` + 재질/엣지 헬퍼.
- `core.ts` 설명: 공통 PartInfo 조각 `commonSatInfo`(bus·solar·adcs·propulsion·battery) — 각 모델 `data.ts`가 spread 후 자기 antenna·payload만 덧붙인다.
- **부품 간 재질 인스턴스 공유 금지**(강조 독립). 텍스처 map은 캐시 공유 OK.

## 구조 (7부품 · 중앙 버스 + 면별 부속)
두 모델 공통 7부품(태양전지판은 ×2 공유 id):
1. **본체/버스 (bus)** — 모든 장비를 담는 중앙 박스. 표면 = 금박(MLI) 단열. 픽 `bus`. *(MLI는 별도 부품 아님 — 버스 재질로 표현.)*
2. **태양전지판 × 2 (solar)** — ±X로 펼쳐진 발전 날개, 짙은 청색 셀. 공유 id `solar` + `layer`로 L/R.
3. **안테나 (antenna)** — EO: dish ×1 / Comsat: 반사판 ×2(한 부품 그룹). 픽 `antenna`.
4. **탑재체 (payload)** — EO: 관측 카메라 배럴(−Y) / Comsat: 중계기 박스. 픽 `payload`.
5. **추진 모듈 (propulsion)** — 추진제 탱크(구) + 추력기 노즐. 궤도 유지. 픽 `propulsion`.
6. **반작용 휠 (adcs)** — 자세 제어 휠 클러스터(상단 데크). 픽 `adcs`. *(별 추적기는 ADCS 설명에 녹임.)*
7. **배터리 (battery)** — 음지(eclipse)용 전력 저장 팩. 전력 서브시스템 완성(생성↔저장). 픽 `battery`.

## 분해 (방사형 모듈 분리)
각 부속이 버스에서 면 방향으로 떨어져 나간다. 버스는 앵커(거의 제자리).
- 태양전지판 **±X**, 안테나 **+Y(또는 지구 반대쪽)**, 탑재체 **−Y(지구 쪽)**, 추진 **−Z/하부**, 반작용 휠 **+Y(상단에서 들림)**, 배터리 **+Z 또는 측면**.
- stagger order: bus 0 → solar 0.2 → antenna 0.4 → payload 0.5 → propulsion 0.6 → adcs 0.75 → battery 0.85.

## 색 / 구분 (카테고리 = 구리/골드 강조)
- **버스 = 금박(MLI) 골드/구리**(위성의 얼굴·카테고리 강조). 약하게 구겨진 포일.
- **태양전지판 = 짙은 청색 셀 격자**(블루 포인트). **안테나 = 화이트/실버 + 골드 피드.**
- **탑재체 = 어두운 강철 + 골드 조리개(EO)** / 강철 박스(Comsat). **탱크 = 티타늄 구 · 노즐 = 구리.**
- **반작용 휠 = 강철 · 배터리 = 짙은 회청색 셀 묶음.**
- **새 공용 텍스처 2개**(`src/shared/r3f/textures.ts`): `makeFoilTexture(hue)`(MLI 금박), `makeSolarTexture()`(셀 격자). 향후 우주 모델 재사용.

## 부품 & 치수(spec — 대표값)
공통: `bus` 본체 `≈ 2×2×3 m` / `solar` `전개 ≈ 20 m · ≈ 8 kW` / `propulsion` `하이드라진 · 궤도유지 ΔV` / `adcs` `반작용 휠 ~6,000 rpm · 지향 ~0.02°` / `battery` `Li-ion · eclipse 대비`.
- **EO**: `payload` 관측 카메라 `구경 ≈ 0.8 m · GSD ~0.5 m` · `antenna` `dish ∅ ≈ 2 m · X-band` · 궤도 `LEO ≈ 600 km`.
- **Comsat**: `payload` 중계기 `다중 트랜스폰더` · `antenna` `반사판 ∅ ≈ 2.5 m ×2 · Ku/Ka-band` · 궤도 `GEO 35,786 km`.

## 핵심 학습 포인트 (facts)
- 위성 = **버스(트럭) + 탑재체(임무)**. 버스가 전력·자세·통신·추진·열을 책임진다.
- 전력: 태양전지판(생성) + **배터리(음지 저장)**. 자세: **반작용 휠**로 연료 없이 회전(각운동량 보존), 별 추적기로 방향 인지.
- 추진: 작은 추력기로 궤도 유지(섭동 보정). 열: 금박 MLI + 라디에이터로 극한 온도차.
- **EO vs Comsat 차이**: 관측은 가까이(LEO) 지구를 찍고, 통신은 한자리(GEO)에서 넓게 중계 — 궤도와 탑재체가 임무를 정한다.

## 모델 개요/사양 (catalog `overview`·`specs` — 모델별)
- **eo-satellite overview**: 저궤도에서 지구를 관측하는 버스+카메라 구조, 전력·자세·통신·추진·열제어 설명.
- **comsat overview**: 정지궤도에서 신호를 중계하는 버스+중계기·대형 반사판 구조, 한 지점 고정(GEO)의 의미.
- specs: 위 치수표 기반(구조·본체·질량·전력·안테나·탑재체·궤도).

---

## 구현 계획 (R3F)
**공유 코어 1쌍 + 모델 2종(각 model.tsx+data.ts) + 공용 텍스처 2개 + 등록 2줄 + catalog 2 엔트리.**

1. **`src/shared/r3f/textures.ts`** — `makeFoilTexture(hue)` + `makeSolarTexture()` 추가.
2. **`space/satellite/core.tsx`** — 공통 빌더(버스·태양전지판·반작용 휠·추진·배터리·dish) + 재질/엣지 헬퍼. 지오메트리: Box(버스·패널)·Lathe(dish, 로켓 회전체 재사용)·Sphere(탱크)·Cone(노즐)·Cylinder(배럴·휠·배터리 셀).
3. **`space/satellite/core.ts`** — 공통 `commonSatInfo`(bus·solar·adcs·propulsion·battery) 4언어.
4. **`space/eo-satellite/{model.tsx,data.ts,CLAUDE.md}`** — 코어 import + 카메라 payload·dish antenna·LEO 배치/specs. `parts[]` 조립 → `export default`.
5. **`space/comsat/{model.tsx,data.ts,CLAUDE.md}`** — 코어 import + 중계기 payload·반사판 ×2 antenna·GEO 배치/specs.
6. **`src/shared/r3f/registry.tsx`** — `space/eo-satellite`·`space/comsat` 두 줄.
7. **`shared/catalog.ts`** — 기존 `satellite` 엔트리 제거 → `eo-satellite`·`comsat` 두 엔트리(live + overview/specs).
8. **locales 변경 없음**.

### 자동 상속(엔진) — 따로 구현하지 않음
회전·독립 줌·stagger 분해·자동 프레이밍·피킹·정보 패널·환경맵·온디맨드 렌더·하드닝을 공통 `<Viewer>`에서 그대로 받는다.

### 검증
`tsc` + `npm run build`(eo-satellite·comsat 각 별도 lazy 청크, 예산 < 15 kB gzip — 코어는 두 청크가 공유) + dev 스모크.
실제 렌더는 브라우저: 넓은 태양전지판 프레이밍 · 방사형 분해 · 금박 버스 vs 청색 패널 · EO 카메라(−Y) vs Comsat 반사판(지구향) · 각 부품 클릭 · 두 모델 전환 잔상 없음.

## 구현 TODO (순서대로)
- [ ] 1. textures.ts — `makeFoilTexture`·`makeSolarTexture`.
- [ ] 2. core.tsx — 공통 빌더 5종 + dish + 재질.
- [ ] 3. core.ts — `commonSatInfo` 4언어.
- [ ] 4. eo-satellite — model.tsx(카메라+dish, LEO) + data.ts + CLAUDE.md.
- [ ] 5. comsat — model.tsx(중계기+반사판×2, GEO) + data.ts + CLAUDE.md.
- [ ] 6. registry 2줄 + catalog satellite→2 엔트리.
- [ ] 7. 검증 → 커밋/푸시(자동 배포) → 브라우저 확인.

## 결정됨 (2026-06, 사용자 확인)
- **2종 모두**: 지구관측(LEO) + 통신(GEO). 슬러그 `eo-satellite`·`comsat`.
- **7부품**: 공통 6 + **배터리** 추가(별 추적기는 ADCS 설명에 통합).

## 사용자 노출 문구
전부 다국어로(`data.ts`/`core.ts`의 부품 설명 + `catalog`의 개요/사양). 하드코딩 금지.
