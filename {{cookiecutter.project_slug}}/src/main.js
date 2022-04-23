const { ContainerBuilder, YamlFileLoader } = require('node-dependency-injection');
const { app, ipcMain, ipcRenderer, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

if (isDev) {
    require('electron-reloader')(module);

    app.setPath("appData", path.join(path.normalize(__dirname + "/../"), ".config"));

    const { default: installExtension, REACT_DEVELOPER_TOOLS }  = require('electron-devtools-installer');
    app.whenReady().then(() => {
        installExtension(REACT_DEVELOPER_TOOLS, {
            allowFileAccess: true
        });
    }).then((name) => {
        console.log(`Added Extension:  ${name}`);
    }).catch((err) => {
        console.log('An error occurred: ', err);
    });
}

const container = new ContainerBuilder();
const config_dir = path.join(path.normalize(__dirname + "/../"), "config");
const loader = new YamlFileLoader(container);
loader.load(path.join(config_dir, "service.yml"));

const createWindow = function() {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (isDev) {
      mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(
      isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

// Disable chrome gpu
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-software-rasterizer");

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      this.createWindow();
    }
});

ipcMain.on('service', (event, request) => {
  try {
    let cls = this.container.get(request.service);
    if(typeof cls[request.function] === "function") {
      // ...request.args same as *request.args in python
      let result = cls[request.function](...request.args);
      event.sender.send(request.channel, result);
    }
  } catch(e) {
    console.log(e);
  }
});
