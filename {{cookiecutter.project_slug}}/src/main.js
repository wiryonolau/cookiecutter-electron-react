const { app, ipcMain, ipcRenderer, BrowserWindow } = require('electron');
const path = require('path');

const isDev = require('electron-is-dev');

try {
    if (isDev) {
        require('electron-reloader')(module);
    }
} catch {
}

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

