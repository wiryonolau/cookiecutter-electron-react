import { app, BrowserWindow } from "electron";
import { join, normalize } from "path";
import { startIpcService } from "./ipc";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";

const appDir = join(normalize(__dirname + "/../../"));

const createWindow = function () {
    const mainWindow = new BrowserWindow({
        width: 1360,
        height: 768,
        minWidth: 640,
        minHeight: 600,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === "linux" ? { icon } : {}),
        webPreferences: {
            contextIsolation: true,
            enablePreferredSizeMode: true,
            nodeIntegration: false,
            preload: join(__dirname, "../preload/index.js"),
            sandbox: false,
        },
    });

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
    });

    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
        mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    } else {
        mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    }

    startIpcService(appDir, mainWindow);
};

// Disable chrome gpu
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("disable-software-rasterizer");

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// Single Instace application
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.whenReady().then(() => {
        // Set app user model id for windows
        electronApp.setAppUserModelId("com.electron");

        app.on("browser-window-created", (_, window) => {
            optimizer.watchWindowShortcuts(window);
        });

        createWindow();

        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });
}
