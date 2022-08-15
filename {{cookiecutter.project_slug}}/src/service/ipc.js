const { ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const startIpcService = function (appDir, mainWindow) {
    ipcMain.on("toMain", (event, args) => {
        let result = {
            error: true,
        };

        switch (args.method) {
            case "getConfig":
                config_file = path.join(appDir, "config", "config.json");
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

module.exports = {
    startIpcService,
};
