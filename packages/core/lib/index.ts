// @ts-ignore
import { main } from "./spz-wasm/index.mjs";

export const dummy = (): number => {
  return 42;
};

export const spzMain = (): Promise<void> => {
  return main();
};
