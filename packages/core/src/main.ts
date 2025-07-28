import "./style.css";
import { loadSpzFromUrl, CoordinateSystem } from "../lib/";

import spzUrl from "../lib/spz-wasm/spz/samples/racoonfamily.spz?url";

const main = async () => {
  await loadSpzFromUrl(spzUrl, {
    spzUnpackOptions: {
      coordinateSystem: CoordinateSystem.UNSPECIFIED,
    },
  });

  console.log("done");
};

main();
