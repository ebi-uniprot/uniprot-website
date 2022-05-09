import {
  cleanupOutdatedCaches,
  precacheAndRoute,
  createHandlerBoundToURL,
} from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { registerRoute, NavigationRoute, Route } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';

import { CacheName } from './shared-types';

declare const self: ServiceWorkerGlobalScope;

// Refer to https://developers.google.com/web/tools/workbox/reference-docs/latest/
// for documentation about this whole file's use of workbox

const MINUTE = 60; // seconds
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const YEAR = 365 * DAY;

// cleans caches that are not needed anymore
// see: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-precaching#.cleanupOutdatedCaches
cleanupOutdatedCaches();

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
// Whenever we skip waiting, we want to claim all the open tabs
// https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-core#.clientsClaim
clientsClaim();

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
  new NavigationRoute(createHandlerBoundToURL(`${BASE_URL}index.html`), {
    // Let the request fall through to the server that will handle either
    // serving or redirecting. This is only triggered for "navigation" requests.
    denylist: [
      /^\/sitemap/,
      /\?format=/,
      /.+\/.+\.(fasta|gff|json|list|obo|rdf|tab|tsv|ttl|txt|xlsx|xml)$/i,
    ],
  })
);

// https://www.ebi.ac.uk/interpro/api/entry/interpro/protein/uniprot/A1L3X0?page_size=100&type=family
// external APIs - Stale While Revalidate
registerRoute(
  new Route(
    ({ url, request }) => {
      if (request.destination) {
        // If we have a destination, it's not XHR or fetch
        return false;
      }
      if (
        url.origin === 'https://api.geneontology.org' ||
        url.origin === 'https://api.rhea-db.org' ||
        url.origin === 'https://alphafold.ebi.ac.uk' ||
        url.origin === 'https://community.uniprot.org'
      ) {
        return true;
      }
      if (
        url.origin === 'https://www.ebi.ac.uk' &&
        (url.pathname.includes('interpro/') || url.pathname.includes('pdbe/'))
      ) {
        return true;
      }
      return false;
    },
    new StaleWhileRevalidate({
      cacheName: CacheName.ExternalAPIs,
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
  )
);

// external images - Cache First
registerRoute(
  new Route(
    ({ request, url }) =>
      request.destination === 'font' ||
      request.destination === 'image' ||
      // versioned scripts served from unpkg
      (request.destination === 'script' &&
        url.origin === 'https://unpkg.com' &&
        /@\d/.test(url.pathname)) ||
      // those are images, even if downloaded through XHR
      url.origin === 'https://www.swissbiopics.org',
    new CacheFirst({
      cacheName: CacheName.ImagesFontsAndScripts,
      plugins: [
        new CacheableResponsePlugin({ statuses: [0, 200] }),
        new ExpirationPlugin({
          maxEntries: 150,
          maxAgeSeconds: 5 * WEEK,
          purgeOnQuotaError: true,
        }),
      ],
    })
  )
);

// Google fonts stylesheets - Stale While Revalidate
registerRoute(
  new Route(
    ({ url }) => url.origin === 'https://fonts.googleapis.com',
    new StaleWhileRevalidate({ cacheName: CacheName.GoogleFontsStylesheets })
  )
);

// QuickGO - Cache First
registerRoute(
  new Route(
    ({ url }) =>
      url.origin === 'https://www.ebi.ac.uk' &&
      url.pathname.includes('QuickGO/'),
    new CacheFirst({
      cacheName: CacheName.QuickGO,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 750,
          maxAgeSeconds: 1 * YEAR,
          purgeOnQuotaError: true,
        }),
      ],
    })
  )
);

// UniProt proteins API - Stale While Revalidate
registerRoute(
  new Route(
    ({ url }) =>
      url.origin === 'https://www.ebi.ac.uk' &&
      url.pathname.includes('proteins/api/'),
    new StaleWhileRevalidate({
      cacheName: CacheName.ProteinsAPI,
      plugins: [
        new BroadcastUpdatePlugin(),
        new ExpirationPlugin({
          maxEntries: 750,
          maxAgeSeconds: 8 * WEEK,
          purgeOnQuotaError: true,
        }),
      ],
    })
  )
);

// UniProt website API - Cache First
registerRoute(
  new Route(
    ({ url }) =>
      url.origin === 'https://rest.uniprot.org' &&
      url.pathname.includes('configure'),
    new CacheFirst({
      cacheName: CacheName.WebsiteAPIStatic,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 1 * DAY,
          purgeOnQuotaError: true,
        }),
      ],
    })
  )
);

// stale while revalidate until we find a way to read and process the
// 'x-release-date' header and dump the cache when that changes
// UniProt website API - Stale While Revalidate
registerRoute(
  new Route(
    ({ url }) =>
      url.origin === 'https://rest.uniprot.org' &&
      !url.pathname.includes('/contact/'),
    new StaleWhileRevalidate({
      cacheName: CacheName.WebsiteAPI,
      plugins: [
        new BroadcastUpdatePlugin({
          headersToCheck: [
            'x-release-date',
            'x-release-number',
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
  )
);
