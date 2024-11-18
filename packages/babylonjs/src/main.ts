import "./style.css";
import { dumBabylon } from "../lib/";

const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  app.innerHTML = `
  <div>
    <p>babylon:${dumBabylon()}</p>
  </div>
`;
}
