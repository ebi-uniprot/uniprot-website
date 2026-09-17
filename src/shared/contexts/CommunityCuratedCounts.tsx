import { createContext } from 'react';

export type CommunityCuratedCounts = {
  /**
   * Community submissions held for the entry on the PIR community curation
   * site. 0 until known: consumers have nothing to link to either way, so
   * "none" and "not yet" are treated alike.
   */
  submitted: number;
  /**
   * Community curated publications this release holds for the entry. Undefined
   * until the request the entry already makes resolves, which has to be told
   * apart from a genuine 0 — that is what says the release is behind.
   */
  indexed?: number;
};

/**
 * Both counts are fetched once by the entry and shared from here: they are
 * needed by the tools row as well as by the publications tab, and neither
 * depends on the tab or on the facets, so mounting a consumer must not trigger
 * a request of its own.
 */
export const CommunityCuratedCountsContext =
  createContext<CommunityCuratedCounts>({ submitted: 0 });
