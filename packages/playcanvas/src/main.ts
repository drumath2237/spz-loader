import "./style.css";

import {
  Application,
  Color,
  Entity,
  FILLMODE_FILL_WINDOW,
  RESOLUTION_AUTO,
} from "playcanvas";

// @ts-ignore
import { CameraControls } from "playcanvas/scripts/esm/camera-controls.mjs";

import { createGSplatEntityFromSpzUrlAsync } from "../lib";

import splatUrl from "../../core/lib/spz-wasm/spz/samples/racoonfamily.spz?url";

const main = async () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#renderCanvas");
  if (!canvas) {
    throw new Error("Canvas element with id 'renderCanvas' not found");
  }

  const app = new Application(canvas, {
    graphicsDeviceOptions: {
      alpha: false,
    },
  });
  app.start();

  app.setCanvasFillMode(FILLMODE_FILL_WINDOW);
  app.setCanvasResolution(RESOLUTION_AUTO);
  window.addEventListener("resize", () => app.resizeCanvas());

  const camera = new Entity("camera");
  camera.addComponent("camera", {
    clearColor: new Color(0.2, 0.2, 0.2),
  });
  camera.setPosition(0, 0.3, -1);
  app.root.addChild(camera);
  camera.addComponent("script");
  camera.script?.create(CameraControls);

  const light = new Entity("light");
  light.addComponent("light", {
    type: "directional",
  });
  light.setEulerAngles(15, 30, 0);
  app.root.addChild(light);

  const spzEntity = await createGSplatEntityFromSpzUrlAsync(splatUrl);
  app.root.addChild(spzEntity);
};

main();
