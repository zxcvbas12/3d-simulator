import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// Vite root = 프로젝트 루트 (index.html이 여기 있음).
// 소스 TS는 문서화된 폴더 구조(shared/ · locales/ · <카테고리>/<모델>/)에 그대로 둔다.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shared": r("./shared"),
      "@locales": r("./locales"),
    },
  },
});
