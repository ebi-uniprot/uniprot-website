// See https://developers.google.com/web/tools/workbox/guides/using-plugins#custom_plugins
import { WorkboxPlugin, CacheDidUpdateCallback } from 'workbox-core';

import { MessageTypes, Reasons, SWMessage } from '../cross-env-constants';

// helper function to drop all entries of a specific cache
const drop = async (cacheName: string) => {
  const cache = await caches.open(cacheName);
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => cache.delete(key)));
};

type ConstructorProps = {
  channel: BroadcastChannel;
  headers?: Iterable<string>;
};

export class NewerDataPlugin implements WorkboxPlugin {
  #headers: Set<string>;

  #detectedNewVersion: (
    cacheName: string,
    request: Request,
    reason: Reasons
  ) => void;

  cacheDidUpdate: CacheDidUpdateCallback;

  constructor({ channel, headers = [] }: ConstructorProps) {
    this.#headers = new Set(headers);

    this.#detectedNewVersion = async (cacheName, request, reason) => {
      // drop the whole cache containing this request, as we assume the whole
      // data might be stale
      await drop(cacheName);
      channel.postMessage({
        type: MessageTypes.UPDATED_DATA,
        url: request.url,
        reason,
      } as SWMessage);
    };

    this.cacheDidUpdate = async ({
      cacheName,
      request,
      oldResponse,
      newResponse,
    }) => {
      if (request.url.includes('/pdbe/coordinates/')) {
        // We're skipping testing for these URLs because they include timestamp
        // _inside_ the file content, so they would always trigger a cache drop
        return;
      }

      // Different approaches, from less expensive to most expensive

      /* 1st APPROACH: get key info from headers, check for mismatch */
      const [oldHeaders, freshHeaders] = [oldResponse, newResponse].map(
        (response) => response?.headers
      );
      let hasACheckBeenDone = false;
      for (const header of this.#headers) {
        const oldHeader = oldHeaders?.get(header);
        const freshHeader = freshHeaders?.get(header);
        if (oldHeader && freshHeader) {
          // both headers are defined and contain a value
          if (oldHeader === freshHeader) {
            // the values did match, move on, but mark that at least one check
            // has been done
            hasACheckBeenDone = true;
          } else {
            // but the values don't match
            this.#detectedNewVersion(cacheName, request, Reasons.HEADER_CHECK);
            return;
          }
        }
      }
      if (!hasACheckBeenDone) {
        // if we have been able to compare values for at least one header, we
        // assume the data is still the same and we can bail
        return;
      }

      // if no header was available to check, go on with the
      /* 2nd APPROACH: get content length from bodies, check for mismatch */
      // get a brand new response from the cache,
      // because 'newResponse' has been used already
      const freshResponse = await caches.match(request, { cacheName });
      // use the responses to extract their content
      const [oldContent, freshContent] = await Promise.all([
        oldResponse?.blob(),
        freshResponse?.blob(),
      ]);

      if (
        oldContent?.size &&
        freshContent?.size &&
        oldContent.size !== freshContent.size
      ) {
        // if we managed to extract content, and this content is not empty,
        // but the content lengths don't match
        this.#detectedNewVersion(cacheName, request, Reasons.LENGTH_CHECK);
        return;
      }

      // Finally, 3rd APPROACH: compare byte-by-byte, with early escape
      const [oldRawData, freshRawData] = await Promise.all(
        [oldContent, freshContent].map((blob) =>
          blob?.arrayBuffer().then((ab) => new Uint8Array(ab))
        )
      );

      if (!(oldRawData?.length && freshRawData?.length)) {
        // 🤷🏽‍♂️ we should have already escaped before, but oh well
        return;
      }

      for (let i = 0; i < oldRawData.length; i += 1) {
        if (oldRawData[i] !== freshRawData[i]) {
          // Escape as soon as one byte is different
          this.#detectedNewVersion(cacheName, request, Reasons.BYTE_CHECK);
          return;
        }
      }
    };
  }
}
