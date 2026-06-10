# STRATA — 3D 학습 시뮬레이터

> 복잡한 기술 제품을 **3D 분해도(exploded view)**로 분해·탐구하며 배우는 교육용 웹사이트.
> 제품을 회전하고, 스크롤·핀치·슬라이더로 부품을 펼치고(분해) 합치며(조립), 부품을 클릭하면 그 역할 설명을 봅니다.

> **STRATA**는 임시 브랜드명(자리표시)입니다. [`shared/config.ts`](shared/config.ts) 한 곳에서 바꿀 수 있습니다.

---

## 핵심 개념

모든 모델은 같은 **3단계 흐름**으로 배웁니다.

1. **회전** — 마우스·터치·화살표 키로 360° 모든 각도에서 관찰
2. **분해** — 하단 슬라이더로 부품을 한 겹씩 펼치기 (줌과 독립)
3. **학습** — 부품을 눌러 역할·치수·원리 확인

8개 카테고리(반도체 · 우주 · 자동차 · 가전 · 항공 · 의료기기 · 에너지 · 로보틱스)로 시작하며, 카테고리와 모델은 계속 늘어납니다. 다국어(**KO / EN / 日 / 中**)를 지원합니다.

## 현재 제공 모델 (학습 가능)

| 모델 | 폴더 | 보여주는 것 |
|---|---|---|
| **HBM 고대역폭 메모리** | [`semiconductor/hbm/`](semiconductor/hbm/) | DRAM 8층 수직 적층 + TSV 관통 — "왜 쌓는가" |
| **GPU 패키지** | [`semiconductor/gpu/`](semiconductor/gpu/) | 연산 다이 + HBM ×4 2.5D 패키지 — "왜 옆에 두는가" |
| **CPU 칩렛 패키지** | [`semiconductor/cpu/`](semiconductor/cpu/) | 칩렛 분할 구조 — "왜 나누는가" |

자세한 구조·부품 설명은 각 모델 폴더의 README 참고.

---

## 기술 스택

- **빌드**: [Vite](https://vitejs.dev/) + TypeScript
- **UI**: [React](https://react.dev/) + 전역 상태 [zustand](https://zustand.docs.pmnd.rs/)
- **3D**: [React Three Fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://drei.docs.pmnd.rs/) (엔진은 Three.js)
- **스타일**: 순수 CSS + 디자인 토큰(CSS 변수) — UI 프레임워크 없음
- **다국어**: 가벼운 자체 i18n (`locales/`의 키-값 사전, 한국어가 타입 기준)

## 시작하기

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 (HMR)
npm run build    # 타입체크(tsc) + 프로덕션 번들
npm run preview  # 빌드 결과 미리보기
```

모델 화면 URL에 `?stats`를 붙이면 FPS 오버레이(stats.js)가 표시됩니다 — 성능 점검용.

---

## 프로젝트 구조

```
3d-simulator/
  index.html                 # Vite 진입점
  src/
    main.tsx                 # 부트스트랩
    App.tsx                  # 앱 셸: 상단 네비 + 2단계 사이드바 + 본문 라우팅
    shared/
      r3f/                   # 공통 3D 엔진
        Viewer.tsx           #   <Viewer> — Canvas·온디맨드 렌더·뷰어 크롬
        SceneContents.tsx    #   분해 보간·카메라 프레이밍·입력(드래그/핀치/키보드)·피킹
        model.ts             #   모델 계약(ModelDef) 타입
        registry.tsx         #   "카테고리/모델" → lazy 뷰어 (새 모델 등록 = 한 줄)
        textures.ts          #   공용 절차적 텍스처(파라미터별 캐시)
      ui/                    # 네비·사이드바·정보 패널·뷰어 컨트롤 (React)
      state/                 # zustand 스토어(언어·분해값·선택·줌) + 라우팅
    index.css                # 셸 보조 스타일
  shared/
    config.ts                # 브랜드명 단일 소스
    catalog.ts               # 카테고리 + 모델 카탈로그(이름·개요·사양, 다국어)
    styles/                  # 디자인 토큰 + 셸/뷰어 CSS
    scene/ interaction/ …    # (레거시) 바닐라 Three.js 시절 코드 — 현재 미사용
  locales/                   # 다국어 사전 ko / en / ja / zh
  pages/                     # 공통 페이지(소개·학습 구조·제작자 의도) 콘텐츠 지침
  semiconductor/             # ── 카테고리 (README + CLAUDE.md)
    hbm/  gpu/  cpu/         #     ── 모델: model.tsx(형상) + data.ts(부품 설명)
  space/ automotive/ appliance/ aviation/ medical/ energy/ robotics/
```

각 폴더에는 두 종류의 문서가 있습니다:
- **`README.md`** — 사람을 위한 설명(이 폴더가 무엇이고 어떻게 동작하는지).
- **`CLAUDE.md`** — AI 협업 지침(루트 → 카테고리 → 모델 순으로 읽히며, 아래로 갈수록 구체적·우선).

---

## 아키텍처 — 공통 vs 모델별

핵심 원칙: **모델마다 다른 건 형상과 설명뿐, 나머지 동작은 전부 공유한다.**

각 모델은 두 파일만 제공합니다 — `model.tsx`(3D 형상)와 `data.ts`(부품 다국어 설명). 회전·줌·분해·선택·정보 패널·환경맵은 전부 공통 엔진 [`<Viewer>`](src/shared/r3f/Viewer.tsx)가 처리합니다.

```ts
// src/shared/r3f/model.ts — 모델 계약
interface ModelDef {
  parts: PartDef[];   // { id, base, explode, order?, layer?, node }
  info: PartInfoMap;  // 부품 id → 다국어 설명(tag·title·spec·lead·detail·facts)
  extras?: ReactNode; // 분해와 무관한 메시 (예: HBM의 TSV)
  update?: (ctx) => void; // 매 프레임 모델별 갱신 (예: TSV 길이, 2단계 분해)
}
```

부품의 위치는 분해값 t에 따라 `base → base + explode`로 보간되고, `order`로 순차 전개(stagger)됩니다. 분해 벡터만 바꾸면 **수직 적층**(HBM)·**평면 배치**(CPU/GPU)·혼합이 모두 표현됩니다.

**새 모델 추가** (3곳):
1. `<카테고리>/<모델>/` 폴더에 `model.tsx` + `data.ts` 작성
2. [`src/shared/r3f/registry.tsx`](src/shared/r3f/registry.tsx)에 lazy 항목 한 줄
3. [`shared/catalog.ts`](shared/catalog.ts)에 카드 메타(이름·개요·사양) 한 항목

Three.js와 뷰어는 모델을 열 때만 지연 로드되어 홈·콘텐츠 화면 번들에 들어가지 않습니다.

---

## 성능 / 접근성

- **온디맨드 렌더** — `frameloop="demand"`: 화면이 변할 때만 그립니다(정지 상태 GPU 사용 0).
- **지연 로드** — 3D 번들(three ≈184kB gzip)은 모델 화면에서만. 모델 청크는 개당 ≈8~9kB.
- **인스턴싱** — 반복 요소(BGA·범프·TSV·랜드)는 InstancedMesh.
- **텍스처 예산** — 절차적 텍스처는 파라미터별 1장 생성 후 캐시 공유.
- **모션 접근성** — `prefers-reduced-motion`이면 전환 애니메이션·자동 회전을 끕니다.
- **키보드/스크린리더** — 캔버스 포커스 + 화살표 키 회전, `:focus-visible` 포커스 링, 컨트롤 ARIA 라벨(다국어).

성능 예산표와 측정 절차는 [`src/shared/CLAUDE.md`](src/shared/CLAUDE.md) 참고.

## 다국어 (i18n)

- 사이트 공통 문구 → `locales/{ko,en,ja,zh}.ts` — 한국어가 기준 타입(`Dict`), 키 누락은 컴파일에서 차단.
- 모델 부품 설명 → 각 모델의 `data.ts`에 콜로케이션. 모델 개요·사양 → `shared/catalog.ts`.
- 사용자에게 보이는 텍스트는 전부 다국어 키로 두며 하드코딩하지 않습니다.

## 디자인 방향

정밀 계측기(precision instrument) 느낌의 절제된 다크 테크 미감.

- **배경**: 거의 검정에 가까운 네이비 라디얼 그라데이션
- **포인트 색**: 블루 `#6f9bff` · 구리 `#c97b34` · 골드 `#e6b53c`
- **UI**: 반투명 글래스 패널, 얇은 테두리. **타이포**: 제목·수치 모노, 본문 산세리프

공통 색·폰트는 [`shared/styles/tokens.css`](shared/styles/tokens.css)의 CSS 변수로 관리합니다.

---

## 진행 상황

- [x] **1–2. 셋업** — Vite + TS → React/R3F/drei/zustand 전환
- [x] **3. 앱 셸 + 다국어** — 네비, 2단계 사이드바, 공통 페이지, i18n
- [x] **4. 공통 3D 엔진** — `<Viewer>` 계약·분해·피킹·온디맨드 렌더
- [x] **5. HBM** — 바닐라 프로토타입(`hbm-3d-space.html`)을 R3F로 이식 (품질 기준)
- [x] **6. CPU / GPU** — 평면·혼합 분해로 엔진 일반화 검증
- [x] **7. 성능 패스 + 접근성** — 텍스처 캐시·측정 도구·reduced-motion·키보드·ARIA
- [ ] **8. 사이트 폴리시 (진행 중)** — 공통 페이지 콘텐츠 확충 · 웹폰트/상태 디자인 · 메타/측정
- [ ] 이후 — 카테고리 확장, 필요 시 Astro 이전 + SEO/애널리틱스

## 제작자

토론토에서 제작. "열어서 직접 보면 이해가 빠르다"는 단순한 믿음에서 출발한 프로젝트입니다.
