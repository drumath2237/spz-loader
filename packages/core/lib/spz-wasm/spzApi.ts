import MainModuleFactory from "./build/main";
import type { MainModule } from "./build/main";
import {
  type GaussianCloud,
  createGaussianCloudFromRaw,
  disposeRawGSCloud,
} from "./gaussianCloud";

type CoordinateSystemUnion = keyof MainModule["CoordinateSystem"];

interface ILoadSpzOptions {
  colorScaleFactor?: number;
  unpackOptions?: {
    coordinateSystem?: CoordinateSystemUnion;
  };
}

/**
 * decode .spz data to GaussianCloud
 * @param spzData .spz file binary data
 * @returns Gaussian Cloud
 */
const loadSpz = async (
  spzData: Uint8Array | ArrayBuffer,
  options?: ILoadSpzOptions,
): Promise<GaussianCloud> => {
  const wasmModule = await MainModuleFactory();

  const spzBuffer =
    spzData instanceof Uint8Array ? spzData : new Uint8Array(spzData);

  let pointer: number | null = null;

  try {
    pointer = wasmModule._malloc(
      Uint8Array.BYTES_PER_ELEMENT * spzBuffer.length,
    );
    if (pointer === null) {
      throw new Error("couldn't allocate memory");
    }

    wasmModule.HEAPU8.set(spzBuffer, pointer / Uint8Array.BYTES_PER_ELEMENT);

    const coordinateSystem =
      wasmModule.CoordinateSystem[
        options?.unpackOptions?.coordinateSystem ?? "UNSPECIFIED"
      ];

    const rawGsCloud = wasmModule.load_spz(pointer, spzBuffer.length, {
      coordinateSystem,
    });

    const gaussianCloud = createGaussianCloudFromRaw(
      wasmModule,
      rawGsCloud,
      options,
    );
    disposeRawGSCloud(wasmModule, rawGsCloud);

    return gaussianCloud;
  } catch (error) {
    throw error as Error;
  } finally {
    if (pointer !== null) {
      wasmModule._free(pointer);
    }
  }
};

const loadSpzFromUrl = (
  url: string,
  options?: ILoadSpzOptions,
): Promise<GaussianCloud> => {
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((data) => loadSpz(data, options));
};

export {
  type ILoadSpzOptions,
  loadSpz,
  loadSpzFromUrl,
  type CoordinateSystemUnion,
};
