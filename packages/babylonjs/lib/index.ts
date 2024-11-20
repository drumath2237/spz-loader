import { MeshBuilder } from "@babylonjs/core";

export const dumBabylon = (): number => {
  return 42;
};

export const createCube = (size: number) => {
  return MeshBuilder.CreateBox("box", { size });
};
