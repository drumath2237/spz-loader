import MainModuleFactory from "./build/main";
import { UnpackOptions, CoordinateSystemValue } from "./build/main";
import {
  type GaussianCloud,
  createGaussianCloudFromRaw,
  disposeRawGSCloud,
} from "./gaussianCloud";

interface ILoadSpzOptions {
  colorScaleFactor?: number;
}

export const CoordinateSystem = {
    UNSPECIFIED: {value: 0} as CoordinateSystemValue<0>,
    LDB: {value: 1} as CoordinateSystemValue<1>,
    RDB: {value: 2} as CoordinateSystemValue<2>,
    LUB: {value: 3} as CoordinateSystemValue<3>,
    RUB: {value: 4} as CoordinateSystemValue<4>,
    LDF: {value: 5} as CoordinateSystemValue<5>,
    RDF: {value: 6} as CoordinateSystemValue<6>,
    LUF: {value: 7} as CoordinateSystemValue<7>,
    RUF: {value: 8} as CoordinateSystemValue<8>,
} satisfies Record<string, CoordinateSystemValue<number>>;

/**
 * decode .spz data to GaussianCloud
 * @param spzData .spz file binary data
 * @returns Gaussian Cloud
 */
const loadSpz = async (
  spzData: Uint8Array | ArrayBuffer,
  spzUnpackOptions?: UnpackOptions,
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

    if(spzUnpackOptions === undefined) {
      spzUnpackOptions = {
        coordinateSystem: wasmModule.CoordinateSystem.UNSPECIFIED,
      };
    }

    const rawGsCloud = wasmModule.load_spz(pointer, spzBuffer.length, spzUnpackOptions);
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
  spzUnpackOptions: UnpackOptions,
  options?: ILoadSpzOptions,
): Promise<GaussianCloud> => {
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((data) => loadSpz(data, spzUnpackOptions, options));
};

export { type ILoadSpzOptions, loadSpz, loadSpzFromUrl, type UnpackOptions };
