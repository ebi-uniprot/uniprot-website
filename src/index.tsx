import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Button } from 'franklin-sites';

import App from './app/components/App';

import store from './app/state/store';

import { addMessage } from './messages/state/messagesActions';

import { MessageFormat, MessageLevel } from './messages/types/messagesTypes';

// Import this just for types, conditional import lower
import { SWConfig } from './service-worker/client';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
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
