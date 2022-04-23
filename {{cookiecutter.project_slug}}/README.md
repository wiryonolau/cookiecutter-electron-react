# Install nodeenv
apt install nodeenv

# Create env folder in .env
# Ubuntu 18.04 cannot use node version 18
nodeenv --node=17.9.0 --prebuilt .env

# Install yarn
npm install -g yarn

# For development
yarn install --production=false

# Start app in development
# During development will use webserver port 3000
# Page will autoreload on file change
yarn start

# Create production package for windows and linux using docker
# Production doesn't use webserver
# file in dist folder
make build-dist
