import "./style.css";
import { dummy } from "../lib/";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <p>${dummy()}</p>
  </div>
`;
