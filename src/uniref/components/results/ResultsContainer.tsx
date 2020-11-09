import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { PageIntro, Loader } from 'franklin-sites';

import ResultsView from '../../../uniprotkb/components/results/ResultsView';
import ResultsButtons from '../../../uniprotkb/components/results/ResultsButtons';
import ResultsFacets from '../../../uniprotkb/components/results/ResultsFacets';
import NoResultsPage from '../../../shared/components/error-pages/NoResultsPage';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';

import { ViewMode } from '../../../uniprotkb/state/resultsInitialState';
import { RootState } from '../../../app/state/rootInitialState';

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { getAPIQueryUrl } from '../../../shared/config/apiUrls';
import infoMappings from '../../../shared/config/InfoMappings';

import { Namespace } from '../../../shared/types/namespaces';
import Response from '../../types/responseTypes';
import { UniRefColumn } from '../../config/ColumnConfiguration';

// TODO: compare to the same component in UniProtKB and check to make this
// TODO: component generic enough and shared across namespaces
const Results: FC = () => {
  const namespace = Namespace.uniref;

  const tableColumns = useSelector<RootState, UniRefColumn[] | undefined>(
    (state) => state.results.tableColumns[namespace] as UniRefColumn[]
  );
  const { search: queryParamFromUrl } = useLocation();
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );

  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>(
    'view-mode',
    ViewMode.CARD
  );

  /**
   * WARNING: horrible hack to get the switch between
   * table and cards to work while we wait for the backend
   * to generate a column for card counts and we refactor
   * this class as a functional component and put all url
   * parameters in the store.
   */
  const columns: UniRefColumn[] =
    viewMode === ViewMode.TABLE && tableColumns ? tableColumns : [];

  const initialApiUrl = getAPIQueryUrl({
    namespace: Namespace.uniref,
    query,
    columns,
    selectedFacets,
    sortColumn,
    sortDirection,
    size: 1, // TODO: change to 0 whenever the API accepts it
  });

  const {
    data,
    error,
    loading,
    headers,
    status,
    isStale,
  } = useDataApiWithStale<Response['data']>(initialApiUrl);

  if (error || !(loading || data)) {
    return <ErrorHandler status={status} />;
  }

  const total = headers?.['x-totalrecords']
    ? +headers['x-totalrecords']
    : undefined;

  // no results if total is 0, or if not loading anymore and still no total info
  if (total === 0 || !(total || loading)) {
    return <NoResultsPage />;
  }

  const handleEntrySelection = (rowId: string): void => {
    const filtered = selectedEntries.filter((id) => id !== rowId);
    setSelectedEntries(
      filtered.length === selectedEntries.length
        ? [...selectedEntries, rowId]
        : filtered
    );
  };
  const { name, links, info } = infoMappings[namespace];

  return (
    <SideBarLayout
      title={
        <PageIntro title={name} links={links} resultsCount={total}>
          {info}
        </PageIntro>
      }
      actionButtons={
        <ResultsButtons
          viewMode={viewMode ?? ViewMode.CARD}
          setViewMode={setViewMode}
          query={query}
          selectedFacets={selectedFacets}
          selectedEntries={selectedEntries}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          total={total || 0}
        />
      }
      sidebar={
        loading ? (
          <Loader />
        ) : (
          <ResultsFacets facets={data?.facets || []} isStale={isStale} />
        )
      }
    >
      <ResultsView
        columns={columns}
        handleEntrySelection={handleEntrySelection}
        selectedEntries={selectedEntries}
        viewMode={viewMode ?? ViewMode.CARD}
      />
    </SideBarLayout>
  );
};

export default Results;
