import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
    // The recovered source was written for Create React App and reads
    // process.env.REACT_APP_BACKEND_URL. Shimming it here keeps the
    // application code byte-identical to the original.
    define: {
      "process.env.REACT_APP_BACKEND_URL": JSON.stringify(
        env.REACT_APP_BACKEND_URL ?? "",
      ),
    },
    server: { port: 3000 },
    build: {
      rollupOptions: {
        output: {
          // Keep the rarely-changing vendor code in its own long-lived chunk
          // so app edits don't invalidate it in browser caches.
          manualChunks: {
            react: [
              "react",
              "react-dom",
              "react-dom/client",
              "react-router-dom",
            ],
            motion: ["framer-motion"],
          },
        },
      },
    },
  };
});
