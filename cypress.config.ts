import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: `react`,
      bundler: `vite`,
    },
    viewportHeight: 600,
    viewportWidth: 1000,
  },
});
