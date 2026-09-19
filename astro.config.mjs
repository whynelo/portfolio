// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

/** Lets the Cursor preview proxy load the dev server (cross-site / no-cors). */
const allowPreviewProxy = {
  name: 'allow-preview-proxy',
  enforce: 'pre',
  /**
   * @param {import('vite').ViteDevServer} server
   */
  configureServer(server) {
    /**
     * @param {import('node:http').IncomingMessage} req
     * @param {import('node:http').ServerResponse} _res
     * @param {() => void} next
     */
    const strip = (req, _res, next) => {
      delete req.headers['sec-fetch-site'];
      next();
    };
    // Post-hook + next tick: Astro unshifts secFetch in its own post-hook.
    return () => {
      setImmediate(() => {
        server.middlewares.stack.unshift({ route: '', handle: strip });
      });
    };
  },
};

export default defineConfig({
  trailingSlash: 'never',
  output: 'static',

  server: {
    port: 4388,
    host: '127.0.0.1',
  },

  security: {
    allowedDomains: [{}],
  },

  vite: {
    plugins: [tailwindcss(), allowPreviewProxy],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },

  integrations: [react()],
});