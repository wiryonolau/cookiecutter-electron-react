import log from "electron-log/main";
import { app, BrowserWindow } from "electron";
import { appDir, browserWindows, createWindow } from "./window";
import { electronApp, optimizer } from "@electron-toolkit/utils";
import { startIpcService } from "./ipc";

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

        // Create Main Window
        createWindow("main", true);

        app.on("activate", () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow("main", true);
            }
        });
    });

    startIpcService(appDir, browserWindows);
}
