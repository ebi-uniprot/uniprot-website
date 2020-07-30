import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { Loader, PageIntro, Tabs, Tab } from 'franklin-sites';

import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
// import BlastResultButtons from './BlastResultButtons';

import useDataApi, {
  UseDataAPIState,
} from '../../../../shared/hooks/useDataApi';

import inputParamsXMLToObject from '../../../blast/adapters/inputParamsXMLToObject';

import { Location, LocationToPath } from '../../../../app/config/urls';
import toolsURLs from '../../../config/urls';

import { AlignResults } from '../../types/alignResults';
import { JobTypes } from '../../../types/toolsJobTypes';
import { PublicServerParameters } from '../../types/alignServerParameters';

const alignUrls = toolsURLs(JobTypes.ALIGN);

// overview
// const AlignResultOverview = lazy(() =>
//   import(/* webpackChunkName: "align-overview" */ './AlignResultOverview')
// );
// phylogenetic-tree
// const AlignResultPhyloTree = lazy(() =>
//   import(/* webpackChunkName: "align-phylotree" */ './AlignResultPhyloTree')
// );
// percent-identity-matrix
// const AlignResultPIM = lazy(() =>
//   import(/* webpackChunkName: "align-pim" */ './AlignResultPIM')
// );
// text-output
const TextOutput = lazy(() =>
  import(/* webpackChunkName: "text-output" */ '../../../components/TextOutput')
);
// tool-input
const ToolInput = lazy(() =>
  import(/* webpackChunkName: "tool-input" */ '../../../components/ToolInput')
);

enum TabLocation {
  Overview = 'overview',
  PhyloTree = 'phylogenetic-tree',
  PIM = 'percent-identity-matrix',
  TextOutput = 'text-output',
  ToolInput = 'tool-input',
}

type Match = {
  params: {
    id: string;
    subPage?: TabLocation;
  };
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
    alignUrls.resultUrl(id, 'submission')
  );
  const sequenceData = useDataApi<string>(alignUrls.resultUrl(id, 'sequence'));

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

const AlignResult = () => {
  const history = useHistory();
  const match = useRouteMatch(LocationToPath[Location.AlignResult]) as Match;

  // const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  // if URL doesn't finish with "overview" redirect to /overview by default
  useEffect(() => {
    if (!match.params.subPage) {
      history.replace(
        history.createHref({
          ...history.location,
          pathname: `${history.location.pathname}/${TabLocation.Overview}`,
        })
      );
    }
  }, [match.params.subPage, history]);

  // get data from the blast endpoint
  const { loading, data, error, status } = useDataApi<AlignResults>(
    alignUrls.resultUrl(match.params.id, 'aln-clustal_num')
  );

  // get data from accessions endpoint with facets applied
  // const { loading: accessionsLoading, data: accessionsData } = useDataApi<
  //   Response['data']
  // >(
  //   useMemo(
  //     () =>
  //       getAccessionsURL(accessionsFilteredByLocalFacets, {
  //         selectedFacets: urlParams.selectedFacets,
  //         facets: [],
  //       }),
  //     [accessionsFilteredByLocalFacets, urlParams.selectedFacets]
  //   )
  // );

  const inputParamsData = useParamsData(match.params.id);

  // Note: this function is duplicated in ResultsContainer.tsx
  // const handleSelectedEntries = (rowId: string) => {
  //   const filtered = selectedEntries.filter((id) => id !== rowId);
  //   setSelectedEntries(
  //     filtered.length === selectedEntries.length
  //       ? [...selectedEntries, rowId]
  //       : filtered
  //   );
  // };

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} />;
  }

  // const actionBar = (
  //   <BlastResultButtons
  //     jobId={match.params.id}
  //     selectedEntries={selectedEntries}
  //     inputParamsData={inputParamsData.data}
  //     nHits={blastData.hits.length}
  //     isTableResultsFiltered={
  //       typeof data?.hits.length !== 'undefined' &&
  //       data?.hits.length !== blastData.hits.length
  //     }
  //   />
  // );
  const actionBar = '<AlignResultButtons>';

  return (
    <SingleColumnLayout>
      <PageIntro title="Align Results" />
      <Tabs active={match.params.subPage}>
        <Tab
          id={TabLocation.Overview}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/align/${match.params.id}/${TabLocation.Overview}`,
              })}
            >
              Overview
            </Link>
          }
        >
          {actionBar}
          <Suspense fallback={<Loader />}>
            {data}
            {/* <AlignResultOverview /> */}
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.PhyloTree}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/align/${match.params.id}/${TabLocation.PhyloTree}`,
              })}
            >
              Phylogenetic Tree
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>
            {/* <AlignResultPhyloTree /> */}
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.PIM}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/align/${match.params.id}/${TabLocation.PIM}`,
              })}
            >
              Percent Identity Matrix
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>{/* <AlignResultPIM /> */}</Suspense>
        </Tab>
        <Tab
          id={TabLocation.TextOutput}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/align/${match.params.id}/${TabLocation.TextOutput}`,
              })}
            >
              Text Output
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>
            {data}
            <TextOutput id={match.params.id} jobType={JobTypes.ALIGN} />
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.ToolInput}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/align/${match.params.id}/${TabLocation.ToolInput}`,
              })}
            >
              Tool Input
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>
            <ToolInput
              id={match.params.id}
              jobType={JobTypes.ALIGN}
              inputParamsData={inputParamsData}
            />
          </Suspense>
        </Tab>
      </Tabs>
    </SingleColumnLayout>
  );
};

export default AlignResult;
