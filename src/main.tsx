import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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
