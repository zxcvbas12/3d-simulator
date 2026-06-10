import type { Dict } from "./ko";

export const zh: Dict = {
  nav: { home: "首页", about: "简介", learn: "学习方式", intent: "创作初衷", menu: "菜单" },
  sidebar: { title: "分类" },
  hero: {
    eyebrow: "INTERACTIVE 3D · 学习工具",
    title: "拆解复杂技术<br>轻松理解原理",
    sub: "在3D中旋转产品，逐层拆解，探索内部结构与每个部件的作用。",
    ctaPrimary: "开始探索",
    ctaSecondary: "如何使用",
  },
  how: {
    title: "学习方式",
    s1Title: "旋转",
    s1Desc: "用鼠标或触控全方位观察",
    s2Title: "拆解",
    s2Desc: "滚动或双指捏合展开部件",
    s3Title: "学习",
    s3Desc: "点击部件查看作用与原理",
  },
  card: {
    available: "已上线",
    soon: "即将推出",
    explore: "探索",
    catSub: "通过拆解学习的模型",
    noneLive: "暂无可学习的模型——即将推出。",
  },
  footer: {
    tagline: "通过 3D 拆解学习技术产品的教育工具。",
    siteHead: "网站",
    disclaimer: "用于教育的简化模型",
  },
  model: {
    back: "← 返回",
    viewerLbl: "3D查看区域",
    viewerNote: "在正式网站中，你将在此旋转、拆解并学习模型。",
    startLearn: "开始学习",
    overview: "概述",
    specs: "主要规格",
  },
  viewer: {
    assemble: "组装",
    explode: "拆解",
    hint: "拖动旋转 · 滚动 / 捏合 / ＋－缩放 · 滑块拆解 · 点击部件查看说明",
    autoRotate: "自动旋转",
    reset: "重置",
    layerLabel: "第{n}层",
    spec: "尺寸",
    zoomIn: "放大",
    zoomOut: "缩小",
    sliderLabel: "拆解 / 组装",
    canvasLabel: "3D 模型 — 拖动或方向键旋转",
    close: "关闭",
    loading: "正在加载 3D…",
    loadError: "无法加载 3D 模型",
    more: "详细",
    less: "简略",
    sources: "延伸阅读",
  },
  home: {
    catsTitle: "探索的领域",
    catMeta: "{total}个模型 · {live}个已上线",
    catMetaSoon: "{total}个模型 · 即将推出",
    trustTitle: "准确性优先",
    trust1Title: "基于真实结构",
    trust1Desc: "模型遵循公开标准与技术文献中的结构。为教学而简化之处，我们都会明确标注，绝不隐藏。",
    trust2Title: "用数字说话",
    trust2Desc: "点击部件即可看到其作用以及真实尺寸与工艺数据——不说“很薄”，而说“50μm”。",
    trust3Title: "从通俗语言开始",
    trust3Desc: "每条说明都从一句话摘要开始，再进入精确的术语与原理。无需任何专业背景。",
  },
  category: { suffix: "模拟器" },
  cat: {
    semiconductor: "半导体",
    space: "航天",
    automotive: "汽车",
    appliance: "家电",
    aviation: "航空",
    medical: "医疗设备",
    energy: "能源",
    robotics: "机器人",
  },
  pages: {
    about: {
      title: "简介",
      lead: "STRATA 是一款通过 3D 拆解学习复杂技术产品的教育工具。亲手旋转、展开外表看不见的内部结构，并查看每个部件的作用。",
      sections: [
        {
          heading: "这是什么",
          body: "从半导体封装到航天器、汽车和医疗设备，我们按领域将技术产品做成交互式 3D 分解图。旋转产品，用滑块逐层展开，点击任意部件即可了解其作用与真实尺寸。",
        },
        {
          heading: "为谁而做",
          body: "正在探索方向与技术领域的学生，<br>想快速了解相邻领域结构的工程师，<br>以及对新闻里的 HBM、芯粒感到好奇的每个人。<br><br>无需专业背景——所有说明都从通俗语言开始。",
        },
        {
          heading: "有何不同",
          body: "文章和视频按固定顺序展示，而在这里你可以按自己的节奏旋转与展开。每个部件都附有作用、原理与真实数据，所有模型共享同一套操作——学会一次，处处适用。",
        },
        {
          heading: "模型如何制作",
          body: "模型参考公开标准与技术白皮书中的结构制作；为教学而简化之处（层数、比例等）都会明确标注。所有内容免费提供。",
        },
      ],
    },
    learn: {
      title: "学习方式",
      lead: "每个模型都遵循相同的三步流程。掌握一次，任何领域的模型都能用同样的方式探索。",
      sections: [
        {
          heading: "三个步骤",
          body: "1. 旋转 — 拖动或触控，从各个角度观察，先熟悉整体形态与比例。<br>2. 拆解 — 用底部滑块逐层展开部件，看清什么按什么顺序堆叠。<br>3. 学习 — 点击部件查看作用、原理与尺寸。先看形态再读说明，理解快得多。",
        },
        {
          heading: "如何阅读信息面板",
          body: "点击部件会打开信息面板。从上到下——部件类型标签与真实尺寸、一句话摘要、它如何工作及为何重要、再加三条要点。点“简略”按钮可只看摘要。",
        },
        {
          heading: "从通俗语言到精确数据",
          body: "说明从比喻和通俗语言开始，再进入真实术语与数据——先说“摊开热量的金属盖”，再说“镀镍铜 IHS”。觉得吃力时，只读摘要也能跟上思路。",
        },
        {
          heading: "推荐学习顺序",
          body: "半导体推荐按 HBM → GPU → CPU 的顺序。先理解堆叠结构（HBM），再看为何把它放在处理器旁边（GPU 封装）、为何把芯片拆小（CPU 芯粒），脉络自然贯通。新类别也将提供同样原则的推荐顺序。",
        },
      ],
    },
    intent: {
      title: "创作初衷",
      lead: "技术越来越小、越来越复杂，但能直观展示其内部运作的资料却很少。",
      sections: [
        {
          heading: "起点",
          body: "STRATA 源于一个简单的信念：把东西打开、亲眼去看，是理解它最快的方式。在教科书的剖面图与新闻关键词之间，存在一种只有亲手旋转、展开才能获得的理解。",
        },
        {
          heading: "承诺",
          body: "准确性优先于外观。<br>为教学而做的简化绝不隐藏，都会注明。<br>所有内容保持免费。",
        },
        {
          heading: "未来方向",
          body: "从半导体开始，类别将扩展到航天、汽车、医疗设备与能源。希望这里能让小小的好奇心通向深入的理解。<br><br>— 于多伦多，制作者",
        },
      ],
    },
  },
};
