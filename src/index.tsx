import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Button } from 'franklin-sites';

import App from './app/components/App';

import store from './app/state/store';

import { addMessage } from './messages/state/messagesActions';

import { MessageFormat, MessageLevel } from './messages/types/messagesTypes';

// Import this just for types, conditional import lower
import { SWConfig } from './service-worker/client';

if (!LIVE_RELOAD) {
  // eslint-disable-next-line no-console
  console.log(
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
  const config: SWConfig = {
    // UI to handle application update
    // See here for related documentation
    // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
    onWaiting: (acceptUpdate) => {
      store.dispatch(
        addMessage({
          id: 'new-version-website',
          content: (
            <>
              A newer version of this website is available.
              <br />
              <Button
                variant="secondary"
                className="tiny"
                onClick={acceptUpdate}
              >
                Use latest version
              </Button>
            </>
          ),
          format: MessageFormat.POP_UP,
          level: MessageLevel.INFO,
        })
      );
    },
  };

  import(
    /* webpackChunkName: "service-worker-client" */ './service-worker/client'
  ).then((serviceWorkerModule) => {
    serviceWorkerModule.register(config);
    // switch commented lines if we want to enable/disable service worker
    // Use in case of emergency! (if something wrong with caching in production)
    // serviceWorkerModule.unregister();
  });
}
