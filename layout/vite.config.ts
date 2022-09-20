import commonjs from '@rollup/plugin-commonjs';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import * as cp from 'child_process';
import css from 'rollup-plugin-css-only';
import livereload from 'rollup-plugin-livereload';
import { defineConfig, Plugin } from 'vite';

const production = !process.env.VITE_WATCH;

function serve(): Plugin {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    name: 'server',
    writeBundle() {
      if (server) return;
      server = cp.spawn('pnpm', ['start'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  // This is used to mount / unmount css
  base: !production
    ? 'http://localhost:4173/'
    : 'TODO: Set production base url',
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production,
      },
      // Preserve the original source code
      // which adds the scoped css to head
      // needed for css to be shared between apps
      emitCss: false,
    }),
    css({ output: 'bundle.css' }),
  ],
  resolve: {
    dedupe: ['svelte'],
  },
  build: {
    // bundle.css will be removed on changes otherwise
    emptyOutDir: false,
    watch: !production
      ? {
          include: ['src/**', '*.js', '*.ts'],
        }
      : undefined,
    rollupOptions: {
      input: './src/norce-layout.ts',
      preserveEntrySignatures: 'strict',
      output: {
        entryFileNames: '[name].js',
        sourcemap: true,
        format: 'systemjs',
        name: null, // ensure anonymous System.register
        dir: 'dist',
        // file: 'norce-layout.js',
      },
      plugins: [
        commonjs(),
        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),
        !production && livereload('dist'),
      ],
    },
  },
});
