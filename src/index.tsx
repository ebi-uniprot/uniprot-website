/* eslint-disable camelcase */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/components/App';
import GlobalContext from './app/contexts/Global';

// eslint-disable-next-line no-console
console.info(
  `Built with git commit ${GIT_COMMIT_HASH} ${
    GIT_COMMIT_STATE
      ? `with uncommitted changes:\n${GIT_COMMIT_STATE}`
      : '(clean)'
  } on ${GIT_BRANCH} branch`
);

const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render(
  <StrictMode>
    <GlobalContext>
      <App />
    </GlobalContext>
  </StrictMode>
);

// These obsolete hosts have been routed to the uniprot.org front-end so that
// the user's cache can be cleared
const obsoleteHosts = new Set(['beta.uniprot.org', 'covid-19.uniprot.org']);

if (
  typeof navigator !== 'undefined' &&
  'serviceWorker' in navigator &&
  navigator.serviceWorker
) {
  import(
    /* webpackChunkName: "service-worker-client" */ './service-worker/client'
  ).then((serviceWorkerModule) => {
    if (obsoleteHosts.has(window.location.host)) {
      serviceWorkerModule.unregister().finally(() => {
        location.replace('https://www.uniprot.org');
      });
    } else {
      serviceWorkerModule.register();
      // switch commented lines if we want to enable/disable service worker
      // Use in case of emergency! (if something wrong with caching in production)
      // serviceWorkerModule.unregister();
    }
  });
} else if (obsoleteHosts.has(window.location.host)) {
  location.replace('https://www.uniprot.org');
}

/* Page tracking */
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'development') {
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

  if (typeof window.hj === 'function') {
    window.hj('identify', null, {
      Bundle: MODERN_BUNDLE ? 'modern' : 'legacy',
    });
  }
}
