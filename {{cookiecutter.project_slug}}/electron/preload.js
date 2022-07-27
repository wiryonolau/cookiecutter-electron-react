const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: ((channel, data) => {
            ipcRenderer.send(channel, data);
        }),
        once: ((channel, func) => {
            ipcRenderer.once(channel, (event, ...args) => func(...args));
        }),
        on: ((channel, func) => {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        })
    }
);
