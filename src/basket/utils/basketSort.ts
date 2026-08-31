import { type Column } from '../../shared/config/columns';
import { type APIModel } from '../../shared/types/apiModel';
import { Namespace } from '../../shared/types/namespaces';
import intlCollator from '../../shared/utils/collator';
import { getIdKeyForData } from '../../shared/utils/getIdKey';
import { type UniParcLiteAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { UniParcColumn } from '../../uniparc/config/UniParcColumnConfiguration';
import { type UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';
import { SortDirection } from '../../uniprotkb/types/resultsTypes';
import { type UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';
import { UniRefColumn } from '../../uniref/config/UniRefColumnConfiguration';

export type BasketSort = { column: Column; direction: SortDirection };

type SortValueGetter = (entry: APIModel) => string | undefined;

// Per-namespace accessors returning the primitive value used to sort each of the
// basket side panel's default columns. Only those default columns are listed; any
// column without an entry here is treated as non-sortable in the panel.
export const basketSortValueGetters: Partial<
  Record<Namespace, Record<string, SortValueGetter>>
> = {
  [Namespace.uniprotkb]: {
    [UniProtKBColumn.accession]: (entry) =>
      (entry as UniProtkbAPIModel).primaryAccession,
    [UniProtKBColumn.id]: (entry) => (entry as UniProtkbAPIModel).uniProtkbId,
    [UniProtKBColumn.organismName]: (entry) =>
      (entry as UniProtkbAPIModel).organism?.scientificName,
  },
  [Namespace.uniref]: {
    [UniRefColumn.id]: (entry) => (entry as UniRefLiteAPIModel).id,
    [UniRefColumn.name]: (entry) => (entry as UniRefLiteAPIModel).name,
    [UniRefColumn.organism]: (entry) =>
      (entry as UniRefLiteAPIModel).organisms?.[0]?.scientificName,
  },
  [Namespace.uniparc]: {
    [UniParcColumn.upi]: (entry) => (entry as UniParcLiteAPIModel).uniParcId,
    [UniParcColumn.organism]: (entry) =>
      (entry as UniParcLiteAPIModel).organisms?.[0]?.scientificName,
    [UniParcColumn.accession]: (entry) =>
      (entry as UniParcLiteAPIModel).uniProtKBAccessions?.[0],
  },
};

/**
 * Compute a new basket order (array of accessions) by sorting the loaded entry
 * `results` on the chosen column, then appending any basket accessions that are
 * missing from `results` (obsolete or not-yet-loaded) in their existing relative
 * order — so a sort never drops basket items.
 *
 * Returns `currentAccessions` unchanged when there is nothing to sort or the
 * column has no accessor.
 */
export const sortBasketAccessions = (
  results: APIModel[],
  namespace: Namespace,
  currentAccessions: string[],
  sort: BasketSort
): string[] => {
  const getValue = basketSortValueGetters[namespace]?.[sort.column];
  if (!results.length || !getValue) {
    return currentAccessions;
  }

  const getIdKey = getIdKeyForData(results[0]);
  const sorted = [...results].sort((a, b) => {
    const comparison = intlCollator.compare(
      getValue(a) ?? '',
      getValue(b) ?? ''
    );
    return sort.direction === SortDirection.descend ? -comparison : comparison;
  });
  const sortedIds = sorted.map(getIdKey);

  const presentIds = new Set(sortedIds);
  const missing = currentAccessions.filter((acc) => !presentIds.has(acc));

  return [...sortedIds, ...missing];
};
