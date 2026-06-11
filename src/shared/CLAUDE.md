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

## 메타/OG — 구현 완료 (Astro 이전 전의 "기본만")
- `index.html`: description·theme-color·OG(title/description/image)·SVG 파비콘(`public/favicon.svg`, 적층 판 모티프). `public/robots.txt` 허용.
- OG 이미지 = `public/og.png`(1200×630, 홈 히어로 정적 캡처). **og:url·canonical 추가됨**(Vercel 프로덕션 `https://3d-simulator-rouge.vercel.app`, og:image도 절대경로 + twitter:card). 커스텀 도메인 붙이면 갱신. 페이지별 메타·사이트맵은 Astro 이전 때.

## 배포 (Vercel — 구현 완료)
- 호스트 = **Vercel**. GitHub 저장소 연동 → **`main` push 시 자동 빌드·배포**(프리뷰는 브랜치/PR별 자동 URL). 설정은 `vercel.json`(framework vite · build `npm run build` · output `dist` · SPA fallback).
- 프로덕션: `https://3d-simulator-rouge.vercel.app`. 토큰/`.vercel/`는 `.gitignore`로 차단(커밋 금지).
- 본문 한국어 줄바꿈은 `word-break: keep-all`(index.css) — 단어 중간에서 꺾이지 않는다.

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

### Lighthouse — 8-a 기준선 → 8-d 재측정 (2026-06-10, LH12 · headless Chromium · localhost preview)
| 카테고리 | 8-a 기준선 | 8-d 최종 | 메모 |
|---|---|---|---|
| Performance | 100 | **95** | FCP/LCP 1.5→2.4s — 웹폰트·콘텐츠 추가 비용(swap이라 실기기 체감은 폴백 즉시 표시). 예산 ≥90 유지 |
| Accessibility | 91 | **100** | 대비(--faint 상향)·heading-order(h2/h3 정리)·푸터 target-size 해결 |
| Best Practices | 96 | **100** | SVG 파비콘 추가로 404 해소 |
| SEO | 82 | **100** | meta description + robots.txt |
- 홈 전송량 80→241 KiB (폰트 101 KiB + 콘텐츠·CSS). 환경 주의: 컨테이너 측정 — 실배포 후 실기기로 재확인.

## 지키던 것 (회귀 금지)
- `frameloop="demand"` 온디맨드 렌더 / dpr 1.5 캡 / 3D lazy 로드 / 절차적 텍스처 캐시(`r3f/textures.ts`) / `prefers-reduced-motion` 처리 / 키보드 회전·포커스 링·ARIA 라벨.
- 새 UI 문구는 전부 locales 키. 새 색·간격·모션 값은 전부 토큰.
