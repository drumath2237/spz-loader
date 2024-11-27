# spz-loader

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

## APIs

### Core

#### type `GaussianCloud`

Data type of Gaussian Splatting.

| field       | type           | detail                                                          |
| :---------- | :------------- | :-------------------------------------------------------------- |
| numPoints   | `number`       | number of gaussian                                              |
| shDegree    | `number`       | number of Sperical Harmonics degree                             |
| antialiased | `boolean`      | is antialias enable                                             |
| positions   | `Float32Array` | gaussian positions(length: numPoints x3)                        |
| scales      | `Float32Array` | gaussian scales(length: numPoints x3)                           |
| rotations   | `Float32Array` | gaussian rotations for quaternion(len: numPoints x4)            |
| alphas      | `Float32Array` | gaussian alphas ranged 0-1 (length: numPoints x1)               |
| colors      | `Float32Array` | gaussian colors ranged 0-1 (length: numPoints x3)               |
| sh          | `Float32Array` | gaussian's spherical harmonics(**!!now, it's not supported!!**) |

```ts
type GaussianCloud = {
  numPoints: number;
  shDegree: number;
  antialiased: boolean;
  positions: Float32Array;
  scales: Float32Array;
  rotations: Float32Array;
  alphas: Float32Array;
  colors: Float32Array;
  sh: Float32Array;
}
```

#### function: `loadSpz`

Load .spz file and decode it to Gaussian Cloud.

| args    | type              | detail             |
| :------ | :---------------- | :----------------- |
| spzData | `Uint8Array`      | buffer of spz file |
| options | `ILoadSpzOptions` | load options       |

| return type     | detail                          |
| :-------------- | :------------------------------ |
| `GaussianCloud` | decoded Gaussian Splatting data |

```ts
const loadSpz: (spzData: Uint8Array, options?: ILoadSpzOptions)=> Promise<GaussianCloud>;
```

#### interface: `ILoadSpzOptions`

| field            | type     | detail                                        |
| :--------------- | :------- | :-------------------------------------------- |
| colorScaleFactor | `number` | color scale for representing gaussian's color |

```ts
interface ILoadSpzOptions {
  colorScaleFactor?: number;
}
```

### Babylon.js

#### function: `createGaussianSplattingFromSpz`

Load spz file and create Gaussian Splatting object into Babylon.js scene.

| args    | type                      | detail                   |
| :------ | :------------------------ | :----------------------- |
| data    | `ArrayBuffer`             | buffer of spz file       |
| scene   | `Scene`                   | Babylon.js' scene object |
| options | `ICreateGSFromSpzOptions` | load options             |

| return type             | detail                                     |
| :---------------------- | :----------------------------------------- |
| `GaussianSplattingMesh` | Babylon.js' Gaussian Splatting mesh object |

```ts
createGaussianSplattingFromSpz: (data: ArrayBuffer, scene: Scene, options?: ICreateGSFromSpzOptions) => Promise<GaussianSplattingMesh>;
```

#### interface: `ICreateGSFromSpzOptions`

| field            | type      | detail                                        |
| :--------------- | :-------- | :-------------------------------------------- |
| colorScaleFactor | `number`  | color scale for representing gaussian's color |
| name             | `string`  | Gaussian Splatting Mesh objects's name        |
| keepInRam        | `boolean` | keep datas in ram for editing purpose         |

```ts
interface ICreateGSFromSpzOptions {
  colorScaleFactor?: number;
  name?: string;
  keepInRam?: boolean;
}
```

## Developing spz-loader