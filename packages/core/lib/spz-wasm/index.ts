import MainModuleFactory from "./build/main";
import {
  createGaussianCloudFromRaw,
  disposeRawGSCloud,
  type GaussianCloud,
} from "./gaussianCloud";

/**
 * decode .spz data to GaussianCloud
 * @param spzData .spz file binary data
 * @returns Gaussian Cloud
 */
export const loadSpz = async (spzData: Uint8Array): Promise<GaussianCloud> => {
  const wasmModule = await MainModuleFactory();

  const pointer = wasmModule._malloc(
    Uint8Array.BYTES_PER_ELEMENT * spzData.length,
  );
  wasmModule.HEAPU8.set(spzData, pointer / Uint8Array.BYTES_PER_ELEMENT);

  const rawGsCloud = wasmModule.load_spz(pointer, spzData.length);
  const gaussianCloud = createGaussianCloudFromRaw(wasmModule, rawGsCloud);
  disposeRawGSCloud(rawGsCloud);

  return gaussianCloud;
};
