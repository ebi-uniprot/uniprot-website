import {
  cleanupOutdatedCaches,
  precacheAndRoute,
  createHandlerBoundToURL,
} from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

import { NewerDataPlugin } from './plugins/check-version';

import * as patterns from './url-patterns';
import { CHANNEL_NAME } from './cross-env-constants';

// Refer to https://developers.google.com/web/tools/workbox/reference-docs/latest/
// for documentation about this whole file's use of workbox

const MINUTE = 60; // seconds
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const channel = new BroadcastChannel(CHANNEL_NAME);

// cleans caches that are not needed anymore
// see: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-precaching#.cleanupOutdatedCaches
cleanupOutdatedCaches();

// eslint-disable-next-line
// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST); // eslint-disable-line
// 'self.__WB_MANIFEST' is the injection point for the webpack InjectManifest
// plugin, injecting a list of all necessary assets to precache.

// routing recipes
// ORDER MATTERS!
// see: https://developers.google.com/web/tools/workbox/guides/common-recipes

/* routes: */

declare const BASE_URL: string;
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
      new NewerDataPlugin({
        channel,
        headers: [
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
  patterns.googleFontsStylesheets,
  new CacheFirst({
    cacheName: 'fonts',
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
      new NewerDataPlugin({
        channel,
        headers: ['X-UniProt-Release', 'X-Release', 'Content-Length'],
      }),
      new ExpirationPlugin({
        maxEntries: 750,
        maxAgeSeconds: 8 * WEEK,
        purgeOnQuotaError: true,
      }),
    ],
  })
);
