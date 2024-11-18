import { resolve } from "node:path";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({}) => {
  console.log(`dirname: ${__dirname}`);

  return {
    build: {
      lib: {
        entry: "./lib/index.ts",
        name: "SpzWasmCore",
        fileName: "index",
      },
    },
    plugins: [
      dts({
        entryRoot: resolve(__dirname, "lib"),
      }),
    ],
  };
});
