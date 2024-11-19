#!/bin/bash

if [ ! -d build ]; then
  mkdir build
fi

em++ main.cpp \
 --std=c++17 \
 -lembind \
 -o ./build/main.mjs \
 -s USE_ZLIB=1 \
 -s WASM=1 \
 -s MODULARIZE=1 \
 -s EXPORT_ES6=1 \
 -s ALLOW_MEMORY_GROWTH \
 -s EXPORTED_FUNCTIONS="['_malloc', '_free']"