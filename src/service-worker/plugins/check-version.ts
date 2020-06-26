/* eslint-disable */
// See https://developers.google.com/web/tools/workbox/guides/using-plugins#custom_plugins
import { WorkboxPlugin, CacheDidUpdateCallback } from 'workbox-core';

type ConstructorProps = {
  channel: BroadcastChannel;
  headers?: Iterable<string>;
};

const drop = async (cacheName: string) => {
  const cache = await caches.open(cacheName);
  const keys = await caches.keys();
  await Promise.all(keys.map((key) => cache.delete(key)));
};

export class NewerDataPlugin implements WorkboxPlugin {
  #headers: Set<string>;
  #detectedNewVersion: (cacheName: string, request: Request) => void;
  cacheDidUpdate: CacheDidUpdateCallback;

  constructor({ channel, headers = [] }: ConstructorProps) {
    this.#headers = new Set(headers);

    this.#detectedNewVersion = async (cacheName, request) => {
      await drop(cacheName);
      channel.postMessage({ type: 'UPDATED_DATA', content: request.url });
    };

    this.cacheDidUpdate = async ({
      cacheName,
      request,
      oldResponse,
      newResponse,
      event,
    }) => {
      console.log('cacheDidUpdate', {
        cacheName,
        request,
        oldResponse,
        newResponse,
        event,
      });

      // Different approaches, from less expensive to most expensive

      // 1st APPROACH: get key info from headers, check for mismatch
      const [oldHeaders, freshHeaders] = [oldResponse, newResponse].map(
        (response) => response?.headers
      );
      for (const header of this.#headers) {
        const oldHeader = oldHeaders?.get(header);
        const freshHeader = freshHeaders?.get(header);
        console.log({ header, oldHeader, freshHeader });
        if (oldHeader && freshHeader) {
          // both headers are defined and contain data
          if (oldHeader !== freshHeader) {
            return this.#detectedNewVersion(cacheName, request);
          } else {
            // return; // do we skip  all other checks?
          }
        }
      }

      // 2nd APPROACH: get content length from bodies, check for mismatch
      const freshResponse = await caches.match(request, { cacheName });
      const [oldContent, freshContent] = await Promise.all([
        oldResponse?.blob(),
        freshResponse?.blob(),
      ]);
      console.log('content size', oldContent?.size, freshContent?.size);
      if (
        oldContent?.size &&
        freshContent?.size &&
        oldContent.size !== freshContent.size
      ) {
        // we have length of both response, but they don't match... new data!
        return this.#detectedNewVersion(cacheName, request);
      }

      // Finally, 3rd APPROACH: compare byte-by-byte, with early escape
      const [oldRawData, freshRawData] = await Promise.all(
        [oldContent, freshContent].map((blob) =>
          blob?.arrayBuffer().then((ab) => new Uint8Array(ab))
        )
      );

      console.log('raw content', oldRawData, freshRawData);

      if (!(oldRawData?.length && freshRawData?.length)) {
        // 🤷🏽‍♂️ we should have already escaped before, but oh well
        return;
      }

      for (let i = 0; i < oldRawData.length; i++) {
        if (oldRawData[i] !== freshRawData[i]) {
          return this.#detectedNewVersion(cacheName, request);
        }
      }
    };
  }
}
