const {
  app,
  ipcMain,
  BrowserWindow
} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');

const appDir = path.join(path.normalize(__dirname + "/../"));



const createWindow = function() {
  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      enablePreferredSizeMode: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js")
    }
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(
    isDev ?
    "http://localhost:3000" :
    `file://${path.resolve(path.join(__dirname, "../build/index.html"))}`
  );
}

let mainWindow;

if (isDev) {
  require('electron-reloader')(module);

  app.setPath("appData", path.join(appDir, ".config"));

  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS
  } = require('electron-devtools-installer');
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

// Disable chrome gpu
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-software-rasterizer");

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("toMain", (event, args) => {
  let result = {
    "error": true
  };

  switch (args.method) {
    case "getConfig":
      config_file = path.join(appDir, "config", "config.json");
      fs.readFile(config_file, "utf8", (err, jsonString) => {
        if (err) {
          result = {
            "error": true,
            "message": err
          };
        }
        try {
          result = JSON.parse(jsonString);
        } catch (err) {
          result = {
            "error": true,
            "message": err.message
          };
        }
        mainWindow.webContents.send("fromMain", result);
      });
    default:
      mainWindow.webContents.send("fromMain", result);
  }
});
