import { useMemo } from 'react';

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

// The search endpoint rejects a query with more than 100 OR clauses. Obsolete
// TrEMBL rows are a small minority (~1 per 25-row page), so this is only reached
// on very large tables after a lot of scrolling; the rows past it keep the
// destination-agnostic label, which is still accurate, just less specific.
const maxAccessionsPerQuery = 100;

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
 * Accessions absent from the response stay unresolved rather than being assumed
 * active: `active:false` is deliberately NOT part of the query, so an entry that
 * exists always comes back with an `entryType`, and absence means "no such
 * accession" rather than "alive again".
 */
const useObsoleteXRefStatuses = (xrefs: UniParcXRef[]) => {
  const accessions = useMemo(
    () =>
      Array.from(
        new Set(
          xrefs
            .filter(
              (xref) =>
                xref.id &&
                !xref.active &&
                xref.database === XRefsInternalDatabasesEnum.UNREVIEWED
            )
            .map((xref) => xref.id as string)
        )
      )
        // Sorted so that scrolling back and forth reuses the same URL
        .sort()
        .slice(0, maxAccessionsPerQuery),
    [xrefs]
  );

  const { data } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    accessions.length
      ? apiUrls.search.search({
          namespace: Namespace.uniprotkb,
          query: accessions
            .map((accession) => `accession:${accession}`)
            .join(' OR '),
          // Without this the endpoint would cap the response at its default 25
          size: accessions.length,
          columns: [UniProtKBColumn.accession],
          facets: null,
        })
      : null
  );

  return useMemo(() => {
    const statuses = new Map<string, ObsoleteXRefStatus>();
    for (const entry of data?.results || []) {
      const entryType = getEntryTypeFromString(entry.entryType);
      if (entryType === undefined) {
        // Nothing to go on: leave it unresolved rather than guess, so the row
        // keeps the destination-agnostic label instead of claiming to be active.
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
    return statuses;
  }, [data]);
};

export default useObsoleteXRefStatuses;
