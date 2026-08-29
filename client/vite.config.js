/// <reference types="vitest/config" />
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    // Every current test is a pure function — no DOM needed. Add a jsdom
    // environment here (and testing-library) when component tests land.
    environment: "node",
    include: ["src/**/*.test.{js,jsx,ts,tsx}"],
    // helpers/*.jsx read this at module-eval time; give them a stable value.
    env: {
      VITE_BACKEND_API_URL: "http://test.local/api",
    },
  },
})