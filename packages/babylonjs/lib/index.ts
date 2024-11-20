import { MeshBuilder } from "@babylonjs/core";

export const createCube = (size: number) => {
  return MeshBuilder.CreateBox("box", { size });
};
