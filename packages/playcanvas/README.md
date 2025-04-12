# @spz-loader/playcanvas

## About

integration for PlayCanvas Engine and `GSplat` Entity

## Usage

Install like below:

```sh
# for npm
npm i playcanvas @spz-loader/playcanvas

# for pnpm
pnpm add playcanvas @spz-loader/playcanvas
```

Usage example:

```ts
import { Application } from "playcanvas";
import { createGSplatEntityFromSpzUrlAsync } from "@spz-loader/playcanvas";

import splatUrl from "../assets/racoonfamily.spz?url";

const app = new Application(canvas);
app.start();
// ...
const spzEntity = await createGSplatEntityFromSpzUrlAsync(splatUrl);
app.root.addChild(spzEntity);
```
