import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@shared/styles/tokens.css";
import "./index.css";
import App from "./App";
import { BRAND } from "@shared/config";

document.title = `${BRAND} — 3D 학습 시뮬레이터`;

const root = document.getElementById("app");
if (!root) throw new Error("#app mount not found");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
