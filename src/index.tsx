import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from './app/components/App';

import store from './app/state/store';

import * as logging from './shared/utils/logging';

if (!LIVE_RELOAD) {
  logging.debug(
    `Built with git commit ${GIT_COMMIT_HASH.trim()} ${
      GIT_COMMIT_STATE
        ? `with uncommitted changes:\n${GIT_COMMIT_STATE}`
        : '(clean)'
    }`
  );
}

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
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
