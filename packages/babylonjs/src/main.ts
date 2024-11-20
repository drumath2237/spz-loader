import "./style.css";
import { Engine, Scene, Vector3 } from "@babylonjs/core";
import { createCube } from "../lib/";

const main = async () => {
  const renderCanvas =
    document.querySelector<HTMLCanvasElement>("#renderCanvas");
  if (!renderCanvas) {
    return;
  }

  const engine = new Engine(renderCanvas);
  const scene = new Scene(engine);

  scene.createDefaultCameraOrLight(true, true, true);

  const cube = createCube(0.5);
  cube.position = new Vector3(0, 0.25, 0);

  engine.runRenderLoop(() => scene.render());
  window.addEventListener("resize", () => engine.resize());
};

main();
