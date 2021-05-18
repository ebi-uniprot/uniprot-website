import { useEffect, useMemo, FC, useRef } from 'react';
import {
  DataTableWithLoader,
  DataListWithLoader,
  Loader,
} from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import useNS from '../../hooks/useNS';
import useUserPreferences from '../../hooks/useUserPreferences';
import useColumns from '../../hooks/useColumns';

import { getIdKeyFor } from '../../utils/getIdKeyForNamespace';

import { getEntryPathFor } from '../../../app/config/urls';
import cardRenderer from '../../config/resultsCardRenderers';

import { Namespace, SearchableNamespace } from '../../types/namespaces';
import { APIModel } from '../../types/apiModel';
import { UsePagination } from '../../hooks/usePagination';

import './styles/warning.scss';
import './styles/results-data.scss';

export enum ViewMode {
  TABLE,
  CARD,
}

const ResultsData: FC<{
  resultsDataObject: UsePagination;
  direct?: boolean;
  selectedEntries: string[];
  handleEntrySelection: (id: string) => void;
  namespaceFallback?: Namespace;
  displayIdMappingColumns?: boolean;
}> = ({
  resultsDataObject,
  direct,
  selectedEntries,
  handleEntrySelection,
  namespaceFallback,
  displayIdMappingColumns,
}) => {
  const namespace = useNS() || namespaceFallback || Namespace.uniprotkb;
  const [viewMode] = useUserPreferences<ViewMode>('view-mode', ViewMode.CARD);
  const history = useHistory();
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

  // redirect to entry directly when only 1 result and query marked as "direct"
  useEffect(() => {
    if (direct && !hasMoreData && allResults.length === 1) {
      const uniqueItem = allResults[0];
      history.replace(getEntryPathForEntry(uniqueItem));
    }
  }, [history, direct, hasMoreData, allResults, getEntryPathForEntry]);

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

  if (
    // if loading the first page of results
    loading
  ) {
    return <Loader progress={progress} />;
  }

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
        />
      ) : (
        <DataTableWithLoader
          getIdKey={getIdKey}
          columns={columns}
          data={allResults}
          loading={loading}
          selected={selectedEntries}
          onSelectRow={handleEntrySelection}
          onHeaderClick={updateColumnSort}
          onLoadMoreItems={handleLoadMoreRows}
          hasMoreData={hasMoreData}
          loaderComponent={loadComponent}
        />
      )}
    </div>
  );
};

export default ResultsData;
