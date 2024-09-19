import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      // https://vitejs.dev/guide/build.html#multi-page-app
      input: {
        main: resolve(__dirname, "src/index.html"),
        "3d-assets": resolve(__dirname, "src/3d-assets/index.html"),
        shadows: resolve(__dirname, "src/shadows/index.html"),
        exercise: resolve(__dirname, "src/exercise/index.html"),
      },
    },
  },
});
