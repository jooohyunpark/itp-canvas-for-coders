import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        requestAnimationFrame: resolve(
          __dirname,
          "src/requestAnimationFrame/index.html"
        ),
        gsap: resolve(__dirname, "src/gsap/index.html"),
      },
    },
  },
});
