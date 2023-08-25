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
        primitive: resolve(__dirname, "src/primitive/index.html"),
        material: resolve(__dirname, "src/material/index.html"),
        texture: resolve(__dirname, "src/texture/index.html"),
        group: resolve(__dirname, "src/group/index.html"),
      },
    },
  },
  publicDir: resolve(__dirname, "public"),
});
