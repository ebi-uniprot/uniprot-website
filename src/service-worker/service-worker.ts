import {
  cleanupOutdatedCaches,
  precacheAndRoute,
  createHandlerBoundToURL,
} from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';

import * as patterns from './url-patterns';

declare const self: ServiceWorkerGlobalScope;

// Refer to https://developers.google.com/web/tools/workbox/reference-docs/latest/
// for documentation about this whole file's use of workbox

const MINUTE = 60; // seconds
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

// cleans caches that are not needed anymore
// see: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-precaching#.cleanupOutdatedCaches
cleanupOutdatedCaches();

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-core#.clientsClaim
    clientsClaim();
    self.skipWaiting();
  }
});

// eslint-disable-next-line no-underscore-dangle
precacheAndRoute(self.__WB_MANIFEST);
// this argument is the injection point for the webpack InjectManifest plugin,
// injecting a list of all necessary assets to precache.

// routing recipes
// ORDER MATTERS!
// see: https://developers.google.com/web/tools/workbox/guides/common-recipes

/* routes: */

// respond to all 'navigation' requests with this document (browsing)
registerRoute(
  new NavigationRoute(createHandlerBoundToURL(`${BASE_URL}index.html`))
);

// https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/A1L3X0?page_size=100&type=family
// external APIs - Stale While Revalidate
registerRoute(
  patterns.externalAPIs,
  new StaleWhileRevalidate({
    cacheName: 'external-APIs',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200, 204] }),
      new BroadcastUpdatePlugin({
        headersToCheck: [
          'InterPro-Version',
          'InterPro-Version-Minor',
          'Content-Length',
        ],
      }),
      new ExpirationPlugin({
        maxEntries: 500,
        maxAgeSeconds: 4 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// images - Cache First
registerRoute(
  patterns.sameOriginImagesAndFonts,
  new CacheFirst({
    cacheName: 'images-and-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 5 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// external images - Cache First
registerRoute(
  patterns.externalImages,
  new CacheFirst({
    cacheName: 'external-images',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 3 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// Google fonts stylesheets - Stale While Revalidate
registerRoute(
  patterns.googleFontsStylesheets,
  new StaleWhileRevalidate({ cacheName: 'google-fonts-stylesheets' })
);

// fonts - Cache First
registerRoute(
  patterns.googleFontsFiles,
  new CacheFirst({
    cacheName: 'google-fonts-files',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 3 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// stale while revalidate until we find a way to read and process the
// 'X-UniProt-Release' header and dump the cache when that changes
// UniProt API - Stale While Revalidate
registerRoute(
  patterns.uniprotAPIs,
  new StaleWhileRevalidate({
    cacheName: 'APIs',
    plugins: [
      new BroadcastUpdatePlugin({
        headersToCheck: [
          'X-UniProt-Release',
          'X-Release',
          // NOTE: "Content-Length" doesn't work for that now as it is
          // NOTE: inconsistently set by the server
          // 'Content-Length',
        ],
      }),
      new ExpirationPlugin({
        maxEntries: 750,
        maxAgeSeconds: 8 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);
