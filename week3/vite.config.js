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
      },
    },
  },
});
