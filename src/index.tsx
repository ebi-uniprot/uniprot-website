import ReactDOM from 'react-dom';

import App from './app/components/App';
import GlobalContext from './app/contexts/Global';

import * as logging from './shared/utils/logging';

if (!LIVE_RELOAD) {
  logging.debug(
    `Built with git commit ${GIT_COMMIT_HASH} ${
      GIT_COMMIT_STATE
        ? `with uncommitted changes:\n${GIT_COMMIT_STATE}`
        : '(clean)'
    }`
  );
}

ReactDOM.render(
  <GlobalContext>
    <App />
  </GlobalContext>,
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
