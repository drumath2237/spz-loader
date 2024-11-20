import type { MainModule, RawGaussianCloud } from "./build/main";
import { floatVectorToFloatArray, uint8VecToArray } from "./cppBufferUtil";

export type GaussianCloud = {
  numPoints: number;
  shDegree: number;
  antialiased: boolean;
  positions: Float32Array;
  scales: Float32Array;
  rotations: Float32Array;
  alphas: Uint8Array;
  colors: Uint8Array;
  sh: Float32Array;
};

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
    alphas: uint8VecToArray(wasmModule, raw.alphas),
    colors: uint8VecToArray(wasmModule, raw.colors),
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
