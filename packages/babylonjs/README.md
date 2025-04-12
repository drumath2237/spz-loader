# @spz-loader/babylonjs

## About

integration for Babylon.js `GaussianSplattingMesh`

## Usage

Install like below. `@spz-loader/babylonjs` requires Babylon.js version 7 or later.

```sh
# for npm
npm i @babylonjs/core @spz-loader/babylonjs

# for pnpm
pnpm add @babylonjs/core @spz-loader/babylonjs
```

Code example of ESModule or TypeScript.

```ts
import "./style.css";

import { Engine, Scene } from "@babylonjs/core";
import { createGaussianSplattingFromSpz } from "@spz-loader/babylonjs";

import spzPath from "../assets/hornedlizard.spz?url";

const engine = new Engine(renderCanvas);
const scene = new Scene(engine);
// ...
const splat = await createGaussianSplattingFromSpzUrl(spzPath, scene);
```
