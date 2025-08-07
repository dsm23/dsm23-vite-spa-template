import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import eslint from "@nabla/vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslint({
      formatter: "stylish",
    }),
    tsconfigPaths(),
  ],
});
