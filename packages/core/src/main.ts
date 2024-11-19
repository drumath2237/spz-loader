import "./style.css";
import { dummy, spzMain } from "../lib/";

const app = document.querySelector<HTMLDivElement>("#app");
if (app) {
  app.innerHTML = `
  <div>
    <p>${dummy()}</p>
  </div>
`;
}

const main = async () => {
  await spzMain();
};

main().then(() => console.log("done"));
