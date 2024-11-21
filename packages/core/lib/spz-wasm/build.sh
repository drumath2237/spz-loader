#!/bin/bash
echo "aa"

if [ ! -d build ]; then
  mkdir build
fi

mkdir -p /.npm && chmod -R 777 /.npm

echo "bbb"

npm install -g typescript

echo "cc"

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