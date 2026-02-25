import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import eslint from "@nabla/vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    !!process.env.CI &&
      eslint({
        formatter: "stylish",
      }),
    tsconfigPaths({
      projectDiscovery: "lazy",
    }),
  ],
});
