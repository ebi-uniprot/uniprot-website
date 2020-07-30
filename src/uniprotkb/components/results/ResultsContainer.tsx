import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { PageIntro, Loader } from 'franklin-sites';

import ResultsView from './ResultsView';
import ResultsButtons from './ResultsButtons';
import ResultsFacets from './ResultsFacets';
import NoResultsPage from '../../../shared/components/error-pages/NoResultsPage';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';

import { ViewMode } from '../../state/resultsInitialState';
import { RootState } from '../../../app/state/rootInitialState';

import { getParamsFromURL } from '../../utils/resultsUtils';

import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import useDataApi from '../../../shared/hooks/useDataApi';

import { getAPIQueryUrl } from '../../config/apiUrls';
import infoMappings from '../../../shared/config/InfoMappings';

import { Namespace } from '../../types/searchTypes';
import { Column } from '../../types/columnTypes';
import Response from '../../types/responseTypes';

const Results: FC = () => {
  const namespace = useSelector<RootState, Namespace>(
    (state) => state.query.namespace
  );
  const tableColumns = useSelector<RootState, Column[]>(
    (state) => state.results.tableColumns
  );
  const { search: queryParamFromUrl } = useLocation();
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );

  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [viewMode, setViewMode] = useLocalStorage('view-mode', ViewMode.CARD);

  /**
   * WARNING: horrible hack to get the switch between
   * table and cards to work while we wait for the backend
   * to generate a column for card counts and we refactor
   * this class as a functional component and put all url
   * parameters in the store.
   */
  const columns: Column[] = viewMode === ViewMode.TABLE ? tableColumns : [];

  const initialApiUrl = getAPIQueryUrl(
    query,
    columns,
    selectedFacets,
    sortColumn,
    sortDirection
  );

  const { data, error, loading, headers, status } = useDataApi<
    Response['data']
  >(initialApiUrl);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} />;
  }

  const { facets, results } = data;
  const total = headers['x-totalrecords'];

  if (!results || results.length === 0) {
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
          viewMode={viewMode}
          setViewMode={setViewMode}
          query={query}
          selectedFacets={selectedFacets}
          selectedEntries={selectedEntries}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          total={total}
        />
      }
      sidebar={<ResultsFacets facets={facets} />}
    >
      <ResultsView
        columns={columns}
        handleEntrySelection={handleEntrySelection}
        selectedEntries={selectedEntries}
        viewMode={viewMode}
      />
    </SideBarLayout>
  );
};

export default Results;
