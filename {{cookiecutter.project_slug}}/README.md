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
yarn start
```

Create production package for windows and linux using docker
Note that Production doesn't use webserver
file in dist folder
```bash
source .env/bin/activate
make build-dist
```
