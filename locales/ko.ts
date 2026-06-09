/**
 * 한국어 사전 — 다국어의 기준(source of truth).
 * 다른 언어 파일은 이 구조(키)를 그대로 따른다. 키가 빠지면 컴파일에서 잡힌다.
 * 일부 값에는 <br> 등 HTML이 들어있어 렌더 시 innerHTML로 주입한다(우리 정적 문구만, 사용자 입력 아님).
 */
export const ko = {
  nav: { home: "홈", about: "소개", learn: "학습 구조", intent: "제작자 의도" },
  sidebar: { title: "카테고리" },
  hero: {
    eyebrow: "INTERACTIVE 3D · 학습 도구",
    title: "복잡한 기술을<br>분해해서 이해하다",
    sub: "제품을 3D로 돌려보고, 한 겹씩 펼쳐 내부 구조와 각 부품의 역할을 직접 살펴보세요.",
    ctaPrimary: "둘러보기",
    ctaSecondary: "작동 방식",
  },
  how: {
    title: "이렇게 학습해요",
    s1Title: "회전",
    s1Desc: "마우스·터치로 360° 모든 각도에서 살펴보기",
    s2Title: "분해",
    s2Desc: "스크롤·핀치로 부품을 한 겹씩 펼치기",
    s3Title: "학습",
    s3Desc: "부품을 눌러 역할과 원리 확인하기",
  },
  card: {
    available: "학습 가능",
    soon: "준비 중",
    explore: "탐구하기",
    catSub: "분해하며 배우는 모델",
  },
  model: {
    back: "← 뒤로",
    viewerLbl: "3D 뷰어 영역",
    viewerNote: "실제 사이트에서는 여기에서 모델을 회전·분해·학습합니다.",
    startLearn: "학습 시작",
  },
  category: { suffix: " 시뮬레이터" },
  cat: {
    semiconductor: "반도체",
    space: "우주",
    automotive: "자동차",
    appliance: "가전",
    aviation: "항공",
    medical: "의료기기",
    energy: "에너지",
    robotics: "로보틱스",
  },
  pages: {
    about: {
      title: "소개",
      body: "STRATA는 복잡한 기술 제품을 3D로 분해해 보며 배우는 교육 도구입니다. 반도체부터 우주·자동차·의료기기까지, 겉으로는 보이지 않는 내부 구조를 직접 돌려보고 펼쳐보며 이해할 수 있습니다.<br><br>전문 지식이 없어도 괜찮습니다. 부품을 누르면 그 역할을 쉬운 말로 설명해 드립니다.",
    },
    learn: {
      title: "학습 구조",
      body: "모든 모델은 같은 3단계 흐름으로 배웁니다.<br><br>1. 회전 — 제품을 모든 각도에서 관찰합니다.<br>2. 분해 — 한 겹씩 펼쳐 내부를 드러냅니다.<br>3. 학습 — 각 부품을 눌러 역할과 원리를 확인합니다.<br><br>쉬운 개념에서 시작해 점점 깊은 구조로 들어가도록 설계했습니다.",
    },
    intent: {
      title: "제작자 의도",
      body: "기술은 점점 작고 복잡해지지만, 그 안에서 무슨 일이 일어나는지 직관적으로 보여주는 자료는 드뭅니다.<br><br>STRATA는 '열어서 직접 보면 이해가 빠르다'는 단순한 믿음에서 출발했습니다. 누구나 부담 없이 첨단 기술의 내부를 들여다보고, 작은 호기심이 깊은 이해로 이어지도록 만드는 것이 목표입니다.<br><br>— 토론토에서, 제작자",
    },
  },
};

export type Dict = typeof ko;
