import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig(({ command }) => ({
    plugins: [react()],
    clearScreen: false,
    // tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
    },
    define: command === "serve" ? { IS_DEVELOPMENT: true } : {},
    envPrefix: ["VITE_", "TAURI_"],
    build: {
        // Tauri supports es2021
        target: ["es2021", "chrome100", "safari13"],
        // don't minify for debug builds
        minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
        sourcemap: !!process.env.TAURI_DEBUG,
    },
}))
