import fs from "fs";
import { ipcMain } from "electron";
import { join } from "path";
import log from "electron-log/main";
import { createWindow } from "./window";

export const startIpcService = function (appDir, browserWindows) {
    ipcMain.on("toMain", (event, args) => {
        let result = {
            error: true,
        };

        // Find sender
        let sender = Object.entries(browserWindows).filter(
            ([key, value]) => value.id === event.sender.id
        )[0][1];

        switch (args.method) {
            case "getConfig":
                let config_file = join(appDir, "/resources/config.json");
                fs.readFile(config_file, "utf8", (err, jsonString) => {
                    if (err) {
                        result = {
                            error: true,
                            message: err,
                        };
                    }
                    try {
                        result = JSON.parse(jsonString);
                    } catch (err) {
                        result = {
                            error: true,
                            message: err.message,
                        };
                    }

                    sender.webContents.send(args.method, result);
                });
                break;
            case "createNewWindow":
                // Create secondary window
                createWindow("secondary");
                break;
            default:
                sender.webContents.send(args.method, result);
        }
    });
};
