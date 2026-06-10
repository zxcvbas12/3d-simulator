# 3D Simulator — 전체 프로젝트 지침

## 이게 뭔가
여러 분야의 기술 제품을 **3D 분해도(exploded view)**로 분해·탐구하며 배우는 교육용 웹사이트.
사용자는 제품을 회전하고, 확대·축소(줌)하고, 슬라이더로 부품을 펼치고(분해) 합치며(조립),
부품을 클릭하면 자세한 역할 설명을 본다. 카테고리와 모델은 계속 늘어난다.

브랜드명은 임시로 **STRATA** (자리표시). 확정되면 토큰/문구 한 곳에서 바꾼다.
목표: **전문성(정확함) · 멋있는 일관된 디자인 · 프로페셔널한 구조 · 부드러운 성능.** 단, 1인 유지보수가 가능하도록 과설계는 피한다.

## 현재 상태 (중요 — 새 세션은 여기부터)
**진행 순서 1~8단계 완료.** 지금 동작하는 것: React 셸 · 공통 엔진 `<Viewer>` · 모델 3종(HBM/GPU/CPU, 학습 가능) · 디자인 토큰+웹폰트 · 공통 페이지 콘텐츠(4개 언어) · 푸터·상태 디자인 · 메타/OG · Lighthouse 95/100/100/100(컨테이너 측정).
다음은 **9단계 — 확장과 배포**(아래 진행 순서 참고). 어떤 작업이든:
- **동작하는 셸·엔진·모델·콘텐츠를 갈아엎지 않는다. 보강한다.**
- **콘텐츠 레벨 구분을 지킨다**: 공통 페이지 = 분야 중립 / 분야 소개·추천 순서 = 카탈로그 `CategoryEntry.intro/guide` / 모델 개요·사양 = 카탈로그 / 부품 설명 = 모델 `data.ts`. (상세: `pages/CLAUDE.md`)
- 상세 지침은 영역별 CLAUDE.md에 있다(아래 메모리 구조).

---

## 메모리 구조 (꼭 이해할 것)
클로드 코드는 작업 폴더 기준으로 **상위의 모든 `CLAUDE.md`를 읽는다.**
- **루트(이 파일)** — 공통 (스택·디자인 시스템·성능·접근성·콘텐츠 구조·워크플로우).
- **영역 `CLAUDE.md`** — `pages/`(공통 페이지 콘텐츠 설계) · `locales/`(다국어 키 규칙) · `src/shared/`(디자인·성능 구현 + **성능 예산표**).
- **카테고리 `CLAUDE.md`** — 그 분야 전반. / **모델 `CLAUDE.md`** — 개별 모델 구조·색·동작.
공통은 위로, 특수는 아래로. 충돌 시 더 구체적인(아래) 파일 우선. 중복 기재 금지.
사람용 문서는 따로 `README.md`(루트·카테고리·모델)에 있다 — 지침은 CLAUDE.md, 설명은 README.

---

## 기술 스택 (확정)
- **번들러**: 기존 **Vite** 유지.
- **언어**: TypeScript (초반엔 과하게 엄격히 굴지 말 것).
- **UI**: **React** 추가 (R3F가 React 기반).
- **3D**: **React Three Fiber (R3F)** + **@react-three/drei**. 엔진은 Three.js(이미 사용 중).
  - 3D는 **`React.lazy` + 동적 import로 지연 로드**. 홈·콘텐츠 화면에는 3D 번들이 안 실리게.
- **상태**: 가벼운 전역 상태 **zustand**로 UI ↔ 3D 공유(현재 분해값·선택 부품·언어).
- **라우팅**: 페이지가 늘면 **react-router**. 지금은 최소로.
- **스타일**: 순수 CSS + 디자인 토큰(아래). 무거운 UI 프레임워크 금지.
- **다국어**: 자체 i18n 운영 중 — `locales/` 키-값 사전, **ko가 타입 기준(Dict)**, 사용자 노출 텍스트 하드코딩 금지(규칙: `locales/CLAUDE.md`). URL 다국어 라우팅(`/ko`, `/en`)은 필요해지면 추가.
- **Astro/Next**: 지금은 **쓰지 않는다.** 사이트가 커지고 SEO·다국어 라우팅이 본격 필요해지면 그때 이전을 검토(엔진·컴포넌트 개념은 그대로 이어짐).
- **배포**: Vercel 또는 Netlify.
새 라이브러리는 임의 추가 금지. 필요하면 먼저 이유를 설명하고 승인받는다.

---

## 폴더 구조 (실제 현행)
```
3d-simulator/
  CLAUDE.md  README.md
  index.html               # 메타/OG/파비콘 포함
  public/                  # favicon.svg · og.png · robots.txt
  src/
    main.tsx               # 진입점 + 웹폰트 로드
    App.tsx                # 셸: 상단 네비 + 사이드바 + 본문 + 푸터
    shared/
      CLAUDE.md            # 디자인·성능 구현 지침 + 성능 예산표
      r3f/                 # 공통 3D 엔진: Viewer · SceneContents(분해/카메라/피킹/키보드) ·
                           #   model.ts(ModelDef 계약) · registry.tsx(모델 lazy 등록) · textures.ts(절차 텍스처 캐시)
      ui/                  # Nav · Sidebar · views · InfoPanel · ViewerChrome · Footer · ErrorBoundary · motifs
      state/               # zustand — store(언어·분해·선택·줌) · route(화면 라우팅)
  shared/
    config.ts              # 브랜드명 단일 소스
    catalog.ts             # 카탈로그 — 카테고리(intro/guide) + 모델(이름·개요·specs), 다국어
    styles/                # tokens.css(토큰 단일 출처) · shell.css · viewer.css
  locales/                 # CLAUDE.md + ko/en/ja/zh.ts — ko가 타입 기준(Dict)
  pages/CLAUDE.md          # 공통 페이지 콘텐츠 설계(홈·소개·학습 구조·제작자 의도·푸터)
  docs/screenshots/        # README용 화면 캡처
  semiconductor/ space/ ... # 카테고리: CLAUDE.md·README.md + <모델>/(model.tsx·data.ts·CLAUDE.md·README.md)
```
**원칙**: 모델마다 다른 건 `model.tsx`(형상)·`data.ts`(부품 설명)뿐. 회전·줌·분해·선택·패널은 전부 공통 엔진.
**새 모델 추가 = 3곳**: ① `<카테고리>/<모델>/model.tsx + data.ts` ② `src/shared/r3f/registry.tsx` 한 줄 ③ `shared/catalog.ts` 한 항목(이름·개요·specs). 새 분야 첫 모델이면 카탈로그 `intro`(+`guide`)와 카테고리 CLAUDE.md부터.
(루트 `shared/scene·interaction·model.ts·ui/panel.ts`는 바닐라 시절 레거시 — 미사용. 새 코드에서 참조 금지.)

---

## 공통 3D 엔진 (shared/r3f) — 모든 모델이 재사용
- **<Viewer>** 가 Canvas·조명·환경맵·카메라·컨트롤·분해 상태·선택을 담당. 모델은 형상(part 묶음)만 넘긴다.
- **부품**은 `{ id, geometry, material, basePosition, explodeVector, info }` 같은 선언적 데이터. 엔진이 분해값 t로 위치 보간.
- **분해 로직은 "방향" 파라미터**를 받는다: **수직 적층**(HBM) + **평면 배치**(CPU 칩렛) 모두 지원. 층별 순차 전개(stagger) + 가감속(ease).
- **줌은 분해와 독립**(자동 프레이밍 거리에 배율).
- drei `<Instances>`로 범프·TSV·볼 인스턴싱. `<Html>`로 라벨/툴팁.
- **온디맨드 렌더**: `<Canvas frameloop="demand">` — 변할 때만 렌더(부유 애니메이션 중엔 invalidate).

---

## 인터랙션 (전 모델 공통 표준)
- 회전: 드래그 / 1손가락.
- 확대·축소: 스크롤 / 2손가락 핀치 / ＋－ 버튼. **분해와 독립.**
- 분해·조립: 하단 슬라이더 전용. 순차 전개 + 가감속.
- 부품 클릭: 선택 강조(emissive) + 정보 패널.
- 자동 회전 / 초기화(회전·줌·분해 모두 리셋).

## 정보 패널 형식 (전 모델 공통)
- **lead** — 한 줄 쉬운 요약
- **detail** — 어떻게/왜 중요한지
- **facts[]** — 짧은 항목 3개
- **(입문 ↔ 심화 토글)** — 쉬운 비유 / 정확한 용어·수치
- **출처/더 읽기** — 표준·백서·논문 링크(신뢰 레이어)
DRAM 등 같은 종류 부품은 클릭 시 "몇 번째"인지 표시.

---

## 디자인 시스템 (단일 출처, 반드시 준수)
**컨셉**: 정밀 계측기(precision instrument) 느낌의 절제된 다크 테크 미감. Apple 제품 페이지·Linear 톤.
- **토큰화(구현됨)**: 색·간격(`--sp-*`)·타입 스케일(`--fs-*`)·라운드(`--r-*`)·모션(`--dur*`/`--ease`)이 `shared/styles/tokens.css`에 있다. **하드코딩 색·픽셀 금지 — 새 스타일은 반드시 토큰으로.**
- **색**: 배경 = 거의 검정 네이비 라디얼(#04060c~#1b2438). 포인트 = 블루(#6f9bff)·구리(#c97b34)·골드(#e6b53c).
- **타이포그래피(확정·도입됨)**: 제목 = Space Grotesk(`--display`), 수치·라벨 = JetBrains Mono(`--mono`), 본문·한글 = Pretendard Variable(`--sans`, 동적 서브셋). self-host(npm 패키지, `main.tsx`에서 로드). 폰트를 바꿀 땐 토큰 스택만 수정.
- **모션 언어**: 통일된 easing·duration(토큰), staggered 등장, 절제된 전환. `prefers-reduced-motion` 시 전부 꺼짐(전역 규칙).
- **상태 디자인(구현됨 — 회귀 금지)**: 3D 로딩 스켈레톤 · 에러 바운더리 · 빈 카테고리 안내 · 푸터.
- **레퍼런스 시안**: `homepage-mockup-v2.html` · `hbm-3d-space.html` — **이식 완료, 참고용으로만 유지**(수정 금지·새 기능의 출발점 아님).

### 절대 하지 말 것 (AI 사이트 티 방지)
보라색 그라데이션·흰 배경 파스텔 / 둥근 이모지 남발 / 과한 그림자·네온 / Inter·Roboto·Arial 같은 흔한 폰트 / 정보 없는 카드·배지 떡칠.

---

## 성능 (목표: 중급 폰 60fps · 첫 로드 2초 이내)
- **온디맨드 렌더링**: R3F `frameloop="demand"` — 화면이 변할 때만. 버벅임·발열 최대 개선.
- **3D 지연 로드**: `React.lazy`/동적 import로 모델 화면에서만 3D 번들 로드.
- **인스턴싱**: 반복 요소(범프·TSV·볼)는 `<Instances>`. 정적 메시는 병합 고려.
- **텍스처 예산(구현됨)**: 절차적 텍스처는 `src/shared/r3f/textures.ts`의 파라미터별 캐시를 통해서만 생성 — 같은 무늬는 모델·부품이 몇 개든 1장.
- **라이팅**: 그림자 대신 환경맵 기반(우주 셸). 픽셀비율 1.5 캡.
- **정리**: 모듈 스코프 형상·텍스처는 의도된 영속(재진입 재사용) — dispose 하지 않는다. 모델 안에서 새로 만드는 일회성 리소스만 직접 해제.
- **모션 접근성(구현됨)**: `prefers-reduced-motion`이면 자동회전·전환 끔.
- **측정**: 모델 화면 `?stats`로 FPS(실기기), Lighthouse로 로드. **수치·예산표는 `src/shared/CLAUDE.md`에 기록·갱신.** 예산 초과 시 멈추고 최적화.
- **(나중) 실제 GLTF 도입 시** Draco/meshopt, KTX2.

---

## 접근성 / SEO / 국제화
- **구현됨(회귀 금지)**: 키보드 회전(화살표)·`:focus-visible` 포커스 링·컨트롤 ARIA 라벨(다국어)·명도 대비(Lighthouse A11y 100)·한국어 `word-break: keep-all`.
- **구현됨**: 메타/OG/파비콘/robots.txt 기본(`index.html`·`public/`). og:url은 도메인 확정 후.
- (Astro 이전 후) 페이지별 메타·사이트맵·정적 생성. 출시 단계에 애널리틱스 + 에러 모니터링.

---

## 작업 방식 (중요)
1. 계획 먼저, 코드는 그다음(접근 방식 제안 → 승인 → 구현).
2. 한 번에 한 기능. 동작하면 다음으로.
3. 동작 단위로 커밋.
4. **동작하는 코드를 함부로 갈아엎지 말 것.** 어제 작업물을 존중하고 재활용.
5. 공통 vs 특수 구분(shared vs 모델 폴더).
6. 반응형 + 터치 + 모션 접근성 처음부터.
7. 사용자 노출 텍스트는 전부 다국어 키.
8. 막히거나 모호하면 추측하지 말고 질문.

---

## 진행 순서
**1~8단계 완료** — ① 현황 점검 ② React+R3F 전환 ③ 토큰+앱 셸 ④ 공통 엔진 `<Viewer>` ⑤ HBM ⑥ GPU/CPU(평면·혼합 분해) ⑦ 성능+접근성 패스 ⑧ 사이트 폴리시(기준선 측정 → 디자인 강화·웹폰트 → 페이지 콘텐츠 → 메타/OG + 재측정, Lighthouse 95/100/100/100).

9. **확장 + 배포 (다음 단계)** — 우선순위는 제작자가 정한다. 착수 전 무엇을 할지 확인받을 것. 후보:
   a) **배포** — Vercel/Netlify 연결 → 실배포 URL에서 Lighthouse·실기기 FPS 재측정(`src/shared/CLAUDE.md` 예산표 갱신) → 도메인 확정 후 `og:url` 추가.
   b) **새 모델/카테고리** — 추가 절차는 "폴더 구조"의 3곳 규칙. 새 분야 첫 모델이면 카탈로그 `intro/guide` + 카테고리 CLAUDE.md부터. 모델 품질 기준은 HBM.
   c) **기존 모델 보강** — `data.ts`에 `sources`(더 읽기 링크) 채우기 — 패널은 이미 지원. HBM 단면/층수 옵션, GPU 스택 수 옵션(각 모델 CLAUDE.md의 "남은 보강" 참고).
   d) **(필요해지면)** Astro 이전 + SEO/애널리틱스 — 사이트가 커지고 검색 유입이 중요해질 때.
각 단계 끝나면 다음으로 넘어가기 전 확인받는다.

---

## 참고 자료
- `hbm-3d-space.html` · `homepage-mockup-v2.html` — 바닐라 시안. **이식 완료 — 룩 레퍼런스로만 유지.** 새 기능은 여기서 출발하지 말고 현행 React/R3F 코드를 기준으로.
- 모델 품질 기준은 현행 `semiconductor/hbm/`(코드)이다.
