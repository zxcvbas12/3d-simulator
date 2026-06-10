import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// 웹폰트 (self-host, font-display: swap) — 제목 그로테스크 · 수치/라벨 모노 · 한글 본문(동적 서브셋: 쓰는 글자 조각만 로드)
import "@fontsource-variable/space-grotesk/index.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@shared/styles/tokens.css";
import "@shared/styles/shell.css";
import "./index.css";
import App from "./App";
import { BRAND } from "@shared/config";
import { useAppStore } from "./shared/state/store";

document.title = `${BRAND} — 3D 학습 시뮬레이터`;
document.documentElement.lang = useAppStore.getState().lang;

const root = document.getElementById("app");
if (!root) throw new Error("#app mount not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
