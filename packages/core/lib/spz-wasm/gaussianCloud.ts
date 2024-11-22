import type { MainModule, RawGaussianCloud } from "./build/main";
import { floatVectorToFloatArray } from "./cppBufferUtil";

export type GaussianCloud = {
  numPoints: number;
  shDegree: number;
  antialiased: boolean;
  positions: Float32Array;
  scales: Float32Array;
  rotations: Float32Array;
  alphas: Uint8ClampedArray;
  colors: Uint8ClampedArray;
  sh: Float32Array;
};

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

/**
 * create new gaussian cloud from raw
 * @param wasmModule emscripten wasm main module
 * @param raw RawGSCloud
 * @returns new Gaussian Cloud
 */
export const createGaussianCloudFromRaw = (
  wasmModule: MainModule,
  raw: RawGaussianCloud,
): GaussianCloud => {
  return {
    numPoints: raw.numPoints,
    shDegree: raw.shDegree,
    antialiased: raw.antialiased,
    positions: floatVectorToFloatArray(wasmModule, raw.positions),
    scales: floatVectorToFloatArray(wasmModule, raw.scales).map(Math.exp),
    rotations: floatVectorToFloatArray(wasmModule, raw.rotations),
    alphas: new Uint8ClampedArray(
      floatVectorToFloatArray(wasmModule, raw.alphas)
        .map((n) => sigmoid(n) * 255.0)
        .values(),
    ),
    colors: new Uint8ClampedArray(
      floatVectorToFloatArray(wasmModule, raw.colors)
        // HACK: colorScale is 0.282 or 0.15
        .map((n) => (n * 0.282 + 0.5) * 255)
        .values(),
    ),
    sh: floatVectorToFloatArray(wasmModule, raw.sh),
  };
};

/**
 * dispose raw gaussian cloud's vector from heap memory
 * @param raw raw gaussian cloud
 */
export const disposeRawGSCloud = (raw: RawGaussianCloud): void => {
  raw.positions.delete();
  raw.scales.delete();
  raw.rotations.delete();
  raw.alphas.delete();
  raw.colors.delete();
  raw.sh.delete();
};
