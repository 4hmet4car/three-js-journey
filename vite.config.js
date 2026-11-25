import reload from './dev/reload.js';

export default {
  root: 'src/', // Sources files (typically where index.html is)
  publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
  server: {
    open: true,
    host: true, // Open to local network and display URL
  },
  build: {
    outDir: '../dist', // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
  },
  plugins: [reload()],
};
