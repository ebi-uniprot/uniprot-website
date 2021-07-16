import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react';
import {
  DataTableWithLoader,
  DataListWithLoader,
  Loader,
  Button,
  BinIcon,
} from 'franklin-sites';
import { useHistory, useLocation } from 'react-router-dom';

import useNS from '../../hooks/useNS';
import useLocalStorage from '../../hooks/useLocalStorage';
import useColumns, { ColumnDescriptor } from '../../hooks/useColumns';

import { getIdKeyFor } from '../../utils/getIdKeyForNamespace';
import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

import { getEntryPathFor } from '../../../app/config/urls';
import cardRenderer from '../../config/resultsCardRenderers';

import { Namespace, SearchableNamespace } from '../../types/namespaces';
import { APIModel } from '../../types/apiModel';
import { PaginatedResults } from '../../hooks/usePagination';
import { Basket } from '../../hooks/useBasket';

import './styles/warning.scss';
import './styles/results-data.scss';

export enum ViewMode {
  TABLE,
  CARD,
}

type Props = {
  resultsDataObject: PaginatedResults;
  selectedEntries: string[];
  handleEntrySelection: (id: string) => void;
  namespaceFallback?: Namespace;
  columnsFallback?: ColumnDescriptor<APIModel>[];
  displayIdMappingColumns?: boolean;
  basketSetter?: Dispatch<SetStateAction<Basket>>;
  className?: string;
};

const ResultsData = ({
  resultsDataObject,
  selectedEntries,
  handleEntrySelection,
  namespaceFallback,
  columnsFallback,
  displayIdMappingColumns,
  basketSetter,
  className,
}: Props) => {
  const namespace = useNS(namespaceFallback) || Namespace.uniprotkb;
  const [viewMode] = useLocalStorage<ViewMode>('view-mode', ViewMode.CARD);
  const history = useHistory();
  const { query, direct } = getParamsFromURL(useLocation().search);
  const [columns, updateColumnSort] = useColumns(
    namespaceFallback,
    displayIdMappingColumns
  );
  const {
    allResults,
    initialLoading,
    handleLoadMoreRows,
    hasMoreData,
    progress,
  } = resultsDataObject;

  const [getIdKey, getEntryPathForEntry] = useMemo(() => {
    const getIdKey = getIdKeyFor(namespace);
    const getEntryPath = getEntryPathFor(namespace as SearchableNamespace);
    return [getIdKey, (entry: APIModel) => getEntryPath(getIdKey(entry))];
  }, [namespace]);

  // redirect to entry when directly when...
  useEffect(() => {
    // ... only 1 result and ...
    if (!hasMoreData && allResults.length === 1) {
      const uniqueItem = allResults[0];
      const trimmedQuery = query.toUpperCase().trim();
      if (
        // ... and query marked as "direct" ...
        direct ||
        // ... or the result's ID or accession matches the query ...
        getIdKey(uniqueItem)?.toUpperCase() === trimmedQuery ||
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
    prevNamespace.current !== namespace;

  const finalColumns = useMemo(() => {
    if (basketSetter) {
      const removeColumn: ColumnDescriptor<APIModel> = {
        name: 'remove',
        label: null,
        render: (datum) => (
          <Button
            variant="tertiary"
            onClick={() =>
              basketSetter((currentBasket) => {
                const basketSubset = new Set(currentBasket.get(namespace));
                basketSubset?.delete(getIdKeyFor(namespace)(datum));
                return new Map([
                  // other namespaces, untouched
                  ...currentBasket,
                  [namespace, basketSubset],
                ]);
              })
            }
          >
            <BinIcon width="1.5em" />
          </Button>
        ),
      };
      return [...(columnsFallback || columns), removeColumn];
    }
    return columnsFallback || columns;
  }, [basketSetter, columns, columnsFallback, namespace]);

  if (
    // if loading the first page of results
    loading
  ) {
    return <Loader progress={progress} />;
  }

  const dataTableWithLoader =
    namespace !== Namespace.idmapping ? (
      <DataTableWithLoader
        getIdKey={getIdKey}
        columns={finalColumns}
        data={allResults}
        loading={loading}
        selected={selectedEntries}
        onSelectRow={handleEntrySelection}
        onHeaderClick={updateColumnSort}
        onLoadMoreItems={handleLoadMoreRows}
        hasMoreData={hasMoreData}
        loaderComponent={loadComponent}
        className={className}
      />
    ) : (
      <DataTableWithLoader
        getIdKey={getIdKey}
        columns={finalColumns}
        data={allResults}
        loading={loading}
        onHeaderClick={updateColumnSort}
        onLoadMoreItems={handleLoadMoreRows}
        hasMoreData={hasMoreData}
        loaderComponent={loadComponent}
        className={className}
      />
    );

  return (
    <div className="results-data">
      {viewMode === ViewMode.CARD && !displayIdMappingColumns ? (
        <DataListWithLoader<APIModel>
          getIdKey={getIdKey}
          data={allResults}
          loading={loading}
          dataRenderer={cardRenderer(
            namespace,
            selectedEntries,
            handleEntrySelection
          )}
          onLoadMoreItems={handleLoadMoreRows}
          hasMoreData={hasMoreData}
          loaderComponent={loadComponent}
          className={className}
        />
      ) : (
        dataTableWithLoader
      )}
    </div>
  );
};

export default ResultsData;
