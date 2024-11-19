import { main } from "./spz-wasm";

export const dummy = (): number => {
  return 42;
};

export const spzMain = (): Promise<void> => {
  return main();
};
