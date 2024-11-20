import { GaussianSplattingMesh, type Scene } from "@babylonjs/core";
import { loadSpz, type GaussianCloud } from "@spz-loader/core";

export const createGaussianSplattingFromSpz = async (
  data: ArrayBuffer,
  name?: string,
  scene?: Scene,
  keepInRam?: boolean,
): Promise<GaussianSplattingMesh> => {
  const splat = new GaussianSplattingMesh(
    name ?? "spz splat",
    null,
    scene,
    keepInRam,
  );
  const splatBuffer = await parseSpzToSplat(data);
  await splat.loadDataAsync(splatBuffer);
  return splat;
};

export const parseSpzToSplat = async (
  data: ArrayBuffer,
): Promise<ArrayBuffer> => {
  const gsCloud = await loadSpz(new Uint8Array(data));
  return _convertGaussianCloudToSplatBuffer(gsCloud);
};

const _convertGaussianCloudToSplatBuffer = (
  gsCloud: GaussianCloud,
): ArrayBuffer => {
  // position(3*f32) + scale(3*f32) + color(4*u8) + rotation(4*u8)
  const rowOutputLength = 3 * 4 + 3 * 4 + 4 + 4;
  const splatCount = gsCloud.numPoints;
  const buffer = new ArrayBuffer(rowOutputLength * splatCount);

  const position = new Float32Array(buffer);
  const scale = new Float32Array(buffer);
  const rgba = new Uint8ClampedArray(buffer);
  const rot = new Uint8ClampedArray(buffer);

  // positions
  for (let i = 0; i < splatCount; i++) {
    position[i * 8 + 0] = gsCloud.positions[i * 3 + 0];
    position[i * 8 + 1] = gsCloud.positions[i * 3 + 1];
    position[i * 8 + 2] = gsCloud.positions[i * 3 + 2];
  }

  // colors
  for (let i = 0; i < splatCount; i++) {
    rgba[i * 32 + 24 + 0] = gsCloud.colors[i * 3 + 0];
    rgba[i * 32 + 24 + 1] = gsCloud.colors[i * 3 + 1];
    rgba[i * 32 + 24 + 2] = gsCloud.colors[i * 3 + 2];
    rgba[i * 32 + 24 + 3] = gsCloud.alphas[i];
  }

  // scales
  for (let i = 0; i < splatCount; i++) {
    scale[i * 8 + 3 + 0] = gsCloud.scales[i * 3 + 0];
    scale[i * 8 + 3 + 1] = gsCloud.scales[i * 3 + 1];
    scale[i * 8 + 3 + 2] = gsCloud.scales[i * 3 + 2];
  }

  // rotations
  for (let i = 0; i < splatCount; i++) {
    rot[i * 32 + 28 + 1] = gsCloud.rotations[i * 4 + 0] * 127.5;
    rot[i * 32 + 28 + 2] = gsCloud.rotations[i * 4 + 1] * 127.5;
    rot[i * 32 + 28 + 3] = gsCloud.rotations[i * 4 + 2] * 127.5;
    rot[i * 32 + 28 + 0] = gsCloud.rotations[i * 4 + 3] * 127.5;
  }

  return buffer;
};
