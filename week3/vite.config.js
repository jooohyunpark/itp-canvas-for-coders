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
        primitives: resolve(__dirname, "src/primitives/index.html"),
        materias: resolve(__dirname, "src/materials/index.html"),
        textures: resolve(__dirname, "src/textures/index.html"),
        groups: resolve(__dirname, "src/groups/index.html"),
        exercise: resolve(__dirname, "src/exercise/index.html"),
      },
    },
  },
  publicDir: resolve(__dirname, "public"),
});
