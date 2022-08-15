## Prerequisites

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

Parcel will monitor whole folder including node_modules, increase inotify size if neccessary

```bash
# edit /etc/systctl.d/99-inotify.conf
fs.inotify.max_queued_events = 32768
fs.inotify.max_user_instances = 256
fs.inotify.max_user_watches = 16384

# refresh systctl
sudo systctl --system
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
electron -> src/main.js -> public/index.html -> src/app.js
```

## Directory Structure

Electron is split between front end and back end part.
Back end is a nodejs application, importing dependency using require keyword
Front end is a web application, importing dependency using import keyword
Communication between front end to back end and vice versa is accommodate by ipc communication

File can be convert to a folder when necessarily to split complex function
e.g src/model.js can split further to src/model/user.js

| File / Directory            | Description                                                   | Frontend | Backend |
| --------------------------- | ------------------------------------------------------------- | -------- | ------- |
| public/index.css            | Front end css file                                            | TRUE     | FALSE   |
| public/index.html           | Front end entry point                                         | TRUE     | FALSE   |
| resource/                   | Resource folder for font, icon, etc                           | TRUE     | TRUE    |
| src/component               | Reusable React component                                      | TRUE     | FALSE   |
| src/component/navigation.js | React Application navigation                                  | TRUE     | FALSE   |
| src/page                    | Application Page e.g LoginPage, UserPage                      | TRUE     | FALSE   |
| src/provider                | React Context Provider                                        | TRUE     | FALSE   |
| src/service                 | Nodejs Service e.g ipcMain, file access, database access, etc | FALSE    | TRUE    |
| src/app.js                  | React Front end entry point                                   | TRUE     | FALSE   |
| src/context.js              | React Context variable                                        | TRUE     | FALSE   |
| src/helper.js               | Helper function                                               | TRUE     | FALSE   |
| src/hooks.js                | React Custom Hooks such as useQuery                           | TRUE     | FALSE   |
| src/index.js                | ReactDOM entry point                                          | TRUE     | FALSE   |
| src/main.js                 | Application entry point                                       | FALSE    | TRUE    |
| src/model.js                | Javascript Object Model                                       | TRUE     | FALSE   |
| src/reducer.js              | React Reducer                                                 | TRUE     | FALSE   |
| src/router.js               | React Application Router path                                 | TRUE     | FALSE   |
