import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { PageIntro, Loader } from 'franklin-sites';

import ResultsView from './ResultsView';
import ResultsButtons from './ResultsButtons';
import ResultsFacets from './ResultsFacets';
import NoResultsPage from '../error-pages/NoResultsPage';
import ErrorHandler from '../error-pages/ErrorHandler';
import SideBarLayout from '../layouts/SideBarLayout';

import useItemSelect from '../../hooks/useItemSelect';

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';

import useDataApiWithStale from '../../hooks/useDataApiWithStale';
import useNS from '../../hooks/useNS';

import infoMappings from '../../config/InfoMappings';

import { Namespace } from '../../types/namespaces';
import Response from '../../../uniprotkb/types/responseTypes';

import './styles/results-table.scss';
import useNSQuery from '../../hooks/useNSQuery';

export enum ViewMode {
  TABLE,
  CARD,
}

const Results: FC = () => {
  const namespace = useNS() || Namespace.uniprotkb;
  const { search: queryParamFromUrl } = useLocation();
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );
  const [selectedEntries, handleEntrySelection] = useItemSelect();

  const { url: initialApiUrl } = useNSQuery({ size: 0 });

  const {
    data,
    error,
    loading,
    progress,
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
          query={query}
          selectedFacets={selectedFacets}
          selectedEntries={selectedEntries}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          total={total || 0}
        />
      }
      sidebar={
        loading && !data?.facets ? (
          <Loader progress={progress} />
        ) : (
          <ResultsFacets facets={data?.facets || []} isStale={isStale} />
        )
      }
    >
      <ResultsView
        handleEntrySelection={handleEntrySelection}
        selectedEntries={selectedEntries}
      />
    </SideBarLayout>
  );
};

export default Results;
