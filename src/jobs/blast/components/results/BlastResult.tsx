import cn from 'classnames';
import { Loader, PageIntro, Tab, Tabs } from 'franklin-sites';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Except } from 'type-fest';

import {
  blastNamespaces,
  changePathnameOnly,
  Location,
} from '../../../../app/config/urls';
import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../../shared/components/HTMLHead';
import { SidebarLayout } from '../../../../shared/components/layouts/SideBarLayout';
import sidebarStyles from '../../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import useColumnNames from '../../../../shared/hooks/useColumnNames';
import useDataApi, {
  UseDataAPIState,
} from '../../../../shared/hooks/useDataApi';
import useItemSelect from '../../../../shared/hooks/useItemSelect';
import useMatchWithRedirect from '../../../../shared/hooks/useMatchWithRedirect';
import helper from '../../../../shared/styles/helper.module.scss';
import {
  Namespace,
  namespaceAndToolsLabels,
} from '../../../../shared/types/namespaces';
import { SearchResults } from '../../../../shared/types/results';
import { getIdKeyForData } from '../../../../shared/utils/getIdKey';
import { UniParcAPIModel } from '../../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';
import { UniRefLiteAPIModel } from '../../../../uniref/adapters/uniRefConverter';
import ResultButtons from '../../../components/ResultButtons';
import toolsURLs from '../../../config/urls';
import useMarkJobAsSeen from '../../../hooks/useMarkJobAsSeen';
import { JobTypes } from '../../../types/jobTypes';
import inputParamsXMLToObject from '../../adapters/inputParamsXMLToObject';
import { BlastHit, BlastResults } from '../../types/blastResults';
import { PublicServerParameters } from '../../types/blastServerParameters';
import {
  filterBlastByFacets,
  filterBlastDataForResults,
} from '../../utils/blastFacetDataUtils';
import BlastResultSidebar from './BlastResultSidebar';
import HSPDetailPanel, { HSPDetailPanelProps } from './HSPDetailPanel';

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
  namespace?: (typeof blastNamespaces)[number];
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

type ApiData = SearchResults<
  UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel
>;

const enrich = (
  blastData?: BlastResults,
  apiData?: ApiData
): EnrichedData | null => {
  if (!(blastData && apiData?.results?.[0])) {
    return null;
  }
  const output: EnrichedData = { ...blastData };
  const getIdKey = getIdKeyForData(apiData.results[0]);
  output.hits = output.hits.map((hit) => {
    const extra = (apiData.results as UniProtkbAPIModel[]).find(
      (entry) => hit.hit_acc === getIdKey(entry)
    );
    return {
      ...hit,
      extra,
    };
  });
  return output;
};

const BlastResult = () => {
  const location = useLocation();

  const match = useMatchWithRedirect<Params>(Location.BlastResult, TabLocation);

  const [hspDetailPanel, setHspDetailPanel] = useState<Except<
    HSPDetailPanelProps,
    'namespace'
  > | null>();

  const [{ query }] = getParamsFromURL(location.search);

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
  const [urlParams] = useMemo(
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
  if (location.pathname.includes('uniref')) {
    namespace = Namespace.uniref;
  } else if (location.pathname.includes('uniparc')) {
    namespace = Namespace.uniparc;
  }

  const { columnNames: columns } = useColumnNames({
    namespaceOverride: namespace,
  });

  // get data from accessions endpoint with search applied
  const { loading: accessionsLoading, data: accessionsData } =
    useDataApi<ApiData>(
      useMemo(
        () =>
          apiUrls.search.accessions(accessionsFilteredByLocalFacets, {
            namespace,
            selectedFacets: urlParams.selectedFacets,
            facets: [],
            // TODO: after 2023_04 released, remove "|| '*'" below and see if a
            // BLAST against UniRef returning isoforms UniRef entries still work
            query: query || '*',
            columns: columns.filter((x: string | boolean): x is string =>
              Boolean(x)
            ),
          }),
        [
          accessionsFilteredByLocalFacets,
          columns,
          namespace,
          query,
          urlParams.selectedFacets,
        ]
      )
    );

  const loading =
    blastLoading || (localFacetsChangedSelection && accessionsLoading);

  const [selectedEntries, setSelectedItemFromEvent] = useItemSelect(loading);

  // filter BLAST results according to facets (through accession endpoint and other BLAST facets facets)
  const filteredBlastData =
    blastData &&
    urlParams &&
    filterBlastDataForResults(blastData, urlParams.selectedFacets);

  const data = useMemo(
    () => enrich(filteredBlastData || undefined, accessionsData),
    [filteredBlastData, accessionsData]
  );

  // Hits filtered out by server facets don't have "extra"
  // This could be improved by filtering things out in filteredBlastData??
  const hitsFiltered = useMemo(
    () => (data?.hits ? data.hits.filter((hit) => hit.extra) : []),
    [data]
  );

  useMarkJobAsSeen(data, match?.params.id);

  const inputParamsData = useParamsData(match?.params.id || '');

  const resultTableData = useMemo<BlastResults | null>(() => {
    if (!blastData || accessionsLoading || !hitsFiltered.length) {
      return null;
    }
    return { ...blastData, hits: hitsFiltered };
  }, [accessionsLoading, blastData, hitsFiltered]);

  if (blastLoading) {
    return <Loader progress={blastProgress} />;
  }

  if (blastError || !blastData || !match) {
    return <ErrorHandler status={blastStatus} error={blastError} fullPage />;
  }

  let sidebar: JSX.Element;
  // Deciding what should be displayed on the sidebar
  switch (match.params.subPage) {
    case TabLocation.TextOutput:
    case TabLocation.InputParameters:
    case TabLocation.APIRequest:
      sidebar = <div className={sidebarStyles['empty-sidebar']} />;
      break;

    default:
      sidebar = (
        <ErrorBoundary>
          <BlastResultSidebar
            accessions={accessionsFilteredByLocalFacets}
            allHits={blastData.hits}
            namespace={namespace}
          />
        </ErrorBoundary>
      );
      break;
  }

  const actionBar = (
    <ResultButtons
      namespace={namespace}
      jobType={jobType}
      jobId={match.params.id}
      selectedEntries={selectedEntries}
      inputParamsData={inputParamsData.data}
      nHits={blastData.hits.length}
      isTableResultsFiltered={blastData?.hits.length !== hitsFiltered.length}
    />
  );

  const basePath = `/blast/${namespace}/${match.params.id}/`;

  return (
    <SidebarLayout sidebar={sidebar}>
      <HTMLHead title={title}>
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <PageIntro
        heading={namespaceAndToolsLabels[jobType]}
        headingPostscript={
          !loading && (
            /* Not sure why fragments and keys are needed, but otherwise gets
            the React key warnings messages and children are rendered as array */
            <small key="postscript">
              found in {namespaceAndToolsLabels[namespace]}
            </small>
          )
        }
        resultsCount={loading ? undefined : hitsFiltered.length}
      />
      <Tabs
        active={match.params.subPage}
        className={accessionsLoading ? helper.stale : undefined}
      >
        <Tab
          id={TabLocation.Overview}
          title={
            <Link to={changePathnameOnly(basePath + TabLocation.Overview)}>
              Overview
            </Link>
          }
        >
          {actionBar}
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <BlastResultTable
                loading={loading}
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
              to={changePathnameOnly(basePath + TabLocation.Taxonomy)}
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
              to={changePathnameOnly(basePath + TabLocation.HitDistribution)}
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
            <Link to={changePathnameOnly(basePath + TabLocation.TextOutput)}>
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
              to={changePathnameOnly(basePath + TabLocation.InputParameters)}
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
            <Link to={changePathnameOnly(basePath + TabLocation.APIRequest)}>
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
          namespace={namespace}
          onClose={() => setHspDetailPanel(null)}
        />
      )}
    </SidebarLayout>
  );
};

export default BlastResult;
