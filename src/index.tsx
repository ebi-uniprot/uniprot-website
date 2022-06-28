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
    if (globalThis.location.origin.includes('beta')) {
      serviceWorkerModule.register();
    } else {
      // switch commented lines if we want to enable/disable service worker
      // Use in case of emergency! (if something wrong with caching in production)
      serviceWorkerModule.unregister();
    }
  });
}
