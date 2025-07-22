import { loadSpz, UnpackOptions } from "@spz-loader/core";
import { Application, type Entity } from "playcanvas";
import { convert } from "./convert";

type CreateGSplatOptionType = {
  appId?: string;
  splatMaterialOptions?: {
    /**
     * - Custom vertex shader, see SPLAT MANY example.
     */
    vertex?: string;
    /**
     * - Custom fragment shader, see SPLAT MANY example.
     */
    fragment?: string;
    /**
     * - List of shader defines.
     */
    defines?: string[];
    /**
     * - Custom shader chunks.
     */
    chunks?: {
      [x: string]: string;
    };
    /**
     * - Opacity dithering enum.
     */
    dither?: string;
  };
};

const createGSplatEntityFromSpzUrlAsync = (
  url: string,
  spzUnpackOptions?: UnpackOptions,
  option?: CreateGSplatOptionType,
) => {
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((data) => createGSplatEntityFromSpzAsync(data, spzUnpackOptions, option));
};

const createGSplatEntityFromSpzAsync = async (
  spzBuffer: ArrayBuffer,
  spzUnpackOptions?: UnpackOptions,
  option?: CreateGSplatOptionType,
): Promise<Entity> => {
  const app = Application.getApplication(option?.appId);
  if (!app) {
    throw new Error("cannot find any playcanvas application.");
  }

  const gsCloud = await loadSpz(new Uint8Array(spzBuffer), spzUnpackOptions, {
    colorScaleFactor: 1.0,
  });
  const gsResource = convert(gsCloud, app.graphicsDevice);
  const gsEntity = gsResource.instantiate(option?.splatMaterialOptions);
  return gsEntity;
};

export { createGSplatEntityFromSpzAsync, createGSplatEntityFromSpzUrlAsync };
