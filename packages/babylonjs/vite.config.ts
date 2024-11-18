import { resolve } from "node:path";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({}) => {
  return {
    build: {
      lib: {
        entry: "./lib/index.ts",
        name: "SpzWasmBabylonjs",
        fileName: "index",
      },
    },
    plugins: [
      dts({
        entryRoot: resolve(__dirname, "lib"),
        include: resolve(__dirname, "lib"),
      }),
    ],
  };
});
