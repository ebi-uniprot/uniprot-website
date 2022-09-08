import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './app/components/App';
import GlobalContext from './app/contexts/Global';

if (!LIVE_RELOAD) {
  // eslint-disable-next-line no-console
  console.info(
    `Built with git commit ${GIT_COMMIT_HASH} ${
      GIT_COMMIT_STATE
        ? `with uncommitted changes:\n${GIT_COMMIT_STATE}`
        : '(clean)'
    }`
  );
}

ReactDOM.render(
  <StrictMode>
    <GlobalContext>
      <App />
    </GlobalContext>
  </StrictMode>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  import(
    /* webpackChunkName: "service-worker-client" */ './service-worker/client'
  ).then((serviceWorkerModule) => {
    serviceWorkerModule.register();
    // switch commented lines if we want to enable/disable service worker
    // Use in case of emergency! (if something wrong with caching in production)
    // serviceWorkerModule.unregister();
  });
}

/* Page tracking */
if (process.env.NODE_ENV !== 'development') {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const title = document.querySelector('title')!;

  let previousHref: null | string;

  // mutation observer callback
  const mutationObserver = () => {
    const currentHref = window.location.href;
    if (title.dataset.loaded && previousHref !== currentHref) {
      // try/catch for if gtag is not defined (tests/localhost/dev)
      try {
        gtag('config', 'UA-6228219-1', {
          page_location: currentHref,
          page_path: window.location.pathname,
          page_title: title.textContent,
          send_page_view: true,
        });
      } catch {
        /* */
      }
      previousHref = currentHref;
    }
  };
  // mutation observer, connect the observer callback
  const titleMutationObserver = new MutationObserver(mutationObserver);

  // start the observation of the title tag
  titleMutationObserver.observe(title, {
    childList: true,
    attributes: true,
    attributeFilter: ['data-loaded'],
  });
}
