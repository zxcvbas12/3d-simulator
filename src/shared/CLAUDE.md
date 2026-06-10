# 공통 셸·엔진 구현 지침 (src/shared/) — 디자인 폴리시 + 성능

> 루트 `../../CLAUDE.md`의 디자인 시스템·성능 원칙 위에 적용된다. 8단계(사이트 폴리시)의 구현 상세는 이 문서.

## 토큰 확장 (`shared/styles/tokens.css`)
지금은 색·폰트 스택뿐이다. 다음을 토큰으로 추가하고, 기존 CSS의 하드코딩 값을 점진 치환한다(한 번에 전부 바꾸지 말 것):
- **간격**: `--sp-1 ~ --sp-8` (4px 배수 스케일).
- **타입 스케일**: `--fs-xs ~ --fs-3xl` + 행간. 제목 크기를 화면별로 새로 정하지 말고 스케일에서 고른다.
- **모션**: `--dur-fast(0.15s) / --dur(0.25s) / --dur-slow(0.4s)` + `--ease(cubic-bezier(0.2, 0.75, 0.2, 1))`. 새 전환은 반드시 이 토큰으로.
- **라운드**: `--r-sm / --r / --r-lg` (현행 7~18px 값을 정리).

## 웹폰트 — 도입 완료 (제작자 승인: 전체 도입)
- 확정: 제목 = **Space Grotesk Variable**(`--display`, h1·h2), 수치·라벨 = **JetBrains Mono Variable**(`--mono`), 본문·한글 = **Pretendard Variable**(`--sans`, 동적 서브셋 — 쓰는 글자 조각만 로드).
- **self-host**: npm 패키지(`@fontsource-variable/*`, `pretendard`)를 `main.tsx`에서 import — Vite가 woff2를 같은 오리진 자산으로 번들(CDN 요청 없음). `font-display: swap`.
- 측정(2026-06): 한국어 홈 기준 woff2 전송 **101 KiB / 14파일** — 예산 300kB 이내. 언어별 실측은 8-d에서.
- 모노 라벨(.how-title 등)은 font-family 명시로 디스플레이 폰트의 영향을 받지 않는다 — 새 제목을 만들 땐 h1/h2 또는 `--display`를 쓸 것.

## 상태 디자인 (로딩·에러·빈 화면) — 구현 완료
- **3D 로딩**: `Suspense fallback` = `.viewer-status` 스켈레톤(은은한 스윕 + "3D 불러오는 중" 다국어). 스윕은 `prefers-reduced-motion` 전역 규칙으로 정지.
- **에러 바운더리**: `ui/ErrorBoundary.tsx`가 lazy 3D를 감싼다(model id를 key로 — 모델 이동 시 에러 리셋). 폴백은 같은 자리 다국어 안내.
- **빈 화면**: live 모델이 0개인 카테고리는 카드 위에 `card.noneLive` 안내 한 줄.

## 푸터 — 구현 완료
- `ui/Footer.tsx` + shell.css(`.footer`), `App.tsx`의 `.main` 안. 구성·문구 사양은 `pages/CLAUDE.md`. 면책 한 줄(`footer.disclaimer`)은 신뢰 레이어 — 빼지 말 것.

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
| 폰트(woff2, 홈/ko 전송) | < 300 kB | 101 KiB · 14파일 (동적 서브셋) |
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
