<p align="center">
  <h1 align="center">
    <span style="font-size:5rem">🦎</span><br/>
    spz-loader
  </h1>
</p>

<p align="center">
  <img src="https://github.com/drumath2237/spz-loader/actions/workflows/pr.yaml/badge.svg"/>
  <img src="https://github.com/drumath2237/spz-loader/actions/workflows/pr.yaml/badge.svg"/>
  <img src="https://github.com/drumath2237/spz-loader/actions/workflows/pr.yaml/badge.svg"/>
</p>

## About

spz-loaderは、3D Gaussian Splatting のファイルフォーマットの一種である.spzをロードするためのnpmパッケージ群です。
.spzフォーマットの詳細はNianticが公開している[ブログ記事](https://scaniverse.com/news/spz-gaussian-splat-open-source-file-format)や[GitHubリポジトリ](https://github.com/nianticlabs/spz)をご参照ください。

spz-loaderは`nianticlabs/spz`をEmscriptenによってwasm化し、それを用いた純粋なデコード機能を有する`@spz-loader/core`と
それに依存する各種プラットフォーム向けのローダパッケージを提供します。

## Install & Usage

### For Web3D Engines (example for Babylon.js)

Install like below. `@spz-loader/babylonjs` requires Babylon.js version 7 or later.

```sh
# for npm
npm i -D @babylonjs/core @spz-loader/babylonjs

# for pnpm
pnpm add -D @babylonjs/core @spz-loader/babylonjs
```

Code example of ESModule or TypeScript.


```ts
import "./style.css";

import { Engine, Scene } from "@babylonjs/core";
import { createGaussianSplattingFromSpz } from "@spz-loader/babylonjs";

// .spz file path/url
import spzPath from "../assets/hornedlizard.spz?url";

const engine = new Engine(renderCanvas);
const scene = new Scene(engine);

// ...

const spzBuffer = await fetch(spzPath).then((res) => res.arrayBuffer());
const splat = await createGaussianSplattingFromSpz(spzBuffer, scene);
```

### Core package

Install like below.

```sh
# for npm
npm i -D @spz-loader/core

# for pnpm
pnpm add -D @spz-loader/core
```

Usage example of core package.

```ts
import { loadSpz } from "@spz-loader/core";

import spzUrl from "../assets/racoonfamily.spz?url";

const spzBuffer = await fetch(spzUrl)
  .then((res) => res.arrayBuffer())
  .then((buf) => new Uint8Array(buf));

const splat = await loadSpz(spzBuffer);

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
│    └─ babylonjs/
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