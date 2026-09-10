import { type Column } from '../../shared/config/columns';
import { type APIModel } from '../../shared/types/apiModel';
import { Namespace } from '../../shared/types/namespaces';
import intlCollator from '../../shared/utils/collator';
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
// basket's sortable columns. Any column without an entry here is treated as
// non-sortable in both basket views.
// The API has no sort field for UniRef name, UniParc organism or UniParc
// UniProtKB accession, which is why the basket sorts client side throughout
// rather than asking the API to sort.
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
 * The columns to request when loading the sort values for a whole basket, so
 * that sorting covers every entry rather than only the page currently rendered.
 */
export const getBasketSortFields = (namespace: Namespace): Column[] =>
  Object.keys(basketSortValueGetters[namespace] || {}) as Column[];

/**
 * Compute a new basket order by sorting `accessions` on the value returned by
 * `getSortValue`. Accessions without a value (obsolete, or not returned by the
 * API) keep their relative order at the end, so a sort never drops basket items.
 */
export const sortBasketAccessions = (
  accessions: string[],
  sort: BasketSort,
  getSortValue: (accession: string) => string | undefined
): string[] => {
  const known: string[] = [];
  const unknown: string[] = [];
  for (const accession of accessions) {
    if (getSortValue(accession) === undefined) {
      unknown.push(accession);
    } else {
      known.push(accession);
    }
  }
  known.sort((a, b) => {
    const comparison = intlCollator.compare(
      getSortValue(a) ?? '',
      getSortValue(b) ?? ''
    );
    return sort.direction === SortDirection.descend ? -comparison : comparison;
  });
  return [...known, ...unknown];
};
