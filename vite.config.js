import restart from 'vite-plugin-restart'
import { resolve } from 'node:path'

export default {
    root: 'src/', // Sources files (typically where index.html is)
    publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true, // Add sourcemap
        rollupOptions: {
            input: {
                main: resolve(import.meta.dirname, 'src/index.html'),
                version1: resolve(import.meta.dirname, 'src/version1.html'), //version1 is the name of the page, change it according to your need
            }
        }
    },
    plugins:
        [
            restart({ restart: ['../static/**',] }) // Restart server on static file change
        ],
}
