#!/usr/bin/env bash
git init
nodeenv --node='{{ cookiecutter.node_version | default(18.12.0) }}' --prebuilt .env
source .env/bin/activate
npm install -g yarn
yarn install
