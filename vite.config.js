import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import fs from 'fs';

// Read build number with error handling
let buildNumber;
try {
  buildNumber = JSON.parse(fs.readFileSync('./build-number.json', 'utf-8'));
} catch (error) {
  console.warn('build-number.json not found, using default build number 1');
  buildNumber = { build: 1 };
}

// Custom plugin to handle .ged files as raw text
function gedcomLoader() {
  return {
    name: 'gedcom-loader',
    transform(src, id) {
      if (id.endsWith('.ged') || id.includes('.ged?')) {
        return {
          code: `export default ${JSON.stringify(src)};`,
          map: null,
        };
      }
      return null;
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
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
          { src: 'public/_headers', dest: '' },
        ],
      }),
    ],
    define: {
      __BUILD_NUMBER__: JSON.stringify(buildNumber.build),
      // Expose passcode to client (auth check runs in browser)
      'import.meta.env.VITE_PASSCODE': JSON.stringify(env.VITE_PASSCODE || ''),
      // Expose auth enabled flag to client
      'import.meta.env.ENABLE_CLIENT_SIDE_AUTH': JSON.stringify(env.ENABLE_CLIENT_SIDE_AUTH || 'false'),
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
        },
      },
    },
  };
});
