#!/bin/bash -eu

function clean() {
    rm -rf './dist'
    rm -rf './types'

    mkdir './dist'
    mkdir './types'
}

function build() {
    clean && $(npm bin)/webpack || true
    cp -R "./src/types" "./types/types"
    echo "import '../src/types'" >> './types/index.d.ts'
}

function development_build() {
    export NODE_ENV=development
    yarn install --production=false
    build
}

function production_build() {
    rm -rf './node_modules'
    export NODE_ENV=production
    yarn install --production=false
    rm -rf './node_modules/vue'
    build
}

function dev() {
    clean && $(npm bin)/webpack && node dist/main.bundle.js
}

function build_typedoc() {
    typedoc --name "$1" --mode 'file' --out './document/typedoc' './src'
}

if [ -z ${2+UNDEF} ]; then
    $1
else
    $1 $2
fi
