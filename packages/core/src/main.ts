import "./style.css";
import { dummy } from "../lib/main";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <p>${dummy()}</p>
  </div>
`;
