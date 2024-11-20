import "./style.css";
import { Engine, MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { createGaussianSplattingFromSpz } from "../lib/";

import spzPath from "../../core/assets/guitarroom.spz?url";

const main = async () => {
  const renderCanvas =
    document.querySelector<HTMLCanvasElement>("#renderCanvas");
  if (!renderCanvas) {
    return;
  }

  const engine = new Engine(renderCanvas);
  const scene = new Scene(engine);

  scene.createDefaultCameraOrLight(true, true, true);

  const spzData = await fetch(spzPath).then((res) => res.arrayBuffer());
  await createGaussianSplattingFromSpz(spzData);

  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());
};

main();
