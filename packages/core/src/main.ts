import "./style.css";
import { dummy } from "../lib/";

const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  app.innerHTML = `
  <div>
    <p>${dummy()}</p>
  </div>
`;
}
