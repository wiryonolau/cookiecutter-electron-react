#!/usr/bin/env bash
git init
nodeenv --node=17.9.0 --prebuilt .env
source .env/bin/activate
npm install -g yarn
yarn install
