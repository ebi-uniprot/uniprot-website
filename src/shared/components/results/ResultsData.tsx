import { useEffect, useRef, useMemo, FC } from 'react';
import {
  DataTableWithLoader,
  DataListWithLoader,
  Loader,
  PageIntro,
} from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import NoResultsPage from '../error-pages/NoResultsPage';
import ResultsButtons from './ResultsButtons';

import useNS from '../../hooks/useNS';
import useNSQuery from '../../hooks/useNSQuery';
import useUserPreferences from '../../hooks/useUserPreferences';
import useColumns from '../../hooks/useColumns';
import usePagination from '../../hooks/usePagination';
import useItemSelect from '../../hooks/useItemSelect';

import { getIdKeyFor } from '../../utils/getIdKeyForNamespace';

import { getEntryPathFor } from '../../../app/config/urls';
import cardRenderer from '../../config/resultsCardRenderers';
import infoMappings from '../../config/InfoMappings';

import { Namespace } from '../../types/namespaces';
import { APIModel } from '../../types/apiModel';

import './styles/warning.scss';
import './styles/results-data.scss';

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

  const prevUrl = useRef<string | undefined>(initialApiUrl);
  useEffect(() => {
    // will set it *after* the current render
    prevUrl.current = initialApiUrl;
  });

  const prevViewMode = useRef<ViewMode>(viewMode);
  useEffect(() => {
    prevViewMode.current = viewMode;
  });

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

  if (
    // if loading the first page of results
    initialLoading ||
    // or we just switched namespace (a bit hacky workaround to force unmount)
    prevUrl.current !== initialApiUrl ||
    // or we just switched view mode (hacky too)
    prevViewMode.current !== viewMode
  ) {
    return <Loader progress={progress} />;
  }

  // no results if total is 0, not loading at this point (due to if above)
  if (total === 0) {
    return <NoResultsPage />;
  }

  const loadComponent = (
    <Loader progress={progress !== 1 ? progress : undefined} />
  );

  const { name, links, info } = infoMappings[namespace];

  return (
    <div className="results-data">
      <PageIntro title={name} links={links} resultsCount={total}>
        {info}
      </PageIntro>
      <ResultsButtons total={total} selectedEntries={selectedEntries} />
      {viewMode === ViewMode.CARD ? (
        // Card view
        <DataListWithLoader<APIModel>
          getIdKey={getIdKey}
          data={allResults}
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
        // Column view
        <DataTableWithLoader
          getIdKey={getIdKey}
          columns={columns}
          data={allResults}
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
