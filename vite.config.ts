import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

/**
 * 배포 환경별 base path
 *   - 로컬 dev / user site repo / custom 도메인 → "/"
 *   - project repo (sub-path) → "/<repo-name>/"
 *
 * GitHub Actions 에서 VITE_BASE 환경변수로 주입.
 * 예: VITE_BASE=/portfolio_site/ npm run build
 */
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
