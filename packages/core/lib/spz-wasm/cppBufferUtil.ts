import type { MainModule, VectorFloat32 } from "./build/main";

/**
 * create new Float32Array from cpp FloatVector
 * @param wasmModule emscripten main module
 * @param vec cpp float32 vector
 * @returns copied float32 array
 */
export const floatVectorToFloatArray = (
  wasmModule: MainModule,
  vec: VectorFloat32,
): Float32Array => {
  const pointer = wasmModule.vf32_ptr(vec);
  const size = vec.size();

  const buffer = new Float32Array(wasmModule.HEAP32, pointer, size);
  const copiedBuffer = new Float32Array(buffer);

  return copiedBuffer;
};
