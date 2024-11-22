import type { MainModule, VectorFloat32, VectorUInt8T } from "./build/main";

/**
 * create new Float32Array from cpp FloatVector
 * @param wasmModule emscripten main module
 * @param vec cpp float32 vector
 * @returns copied float32 array
 */
export const floatVectorToFloatArray = (
  wasmModule: MainModule,
  vec: VectorFloat32,
  enhancementFunc: (n: number) => number = (n) => n,
): Float32Array => {
  const pointer = wasmModule.vf32_ptr(vec);
  const size = vec.size();

  const buffer = new Float32Array(wasmModule.HEAPF32.buffer, pointer, size);
  const copiedBuffer = buffer.map(enhancementFunc);

  return copiedBuffer;
};

export const uint8VecToArray = (
  wasmModule: MainModule,
  vec: VectorUInt8T,
): Uint8Array => {
  const pointer = wasmModule.vf32_ptr(vec);
  const size = vec.size();

  const buffer = new Uint8Array(wasmModule.HEAPU8.buffer, pointer, size);
  const copiedBuffer = new Uint8Array(buffer);

  return copiedBuffer;
};
