import { useEffect, useMemo, useState } from 'react';

import {
  EntryType,
  getEntryTypeFromString,
} from '../../../../shared/components/entry/EntryTypeIcon';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { Namespace } from '../../../../shared/types/namespaces';
import { type SearchResults } from '../../../../shared/types/results';
import { type UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../../../../uniprotkb/types/columnTypes';
import {
  type UniParcXRef,
  XRefsInternalDatabasesEnum,
} from '../../../adapters/uniParcConverter';

/**
 * What actually became of an obsolete UniProtKB/TrEMBL cross-reference — which
 * is what decides where its link should go:
 *   - `merged`  the accession was merged or demerged into other entries, so the
 *               UniProtKB history is what's worth showing
 *   - `deleted` the record is gone for good; the UniParc sub-entry page explains
 *               why and carries whatever predicted annotations exist
 *   - `active`  the entry is alive in UniProtKB after all (the xref `active`
 *               flag lags behind UniProtKB, so this is not rare)
 */
export type ObsoleteXRefStatus = 'active' | 'merged' | 'deleted';

// The search endpoint rejects a query with more than 100 OR clauses, so
// accessions are resolved a batch at a time, each batch asking only about what
// the ones before it left unanswered. Obsolete TrEMBL rows are a small minority
// (~1 per 25-row page), so a second batch is only reached on very large tables
// after a lot of scrolling.
const maxAccessionsPerQuery = 100;

type Resolved = {
  // What UniProtKB said became of each accession
  statuses: Map<string, ObsoleteXRefStatus>;
  // Every accession already asked about, answered or not. Tracked separately
  // from `statuses` so that an accession UniProtKB has no record of is asked
  // about once, instead of taking up a slot in every later batch.
  requested: Set<string>;
};

const nothingResolved: Resolved = {
  statuses: new Map(),
  requested: new Set(),
};

/**
 * Resolve what happened to the obsolete UniProtKB/TrEMBL cross-references among
 * `xrefs`.
 *
 * The xref payload itself can't answer this — it carries no merge information,
 * and its `active` flag can lag behind UniProtKB — so the fate is only knowable
 * from UniProtKB. `SubEntryContext` already looks it up per accession to decide
 * where to redirect; doing it here too lets the table's labels say where a row
 * actually leads instead of guessing, and lets merged/active rows skip the
 * sub-entry page's redirect entirely.
 *
 * Answers accumulate across calls rather than being re-derived from the latest
 * response, and each batch of accessions is frozen while its request is in
 * flight. `xrefs` grows a page at a time as the table is scrolled, and each new
 * obsolete accession would otherwise change the query URL, empty the map while
 * the re-query is in flight — flipping already-labelled rows back to the
 * generic fallback — and, past the per-query cap, either evict rows that had
 * already resolved or cancel and restart the in-flight request forever.
 *
 * Accessions absent from a response stay unresolved rather than being assumed
 * active: `active:false` is deliberately NOT part of the query, so an entry that
 * exists always comes back with an `entryType`, and absence means "no such
 * accession" rather than "alive again".
 */
const useObsoleteXRefStatuses = (xrefs: UniParcXRef[]) => {
  const [resolved, setResolved] = useState(nothingResolved);
  // The accessions the request currently in flight is about. Held in state
  // rather than derived from `xrefs` on every render so that a page loading
  // mid-request can't change the query URL: `useDataApi` would cancel the
  // in-flight request and start another, and on an entry with more obsolete
  // TrEMBL rows than fit in one query, continuous scrolling could keep doing
  // that indefinitely, leaving every row on the generic fallback label.
  const [batch, setBatch] = useState<string[]>([]);

  const unresolved = useMemo(() => {
    const accessions = new Set<string>();
    for (const xref of xrefs) {
      if (
        xref.id &&
        !xref.active &&
        xref.database === XRefsInternalDatabasesEnum.UNREVIEWED &&
        !resolved.requested.has(xref.id)
      ) {
        accessions.add(xref.id);
      }
    }
    // Sorted so that scrolling back and forth reuses the same URL
    return Array.from(accessions).sort();
  }, [xrefs, resolved.requested]);

  // A batch is only ever replaced once the one before it has been answered
  useEffect(() => {
    if (batch.length) {
      return;
    }
    const next = unresolved.slice(0, maxAccessionsPerQuery);
    if (next.length) {
      setBatch(next);
    }
  }, [batch, unresolved]);

  const { data, loading, error } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    batch.length
      ? apiUrls.search.search({
          namespace: Namespace.uniprotkb,
          query: batch
            .map((accession) => `accession:${accession}`)
            .join(' OR '),
          // Without this the endpoint would cap the response at its default 25
          size: batch.length,
          columns: [UniProtKBColumn.accession],
          facets: null,
        })
      : null
  );

  useEffect(() => {
    // `data` is cleared whenever the URL changes, so anything here answers the
    // batch currently in flight. A failed batch counts as answered too: its
    // accessions stay unresolved, but retrying them would block every later
    // batch behind a request that has already failed once.
    if (!batch.length || loading || (!data && !error)) {
      return;
    }
    setResolved((previous) => {
      const statuses = new Map(previous.statuses);
      for (const entry of data?.results || []) {
        const entryType = getEntryTypeFromString(entry.entryType);
        if (entryType === undefined) {
          // Nothing to go on: leave it unresolved rather than guess, so the row
          // keeps the destination-agnostic label instead of claiming to be
          // active.
          continue;
        }
        const reason = entry.inactiveReason?.inactiveReasonType;
        let status: ObsoleteXRefStatus = 'deleted';
        if (entryType !== EntryType.INACTIVE) {
          status = 'active';
        } else if (reason === 'MERGED' || reason === 'DEMERGED') {
          status = 'merged';
        }
        statuses.set(entry.primaryAccession, status);
      }
      return {
        statuses,
        requested: new Set([...previous.requested, ...batch]),
      };
    });
    // Frees the next batch to be issued
    setBatch([]);
  }, [batch, data, error, loading]);

  return resolved.statuses;
};

export default useObsoleteXRefStatuses;
