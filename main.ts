import "@shared/styles/tokens.css";
import "@shared/styles/base.css";
import "@shared/styles/shell.css";
import { BRAND } from "@shared/config";
import { App } from "@shared/ui/app";

document.title = `${BRAND} — 3D 학습 시뮬레이터`;

const root = document.getElementById("app");
if (!root) throw new Error("#app mount not found");

// 앱 셸(상단 네비 · 2단계 사이드바 · 본문 라우팅 · 다국어).
// 실제 3D 뷰어는 다음 단계에서 모델 상세 뷰의 .viewer 영역에 연결한다.
new App(root);
