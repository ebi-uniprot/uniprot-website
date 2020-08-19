import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { Loader, PageIntro, Tabs, Tab } from 'franklin-sites';

import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import ResultButtons from '../../../components/ResultButtons';

import useDataApi, {
  UseDataAPIState,
} from '../../../../shared/hooks/useDataApi';

import inputParamsXMLToObject from '../../../blast/adapters/inputParamsXMLToObject';

import { Location, LocationToPath } from '../../../../app/config/urls';
import toolsURLs from '../../../config/urls';

import { AlignResults } from '../../types/alignResults';
import { JobTypes } from '../../../types/toolsJobTypes';
import { PublicServerParameters } from '../../types/alignServerParameters';

import '../../../styles/ToolsResult.scss';

const alignUrls = toolsURLs(JobTypes.ALIGN);

// overview
// const AlignResultOverview = lazy(() =>
//   import(/* webpackChunkName: "align-overview" */ './AlignResultOverview')
// );
// phylogenetic-tree
const AlignResultPhyloTree = lazy(() =>
  import(/* webpackChunkName: "align-phylotree" */ './AlignResultPhyloTree')
);
// percent-identity-matrix
const AlignResultPIM = lazy(() =>
  import(/* webpackChunkName: "align-pim" */ './AlignResultPIM')
);
// text-output
const TextOutput = lazy(() =>
  import(/* webpackChunkName: "text-output" */ '../../../components/TextOutput')
);
// input-parameters
const InputParameters = lazy(() =>
  import(
    /* webpackChunkName: "input-parameters" */ '../../../components/InputParameters'
  )
);

enum TabLocation {
  Overview = 'overview',
  PhyloTree = 'phylogenetic-tree',
  PIM = 'percent-identity-matrix',
  TextOutput = 'text-output',
  InputParameters = 'input-parameters',
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

  // TODO: remove all those when we start using 'setSelectedEntries'
  // eslint-disable-next-line
  // @ts-ignore
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]); // eslint-disable-line

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

  const actionBar = (
    <ResultButtons
      jobType={JobTypes.ALIGN}
      jobId={match.params.id}
      selectedEntries={selectedEntries}
      inputParamsData={inputParamsData.data}
    />
  );

  return (
    <SingleColumnLayout className="tools-result">
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
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <pre>{data}</pre>
              {/* <AlignResultOverview 
              selectedEntries={selectedEntries}
              handleSelectedEntries={handleSelectedEntries}
            /> */}
            </Suspense>
          </ErrorBoundary>
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
          {actionBar}
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <AlignResultPhyloTree id={match.params.id} />
            </Suspense>
          </ErrorBoundary>
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
          {actionBar}
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <AlignResultPIM id={match.params.id} />
            </Suspense>
          </ErrorBoundary>
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
          {actionBar}
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <TextOutput id={match.params.id} jobType={JobTypes.ALIGN} />
            </Suspense>
          </ErrorBoundary>
        </Tab>
        <Tab
          id={TabLocation.InputParameters}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/align/${match.params.id}/${TabLocation.InputParameters}`,
              })}
            >
              Input Parameters
            </Link>
          }
        >
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <InputParameters
                id={match.params.id}
                jobType={JobTypes.ALIGN}
                inputParamsData={inputParamsData}
              />
            </Suspense>
          </ErrorBoundary>
        </Tab>
      </Tabs>
    </SingleColumnLayout>
  );
};

export default AlignResult;
