/** @type {import('tailwindcss').Config} */
module.exports = {
  // Preflights are added as base styles in
  // the root container
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
