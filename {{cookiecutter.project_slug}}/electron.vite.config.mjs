import { resolve } from "path";
import {
    bytecodePlugin,
    defineConfig,
    externalizeDepsPlugin,
} from "electron-vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    main: {
        plugins: [
            externalizeDepsPlugin(),
            bytecodePlugin({ protectedStrings: ["password"] }),
        ],
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
    },
    renderer: {
        resolve: {
            alias: {
                "@renderer": resolve("src/renderer/src"),
            },
        },
        plugins: [react()],
    },
});
