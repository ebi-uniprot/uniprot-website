import { Loader, PageIntro } from 'franklin-sites';
import { useRouteMatch } from 'react-router-dom';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../../shared/hooks/useDataApi';

import toolsURLs from '../../../config/urls';

import { JobTypes } from '../../../types/toolsJobTypes';
import { IDMappingNamespace } from '../../types/idMappingServerParameters';
import { Location, LocationToPath } from '../../../../app/config/urls';
import { Namespace } from '../../../../shared/types/namespaces';
import { UniParcAPIModel } from '../../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefAPIModel } from '../../../../uniref/adapters/uniRefConverter';
import NoResultsPage from '../../../../shared/components/error-pages/NoResultsPage';
import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
// import ResultsButtons from '../../../../shared/components/results/ResultsButtons';
// import ResultsFacets from '../../../../shared/components/results/ResultsFacets';
import useItemSelect from '../../../../shared/hooks/useItemSelect';
// import infoMappings from '../../../../shared/config/InfoMappings';
// import { getSortableColumnToSortColumn } from '../../../../uniprotkb/utils/resultsUtils';
import ResultsView from './ResultsView';

const jobType = JobTypes.ID_MAPPING;
const urls = toolsURLs(jobType);

type IDMappingResultAPI = {
  from: string;
  to: string | UniProtkbAPIModel | UniParcAPIModel | UniRefAPIModel;
}[];

// TODO Note: this should come from the url. That means storing the namespace
// information with the job id - either at submission, or when the status tells us
const getToNamespace = (results: IDMappingResultAPI): IDMappingNamespace => {
  const firstItem = results[0];
  if ((firstItem.to as UniProtkbAPIModel).primaryAccession) {
    return Namespace.uniprotkb;
  }
  if ((firstItem.to as UniRefAPIModel).id) {
    return Namespace.uniref;
  }
  if ((firstItem.to as UniParcAPIModel).uniParcId) {
    return Namespace.uniparc;
  }
  return undefined;
};

const IDMappingResult = () => {
  //   const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const match = useRouteMatch<{ id: string }>(
    LocationToPath[Location.IDMappingResult]
  )!;

  const [selectedEntries, handleEntrySelection] = useItemSelect();

  // get data from the idmapping endpoint
  const { loading, data, error, status, headers } = useDataApi<{
    results: IDMappingResultAPI;
  }>(urls.resultUrl(match?.params.id || '', {}));

  if (loading) {
    return <Loader />;
  }

  if (error || !data || !match) {
    return <ErrorHandler status={status} />;
  }

  // identify the type of "to" data
  const { results } = data;
  const idMappingNamespace = getToNamespace(results);

  const total = headers?.['x-totalrecords']
    ? +headers['x-totalrecords']
    : undefined;

  // no results if total is 0, or if not loading anymore and still no total info
  if (total === 0 || !(total || loading)) {
    return <NoResultsPage />;
  }

  // Facets
  // Note: this could be in its own component which is
  // then passed to sidebar below.
  switch (idMappingNamespace) {
    case Namespace.uniprotkb:
      break;
    case Namespace.uniref:
      break;
    case Namespace.uniparc:
      break;
    default:
      break;
  }

  return (
    <SideBarLayout
      title={<PageIntro title="ID Mapping results" resultsCount={total} />}
      // actionButtons={
      //   <ResultsButtons
      //     query={query}
      //     selectedFacets={selectedFacets}
      //     selectedEntries={selectedEntries}
      //     sortColumn={sortColumn}
      //     sortDirection={sortDirection}
      //     total={total || 0}
      //   />
      // }
      sidebar="sidebar content"
      // loading && !data?.facets ? (
      //   <Loader progress={progress} />
      // ) : (
      //   <ResultsFacets facets={data?.facets || []} isStale={isStale} />
      // )
    >
      {' '}
      <ResultsView
        handleEntrySelection={handleEntrySelection}
        selectedEntries={selectedEntries}
        // sortableColumnToSortColumn={getSortableColumnToSortColumn}
        idMappingNamespace={idMappingNamespace}
        jobID={match?.params.id}
        jobType={jobType}
      />
    </SideBarLayout>
  );
};

export default IDMappingResult;
