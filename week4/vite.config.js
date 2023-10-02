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
        requestAnimationFrame: resolve(
          __dirname,
          "src/requestAnimationFrame/index.html"
        ),
        gsap: resolve(__dirname, "src/gsap/index.html"),
      },
    },
  },
});
