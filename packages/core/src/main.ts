import "./style.css";
import { loadSpz } from "../lib/";

import spzUrl from "../assets/guitarroom.spz?url";

const main = async () => {
  const spzDataBuffer = await fetch(spzUrl)
    .then((res) => res.arrayBuffer())
    .then((buf) => new Uint8Array(buf));

  const gsCloud = await loadSpz(spzDataBuffer);

  console.log(gsCloud);
};

main();
