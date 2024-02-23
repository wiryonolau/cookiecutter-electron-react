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
            bytecodePlugin({
                chunkAlias: "credential",
            }),
        ],
        build: {
            rollupOptions: {
                output: {
                    manualChunks: (id) => {
                        if (id.includes("credential")) {
                            return "credential";
                        }
                    },
                },
            },
        },
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
