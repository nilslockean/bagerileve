import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "e2e/*"],
  },
  plugins: [tsconfigPaths()],
});
