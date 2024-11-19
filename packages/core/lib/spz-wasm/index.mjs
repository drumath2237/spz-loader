import { readFile } from "fs/promises";
import Module from "./build/main.mjs";

const main = async () => {
  const wasmModule = await Module();

  const gsFile = await readFile("./spz/samples/racoonfamily.spz");
  const gsBinData = new Uint8Array(gsFile.buffer)

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

main();

