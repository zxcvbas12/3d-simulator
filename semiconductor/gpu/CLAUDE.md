# GPU 모델 지침

> 루트 `../../CLAUDE.md` + 카테고리 `../CLAUDE.md` 규칙 **위에** 적용. 충돌 시 이 파일 우선.
> **품질·연출·인터랙션은 HBM과 동일** — 공통 `<Viewer>` 엔진(`src/shared/r3f/`)을 그대로 쓴다. 모델은 형상(model.tsx)과 설명(data.ts)만 제공.
> **상태: 구현 완료(학습 가능).** 아래는 구현된 사양 + 남은 보강 항목.

## 이 모델이 표현하는 것
GPU 가속기 **패키지 전체** — 큰 연산 다이(GPU die) 옆에 HBM 스택들이 실리콘 인터포저로 붙는 **2.5D 패키지**.
"HBM을 왜 프로세서 바로 옆에 두는가 / 현대 AI 가속기는 어떻게 생겼나"를 한눈에 보여준다.
→ **이미 만든 HBM 모델을 '시스템 안'에서 다시 보여주는 상위 맥락 모델**. (HBM 상세 학습 후 GPU에서 전체 그림을 보는 흐름)

## 구조 (아래 → 위, HBM은 평면 배치) — 구현 기준
1. **패키지 기판 (substrate)** — 큰 받침, 네이비 라우팅 텍스처. 아랫면 BGA 격자(인스턴싱). 픽 id `substrate` / 볼 픽 id `bga`.
2. **실리콘 인터포저 (interposer)** — GPU 다이와 HBM 스택을 한 판 위에 잇는다. 아랫면 C4 범프(장식, 픽은 부모로 귀속). 픽 id `interposer`.
3. **GPU 연산 다이 (gpudie)** — 중앙의 큰 다이. 윗면 코어 어레이 텍스처 + "GPU" 각인, 아랫면 마이크로 범프(장식). 픽 id `gpudie`.
4. **HBM 스택 × 4 (hbm)** — GPU 다이 좌우 2개씩. **HBM 모델을 간략화한 미니 적층**(베이스 다이 + DRAM 4층 + 윗판 "HBM" 각인 + 아래 범프). 픽 id `hbm` 공유. 실제 제품은 4~8개 — 개수는 조정 가능.
5. **히트 스프레더 리드 (lid)** — 브러시드 메탈 상단 덮개. 조립 상태(t=0)에서 전부 덮는 게 정상(실제 외형). 픽 id `lid`.
   (베어 다이 변형을 원하면 lid 파트만 빼면 된다.)
- 마이크로 범프·C4는 별도 픽 id가 없다 — 클릭 시 부모 부품으로 귀속(부품 목록을 6종으로 유지).

## 분해 (혼합: 수직 + 평면 방사 + 2단계) — 구현 기준
부품별 `explode` 벡터로 표현 — 엔진이 `base → base+explode`를 stagger+ease로 보간(별도 분해 로직 없음).
- **기판 ↓** · **인터포저 ↑ 약간** · **GPU 다이 ↑**(중앙 유지) · **HBM 스택은 바깥 방향(±x±z 방사)으로 펼쳐지며 ↑** · **리드는 가장 위로, 가장 늦게**.
- stagger order: substrate 0 → interposer 0.25 → gpudie 0.5 → hbm 0.55 → lid 1.
- **2단계 분해(구현됨)**: 분해 후반(t > 0.6)에 각 HBM 스택의 내부 층이 추가로 벌어진다 — `ModelDef.update` 훅에서 층 그룹 y를 보간. 상세 적층 학습은 HBM 모델이 담당.

## 색 / 구분 (HBM 팔레트 기준)
- **GPU 다이 = 구분 포인트색(청록/틸)** — HBM 블루·CPU와 시각적으로 구분.
- HBM 스택 = HBM 블루 팔레트 재사용. 인터포저 = 실버블루. 기판 = 네이비. 금속(범프·볼) = 골드/실버. 리드 = 브러시드 실버.
- 텍스처는 공용 `@app/shared/r3f/textures` 재사용(파라미터별 캐시 — 스택 4개가 한 장 공유):
  - GPU 다이 윗면 = `makeDieTexture(172, ["GPU", …])` · HBM 윗판 = `makeDieTexture(212, ["HBM"])` · 인터포저/기판 = `makeRoutingTexture(...)` · 리드 = `makeBrushedMetalTexture()`.

## 부품 & 치수(spec — 언어 중립 readout) — 구현 기준
- `gpudie` — `≈ 800 mm² (reticle limit) · 4 nm`
- `hbm` — `8-Hi DRAM stack · ≈ 1 TB/s / stack`
- `interposer` — `Si · ≈ 2,500 mm² · t ≈ 100 μm`
- `substrate` — `≈ 70 × 70 mm · multilayer organic` (SXM급 표기)
- `bga` — `1,000+ balls · ∅ ≈ 0.5 mm`
- `lid` — `Ni-plated Cu lid`

## 핵심 학습 포인트 (정보 패널 facts에 반영됨)
- HBM을 GPU 옆 가까이 두면 데이터 거리↓ → **대역폭↑ · 전력↓**.
- 인터포저가 두 칩을 **수천 배선으로 잇는다(2.5D)**.
- 큰 연산 다이 + 옆 메모리 = **현대 AI 가속기의 기본 형태**.

## 남은 보강
- [x] `data.ts`에 `sources`(더 읽기) — 전 부품 완료 (JEDEC JESD235·TSMC CoWoS·Wikipedia).
- [x] 패키지 치수 재검토 — ≈ 70 × 70 mm(SXM급)로 data.ts·카탈로그 갱신 완료.
- [ ] (선택) HBM 스택 개수 옵션(4↔6↔8) / 베어 다이(리드 제거) 보기.

## 사용자 노출 문구
전부 다국어로(`data.ts`의 부품 설명 + `catalog`의 이름/개요/사양). 하드코딩 금지.
