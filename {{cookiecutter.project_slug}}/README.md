Install nodeenv
```bash
apt install nodeenv
```

Create env folder in .env
Ubuntu 18.04 cannot use node version 18
```bash
nodeenv --node=17.9.0 --prebuilt .env
```

Install yarn
```bash
npm install -g yarn
```

For development
```bash
yarn install --production=false
```

Start app in development
During development will use webserver port 3000
Page will autoreload on file change
```bash
yarn start
```

Create production package for windows and linux using docker
Note that Production doesn't use webserver
file in dist folder
```bash
make build-dist
```
