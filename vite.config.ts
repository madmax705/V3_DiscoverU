import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync } from "fs";

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'add-nojekyll',
      closeBundle() {
        copyFileSync('.nojekyll', 'dist/.nojekyll');
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
