## Prerequisites

Install nodeenv

```bash
apt install nodeenv
```

Create env folder in .env
Ubuntu 18.04 cannot use node version 18

```bash
nodeenv --node=18.12.0 --prebuilt .env
```

Install yarn

```bash
source .env/bin/activate
npm install -g yarn
```

For development

```bash
source .env/bin/activate
yarn install --production=false
```

Start app in development
During development will use webserver port 3000
Page will autoreload on file change

```bash
source .env/bin/activate
yarn dev
```

## Packaging

Create production package for windows and linux using docker
Note that Production doesn't use webserver
file in dist folder

```bash
source .env/bin/activate
make build-dist
```

## Application Entry point

```bash
electron -> src/main/index.js -> src/renderer/index.html -> src/renderer/src/app.js
```
## Directory Structure

Electron is split between front end (renderer) and back end part (main and preload).
Communication between front end to back end and vice versa is accommodate by ipc communication

File can be convert to a folder when necessarily to split complex function
e.g src/model.js can split further to src/model/user.js

This are default folder for public resource, renderer can only access renderer public folder

{root}/resources
{root}/renderer/public 