const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { startIpcService } = require("./service/ipc");

const appDir = path.join(path.normalize(__dirname + "/../"));

let mainWindow;

const createWindow = function () {
    mainWindow = new BrowserWindow({
        width: 1360,
        height: 768,
        minWidth: 640,
        minHeight: 600,
        webPreferences: {
            enablePreferredSizeMode: true,
            nodeIntegration: false,
            preload: path.join(__dirname, "service", "preload.js"),
        },
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.resolve(
                  path.join(__dirname, "../build/index.html")
              )}`
    );

    startIpcService(appDir, mainWindow);
};

if (isDev) {
    require("electron-reloader")(module);

    app.setPath("appData", path.join(appDir, ".config"));

    const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
    } = require("electron-devtools-installer");
    app.whenReady()
        .then(() => {
            installExtension(REACT_DEVELOPER_TOOLS, {
                allowFileAccess: true,
            });
        })
        .then((name) => {
            console.log(`Added Extension:  ${name}`);
        })
        .catch((err) => {
            console.log("An error occurred: ", err);
        });
}

// Disable chrome gpu
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-software-rasterizer");

// Single Instace application
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.whenReady().then(createWindow);
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
