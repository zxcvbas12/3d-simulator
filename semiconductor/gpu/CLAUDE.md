# GPU 모델 지침

> 루트 `../../CLAUDE.md` + 카테고리 `../CLAUDE.md` 규칙 **위에** 적용. 충돌 시 이 파일 우선.
> **품질·연출·인터랙션은 HBM과 동일** — 공통 `<Viewer>` 엔진(`src/shared/r3f/`)을 그대로 쓴다. 모델은 형상(model.tsx)과 설명(data.ts)만 제공.

## 이 모델이 표현하는 것
GPU 가속기 **패키지 전체** — 큰 연산 다이(GPU die) 옆에 HBM 스택들이 실리콘 인터포저로 붙는 **2.5D 패키지**.
"HBM을 왜 프로세서 바로 옆에 두는가 / 현대 AI 가속기는 어떻게 생겼나"를 한눈에 보여준다.
→ **이미 만든 HBM 모델을 '시스템 안'에서 다시 보여주는 상위 맥락 모델**. (HBM 상세 학습 후 GPU에서 전체 그림을 보는 흐름)

## 구조 (아래 → 위, HBM은 평면 배치)
1. **패키지 기판 (substrate)** — 큰 받침. 아랫면 BGA 격자(인스턴싱). 픽 id `substrate` / 볼 픽 id `bga`.
2. **실리콘 인터포저 (interposer)** — GPU 다이와 HBM 스택을 한 판 위에 잇는다. 아랫면 C4 범프(장식, 픽 제외). 픽 id `interposer`.
3. **GPU 연산 다이 (gpu)** — 중앙의 큰 다이. 윗면 SM/코어 어레이 텍스처, 아랫면 마이크로 범프. 픽 id `gpu`.
4. **HBM 스택 × 4 (hbm)** — GPU 다이 좌우에 배치(2 left + 2 right). **HBM 모델을 간략화한 미니 적층**(얇은 판 ~6장 + 윗판 "HBM" 각인 + 아래 마이크로 범프). 4개가 같은 형상을 공유, 픽 id `hbm`(공유). 실제 제품은 4~8개 — 개수는 조정 가능.
5. **마이크로 범프 (microbump)** — GPU·HBM 다이 아래 격자(인스턴싱), 픽 id `microbump`.
6. **(보류) 리드 / IHS** — 데이터센터 GPU는 베어 다이가 많아 **v1은 생략**(다이가 보이게). 필요하면 가장 먼저 들리는 상단 파트로 추가.

## 분해 (혼합: 수직 + 평면 방사)
부품별 `explode` 벡터로 표현 — 엔진이 `base → base+explode`를 stagger+ease로 보간한다(별도 분해 로직 구현 없음).
- **기판 ↓**, **인터포저 살짝 ↓**(사이가 드러남), **GPU 다이 ↑**(중앙 유지), **HBM 스택은 좌우로 펼쳐지며(평면 ±x) ↑**.
- stagger order(높이/순서 기준): substrate 0 → interposer ~0.3 → gpu ~0.6 → hbm ~0.7.
- **(향후) HBM 스택 2단계 분해**(스택 내부 층까지)는 엔진에 2차 분해값이 생기면. v1은 각 HBM 스택을 한 덩어리로 움직인다.

## 색 / 구분 (HBM 팔레트 기준)
- **GPU 다이 = 구분 포인트색(틸/시안 계열)** — HBM 블루·CPU와 시각적으로 구분.
- HBM 스택 = HBM 블루 팔레트 재사용. 인터포저 = 실버블루. 기판 = 그린/탄. 금속(범프·볼) = 구리/실버.
- 텍스처는 공용 `@app/shared/r3f/textures` 재사용:
  - GPU 다이 윗면 = `makeDieTexture(틸 hue, ["GPU"])`
  - HBM 미니스택 윗판 = `makeDieTexture(블루 hue, ["HBM"])`
  - 인터포저·기판 윗면 = `makeRoutingTexture(...)`

## 부품 & 치수(spec — 언어 중립 readout)
정보 패널 `spec` 필드에 실제 치수를 넣는다(예시값, 데이터센터 GPU 기준):
- `gpu` — GPU 연산 다이 · `≈ 800 mm² (≈ 26 × 31 mm) · 4–5 nm` (레티클 한계 ~858 mm²)
- `hbm` — HBM 스택 · `≈ 11 × 11 mm · 8–12-Hi`
- `interposer` — 실리콘 인터포저 · `Si · ≈ 65 × 55 mm · t ≈ 100 μm`
- `substrate` — 패키지 기판 · `≈ 70 × 70 mm · multilayer organic`
- `microbump` — 마이크로 범프 · `∅ ≈ 25 μm · pitch ≈ 45 μm`
- `bga` — BGA 솔더 볼 · `pitch ≈ 1 mm`

## 핵심 학습 포인트 (정보 패널 facts에 반영)
- HBM을 GPU 옆 가까이 두면 데이터 거리↓ → **대역폭↑ · 전력↓**.
- 인터포저가 두 칩을 **수천 배선으로 잇는다(2.5D)**.
- 큰 연산 다이 + 옆 메모리 = **현대 AI 가속기의 기본 형태**(집계 대역폭 ~수 TB/s).

## 모델 개요/사양 (catalog `overview` · `specs`)
- **overview**: GPU+HBM 2.5D 시스템을 설명하고 HBM 모델과 연결(상위 맥락).
- **specs(예시)**: 구조 `GPU die + 4× HBM`, 패키지 `≈ 70 × 70 mm`, GPU 다이 `≈ 800 mm² · 4–5 nm`, 메모리 `HBM ×4`, 인터커넥트 `Si interposer (2.5D)`, 집계 대역폭 `~3 TB/s`.

---

## 구현 계획 (R3F · HBM/CPU와 동일 패턴)
**파일 2개 + 등록 2줄.** 엔진/인터랙션/패널은 손대지 않는다.

1. **`semiconductor/gpu/model.tsx`** — module 로드 시 THREE 객체를 한 번 빌드하고 `<primitive>`로 `ModelDef.parts[].node`에 연결.
   - 공용 텍스처 import(`@app/shared/r3f/textures`), 재질은 6면 멀티머티리얼 PBR(`side()` 헬퍼 패턴, +y 윗면에 텍스처).
   - 빌더는 HBM/CPU 패턴 재사용: `makeBox` / `addEdges`(엣지 라인은 `e.raycast=()=>{}`) / `addBumps` / `addBallGrid`.
   - `buildHbmMiniStack()` — 얇은 판 ~6장 적층 + 윗판 "HBM" 각인 + 아래 마이크로 범프. 한 번 만들어 4개 위치에 인스턴스화(각 위치마다 별도 그룹).
   - `buildGpuDie / buildInterposer / buildSubstrate`.
   - `parts: PartDef[]` — substrate · interposer · gpu · hbm×4 (각 `base`/`explode`/`order`, hbm은 `id:"hbm"` 공유). bga·c4·microbump는 부모 콘텐츠 그룹 안 인스턴싱(픽은 인스턴스 메시 `userData.partId`).
   - `extras`/`update` **불필요**(TSV 같은 동적 길이 부품 없음).
   - `export const gpuModel: ModelDef = { parts, info: gpuInfo }; export default gpuModel;`
2. **`semiconductor/gpu/data.ts`** — `PartInfoMap`(tag/title/spec/lead/detail/facts/sources) 6부품 × 4언어(ko/en/ja/zh).
3. **`src/shared/r3f/registry.tsx`** — 한 줄: `"semiconductor/gpu": makeViewer(() => import("../../../semiconductor/gpu/model"))`.
4. **`shared/catalog.ts`** — gpu 엔트리 `status: "live"` + `name`/`desc`/`overview`/`specs` 갱신.

### 자동 상속(엔진) — 따로 구현하지 않음
회전 · 독립 줌 · stagger 분해 · 자동 프레이밍 · 레이캐스트 피킹 · 정보 패널(치수 · 입문↔심화 토글 · 더 읽기) ·
절차적 환경맵(PBR 반사) · 온디맨드 렌더, 그리고 하드닝(언마운트 강조 복원 · 분해 중 동적 인스턴스 픽 안전 ·
ErrorBoundary · 로딩/에러 폴백)을 공통 `<Viewer>`에서 그대로 받는다.

### 검증
`tsc` + `npm run build`(코드 스플리팅: gpu model이 별도 lazy 청크) + dev 스모크.
실제 렌더는 브라우저에서: HBM 4개가 좌우로 펼쳐지는지 · GPU 다이 틸 구분색 · 각 부품 클릭→치수/설명/출처 · 모델 간 이동 시 잔상 없는지.

## 구현 TODO (순서대로)
- [ ] 1. `data.ts` — PartInfoMap 6부품(gpu · hbm · interposer · substrate · microbump · bga): tag·title·spec·lead·detail·facts(+일부 sources), ko/en/ja/zh.
- [ ] 2. `model.tsx` 재질·빌더 — `side()`/`dieMats`/routing 재질 + `makeBox`·`addEdges`(엣지 라인 raycast off)·`addBumps`·`addBallGrid`(HBM 패턴 재사용), 공용 텍스처 import.
- [ ] 3. `model.tsx` 콘텐츠 — `buildSubstrate`(+BGA) · `buildInterposer`(+C4, 픽 제외) · `buildGpuDie`(틸 다이 + 범프) · `buildHbmMiniStack`(얇은 판 ~6 + 윗판 "HBM" 각인 + 범프). 4개 HBM은 재질을 **공유하지 않게**(부품별 강조 독립).
- [ ] 4. `model.tsx` 조립 — `parts[]`(substrate · interposer · gpu · hbm×4)에 base/explode/order. 혼합 분해: 기판·인터포저 ↓, GPU ↑, HBM은 좌우로 평면 전개하며 ↑. → `export const gpuModel: ModelDef`.
- [ ] 5. `src/shared/r3f/registry.tsx` — `"semiconductor/gpu": makeViewer(() => import("../../../semiconductor/gpu/model"))` 한 줄.
- [ ] 6. `shared/catalog.ts` — gpu `status: "live"` + name/desc/overview/specs.
- [ ] 7. 검증 — `tsc` + `npm run build` + dev 스모크 → 커밋/푸시 → 브라우저 렌더 확인.

## 사용자 노출 문구
전부 다국어로(`data.ts`의 부품 설명 + `catalog`의 이름/개요/사양). 하드코딩 금지.
