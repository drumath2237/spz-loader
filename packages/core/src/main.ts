import "./style.css";
import { loadSpz } from "../lib/";

import spzUrl from "../lib/spz-wasm/spz/samples/racoonfamily.spz?url";

const main = async () => {
  const spzDataBuffer = await fetch(spzUrl)
    .then((res) => res.arrayBuffer())
    .then((buf) => new Uint8Array(buf));

  await loadSpz(spzDataBuffer);

  console.log("done");
};

main();
