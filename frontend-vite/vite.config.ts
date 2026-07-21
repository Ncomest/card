import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/types": path.resolve(__dirname, "./src/shared/lib/types"),
      "@/style": path.resolve(__dirname, "./src/app/assets/style"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/widgets": path.resolve(__dirname, "./src/widgets"),
    },
  },
});
