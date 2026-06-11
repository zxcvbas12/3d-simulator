# 재진입 캡슐 모델 지침

> 루트 `../../CLAUDE.md` + 카테고리 `../CLAUDE.md` 규칙 **위에** 적용. 충돌 시 이 파일 우선.
> **품질·연출·인터랙션은 기존 모델과 동일** — 공통 `<Viewer>` 엔진을 그대로 쓴다. 모델은 형상·설명만 제공.

## 이 모델이 표현하는 것
**유인 재진입 캡슐**(Apollo·Orion·Dragon 계열 무딘 원뿔형). 특정 실물을 베끼지 않고 대표값으로 일반화.
space 카테고리의 마지막 모델로 **발사(로켓 엔진) → 궤도(위성) → 귀환(캡슐)** 서사를 닫는다.
핵심 질문: "시속 28,000 km로 떨어지는 캡슐이 어떻게 안 타고, 안 부서지고, 사람을 살려서 착륙시키나."

핵심 이야기(분해하며 따라가는 흐름):
1. **열 차폐막(heat shield)** — 무딘 바닥이 충격파를 앞으로 밀어 열을 떼어내고, 융제(ablative) 재료가 일부러 타며 열을 가져간다.
2. **백셸/외피(backshell)** — 옆·뒤를 덮는 가벼운 열보호.
3. **여압 동체(pressure vessel)** — 1기압을 유지하는 안쪽 구조.
4. **내부(interior)** — 충격(수 g)을 흡수하는 좌석과 항전.
5. **자세 제어 추력기(RCS)** — 열차폐막이 앞을 보도록 각도를 잡고, 양력으로 진입 경로를 미세 조정.
6. **낙하산(parachute)** — 대기로 초음속→아음속까지 줄인 뒤, 마지막은 낙하산으로 부드럽게.
7. **해치/도킹(hatch)** — 승무원 출입구이자 우주선 도킹 포트.

→ 로켓(회전체)·위성(모듈형)에 이어, **무딘 원뿔(frustum) + 구형 차폐막**의 동심(껍질) 구조. 분해 시 3겹 껍질(차폐막·백셸·여압동체)이 벗겨지며 내부를 드러낸다.

## 구조 (동심 껍질 + 상·하부, 7부품)
표시: 수직 대칭축(Y). 무딘 차폐막이 아래(−Y, 진행 방향), 낙하산·해치가 위(+Y). 클릭 7부품:
1. **열 차폐막 (heatshield)** — 바닥의 융제 차폐막(구형 캡). 구리/탄화 톤. 픽 `heatshield`.
2. **백셸 / 외피 (backshell)** — 원뿔 외피 열보호(+MLI 금박 패치). 픽 `backshell`.
3. **여압 동체 (pressure-vessel)** — 백셸 안쪽 1기압 구조(티타늄). 픽 `pressure-vessel`.
4. **내부 (interior)** — 좌석 3~4 + 항전 박스. 픽 `interior`.
5. **자세 제어 추력기 (rcs)** — 외피 둘레 소형 노즐 클러스터(인스턴싱). 픽 `rcs`.
6. **낙하산 (parachute)** — 상단 캐니스터(+분해 시 캐노피 암시). 픽 `parachute`.
7. **해치 / 도킹 (hatch)** — 상단/측면 출입구 + 도킹 링 + 창. 픽 `hatch`.

## 분해 (동심 껍질 벗기기 — 수직 + 방사)
- **열 차폐막 ↓ 크게**(바닥에서 분리, 진행 방향), **백셸 ↑·바깥으로**(원뿔 외피가 들림), **여압 동체 거의 제자리**(앵커), **내부 ↑ 들려 드러남**, **낙하산 ↑ 상단으로**, **해치 옆으로**, **RCS 바깥 방사**.
- stagger order: heatshield 0 → backshell 0.25 → rcs 0.4 → interior 0.55 → pressure-vessel 0.6 → parachute 0.75 → hatch 0.9.

## 색 / 구분 (카테고리 = 구리/골드 강조)
- **열 차폐막 = 융제 구리/브론즈 + 탄화(어두운 균열)** — 카테고리 강조색이자 이 모델의 얼굴. 새 텍스처 `makeAblativeTexture`.
- **백셸 = 실버/화이트 TPS + 금박(MLI) 패치**(공유 `makeFoilTexture` 재사용). **여압 동체 = 티타늄/실버.**
- **내부 = 어두운 좌석 + 강철 항전.** **낙하산 = 화이트/오렌지(전개 시).** **RCS = 구리 노즐.** **해치 = 강철 + 어두운 창.**
- **새 공용 텍스처 1개**: `makeAblativeTexture(hue)`(탄화 균열 표면). 나머지는 기존(`makeFoilTexture`·`makeBrushedMetalTexture`) 재사용.

## 부품 & 치수(spec — 대표값, 유인 캡슐)
- `heatshield` — 열 차폐막 · `융제(ablative) · 베이스 ∅ ≈ 5 m · 2,500–3,000°C`
- `backshell` — 백셸 외피 · `원뿔 TPS · 반각 ~33°`
- `pressure-vessel` — 여압 동체 · `1 atm 유지 · 티타늄`
- `interior` — 좌석/항전 · `승무원 3–4 · 4–8 g 흡수`
- `rcs` — 자세 제어 추력기 · `진입 각·양력 제어`
- `parachute` — 낙하산 · `드로그 + 메인 ×3`
- `hatch` — 해치/도킹 · `출입구 + 도킹 어댑터`

## 핵심 학습 포인트 (facts)
- **무딘 몸체(blunt body)**: 뾰족한 게 아니라 무딘 바닥이 충격파를 앞으로 밀어내 열의 대부분을 캡슐에서 떼어낸다(직관과 반대).
- **융제 차폐**: 일부러 타서 증발하며 열을 함께 가져간다(희생식).
- **감속은 대기가**: 추력 없이 공기 저항만으로 ~28,000 km/h를 아음속까지. 마지막만 낙하산.
- **자세(RCS)**: 차폐막이 앞을 보게 각도를 유지하고, 약한 양력으로 g·착륙 지점을 조정.
- **생존**: 여압 동체 + 좌석이 1기압과 수 g 충격으로부터 승무원을 지킨다.

## 모델 개요/사양 (catalog `overview`·`specs`)
- **overview**: 캡슐이 무딘 몸체·융제 차폐·대기 감속·낙하산·자세 제어로 초고속 재진입에서 승무원을 살려 귀환시키는 원리. 발사·궤도에 이은 "귀환" 단계로 연결.
- **specs(예시)**: 구조 `무딘 원뿔 캡슐`, 베이스 `∅ ≈ 5 m`, 높이 `≈ 3.3 m`, 질량 `≈ 9 t`, 승무원 `3–4`, 재진입 속도 `≈ 7.8 km/s (LEO) / 11 km/s (월 귀환)`, 열차폐 `융제(ablative)`, 감속 `대기 + 낙하산(드로그+메인×3)`.

---

## 구현 계획 (R3F · 무딘 원뿔 + 구형 차폐막, 동심 껍질)
**파일 2개 + 등록 1줄 + 공용 텍스처 1개.** 엔진/인터랙션/패널은 손대지 않는다.

1. **`space/reentry-capsule/model.tsx`** — module 로드 시 빌드 후 `<primitive>`로 연결(기존 패턴).
   - **지오메트리**: 백셸·여압 동체 = `CylinderGeometry`(절두 원뿔, openEnded·DoubleSide) 또는 `LatheGeometry`(로켓·dish 회전체 빌더 재사용). 열 차폐막 = 얕은 구형 캡(`SphereGeometry` thetaLength 또는 Lathe 아크). 낙하산 캐니스터 = 짧은 `Cylinder`(+캐노피 `Cone`/반구). RCS = 소형 `Cone` 인스턴싱. 좌석 = 단순 `Box`/만곡. 해치 = 디스크 + 도킹 `Torus` 링 + 창.
   - 재질 = `MeshStandardMaterial` PBR. **부품 간 재질 인스턴스 공유 금지**(강조 독립). 텍스처 map은 캐시 공유 OK.
   - 빌더는 `addEdges`(엣지 라인 raycast off) 재사용. 동심 껍질은 DoubleSide로 안쪽도 보이게.
   - `parts: PartDef[]` — heatshield · backshell · pressure-vessel · interior · rcs · parachute · hatch.
   - `extras`/`update` 불필요.
   - `export const reentryCapsuleModel: ModelDef = { parts, info: reentryCapsuleInfo }; export default ...;`
2. **`space/reentry-capsule/data.ts`** — `PartInfoMap` 7부품 × 4언어. 출처: Wikipedia(Atmospheric entry, Heat shield, Ablation, Blunt body, Space capsule, Reaction control system 등).
3. **`src/shared/r3f/textures.ts`** — `makeAblativeTexture(hue)` 추가.
4. **`src/shared/r3f/registry.tsx`** — 한 줄: `"space/reentry-capsule": makeViewer(() => import("../../../space/reentry-capsule/model"))`.
5. **`shared/catalog.ts`** — reentry-capsule `status:"soon"→"live"` + overview/specs.
6. **locales 변경 없음**.

### 자동 상속(엔진) — 따로 구현하지 않음
회전·독립 줌·stagger 분해·자동 프레이밍·피킹·정보 패널·환경맵·온디맨드 렌더·하드닝을 공통 `<Viewer>`에서 그대로 받는다.

### 검증
`tsc` + `npm run build`(별도 lazy 청크, 예산 < 15 kB gzip) + dev 스모크.
실제 렌더는 브라우저: 무딘 원뿔 형상 프레이밍 · 3겹 껍질이 분해로 벗겨지는지 · 구리/탄화 차폐막 vs 실버 외피 구분 · 7부품 클릭 · 모델 전환 잔상 없음.

## 구현 TODO (순서대로)
- [ ] 1. `data.ts` — 7부품(heatshield·backshell·pressure-vessel·interior·rcs·parachute·hatch) 4언어.
- [ ] 2. `textures.ts` — `makeAblativeTexture(hue)`.
- [ ] 3. `model.tsx` 빌더 — Lathe/Cone/Sphere/Cylinder/Torus/Box + 재질 + addEdges.
- [ ] 4. `model.tsx` 조립 — `parts[]` base/explode/order(동심 껍질 벗기기) → `export default`.
- [ ] 5. `registry.tsx` 한 줄.
- [ ] 6. `catalog.ts` — live + overview/specs.
- [ ] 7. 검증 → 커밋/푸시(자동 배포) → 브라우저 확인.

## 결정됨 (2026-06, 사용자 확인)
- **아키타입**: 유인 캡슐(좌석·해치·창). 위 구성 그대로.
- **부품 수**: 7개(동심 3껍질 + 내부 + 낙하산 + RCS + 해치).

## 사용자 노출 문구
전부 다국어로(`data.ts` + `catalog`). 하드코딩 금지.
