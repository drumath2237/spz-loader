import Module from "./build/main.mjs";

/**
 * @type {()=>Promise<void>}
 */
export const main = async () => {
  const wasmModule = await Module();

  const res = await fetch("../lib/spz-wasm/spz/samples/racoonfamily.spz").then(d => d.arrayBuffer())
  const gsBinData = new Uint8Array(res)

  let gsPtr = null;

  try {

    gsPtr = wasmModule._malloc(Uint8Array.BYTES_PER_ELEMENT * gsBinData.length)
    if (gsPtr == null) { throw new Error("allocation failed") }

    wasmModule.HEAPU8.set(gsBinData, gsPtr / Uint8Array.BYTES_PER_ELEMENT)

    const gsCloud = wasmModule.load_spz(gsPtr, gsBinData.length)
    console.log(gsCloud);

    const positionPtr = wasmModule.vf32_ptr(gsCloud.positions)
    const positionBuf = new Float32Array(wasmModule.HEAP32.buffer, positionPtr, gsCloud.positions.size())
    console.log(positionBuf);

  } catch (e) {
    console.error(e);

  } finally {
    if (gsPtr !== null) {
      wasmModule._free(gsPtr)
    }
  }


};
