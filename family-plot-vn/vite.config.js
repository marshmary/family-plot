import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import fs from 'fs';

// Read build number
const buildNumber = JSON.parse(fs.readFileSync('./build-number.json', 'utf-8'));

// Custom plugin to handle .ged files as raw text
function gedcomLoader() {
  return {
    name: 'gedcom-loader',
    transform(src, id) {
      if (id.endsWith('.ged')) {
        return {
          code: `export default ${JSON.stringify(src)};`,
          map: null,
        };
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    gedcomLoader(),
    viteStaticCopy({
      targets: [
        { src: 'src/manifest.json', dest: '' },
        { src: 'src/service-worker.js', dest: '' },
        { src: 'src/img/icon-192.png', dest: '' },
        { src: 'src/img/icon-512.png', dest: '' },
        { src: 'src/img/favicon.svg', dest: '' },
        { src: 'public/gedcom/*.ged', dest: 'gedcom' },
      ],
    }),
  ],
  define: {
    __BUILD_NUMBER__: JSON.stringify(buildNumber.build),
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
