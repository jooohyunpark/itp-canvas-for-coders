import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname, "src"),
  server: {
    port: 3000,
  },
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
  publicDir: resolve(__dirname, "public"),
});
