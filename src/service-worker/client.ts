import { Workbox } from 'workbox-window';

import * as logging from '../shared/utils/logging';

import { needsReload } from './reload-flag';

import { CacheName } from './shared-types';

// No need to test if serviceWorker is supported, we tested that before loading
// this chunk so we are sure it exists by now

// See format reference here https://developers.google.com/web/tools/workbox/modules/workbox-broadcast-update#message_format
type UpdatePayload = {
  cacheName: string;
  updatedURL: string;
};

const ONE_DAY = 1000 * 60 * 60 * 24;

export async function register() {
  if (LIVE_RELOAD) {
    return;
  }

  const workbox = new Workbox(`${BASE_URL}service-worker.js`);

  // Data cache management
  workbox.addEventListener('message', async ({ data }) => {
    if (!(data && data.meta === 'workbox-broadcast-update')) {
      return;
    }
    // Now, we're sure it's a message from 'workbox-broadcast-update' library
    const { cacheName, updatedURL } = data.payload as UpdatePayload;
    logging.log(
      `An update to "${updatedURL}" caused the whole "${cacheName}" cache to be dropped`
    );
    if (cacheName === CacheName.WebsiteAPI) {
      // drop the quickGO cache whenever we drop the website API cache
      // it should happen on UniProt data update
      await caches.delete(CacheName.QuickGO);
      // drop the static endpoints of the website API too for good measure
      await caches.delete(CacheName.WebsiteAPIStatic);
      window.location.reload();
    }
    await caches.delete(cacheName);
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

  try {
    workbox.register();

    // Try to updat the service worker at least once a day
    setInterval(() => {
      workbox.update();
    }, ONE_DAY);
  } catch {
    // Might fail, it's fine, it's progressive enhancement
    // e.g. in Firefox private browsing: "The operation is insecure"
  }
}

// will remove any existing service worker.
// Might be needed if an issue is detected after deployement.
export async function unregister() {
  if (LIVE_RELOAD) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
  } catch {
    /* */
  }
}
