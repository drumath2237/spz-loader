#!/bin/bash

if [ ! -d build ]; then
  mkdir build
fi

npm install -g typescript

em++ main.cpp \
  -Oz \
  --closure 1 \
  --llvm-lto 1 \
  -fno-exceptions \
  --std=c++17 \
  -lembind \
  --emit-tsd main.d.ts \
  -o ./build/main.mjs \
  -s USE_ZLIB=1 \
  -s WASM=1 \
  -s SINGLE_FILE=1 \
  -s MODULARIZE=1 \
  -s EXPORT_ES6=1 \
  -s EXPORT_NAME="spzwasm" \
  -s ALLOW_MEMORY_GROWTH \
  -s EXPORTED_FUNCTIONS="['_malloc', '_free']" \
  -s EXPORTED_RUNTIME_METHODS="['HEAPF32', 'HEAPU8']" 