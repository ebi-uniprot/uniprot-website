import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react';
import {
  DataTableWithLoader,
  DataListWithLoader,
  Loader,
} from 'franklin-sites';
import { useHistory, useLocation } from 'react-router-dom';

import useNS from '../../hooks/useNS';
import useLocalStorage from '../../hooks/useLocalStorage';
import useColumns, { ColumnDescriptor } from '../../hooks/useColumns';

import { getIdKeyFor } from '../../utils/getIdKeyForNamespace';
import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

import { getEntryPathFor } from '../../../app/config/urls';
import getCardRenderer from '../../config/resultsCardRenderers';

import { Namespace, SearchableNamespace } from '../../types/namespaces';
import { APIModel } from '../../types/apiModel';
import { PaginatedResults } from '../../hooks/usePagination';
import { Basket } from '../../hooks/useBasket';

import './styles/warning.scss';
import './styles/results-data.scss';

export type ViewMode = 'table' | 'card';
export const defaultViewMode: ViewMode = 'card';

type Props = {
  resultsDataObject: PaginatedResults;
  setSelectedEntries?: Dispatch<SetStateAction<string[]>>;
  setSelectedItemFromEvent: (event: MouseEvent | KeyboardEvent) => void;
  namespaceOverride?: Namespace;
  columnsOverride?: ColumnDescriptor<APIModel>[];
  displayIdMappingColumns?: boolean;
  basketSetter?: Dispatch<SetStateAction<Basket>>;
  className?: string;
};

const ResultsData = ({
  resultsDataObject,
  setSelectedEntries,
  setSelectedItemFromEvent,
  namespaceOverride,
  columnsOverride,
  displayIdMappingColumns,
  basketSetter,
  className,
}: Props) => {
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;
  const [viewModeFromStorage] = useLocalStorage<ViewMode>(
    'view-mode',
    defaultViewMode
  );
  const history = useHistory();
  const {
    query,
    direct,
    viewMode: viewModeFromUrl,
  } = getParamsFromURL(useLocation().search);
  const [columns, updateColumnSort] = useColumns(
    namespaceOverride,
    displayIdMappingColumns,
    basketSetter,
    columnsOverride,
    setSelectedEntries
  );
  const {
    allResults,
    initialLoading,
    handleLoadMoreRows,
    hasMoreData,
    progress,
  } = resultsDataObject;

  const viewMode = viewModeFromUrl || viewModeFromStorage;

  // All complex values that only change when the namespace changes
  const [getIdKey, getEntryPathForEntry, cardRenderer] = useMemo(() => {
    const getIdKey = getIdKeyFor(namespace);
    const getEntryPath = getEntryPathFor(namespace as SearchableNamespace);
    return [
      getIdKey,
      (entry: APIModel) => getEntryPath(getIdKey(entry)),
      getCardRenderer(namespace),
    ];
  }, [namespace]);

  useEffect(() => {
    // Reset selected entries when switching view mode
    setSelectedEntries?.([]);
  }, [setSelectedEntries, viewMode]);

  // redirect to entry when directly when...
  useEffect(() => {
    // ... only 1 result and ...
    if (!hasMoreData && allResults.length === 1) {
      const uniqueItem = allResults[0];
      const trimmedQuery = query.toUpperCase().trim();
      let idKey;
      try {
        idKey = getIdKey(uniqueItem);
      } catch (error) {
        // TODO: this happens when the namespace and data don't match up. Fix in a future refactor.
      }
      if (
        // ... and query marked as "direct" ...
        direct ||
        // ... or the result's ID or accession matches the query ...
        idKey?.toUpperCase() === trimmedQuery ||
        // ... or matches the UniProtKB ID ...
        ('uniProtkbId' in uniqueItem && uniqueItem.uniProtkbId === trimmedQuery)
      ) {
        history.replace(getEntryPathForEntry(uniqueItem));
      }
    }
  }, [
    history,
    direct,
    hasMoreData,
    allResults,
    getEntryPathForEntry,
    getIdKey,
    query,
  ]);

  const loadComponent = (
    <Loader progress={progress !== 1 ? progress : undefined} />
  );

  const prevViewMode = useRef(viewMode);
  useEffect(() => {
    prevViewMode.current = viewMode;
  });
  const prevNamespace = useRef(namespace);
  useEffect(() => {
    prevNamespace.current = namespace;
  });

  const loading =
    initialLoading ||
    prevViewMode.current !== viewMode ||
    prevNamespace.current !== namespace ||
    !columns ||
    !updateColumnSort;

  if (
    // if loading the first page of results
    loading
  ) {
    return <Loader progress={progress} />;
  }
  return (
    <div className="results-data">
      {viewMode === 'card' && !displayIdMappingColumns ? (
        // Card view
        <DataListWithLoader<APIModel>
          getIdKey={getIdKey}
          data={allResults}
          loading={loading}
          dataRenderer={cardRenderer}
          onSelectionChange={setSelectedItemFromEvent}
          onLoadMoreItems={handleLoadMoreRows}
          hasMoreData={hasMoreData}
          loaderComponent={loadComponent}
          className={className}
        />
      ) : (
        // Table view
        <DataTableWithLoader
          getIdKey={getIdKey}
          columns={columns}
          data={allResults}
          loading={loading}
          onSelectionChange={setSelectedItemFromEvent}
          onHeaderClick={updateColumnSort}
          onLoadMoreItems={handleLoadMoreRows}
          hasMoreData={hasMoreData}
          loaderComponent={loadComponent}
          className={className}
        />
      )}
    </div>
  );
};

export default ResultsData;
