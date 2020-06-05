/* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }] */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from './app/components/App';
import { store, persistor } from './app/state/store';

const LoadingView = () => <span>Loading ...</span>;

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
  document.getElementById('root')
);

import(
  /* webpackChunkName: "service-worker-client" */ './service-worker/client'
).then((serviceWorker) => {
  serviceWorker.register();
  // switch commented line if we want to enable/disable service worker
  // if that implies a change from what is currently deployed ( -> if an issue)
  // serviceWorker.unregister();
});
