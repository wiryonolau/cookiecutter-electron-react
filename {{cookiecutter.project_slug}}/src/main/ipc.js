import fs from "fs";
import { ipcMain } from "electron";
import { join } from "path";

export const startIpcService = function (appDir, mainWindow) {
    ipcMain.on("toMain", (event, args) => {
        let result = {
            error: true,
        };

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

                    mainWindow.webContents.send(args.method, result);
                });
                break;
            default:
                mainWindow.webContents.send(args.method, result);
        }
    });
};
