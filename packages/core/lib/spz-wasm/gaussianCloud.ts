import type { MainModule, RawGaussianCloud } from "./build/main";
import { floatVectorToFloatArray } from "./cppBufferUtil";

export type GaussianCloud = {
  numPoints: number;
  shDegree: number;
  antialiased: boolean;
  positions: Float32Array;
  scales: Float32Array;
  rotations: Float32Array;
  alphas: Float32Array;
  colors: Float32Array;
  sh: Float32Array;
};

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

const colorScaleFactory = (scale: number) => (color: number) =>
  color * scale + 0.5;

/**
 * create new gaussian cloud from raw
 * @param wasmModule emscripten wasm main module
 * @param raw RawGSCloud
 * @returns new Gaussian Cloud
 */
export const createGaussianCloudFromRaw = (
  wasmModule: MainModule,
  raw: RawGaussianCloud,
  options?: {
    colorScaleFactor?: number;
  },
): GaussianCloud => {
  const colScale = options?.colorScaleFactor ?? 0.282;
  return {
    numPoints: raw.numPoints,
    shDegree: raw.shDegree,
    antialiased: raw.antialiased,
    positions: floatVectorToFloatArray(wasmModule, raw.positions),
    scales: floatVectorToFloatArray(wasmModule, raw.scales, Math.exp),
    rotations: floatVectorToFloatArray(wasmModule, raw.rotations),
    alphas: floatVectorToFloatArray(wasmModule, raw.alphas, sigmoid),
    colors: floatVectorToFloatArray(
      wasmModule,
      raw.colors,
      colorScaleFactory(colScale),
    ),
    // FIXME: incorrect SH logic
    sh: floatVectorToFloatArray(wasmModule, raw.sh),
  };
};

/**
 * dispose raw gaussian cloud's vector from heap memory
 * @param raw raw gaussian cloud
 */
export const disposeRawGSCloud = (
  wasmModule: MainModule,
  raw: RawGaussianCloud,
): void => {
  wasmModule._free(wasmModule.vf32_ptr(raw.positions));
  wasmModule._free(wasmModule.vf32_ptr(raw.scales));
  wasmModule._free(wasmModule.vf32_ptr(raw.rotations));
  wasmModule._free(wasmModule.vf32_ptr(raw.alphas));
  wasmModule._free(wasmModule.vf32_ptr(raw.colors));
  wasmModule._free(wasmModule.vf32_ptr(raw.sh));
};
