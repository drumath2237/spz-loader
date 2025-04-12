# @spz-loader/core

## About

core logics for decode .spz

## Usage

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
