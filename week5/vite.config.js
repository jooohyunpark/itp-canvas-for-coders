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
        shadow: resolve(__dirname, "src/shadow/index.html"),
      },
    },
  },
  publicDir: resolve(__dirname, "public"),
});
