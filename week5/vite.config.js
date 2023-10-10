import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        "3d-assets": resolve(__dirname, "src/3d-assets/index.html"),
        shadows: resolve(__dirname, "src/shadows/index.html"),
        exercise: resolve(__dirname, "src/exercise/index.html"),
      },
    },
  },
});
