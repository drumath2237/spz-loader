#!/bin/bash

if [ ! -d build ]; then
  mkdir build
fi

npm install -g typescript

em++ main.cpp \
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
 -s EXPORTED_FUNCTIONS="['_malloc', '_free']"