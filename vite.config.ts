import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ReactStickyGrid",
      fileName: (format) => `index.${format === "es" ? "es.js" : "js"}`,
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["react", "react-dom", "@emotion/react", "@emotion/styled", "@mui/material", "@mui/icons-material", "@tanstack/react-table"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    },
    outDir: "dist",
    sourcemap: true
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});

