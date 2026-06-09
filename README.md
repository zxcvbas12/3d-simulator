# STRATA — 3D 학습 시뮬레이터

> 복잡한 기술 제품을 **3D 분해도(exploded view)**로 분해·탐구하며 배우는 교육용 웹사이트.
> 제품을 회전하고, 스크롤·핀치·슬라이더로 부품을 펼치고(분해) 합치며(조립), 부품을 클릭하면 그 역할 설명을 본다.

> **STRATA**는 임시 브랜드명(자리표시)입니다. [`shared/config.ts`](shared/config.ts) 한 곳에서 바꿀 수 있습니다.

---

## 핵심 개념

모든 모델은 같은 **3단계 흐름**으로 배웁니다.

1. **회전** — 마우스·터치로 360° 모든 각도에서 관찰
2. **분해** — 스크롤·핀치·슬라이더로 부품을 한 겹씩 펼치기
3. **학습** — 부품을 눌러 역할과 원리 확인

8개 카테고리(반도체 · 우주 · 자동차 · 가전 · 항공 · 의료기기 · 에너지 · 로보틱스)로 시작하며, 카테고리와 모델은 계속 늘어납니다. 다국어(**KO / EN / 日 / 中**)를 지원합니다.

---

## 기술 스택

- **빌드**: [Vite](https://vitejs.dev/)
- **언어**: TypeScript
- **3D**: [Three.js](https://threejs.org/)
- **스타일**: 순수 CSS + CSS 변수 (UI 프레임워크 없음)
- **다국어**: 가벼운 자체 i18n (`locales/`의 키-값 사전 + 언어 전환)

---

## 시작하기

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 (HMR)
npm run build    # 타입체크(tsc) + 프로덕션 번들
npm run preview  # 빌드 결과 미리보기
```

---

## 프로젝트 구조

```
3d-simulator/
  index.html               # Vite 진입점
  main.ts                  # 부트스트랩(컴포지션 루트)
  shared/                  # 모든 모델이 공유하는 코드
    config.ts              #   브랜드명 등 단일 소스
    catalog.ts             #   카테고리 + 모델 카탈로그(추가 = 여기 한 줄)
    model.ts               #   모델 계약(ModelModule) 타입
    scene/                 #   Three.js 씬·조명·렌더 루프, 검증용 더미 모델
    interaction/           #   공통 3D 뷰어(회전·분해·프레이밍·피킹)
    ui/                    #   앱 셸(네비·2단계 사이드바·라우터·정보 패널)
    styles/                #   디자인 토큰 + 셸/뷰어 CSS
  pages/                   # 사이트 공통 페이지(소개·학습 구조·제작자 의도)
  locales/                 # 다국어 사전(ko / en / ja / zh) + 로더
  semiconductor/           # ── 카테고리
    hbm/  gpu/  cpu/        #     ── 모델 (각 폴더에 model.ts + data.ts)
  space/ automotive/ appliance/ aviation/ medical/ energy/ robotics/
```

각 폴더에는 그 범위의 지침을 담은 `CLAUDE.md`가 있습니다(루트 → 카테고리 → 모델, 아래로 갈수록 구체적·우선).

---

## 아키텍처 — 공통 vs 모델별

핵심 원칙: **모델마다 다른 건 형상과 설명뿐, 나머지 동작은 전부 공유한다.**

- 회전·줌·분해·사이드바·정보 패널 같은 공통 동작은 전부 `shared/`에 있습니다.
- 각 모델은 두 가지만 제공합니다 — `model.ts`(3D 형상)와 `data.ts`(부품 다국어 설명).
- 모델은 공통 계약 [`ModelModule`](shared/model.ts)을 구현해 공통 뷰어([`shared/interaction/viewer.ts`](shared/interaction/viewer.ts))에 꽂힙니다.

```ts
interface ModelModule {
  build(ctx): ModelBuild;   // 형상: parts / pickables / 분해·프레이밍 정보
  info: PartInfoMap;        // 부품 id → 다국어 설명
}
```

**새 모델 추가** = `<카테고리>/<모델>/` 폴더(`model.ts` + `data.ts`) 하나 만들고, `shared/catalog.ts`에 한 줄 등록(+ `load`로 동적 import 연결). Three.js와 뷰어는 모델을 열 때만 지연 로드되어 초기 번들에 들어가지 않습니다.

---

## 다국어 (i18n)

- 사이트 공통 문구 → `locales/{ko,en,ja,zh}.ts` (한국어가 기준 타입, 키 누락은 컴파일에서 차단).
- 모델 부품 설명 → 각 모델의 `data.ts`에 콜로케이션.
- 사용자에게 보이는 텍스트는 전부 다국어 키로 두며 하드코딩하지 않습니다.

---

## 디자인 방향

정밀 계측기(precision instrument) 느낌의 절제된 다크 테크 미감.

- **배경**: 거의 검정에 가까운 네이비 라디얼 그라데이션 + 옅은 블루프린트 그리드
- **포인트 색**: 블루 `#6f9bff` · 구리 `#c97b34` · 골드 `#e6b53c`
- **UI**: 반투명 글래스 패널, 얇은 흰색 테두리
- **타이포**: 제목·라벨·수치는 모노스페이스, 본문은 산세리프

공통 색·폰트는 [`shared/styles/tokens.css`](shared/styles/tokens.css)의 CSS 변수로 관리합니다.

---

## 진행 상황

- [x] **1. 셋업** — Vite + TS, 디자인 토큰, Three.js 씬
- [x] **2. 앱 셸 + 다국어** — 네비, 2단계 사이드바, 공통 페이지, i18n 전환
- [x] **3. 공통 3D 토대** — 모델 계약, 재사용 뷰어(회전·분해·피킹·정보패널), 더미 모델로 검증
- [ ] **4. 첫 모델 HBM** — 실제 형상·부품 설명 이식
- [ ] **5. 모델·카테고리 확장**
- [ ] **6. 마감** — 성능, 반응형 점검

---

## 제작자

토론토에서 제작. "열어서 직접 보면 이해가 빠르다"는 단순한 믿음에서 출발한 프로젝트입니다.
