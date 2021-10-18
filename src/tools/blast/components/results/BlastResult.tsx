import { useMemo, useEffect, useState, lazy, Suspense } from 'react';
import {
  Link,
  useRouteMatch,
  useHistory,
  useLocation,
  generatePath,
} from 'react-router-dom';
import { Loader, PageIntro, Tabs, Tab } from 'franklin-sites';
import cn from 'classnames';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import HSPDetailPanel, { HSPDetailPanelProps } from './HSPDetailPanel';
import BlastResultSidebar from './BlastResultSidebar';
import ResultButtons from '../../../components/ResultButtons';

import useDataApi, {
  UseDataAPIState,
} from '../../../../shared/hooks/useDataApi';
import useItemSelect from '../../../../shared/hooks/useItemSelect';
import useMarkJobAsSeen from '../../../hooks/useMarkJobAsSeen';

import {
  getParamsFromURL,
  URLResultParams,
} from '../../../../uniprotkb/utils/resultsUtils';
import {
  filterBlastDataForResults,
  filterBlastByFacets,
} from '../../utils/blastFacetDataUtils';
import { getIdKeyFor } from '../../../../shared/utils/getIdKeyForNamespace';

import inputParamsXMLToObject from '../../adapters/inputParamsXMLToObject';

import { Location, LocationToPath } from '../../../../app/config/urls';
import toolsURLs from '../../../config/urls';
import { getAccessionsURL } from '../../../../shared/config/apiUrls';

import {
  Namespace,
  namespaceAndToolsLabels,
} from '../../../../shared/types/namespaces';
import { BlastResults, BlastHit } from '../../types/blastResults';
import { JobTypes } from '../../../types/toolsJobTypes';
import { PublicServerParameters } from '../../types/blastServerParameters';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../../../uniparc/adapters/uniParcConverter';

import helper from '../../../../shared/styles/helper.module.scss';
import sticky from '../../../../shared/styles/sticky.module.scss';

const jobType = JobTypes.BLAST;
const urls = toolsURLs(jobType);
const title = `${namespaceAndToolsLabels[jobType]} results`;

// overview
const BlastResultTable = lazy(
  () => import(/* webpackChunkName: "blast-result-page" */ './BlastResultTable')
);
// taxonomy
const BlastResultTaxonomy = lazy(
  () =>
    import(
      /* webpackChunkName: "blast-result-taxonomy" */ './BlastResultTaxonomy'
    )
);
// hit-distribution
const BlastResultHitDistribution = lazy(
  () =>
    import(
      /* webpackChunkName: "blast-result-hit-distribution" */ './BlastResultHitDistribution'
    )
);
// text-output
const TextOutput = lazy(
  () =>
    import(
      /* webpackChunkName: "text-output" */ '../../../components/TextOutput'
    )
);
// input-parameters
const InputParameters = lazy(
  () =>
    import(
      /* webpackChunkName: "input-parameters" */ '../../../components/InputParameters'
    )
);
// input-parameters
const APIRequest = lazy(
  () =>
    import(
      /* webpackChunkName: "api-request" */ '../../../components/APIRequest'
    )
);

enum TabLocation {
  Overview = 'overview',
  Taxonomy = 'taxonomy',
  HitDistribution = 'hit-distribution',
  TextOutput = 'text-output',
  InputParameters = 'input-parameters',
  APIRequest = 'api-request',
}

type Params = {
  id: string;
  subPage?: TabLocation;
};

// custom hook to get data from the input parameters endpoint, input sequence
// then parse it and merge it.
// This is kinda 'faking' useDataApi for the kind of object it outputs
const useParamsData = (
  id: string
): Partial<UseDataAPIState<PublicServerParameters>> => {
  const [paramsData, setParamsData] = useState<
    Partial<UseDataAPIState<PublicServerParameters>>
  >({});

  const paramsXMLData = useDataApi<string>(
    urls.resultUrl(id, { format: 'parameters' })
  );
  const sequenceData = useDataApi<string>(
    urls.resultUrl(id, { format: 'sequence' })
  );

  useEffect(() => {
    const loading = paramsXMLData.loading || sequenceData.loading;
    const error = paramsXMLData.error || sequenceData.error;
    const status = paramsXMLData.status || sequenceData.status;
    if (loading) {
      setParamsData({ loading });
    } else if (error) {
      setParamsData({ loading, error, status });
    } else if (paramsXMLData.data && sequenceData.data) {
      setParamsData({
        loading,
        data: inputParamsXMLToObject(paramsXMLData.data, sequenceData.data),
      });
    }
  }, [paramsXMLData, sequenceData]);

  return paramsData;
};

// probably going to change with the custom endpoint to enrich data, so keep it
// here for now, enventually might be a new type in a type folder
export type EnrichedBlastHit = BlastHit & {
  extra?: UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel;
};

export interface EnrichedData extends BlastResults {
  hits: Array<EnrichedBlastHit>;
}

export const enrich = (
  blastData?: BlastResults,
  apiData?: {
    results: Array<UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel>;
  },
  namespace?: Namespace
): EnrichedData | null => {
  if (!(blastData && apiData)) {
    return null;
  }
  const output: EnrichedData = { ...blastData };
  const getIdKey = namespace && getIdKeyFor(namespace);
  output.hits = output.hits.map((hit) => {
    const extra = (apiData.results as UniProtkbAPIModel[]).find(
      (entry) => hit.hit_acc === getIdKey?.(entry)
    );
    return {
      ...hit,
      extra,
    };
  });
  return output;
};

const BlastResult = () => {
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const match = useRouteMatch<Params>(LocationToPath[Location.BlastResult])!;
  const location = useLocation();

  const [selectedEntries, setSelectedItemFromEvent] = useItemSelect();
  const [hspDetailPanel, setHspDetailPanel] =
    useState<HSPDetailPanelProps | null>();

  // if URL doesn't finish with "overview" redirect to /overview by default
  useEffect(() => {
    if (match && !match.params.subPage) {
      history.replace({
        ...history.location,
        pathname: generatePath(LocationToPath[Location.AlignResult], {
          ...match.params,
          subPage: TabLocation.Overview,
        }),
      });
    }
  }, [match, history]);

  // get data from the blast endpoint
  const {
    loading: blastLoading,
    progress: blastProgress,
    data: blastData,
    error: blastError,
    status: blastStatus,
  } = useDataApi<BlastResults>(
    urls.resultUrl(match?.params.id || '', { format: 'json' })
  );

  // extract facets and other info from URL querystring
  const urlParams: URLResultParams = useMemo(
    () => getParamsFromURL(location.search),
    [location.search]
  );

  // filter the blast results by local facets
  const hitsFilteredByLocalFacets = useMemo(
    () =>
      (blastData &&
        blastData.hits.filter(filterBlastByFacets(urlParams.selectedFacets))) ||
      [],
    [blastData, urlParams.selectedFacets]
  );

  const localFacetsChangedSelection =
    hitsFilteredByLocalFacets.length !== blastData?.hits.length;

  // accessions of the blast results filtered by local facets
  const accessionsFilteredByLocalFacets = useMemo(
    () => hitsFilteredByLocalFacets.map((hit) => hit.hit_acc),
    [hitsFilteredByLocalFacets]
  );

  let namespace = Namespace.uniprotkb;
  if (blastData?.dbs[0].name.startsWith('uniref')) {
    namespace = Namespace.uniref;
  } else if (blastData?.dbs[0].name === 'uniparc') {
    namespace = Namespace.uniparc;
  }

  // get data from accessions endpoint with facets applied
  const { loading: accessionsLoading, data: accessionsData } = useDataApi<{
    results: Array<UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel>;
  }>(
    useMemo(
      () =>
        getAccessionsURL(accessionsFilteredByLocalFacets, {
          namespace,
          selectedFacets: urlParams.selectedFacets,
          facets: [],
        }),
      [accessionsFilteredByLocalFacets, namespace, urlParams.selectedFacets]
    )
  );

  // filter BLAST results according to facets (through accession endpoint and other BLAST facets facets)
  const filteredBlastData =
    blastData &&
    urlParams &&
    filterBlastDataForResults(blastData, urlParams.selectedFacets);

  const data = useMemo(
    () => enrich(filteredBlastData || undefined, accessionsData, namespace),
    [filteredBlastData, accessionsData, namespace]
  );

  // Hits filtered out by server facets don't have "extra"
  // This could be improved by filtering things out in filteredBlastData??
  const hitsFiltered = useMemo(
    () => (data?.hits ? data.hits.filter((hit) => hit.extra) : []),
    [data]
  );

  useMarkJobAsSeen(data, match.params.id);

  const inputParamsData = useParamsData(match?.params.id || '');

  const resultTableData = useMemo<BlastResults | null>(() => {
    if (!blastData) {
      return null;
    }
    return accessionsLoading && !hitsFiltered.length
      ? blastData
      : { ...blastData, hits: hitsFiltered };
  }, [accessionsLoading, blastData, hitsFiltered]);

  if (blastLoading) {
    return <Loader progress={blastProgress} />;
  }

  if (blastError || !blastData || !match) {
    return <ErrorHandler status={blastStatus} />;
  }

  // sidebar option 1
  const facetsSidebar = (
    <ErrorBoundary>
      <BlastResultSidebar
        accessions={accessionsFilteredByLocalFacets}
        allHits={blastData.hits}
        namespace={namespace}
      />
    </ErrorBoundary>
  );

  // sidebar option 2
  const emptySidebar = (
    <div className="sidebar-layout__sidebar-content--empty" />
  );

  let sidebar: JSX.Element;
  // Deciding what should be displayed on the sidebar
  switch (match.params.subPage) {
    case TabLocation.TextOutput:
    case TabLocation.InputParameters:
    case TabLocation.APIRequest:
      sidebar = emptySidebar;
      break;

    default:
      sidebar = facetsSidebar;
      break;
  }

  const actionBar = (
    <ResultButtons
      jobType={jobType}
      jobId={match.params.id}
      selectedEntries={selectedEntries}
      inputParamsData={inputParamsData.data}
      nHits={blastData.hits.length}
      isTableResultsFiltered={blastData?.hits.length !== hitsFiltered.length}
    />
  );

  return (
    <SideBarLayout
      title={<PageIntro title={title} resultsCount={hitsFiltered.length} />}
      sidebar={sidebar}
      className={sticky['sticky-tabs-container']}
    >
      <HTMLHead title={title} />
      <Tabs
        active={match.params.subPage}
        className={accessionsLoading ? helper.stale : undefined}
      >
        <Tab
          id={TabLocation.Overview}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/blast/${match.params.id}/${TabLocation.Overview}`,
              })}
            >
              Overview
            </Link>
          }
          cache
        >
          {actionBar}
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <BlastResultTable
                loading={
                  blastLoading ||
                  (localFacetsChangedSelection && accessionsLoading)
                }
                data={resultTableData}
                setSelectedItemFromEvent={setSelectedItemFromEvent}
                setHspDetailPanel={setHspDetailPanel}
                namespace={namespace}
              />
            </ErrorBoundary>
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.Taxonomy}
          className={cn({
            [helper.disabled]: namespace !== Namespace.uniprotkb,
          })}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/blast/${match.params.id}/${TabLocation.Taxonomy}`,
              })}
              tabIndex={namespace !== Namespace.uniprotkb ? -1 : undefined}
            >
              Taxonomy
            </Link>
          }
        >
          <HTMLHead title={[title, 'Taxonomy']} />
          {actionBar}
          <BlastResultTaxonomy data={data} />
        </Tab>
        <Tab
          id={TabLocation.HitDistribution}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/blast/${match.params.id}/${TabLocation.HitDistribution}`,
              })}
            >
              Hit Distribution
            </Link>
          }
        >
          <HTMLHead title={[title, 'Hit Distribution']} />
          {actionBar}
          <BlastResultHitDistribution
            loading={blastLoading || accessionsLoading}
            allHits={blastData?.hits || []}
            filteredHits={hitsFiltered}
          />
        </Tab>
        <Tab
          id={TabLocation.TextOutput}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/blast/${match.params.id}/${TabLocation.TextOutput}`,
              })}
            >
              Text Output
            </Link>
          }
        >
          <HTMLHead title={[title, 'Text Output']} />
          <Suspense fallback={<Loader />}>
            <TextOutput id={match.params.id} jobType={jobType} />
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.InputParameters}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/blast/${match.params.id}/${TabLocation.InputParameters}`,
              })}
            >
              Input Parameters
            </Link>
          }
        >
          <HTMLHead title={[title, 'Input Parameters']} />
          <Suspense fallback={<Loader />}>
            <InputParameters
              id={match.params.id}
              inputParamsData={inputParamsData}
              jobType={jobType}
            />
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.APIRequest}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/blast/${match.params.id}/${TabLocation.APIRequest}`,
              })}
            >
              API Request
            </Link>
          }
        >
          <HTMLHead title={[title, 'API Request']} />
          <Suspense fallback={<Loader />}>
            <APIRequest jobType={jobType} inputParamsData={inputParamsData} />
          </Suspense>
        </Tab>
      </Tabs>
      {hspDetailPanel && (
        <HSPDetailPanel
          {...hspDetailPanel}
          onClose={() => setHspDetailPanel(null)}
          loading={accessionsLoading}
        />
      )}
    </SideBarLayout>
  );
};

export default BlastResult;
