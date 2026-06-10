# 공통 셸·엔진 구현 지침 (src/shared/) — 디자인 폴리시 + 성능

> 루트 `../../CLAUDE.md`의 디자인 시스템·성능 원칙 위에 적용된다. 8단계(사이트 폴리시)의 구현 상세는 이 문서.

## 토큰 확장 (`shared/styles/tokens.css`)
지금은 색·폰트 스택뿐이다. 다음을 토큰으로 추가하고, 기존 CSS의 하드코딩 값을 점진 치환한다(한 번에 전부 바꾸지 말 것):
- **간격**: `--sp-1 ~ --sp-8` (4px 배수 스케일).
- **타입 스케일**: `--fs-xs ~ --fs-3xl` + 행간. 제목 크기를 화면별로 새로 정하지 말고 스케일에서 고른다.
- **모션**: `--dur-fast(0.15s) / --dur(0.25s) / --dur-slow(0.4s)` + `--ease(cubic-bezier(0.2, 0.75, 0.2, 1))`. 새 전환은 반드시 이 토큰으로.
- **라운드**: `--r-sm / --r / --r-lg` (현행 7~18px 값을 정리).

## 웹폰트 (루트 지침 "실제 웹폰트" 이행)
- 후보: 제목·라벨 = **Space Grotesk**(또는 Fontshare의 Clash Grotesk), 수치·모노 = **JetBrains Mono**, 한글 본문 = **Pretendard Variable**. 확정 전에 제작자 승인(루트의 라이브러리 승인 규칙과 동일하게 에셋도 승인).
- **self-host**: `public/fonts/`에 woff2만, 라틴/한글 서브셋. CDN 링크 금지(성능·프라이버시).
- 로딩: `<link rel="preload">` + `font-display: swap`. 토큰의 `--mono`/`--sans` 폰트 스택 맨 앞에 추가만 하면 전 화면 적용되게 유지.
- 한글 서브셋이 커지면(>300kB) 본문은 시스템 한글 폰트 유지 + 제목만 웹폰트도 허용 — 성능 예산이 우선.

## 상태 디자인 (로딩·에러·빈 화면)
- **3D 로딩**: `views.tsx`의 `Suspense fallback`이 지금 빈 div다 → 뷰어 자리 스켈레톤(배경 + 펄스 + "모델 불러오는 중" 다국어 문구)으로 교체. 펄스는 `prefers-reduced-motion` 시 정지.
- **에러 바운더리**: 3D 뷰어를 React ErrorBoundary로 감싼다(WebGL 미지원·셰이더 실패 대비). 에러 화면 = 같은 자리에서 다국어 안내 + "다시 시도" 버튼. 앱 전체를 죽이지 말 것.
- **빈/준비 중 화면**: soon 모델 화면은 현행 유지하되 문구를 locales로(이미 됨). 카테고리에 live 모델이 0개일 때의 문구 추가.

## 푸터
- 구성·문구는 `pages/CLAUDE.md` 푸터 사양. 구현은 `ui/Footer.tsx` + shell.css, `App.tsx`의 `.main` 아래.

## 메타/OG (Astro 이전 전의 "기본만")
- `index.html`: lang 동기화(이미 setLang에서 처리), title·description·OG(og:title/description/image)·파비콘·테마 컬러(#04060c).
- OG 이미지 1장은 정적으로(분해도 모티프). 페이지별 메타는 Astro 이전 때 — 지금 만들지 말 것.

## 성능 예산표 (측정해서 갱신하는 곳)
| 항목 | 예산 | 현재 (2026-06, gzip) |
|---|---|---|
| 셸 번들(index) | < 100 kB | 76.6 kB |
| 뷰어 청크(Viewer, lazy) | < 70 kB | 53.5 kB |
| three 청크(lazy) | — (lazy면 허용) | 184.3 kB |
| 모델 청크(개당, lazy) | < 15 kB | 7.6~9.4 kB |
| 폰트(woff2 합계) | < 300 kB | 0 (미도입) |
| 첫 로드(홈, Lighthouse Perf) | ≥ 90 | **100** |
- 측정 방법: 번들 = `npm run build` 출력. FPS = 모델 화면 `?stats`(실기기). 로드 = Lighthouse(빌드+preview에 대해).
- 폴리시 작업 전후로 이 표를 갱신하고, 예산 초과 시 기능 추가를 멈추고 최적화 먼저(루트 규칙).

### 8-a 기준선 (2026-06-10, Lighthouse 12 · headless Chromium · localhost preview)
| 카테고리 | 점수 | 메모 |
|---|---|---|
| Performance | 100 | FCP/LCP 1.5s · TBT 10ms · CLS 0 · 홈 전송량 80 KiB |
| Accessibility | 91 | color-contrast 2곳(`.stage .t2`, `.how h3`) · heading-order(`.how`가 h1→h3) |
| Best Practices | 96 | 파비콘 404 콘솔 에러 |
| SEO | 82 | meta description 없음 · robots.txt 없음 |
- 환경 주의: 컨테이너(소프트웨어 GL·localhost) 측정 — 실배포·실기기 수치와 다를 수 있다. 비교용 기준선으로만 사용.
- 위 감점 항목이 8-b(대비·헤딩)·8-d(파비콘·메타·robots) 작업 목록이다. 해결 후 재측정해 이 표를 갱신할 것.

## 지키던 것 (회귀 금지)
- `frameloop="demand"` 온디맨드 렌더 / dpr 1.5 캡 / 3D lazy 로드 / 절차적 텍스처 캐시(`r3f/textures.ts`) / `prefers-reduced-motion` 처리 / 키보드 회전·포커스 링·ARIA 라벨.
- 새 UI 문구는 전부 locales 키. 새 색·간격·모션 값은 전부 토큰.
