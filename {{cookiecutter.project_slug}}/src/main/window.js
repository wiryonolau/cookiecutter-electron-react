import icon from "../../resources/icon.png?asset";
import log from "electron-log/main";
import { BrowserWindow } from "electron";
import { is } from "@electron-toolkit/utils";
import { join, normalize } from "path";

export const appDir = join(normalize(__dirname + "/../../"));

export const browserWindows = {};

export const createWindow = function (name, mainWindow = false) {
    if (browserWindows[name]) {
        return;
    }

    browserWindows[name] = new BrowserWindow({
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

    browserWindows[name].on("ready-to-show", () => {
        browserWindows[name].show();
    });

    browserWindows[name].webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
    });

    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
        browserWindows[name].loadURL(process.env["ELECTRON_RENDERER_URL"]);
    } else {
        browserWindows[name].loadFile(
            join(__dirname, "../renderer/index.html")
        );
    }

    browserWindows[name].on("close", () => {
        if (mainWindow) {
            Object.keys(browserWindows).map((n) => {
                if (n !== name) {
                    browserWindows[n].destroy();
                    delete browserWindows[n];
                }
            });
        }
    });
};
