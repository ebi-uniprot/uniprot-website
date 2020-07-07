/* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }] */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './app/components/App';

import { store, persistor } from './app/state/store';

import { addMessage } from './messages/state/messagesActions';

import {
  CHANNEL_NAME,
  MessageTypes,
  SWMessage,
} from './service-worker/cross-env-constants';
import { MessageFormat, MessageLevel } from './messages/types/messagesTypes';

const LoadingView = () => <span>Loading ...</span>;

let dateRendered: number;

ReactDOM.render(
  <Provider store={store}>
    {process.env.NODE_ENV === 'development' ? (
      <App />
    ) : (
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <App />
      </PersistGate>
    )}
  </Provider>,
  document.getElementById('root'),
  () => {
    dateRendered = Date.now();
  }
);

const MAX_TIME_AUTO_RELOAD = 2 * 1000; // 2 seconds

import(
  /* webpackChunkName: "service-worker-client" */ './service-worker/client'
).then((serviceWorker) => {
  serviceWorker.register({
    onUpdate() {
      const updatedTime = Date.now() - dateRendered;
      if (updatedTime < MAX_TIME_AUTO_RELOAD) {
        window.location.reload();
      } else {
        store.dispatch(
          addMessage({
            id: 'new-version-website',
            content: (
              <>
                A newer version of this website is available.
                <br />
                <button
                  type="button"
                  className="button secondary tiny"
                  onClick={() => window.location.reload()}
                >
                  Refresh page
                </button>
              </>
            ),
            format: MessageFormat.POP_UP,
            level: MessageLevel.INFO,
          })
        );
      }
    },
  });
  // switch commented line if we want to enable/disable service worker
  // if that implies a change from what is currently deployed ( -> if an issue)
  // serviceWorker.unregister();

  interface CustomMessageEvent<T> extends MessageEvent {
    data: T;
  }

  const channel = new BroadcastChannel(CHANNEL_NAME);
  channel.addEventListener(
    'message',
    (message: CustomMessageEvent<SWMessage>) => {
      if (message.data.type === MessageTypes.UPDATED_DATA) {
        store.dispatch(
          addMessage({
            id: 'new-version-data',
            content: (
              <>
                A newer version of the data on this page is available.
                <br />
                <button
                  type="button"
                  className="button secondary tiny"
                  onClick={() => window.location.reload()}
                >
                  Refresh page
                </button>
              </>
            ),
            format: MessageFormat.POP_UP,
            level: MessageLevel.INFO,
          })
        );
      }
    }
  );
});
