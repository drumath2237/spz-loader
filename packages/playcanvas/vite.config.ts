import { resolve } from "node:path";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: "./lib/index.ts",
        name: "SpzWasmPlayCanvas",
        fileName: "index",
      },
      rollupOptions: {
        external: ["playcanvas"],
        output: {
          globals: {
            "playcanvas": "pc",
          },
        },
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
