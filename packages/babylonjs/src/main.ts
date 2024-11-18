import "./style.css";
import { dumBabylon } from "../lib/";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <p>babylon:${dumBabylon()}</p>
  </div>
`;
