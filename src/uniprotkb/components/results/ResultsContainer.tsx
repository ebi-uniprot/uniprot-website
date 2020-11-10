import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageIntro, Loader } from 'franklin-sites';

import ResultsView from './ResultsView';
import ResultsButtons from './ResultsButtons';
import ResultsFacets from './ResultsFacets';
import NoResultsPage from '../../../shared/components/error-pages/NoResultsPage';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';

import { ViewMode } from '../../state/resultsInitialState';

import { getParamsFromURL } from '../../utils/resultsUtils';

import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { getAPIQueryUrl } from '../../../shared/config/apiUrls';
import infoMappings from '../../../shared/config/InfoMappings';

import { UniProtKBColumn } from '../../types/columnTypes';
import Response from '../../types/responseTypes';
import useNS from '../../../shared/hooks/useNS';
import { Namespace } from '../../../shared/types/namespaces';
import { UniRefColumn } from '../../../uniref/config/ColumnConfiguration';

type AllColumns = UniProtKBColumn[] | UniRefColumn[];

// const getColumnsWithType = (columns: AllColumns, namespace: Namespace) => {
//   switch (namespace) {
//     case Namespace.uniprotkb:
//       return columns as UniProtKBColumn[];
//     case Namespace.uniref:
//       return columns as UniRefColumn[];
//     default:
//       return columns;
//   }
// };

const defaultTableColumns: Partial<Record<Namespace, AllColumns>> = {
  [Namespace.uniprotkb]: [
    UniProtKBColumn.accession,
    UniProtKBColumn.reviewed,
    UniProtKBColumn.id,
    UniProtKBColumn.proteinName,
    UniProtKBColumn.geneNames,
    UniProtKBColumn.organismName,
  ],
  [Namespace.uniref]: [UniRefColumn.id, UniRefColumn.name],
};

const Results: FC = () => {
  const namespace = useNS();

  // getColumnsWithType(state.results.tableColumns[namespace], namespace);

  const { search: queryParamFromUrl } = useLocation();
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );

  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>(
    'view-mode',
    ViewMode.CARD
  );
  const [tableColumns] = useLocalStorage<AllColumns>(
    `table columns for ${namespace}`,
    namespace ? defaultTableColumns[namespace] : []
  );

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
