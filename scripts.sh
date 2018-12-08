#!/bin/bash -eu

function clean() {
    $(npm bin)/rimraf './dist/*'
}

function build() {
    clean && $(npm bin)/webpack || true
    echo "import '../src/types'" >> './types/index.d.ts'
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
