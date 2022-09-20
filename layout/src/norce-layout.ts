import singleSpaSvelte from 'single-spa-svelte';
import App from './App.svelte';

const svelteLifecycles = singleSpaSvelte({
  component: App,
  domElementGetter: () =>
    document.getElementById('single-spa-application:@norce/layout'),
  // props: { someData: 'data' }
});

const baseUrl = import.meta.env.BASE_URL;

const mountCss = () => {
  try {
    const css = document.createElement('link');
    css.id = 'single-spa-application:@norce/layout:css';
    css.rel = 'stylesheet';
    css.href = `${baseUrl}bundle.css`;
    document.head.appendChild(css);
  } catch (e) {
    console.error(e);
  }
};
const unmountCss = () => {
  try {
    const css = document.getElementById(
      'single-spa-application:@norce/layout:css'
    );
    if (css) {
      document.head.removeChild(css);
    }
  } catch (e) {
    console.error(e);
  }
};

export const bootstrap = svelteLifecycles.bootstrap;
export const mount = (...props) => {
  mountCss();
  return svelteLifecycles.mount(...props);
};
export const unmount = (...props) => {
  unmountCss();
  return svelteLifecycles.unmount(...props);
};
