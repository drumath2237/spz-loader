<p align="center">
  <h1 align="center">
    🦎<br/>spz-loader
  </h1>
</p>

<p align="center">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/%40spz-loader%2Fcore?logo=npm">
  <a href="https://github.com/drumath2237/spz-loader/actions/workflows/release.yaml"><img src="https://github.com/drumath2237/spz-loader/actions/workflows/release.yaml/badge.svg"/></a>
  <img src="https://img.shields.io/badge/Node.js-v20-%235FA04E?logo=nodedotjs&logoColor=%235FA04E"/>
  <img src="https://img.shields.io/badge/pnpm-v9-%23F69220?logo=pnpm&logoColor=%23F6922"/>
  <img src="https://img.shields.io/badge/WebAssembly-Emscripten-%23654FF0?logo=webassembly&logoColor=white"/>
  <img src="https://img.shields.io/github/license/drumath2237/spz-loader"/>
  <a href="https://x.com/ninisan_drumath"><img alt="X (formerly Twitter) Follow" src="https://img.shields.io/twitter/follow/ninisan_drumath"></a>
  
  <br/>
  <img align="center" src="./images/hornedlizard.gif"/>
</p>

## About

<!-- spz-loaderは、3D Gaussian Splatting のファイルフォーマットの一種である.spzをロードするためのnpmパッケージ群です。
.spzフォーマットの詳細はNianticが公開している[ブログ記事](https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format)や[GitHubリポジトリ](https://github.com/nianticlabs/spz)をご参照ください。 -->

spz-loader is a set of npm packages for loading .spz, a type of 3D Gaussian Splatting file format. For more information on the .spz format, see [the blog post](https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format) published by Niantic and the [GitHub repository](https://github.com/nianticlabs/spz).

<!-- spz-loaderは`nianticlabs/spz`をEmscriptenによってwasm化し、それを用いた純粋なデコード機能を有する`@spz-loader/core`と
それに依存する各種プラットフォーム向けのローダパッケージを提供します。 -->

spz-loader provides `@spz-loader/core`, which is a pure decoding facility using `nianticlabs/spz` converted to wasm by Emscripten, and loader packages for various platforms that depend on it.

### Features

- 🍱 decode .spz file into pure-JS Object
- 🧩 integration to 3D engines (Babylon.js/PlayCanvas)
- 🥪 divided into core functionality and other features
- ✨ wrapping official implementation through WebAssembly

### Limitations

- Spherical Harmonics (SH) is currently not supported

## Packages

| package                                       | version                                                                                        | description                                           |
| :-------------------------------------------- | :--------------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| [core](./packages/core/README.md)             | <img alt="NPM Version" src="https://img.shields.io/npm/v/%40spz-loader%2Fcore?logo=npm">       | core logics for decode .spz                           |
| [babylonjs](./packages/babylonjs/README.md)   | <img alt="NPM Version" src="https://img.shields.io/npm/v/%40spz-loader%2Fbabylonjs?logo=npm">  | integration for Babylon.js `GaussianSplattingMesh`    |
| [playcanvas](./packages/playcanvas/README.md) | <img alt="NPM Version" src="https://img.shields.io/npm/v/%40spz-loader%2Fplaycanvas?logo=npm"> | integration for PlayCanvas Engine and `GSplat` Entity |


## Install & Usage

### Example of Babylon.js

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

### Core package

Install like below.

```sh
# for npm
npm i @spz-loader/core

# for pnpm
pnpm add @spz-loader/core
```

Usage example of core package.

```ts
import { loadSpz } from "@spz-loader/core";

import spzUrl from "../assets/racoonfamily.spz?url";

const splat = await loadSpzFromUrl(spzUrl);
console.log(splat.numPoints);
```

## Developing spz-loader

### Environment

Project author's local environment is below.

- Windows 11 Home
- Node.js 20.18.1
- pnpm 9.14.2
- Docker Desktop
  - with VSCode dev container
- Emscripten 3.1.72 (on docker)

### Setup

Clone this repo and submodule

```sh
git clone https://github.com/drumath2237/spz-loader.git

git submodule update --init --recursive
```

Repository structure is below.
spz-loader is a monorepo project setup by pnpm-workspace.

```txt
/
├─ packages/
│    ├─ core/
│    │    └─ lib/
│    │         ├─ spz-wasm/
│    │         │    └─ spz/  <-- submodule
│    │         ├─ build.sh
│    │         └─ index.ts
│    ├─ babylonjs/
│    │    └─ lib/
│    │         └─ index.ts
│    └─ playcanvas/
│         └─ lib/
│              └─ index.ts
├─ package.json
├─ pnpm-lock.yaml
└─ pnpm-workspace.yaml
```

To install dependencies, you can run `pnpm install` on the root directory.

```sh
pnpm install
```

### Build packages

Run build script `build:all`.
This command does follow:

1. Build spz(C++) to WebAssembly by Emscripten on a Docker container
2. Build `@spz-loader/core` package by Vite library mode
3. Build `@spz-loader/babylonjs` package by Vite library mode

```sh
pnpm build:all
```

## Author

[@drumath2237](https://x.com/ninisan_drumath)