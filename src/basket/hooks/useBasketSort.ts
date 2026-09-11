import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { reIds } from '../../jobs/utils/urls';
import apiUrls from '../../shared/config/apiUrls/apiUrls';
import { type Column } from '../../shared/config/columns';
import { type Basket } from '../../shared/hooks/useBasket';
import {
  type ColumnDescriptor,
  getColumnsToDisplay,
} from '../../shared/hooks/useColumns';
import useDatabaseInfoMaps from '../../shared/hooks/useDatabaseInfoMaps';
import usePagination from '../../shared/hooks/usePagination';
import { type APIModel } from '../../shared/types/apiModel';
import { type Namespace } from '../../shared/types/namespaces';
import { getIdKeyForData } from '../../shared/utils/getIdKey';
import { SortDirection } from '../../uniprotkb/types/resultsTypes';
import {
  type BasketSort,
  basketSortValueGetters,
  getBasketSortFields,
  sortBasketAccessions,
} from '../utils/basketSort';

// Largest page the API will serve. Bigger baskets are paged through below.
const SORT_VALUES_PAGE_SIZE = 500;

// Basket accessions may carry a subset range, the entry is stored under the id
const toEntryId = (accession: string) =>
  accession.match(reIds)?.groups?.id || accession;

type Args = {
  namespace: Namespace;
  accessions: string[];
  columnNames: Column[];
  setBasket: Dispatch<SetStateAction<Basket>>;
};

type BasketSortState = {
  columns: Array<ColumnDescriptor<APIModel>> | undefined;
  handleSort: (columnName: string) => void;
};

/**
 * Client-side sorting shared by the basket side panel and the basket full view.
 *
 * Both views render the basket in its stored order, so sorting works by
 * rewriting that order. The values to sort on are loaded for the whole basket
 * in a separate lightweight request, otherwise a sort would only be able to
 * reorder the page of entries the view happens to have rendered.
 */
const useBasketSort = ({
  namespace,
  accessions,
  columnNames,
  setBasket,
}: Args): BasketSortState => {
  const [sort, setSort] = useState<BasketSort | undefined>(undefined);
  const databaseInfoMaps = useDatabaseInfoMaps();

  // Stable across re-renders, unlike the `accessions` array itself
  const accessionsKey = accessions.join(',');
  const splitKey = (key: string) => key.split(',').filter(Boolean);
  // Same but independent of the order, to spot contents changing
  const membershipKey = useMemo(
    () => splitKey(accessionsKey).sort().join(','),
    [accessionsKey]
  );

  // An entry added to a sorted basket goes to the end, where it was dropped,
  // and the sort is dropped with it. Sorting is a one-off rearrangement of the
  // basket rather than an order it keeps up to date, so the arrow has to go
  // too. Removing an entry leaves the rest sorted, so that keeps the sort.
  const [previousMembership, setPreviousMembership] = useState(membershipKey);
  if (membershipKey !== previousMembership) {
    const previous = new Set(splitKey(previousMembership));
    setPreviousMembership(membershipKey);
    if (splitKey(membershipKey).some((accession) => !previous.has(accession))) {
      setSort(undefined);
    }
  }

  const sortValuesUrl = useMemo(
    () =>
      apiUrls.search.accessions(
        Array.from(new Set(splitKey(accessionsKey).map(toEntryId))),
        {
          namespace,
          columns: getBasketSortFields(namespace),
          facets: null,
          size: SORT_VALUES_PAGE_SIZE,
        }
      ),
    [accessionsKey, namespace]
  );

  // Only fetched once the user actually sorts, and reused for every subsequent
  // sort since it carries the values for all sortable columns at once
  const { allResults, hasMoreData, handleLoadMoreRows } = usePagination(
    sort && sortValuesUrl
  );

  // Page through the whole basket rather than sorting a partial list
  const loadMore = useRef(handleLoadMoreRows);
  loadMore.current = handleLoadMoreRows;
  useEffect(() => {
    if (hasMoreData) {
      loadMore.current();
    }
  }, [hasMoreData, allResults.length]);

  const entriesById = useMemo(() => {
    if (!allResults.length) {
      return new Map<string, APIModel>();
    }
    const getIdKey = getIdKeyForData(allResults[0]);
    return new Map(allResults.map((entry) => [getIdKey(entry), entry]));
  }, [allResults]);

  const getSortValue = useCallback(
    (accession: string) => {
      const getValue = sort && basketSortValueGetters[namespace]?.[sort.column];
      const entry = entriesById.get(toEntryId(accession));
      return getValue && entry ? getValue(entry) : undefined;
    },
    [entriesById, namespace, sort]
  );

  // Applied as an effect rather than in the click handler so that it runs once
  // the values for the whole basket have loaded. Re-runs are no-ops: the basket
  // is already in this order, and a sort never survives entries being added.
  useEffect(() => {
    if (!sort || hasMoreData || !entriesById.size) {
      return;
    }
    const newOrder = sortBasketAccessions(
      splitKey(accessionsKey),
      sort,
      getSortValue
    );
    if (newOrder.join(',') === accessionsKey) {
      return;
    }
    setBasket(
      (currentBasket) =>
        new Map([...currentBasket, [namespace, new Set(newOrder)]])
    );
  }, [
    accessionsKey,
    entriesById,
    getSortValue,
    hasMoreData,
    namespace,
    setBasket,
    sort,
  ]);

  const columns = useMemo(() => {
    if (!databaseInfoMaps) {
      return undefined;
    }
    const getters = basketSortValueGetters[namespace];
    return getColumnsToDisplay(
      namespace,
      columnNames,
      undefined,
      undefined,
      undefined,
      databaseInfoMaps
    ).map((column) =>
      getters?.[column.name]
        ? {
            ...column,
            sortable: true as const,
            sorted: column.name === sort?.column ? sort.direction : undefined,
          }
        : column
    );
  }, [columnNames, databaseInfoMaps, namespace, sort]);

  const handleSort = useCallback((columnName: string) => {
    const column = columnName as Column;
    setSort((current) =>
      current?.column === column && current.direction === SortDirection.ascend
        ? { column, direction: SortDirection.descend }
        : { column, direction: SortDirection.ascend }
    );
  }, []);

  return { columns, handleSort };
};

export default useBasketSort;
