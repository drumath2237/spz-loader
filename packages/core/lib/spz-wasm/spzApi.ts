import MainModuleFactory from "./build/main";
import {
  type GaussianCloud,
  createGaussianCloudFromRaw,
  disposeRawGSCloud,
} from "./gaussianCloud";

/**
 * decode .spz data to GaussianCloud
 * @param spzData .spz file binary data
 * @returns Gaussian Cloud
 */
export const loadSpz = async (spzData: Uint8Array): Promise<GaussianCloud> => {
  const wasmModule = await MainModuleFactory();

  let pointer: number | null = null;

  try {
    pointer = wasmModule._malloc(Uint8Array.BYTES_PER_ELEMENT * spzData.length);
    if (pointer === null) {
      throw new Error("could'nt allocate memory");
    }

    wasmModule.HEAPU8.set(spzData, pointer / Uint8Array.BYTES_PER_ELEMENT);

    const rawGsCloud = wasmModule.load_spz(pointer, spzData.length);
    const gaussianCloud = createGaussianCloudFromRaw(wasmModule, rawGsCloud);
    disposeRawGSCloud(wasmModule, rawGsCloud);

    return gaussianCloud;
  } catch (error) {
    throw error as Error;
  }
};
