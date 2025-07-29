import "./style.css";
import { loadSpzFromUrl } from "../lib/";

import spzUrl from "../lib/spz-wasm/spz/samples/racoonfamily.spz?url";

const main = async () => {
  await loadSpzFromUrl(spzUrl, {
    unpackOptions: {
      coordinateSystem: "UNSPECIFIED",
    },
  });

  console.log("done");
};

main();
