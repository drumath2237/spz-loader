import "./style.css";
import { loadSpzFromUrl } from "../lib/";

import spzUrl from "../lib/spz-wasm/spz/samples/racoonfamily.spz?url";

const main = async () => {
  await loadSpzFromUrl(spzUrl);

  console.log("done");
};

main();
