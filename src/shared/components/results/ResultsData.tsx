import { useEffect, useMemo, FC, useRef } from 'react';
import {
  DataTableWithLoader,
  DataListWithLoader,
  Loader,
} from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import NoResultsPage from '../error-pages/NoResultsPage';

import useNS from '../../hooks/useNS';
import useNSQuery from '../../hooks/useNSQuery';
import useUserPreferences from '../../hooks/useUserPreferences';
import useColumns from '../../hooks/useColumns';
import usePagination from '../../hooks/usePagination';
import useItemSelect from '../../hooks/useItemSelect';

import { getIdKeyFor } from '../../utils/getIdKeyForNamespace';

import { getEntryPathFor } from '../../../app/config/urls';
import cardRenderer from '../../config/resultsCardRenderers';

import { Namespace } from '../../types/namespaces';
import { APIModel } from '../../types/apiModel';

import './styles/warning.scss';
import './styles/results-data.scss';
import ResultsDataHeader from './ResultsDataHeader';

export enum ViewMode {
  TABLE,
  CARD,
}

const ResultsData: FC = () => {
  const namespace = useNS() || Namespace.uniprotkb;
  const [viewMode] = useUserPreferences<ViewMode>('view-mode', ViewMode.CARD);
  const history = useHistory();
  const [columns, updateColumnSort] = useColumns();
  const [selectedEntries, handleEntrySelection] = useItemSelect();
  const { url: initialApiUrl, direct } = useNSQuery();
  const {
    allResults,
    initialLoading,
    handleLoadMoreRows,
    hasMoreData,
    progress,
    total,
  } = usePagination(initialApiUrl);

  const [getIdKey, getEntryPathForEntry] = useMemo(() => {
    const getIdKey = getIdKeyFor(namespace);
    const getEntryPath = getEntryPathFor(namespace);
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

  const loading = initialLoading || prevViewMode.current !== viewMode;

  let mainView;
  if (
    // if loading the first page of results
    loading
  ) {
    mainView = <Loader progress={progress} />;
  } else if (total === 0) {
    mainView = <NoResultsPage />;
  } else if (viewMode === ViewMode.CARD) {
    mainView = (
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
    );
  } else {
    // viewMode === ViewMode.TABLE
    mainView = (
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
    );
  }

  return (
    <div className="results-data">
      <ResultsDataHeader total={total} selectedEntries={selectedEntries} />
      {mainView}
    </div>
  );
};

export default ResultsData;
