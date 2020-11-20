import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageIntro, Loader } from 'franklin-sites';

import ResultsView from './ResultsView';
import ResultsButtons from '../../../uniprotkb/components/results/ResultsButtons';
import ResultsFacets from './ResultsFacets';
import NoResultsPage from '../error-pages/NoResultsPage';
import ErrorHandler from '../error-pages/ErrorHandler';
import SideBarLayout from '../layouts/SideBarLayout';
import { useTableColumnsFromLocalStorage } from '../../utils/localStorage';

import { ViewMode } from '../../../uniprotkb/state/resultsInitialState';

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

import useLocalStorage from '../../hooks/useLocalStorage';
import useDataApiWithStale from '../../hooks/useDataApiWithStale';

import { getAPIQueryUrl } from '../../config/apiUrls';
import infoMappings from '../../config/InfoMappings';

import Response from '../../../uniprotkb/types/responseTypes';
import useNS from '../../hooks/useNS';

import './styles/results-table.scss';

const Results: FC = () => {
  const namespace = useNS();

  const { search: queryParamFromUrl } = useLocation();
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );

  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>(
    'view-mode',
    ViewMode.CARD
  );
  const [tableColumns] = useTableColumnsFromLocalStorage(namespace);

  /**
   * WARNING: horrible hack to get the switch between
   * table and cards to work while we wait for the backend
   * to generate a column for card counts and we refactor
   * this class as a functional component and put all url
   * parameters in the store.
   */
  const columns =
    viewMode === ViewMode.TABLE && tableColumns ? tableColumns : [];

  const initialApiUrl = getAPIQueryUrl({
    namespace,
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

  if (error || !(loading || data) || !namespace) {
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
