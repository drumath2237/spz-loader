import "./style.css";
import { add } from "../lib/";

// import spzPath from "../../core/lib/spz-wasm/spz/samples/racoonfamily.spz?url";

const main = async () => {
  const renderCanvas =
    document.querySelector<HTMLCanvasElement>("#renderCanvas");
  if (!renderCanvas) {
    return;
  }

  console.log(add(1, 2))
};

main();
