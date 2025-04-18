import "./style.css";
import { Engine, Scene } from "@babylonjs/core";
import { createGaussianSplattingFromSpzUrl } from "../lib/";

import spzPath from "../../core/lib/spz-wasm/spz/samples/racoonfamily.spz?url";

const main = async () => {
  const renderCanvas =
    document.querySelector<HTMLCanvasElement>("#renderCanvas");
  if (!renderCanvas) {
    return;
  }

  const engine = new Engine(renderCanvas);
  const scene = new Scene(engine);

  scene.createDefaultCameraOrLight(true, true, true);

  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());

  await createGaussianSplattingFromSpzUrl(spzPath, scene);
};

main();
