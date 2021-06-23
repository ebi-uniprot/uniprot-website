import { Workbox } from 'workbox-window';

import { needsReload } from './reload-flag';

// No need to test if serviceWorker is supported, we tested that before loading
// this chunk so we are sure it exists by now

// See format reference here https://developers.google.com/web/tools/workbox/modules/workbox-broadcast-update#message_format
type UpdatePayload = {
  cacheName: string;
  updatedURL: string;
};

// helper function to drop all entries of a specific cache
const dropCache = async (cacheName: string) => {
  const cache = await caches.open(cacheName);
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => cache.delete(key)));
};

export function register() {
  if (LIVE_RELOAD) {
    return;
  }

  const workbox = new Workbox(`${BASE_URL}service-worker.js`);

  // Data cache management
  workbox.addEventListener('message', ({ data }) => {
    if (
      !(
        data &&
        data.type === 'CACHE_UPDATED' &&
        data.meta === 'workbox-broadcast-update'
      )
    ) {
      return;
    }
    // Now, we're sure it's a message from 'workbox-broadcast-update' library
    const { cacheName, updatedURL } = data.payload as UpdatePayload;
    // eslint-disable-next-line no-console
    console.log(
      `An update to "${updatedURL}" caused the whole "${cacheName}" cache to be dropped`
    );
    dropCache(cacheName);
  });

  // Helper function, when the new SW is controlling, set a flag saying to the
  // app that a full reload is needed whenever it sees fit
  const skipWaiting = () => {
    workbox.addEventListener('controlling', () => {
      needsReload.current = true;
    });

    workbox.messageSkipWaiting();
  };

  // See here for related documentation
  // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
  workbox.addEventListener('waiting', () => {
    skipWaiting();
  });

  workbox.register();
}

// will remove any existing service worker.
// Might be needed if an issue is detected after deployement.
export function unregister() {
  if (LIVE_RELOAD) {
    return;
  }
  navigator.serviceWorker.ready
    .then((registration) => {
      registration.unregister();
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
}
