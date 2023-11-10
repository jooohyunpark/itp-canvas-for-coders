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
        primitives: resolve(__dirname, "src/primitives/index.html"),
        materials: resolve(__dirname, "src/materials/index.html"),
        textures: resolve(__dirname, "src/textures/index.html"),
        groups: resolve(__dirname, "src/groups/index.html"),
        exercise: resolve(__dirname, "src/exercise/index.html"),
      },
    },
  },
});
