# 로켓 엔진 모델 지침

> 루트 `../../CLAUDE.md` + 카테고리 `../CLAUDE.md` 규칙 **위에** 적용. 충돌 시 이 파일 우선.
> **품질·연출·인터랙션은 반도체 3종(HBM·GPU·CPU)과 동일** — 공통 `<Viewer>` 엔진(`src/shared/r3f/`)을 그대로 쓴다.
> 모델은 형상(`model.tsx`)과 설명(`data.ts`)만 제공한다. **엔진/패널/인터랙션은 손대지 않는다.**

## 이 모델이 표현하는 것
**액체 추진제 로켓 엔진**(2액체식). 사이클은 가장 보편적인 **가스 발생기 사이클(gas-generator)**, 추진제는 **액체산소(LOX) + 케로신(RP-1)**.
특정 실제 엔진을 베끼지 않고, 현대 1단 엔진(Merlin·F-1 계열) 구조를 **대표값으로 일반화**한 교육용 모델이다.

핵심 이야기(분해하며 따라가는 흐름):
1. **터보펌프**가 추진제를 고압으로 밀어 넣고 — "어떻게 그 많은 연료를 순식간에 공급하나"
2. **인젝터**가 산화제·연료를 안개처럼 뿜어 섞고 —
3. **연소실**에서 고압·고온(≈ 3,500 K)으로 태우고 —
4. **노즐**(드 라발)이 그 가스를 초음속으로 가속해 **추력**을 만든다. (작용·반작용)
5. 벽이 녹지 않게 차가운 연료가 벽을 돌아 식히는 **재생냉각**,
6. 그리고 엔진 전체가 기울며 방향을 잡는 **짐벌**.

→ **이 분야의 첫 모델**이자, 사이트 전체에서 **첫 회전체(원통·원뿔) 형상** 모델. 반도체의 "적층 박스"와 시각적으로 확실히 구분된다.

## 구조 (위 → 아래, 수직 추력축)
표시 방향: **짐벌이 맨 위(+Y), 노즐 출구가 맨 아래(−Y)**, 배기는 아래로 나간다. 클릭 부품 6개:

1. **짐벌 마운트 (gimbal)** — 맨 위 구조 링/요크. 엔진을 기체에 매달고, 좌우로 기울여(TVC) 방향을 잡는다. 픽 id `gimbal`.
2. **터보펌프 (turbopump)** — 측면의 원통 어셈블리(펌프 + 터빈 + 소형 가스 발생기). 추진제를 고압으로 가압한다. 픽 id `turbopump`. *(가스 발생기를 별도 부품으로 분리할지는 아래 "결정 필요" 참고 — v1은 터보펌프에 통합.)*
3. **인젝터 돔 (injector)** — 연소실 위를 덮는 돔 + 분사면(오리피스 격자, 인스턴싱). 추진제를 뿜어 혼합. 픽 id `injector`.
4. **연소실 (chamber)** — 중앙 원통 + 좁아지는 목(throat). 연소가 일어나는 곳. 구리합금 벽. 픽 id `chamber`.
5. **노즐 벨 (nozzle)** — 큰 팽창 벨. 표면에 재생냉각 채널(세로 결). 가장 크게 아래로 분해되며 목·인젝터를 드러낸다. 픽 id `nozzle`.
6. **추진제 배관/매니폴드 (feedlines)** — 산화제(골드)·연료(블루) 라인 + 연소실을 감는 매니폴드. 색으로 연료/산화제 경로를 가르친다. 픽 id `feedlines`.

## 분해 (수직 + 일부 방사)
부품별 `explode` 벡터로 표현 — 엔진이 `base → base+explode`를 stagger+ease로 보간(별도 분해 로직 없음).
- **노즐 ↓ 크게**(목과 인젝터가 드러남) · **연소실 거의 제자리(살짝 ↑)** · **인젝터 ↑** · **짐벌 ↑ 맨 위로** · **터보펌프·배관은 옆(±X)으로** 빠진다.
- stagger order(먼저 벌어지는 순): 노즐 0.0 → 연소실 0.2 → 배관 0.4 → 인젝터 0.55 → 터보펌프 0.7 → 짐벌 1.0.
- **(향후) 2단계 분해**: 노즐의 냉각 채널 단면을 한 겹 더 벗기거나 인젝터 분사 패턴 강조. v1은 단일 분해.

## 색 / 구분 (카테고리 = 구리/브론즈 강조)
루트 팔레트(블루 `#6f9bff`·구리 `#c97b34`·골드 `#e6b53c`) 안에서:
- **연소실·노즐 = 구리/브론즈** — 실제 재생냉각 연소실이 구리합금. 카테고리 강조색이자 이 모델의 얼굴.
- **인젝터·터보펌프·짐벌 = 차가운 강철/실버**(브러시드 메탈). 공용 `makeBrushedMetalTexture` 재사용.
- **배관 = 연료 블루 · 산화제 골드** 색 코드(경로 학습).
- **목(throat)에 절제된 골드 발광**(emissive 약하게) — 연소를 암시하되 네온 금지(루트 "AI 티 방지" 규칙 준수).
- **새 공용 텍스처 1개**: `makeChannelTexture(hue)` — 노즐·연소실의 세로 냉각 채널 결(원통 UV로 감김). `src/shared/r3f/textures.ts`에 추가(향후 제트엔진 등 기계 모델 재사용). 나머지는 기존 텍스처 재사용.

## 부품 & 치수(spec — 언어 중립 readout · 대표값)
정보 패널 `spec`에 넣는다(가스 발생기 LOX/RP-1, Merlin-1D 급 대표값):
- `nozzle` — 노즐 벨 · `출구 ∅ ≈ 0.92 m · 팽창비 ε ≈ 16 · 재생냉각`
- `chamber` — 연소실 · `연소압 ≈ 100 bar · 가스온도 ≈ 3,500 K`
- `injector` — 인젝터 · `핀틀/동축 분사 · O/F ≈ 2.3`
- `turbopump` — 터보펌프 · `≈ 36,000 rpm · ≈ 7,500 kW`
- `feedlines` — 추진제 배관 · `LOX + RP-1 · O/F ≈ 2.3`
- `gimbal` — 짐벌 마운트 · `TVC ±5–8°`

## 핵심 학습 포인트 (정보 패널 facts에 반영)
- 엔진은 **연료를 태워 가스를 빠르게 뒤로 밀고**, 그 반작용으로 전진한다(운동량 보존).
- **노즐(드 라발)**: 좁은 목 → 넓어지는 벨에서 가스가 **초음속**으로 가속, 열·압력을 방향 있는 속도로 바꾼다 = 추력.
- **터보펌프**가 가장 어려운 부품 — 초당 수백 kg을 수십~수백 bar로 밀어야 한다.
- **재생냉각**: 차가운 연료를 벽 속 채널로 먼저 돌려 3,000 K+ 가스로부터 벽을 지킨 뒤 태운다.
- **짐벌**: 엔진을 기울여 로켓의 방향을 잡는다(능동 조향).

## 모델 개요/사양 (catalog `overview` · `specs`)
- **overview**: 액체 로켓 엔진이 추진제를 펌프로 가압→분사→연소→노즐 가속으로 추력을 만드는 과정과 재생냉각·짐벌을 설명. 반도체 모델과 달리 "회전체 기계"임을 환기.
- **specs(예시)**: 추력(해면) `≈ 845 kN`, 비추력 Isp `≈ 283 s (SL) / 312 s (vac)`, 연소압 `≈ 100 bar`, 추진제 `LOX / RP-1`, 사이클 `가스 발생기`, 노즐 팽창비 `≈ 16`, 전체 높이 `≈ 3.1 m`.

---

## 구현 계획 (R3F · 회전체 형상)
**파일 2개 + 등록 2줄 + 공용 텍스처 1개.** 엔진/인터랙션/패널은 손대지 않는다.

1. **`space/rocket-engine/model.tsx`** — module 로드 시 THREE 객체를 한 번 빌드하고 `<primitive>`로 `ModelDef.parts[].node`에 연결(반도체 모델과 동일 패턴).
   - **지오메트리 접근(신규 영역)**:
     - 노즐 벨 = `LatheGeometry`(벨 곡선 프로파일을 Y축 회전) — openEnded 느낌, 안쪽도 보이게 `side: DoubleSide`.
     - 연소실 + 목 = `LatheGeometry` 또는 `CylinderGeometry`(위 원통 → 좁은 목). 노즐과 **별도 메시**(분해 분리).
     - 인젝터 돔 = `SphereGeometry`(thetaLength 반구) + 분사면 디스크 + 오리피스 = 작은 실린더 `InstancedMesh`(픽은 부모 귀속).
     - 터보펌프 = `CylinderGeometry` 본체 + 펌프 볼류트(작은 실린더/토러스) + 가스발생기 소형 실린더.
     - 배관 = `TubeGeometry`(CatmullRom 곡선) 몇 줄, 연료/산화제 색 분리.
     - 짐벌 = `TorusGeometry` 링 + 스트럿(가는 `CylinderGeometry`) 케이지.
   - 재질 = `MeshStandardMaterial` PBR(구리/강철 metalness·roughness). 목 발광은 별도 작은 메시 `emissive`.
   - 빌더 패턴은 반도체 모델 재사용: `addEdges`(엣지 라인 `raycast=()=>{}` 장식) · 인스턴스 격자 헬퍼.
   - `parts: PartDef[]` — gimbal · turbopump · injector · chamber · nozzle · feedlines (각 `base`/`explode`/`order`).
   - `extras`/`update` **불필요**(동적 길이 부품 없음). *(옵션: 터빈 회전 idle 애니메이션은 v1 보류 — 온디맨드 렌더 유지.)*
   - `export const rocketEngineModel: ModelDef = { parts, info: rocketEngineInfo }; export default rocketEngineModel;`
2. **`space/rocket-engine/data.ts`** — `PartInfoMap`(tag/title/spec/lead/detail/facts/sources) 6부품 × 4언어(ko/en/ja/zh). 출처는 Wikipedia(Rocket engine, De Laval nozzle, Turbopump, Regenerative cooling, Gimbaled thrust 등).
3. **`src/shared/r3f/textures.ts`** — `makeChannelTexture(hue)` 추가(세로 냉각 채널 결). 캐시 패턴 동일.
4. **`src/shared/r3f/registry.tsx`** — 한 줄: `"space/rocket-engine": makeViewer(() => import("../../../space/rocket-engine/model"))`.
5. **`shared/catalog.ts`** — rocket-engine 엔트리 `status: "soon" → "live"` + `overview`/`specs` 추가(name/desc는 이미 있음).
6. **locales 변경 없음** — 모델 문구는 전부 `data.ts` + `catalog.ts`에 있고, viewer/model 네임스페이스 키는 공용. (새 spec 라벨도 catalog specs 안에 인라인 다국어.)

### 자동 상속(엔진) — 따로 구현하지 않음
회전 · 독립 줌 · stagger 분해 · 자동 프레이밍(세로로 긴 형상도 bounding sphere로 처리) · 레이캐스트 피킹 ·
정보 패널(치수 · 입문↔심화 토글 · 더 읽기) · 절차적 환경맵(PBR 금속 반사) · 온디맨드 렌더,
그리고 하드닝(언마운트 강조 복원 · 동적 인스턴스 픽 안전 · ErrorBoundary · 로딩/에러 폴백)을 공통 `<Viewer>`에서 그대로 받는다.

### 검증
`tsc` + `npm run build`(코드 스플리팅: rocket-engine model이 별도 lazy 청크, 모델 청크 예산 < 15 kB gzip) + dev 스모크.
실제 렌더는 브라우저에서: **세로 형상이 화면에 꽉 차게 프레이밍되는지**(반도체는 가로로 넓었음 — 첫 세로 모델) · 노즐이 아래로 크게 분리되는지 · 구리/강철 구분 · 각 부품 클릭→치수/설명/출처 · 모델 간 이동 시 잔상 없는지.

## 구현 TODO (순서대로)
- [ ] 1. `data.ts` — PartInfoMap 6부품(nozzle · chamber · injector · turbopump · feedlines · gimbal): tag·title·spec·lead·detail·facts(+sources), 4언어.
- [ ] 2. `textures.ts` — `makeChannelTexture(hue)` 공용 텍스처 추가.
- [ ] 3. `model.tsx` 빌더 — Lathe(노즐·연소실)·Sphere+Instanced(인젝터)·Cylinder(터보펌프)·Tube(배관)·Torus(짐벌) + 재질 + `addEdges` 재사용.
- [ ] 4. `model.tsx` 조립 — `parts[]`(gimbal·turbopump·injector·chamber·nozzle·feedlines) base/explode/order(수직+방사 혼합) → `export const rocketEngineModel: ModelDef`.
- [ ] 5. `registry.tsx` 한 줄 등록.
- [ ] 6. `catalog.ts` — rocket-engine `status:"live"` + overview/specs.
- [ ] 7. 검증 — `tsc` + `npm run build` + dev 스모크 → 커밋/푸시 → 브라우저 렌더 확인.

## 결정됨 (2026-06-10, 사용자 확인)
- **엔진 아키타입**: 가스 발생기 사이클 · **LOX / RP-1**(케로신). → 위 치수·설명 그대로 진행.
- **부품 수**: **6개** — 가스 발생기는 터보펌프에 통합(별도 클릭 부품 아님, 터보펌프 설명에 녹임).

## 사용자 노출 문구
전부 다국어로(`data.ts`의 부품 설명 + `catalog`의 개요/사양). 하드코딩 금지.
