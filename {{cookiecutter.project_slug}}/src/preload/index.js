import { contextBridge, ipcRenderer } from "electron";

// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
    send: async (channel, data) => {
        await ipcRenderer.send(channel, data);
    },
    once: async (channel, func) => {
        await ipcRenderer.once(channel, (event, ...args) => func(...args));
    },
    on: async (channel, func) => {
        await ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
});
