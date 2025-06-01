import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
        basic: resolve(__dirname, "src/basic/index.html"),
        primitives: resolve(__dirname, "src/primitives/index.html"),
        materials: resolve(__dirname, "src/materials/index.html"),
        textures: resolve(__dirname, "src/textures/index.html"),
        groups: resolve(__dirname, "src/groups/index.html"),
        exercise: resolve(__dirname, "src/exercise/index.html"),
      },
    },
  },
});
