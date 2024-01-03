import { useEffect, useState, lazy, Suspense, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Loader, PageIntro, Tabs, Tab } from 'franklin-sites';

import HTMLHead from '../../../../shared/components/HTMLHead';
import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import { SingleColumnLayout } from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import ResultButtons from '../../../components/ResultButtons';
import DowntimeWarning from '../../../components/DowntimeWarning';

import useDataApi, {
  UseDataAPIState,
} from '../../../../shared/hooks/useDataApi';
import useSequenceInfo from '../../utils/useSequenceInfo';
import useItemSelect from '../../../../shared/hooks/useItemSelect';
import useMarkJobAsSeen from '../../../hooks/useMarkJobAsSeen';
import useMatchWithRedirect from '../../../../shared/hooks/useMatchWithRedirect';

import inputParamsXMLToObject from '../../adapters/inputParamsXMLToObject';

import accessionToNamespace from '../../../../shared/utils/accessionToNamespace';
import { changePathnameOnly, Location } from '../../../../app/config/urls';
import toolsURLs from '../../../config/urls';
import { namespaceAndToolsLabels } from '../../../../shared/types/namespaces';

import { AlignResults } from '../../types/alignResults';
import { JobTypes } from '../../../types/toolsJobTypes';
import { PublicServerParameters } from '../../types/alignServerParameters';

import sticky from '../../../../shared/styles/sticky.module.scss';

const jobType = JobTypes.ALIGN;
const urls = toolsURLs(jobType);
const title = `${namespaceAndToolsLabels[jobType]} results`;

// overview
const AlignResultOverview = lazy(
  () => import(/* webpackChunkName: "align-overview" */ './AlignResultOverview')
);
// phylogenetic-tree
const AlignResultTrees = lazy(
  () => import(/* webpackChunkName: "align-trees" */ './AlignResultTrees')
);
// percent-identity-matrix
const AlignResultPIM = lazy(
  () => import(/* webpackChunkName: "align-pim" */ './AlignResultPIM')
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
  Trees = 'trees',
  PIM = 'percent-identity-matrix',
  TextOutput = 'text-output',
  InputParameters = 'input-parameters',
  APIRequest = 'api-request',
}

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
    urls.resultUrl(id, { format: 'submission' })
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

type Params = {
  id: string;
  subPage?: TabLocation;
};

const AlignResult = () => {
  const match = useMatchWithRedirect<Params>(Location.AlignResult, TabLocation);

  const [selectedEntries, , setSelectedEntries] = useItemSelect();
  const handleEntrySelection = useCallback(
    (entry: string) => {
      setSelectedEntries((selectedItems) =>
        selectedItems.includes(entry)
          ? selectedItems.filter((item) => item !== entry)
          : [...selectedItems, entry]
      );
    },
    [setSelectedEntries]
  );

  // get data from the align endpoint
  const { loading, data, error, status, progress } = useDataApi<AlignResults>(
    match?.params.id &&
      urls.resultUrl(match.params.id, { format: 'aln-clustal_num' })
  );

  const inputParamsData = useParamsData(match?.params.id || '');

  const sequenceInfo = useSequenceInfo(inputParamsData.data?.sequence);

  useMarkJobAsSeen(data, match?.params.id);

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error || !data || !match) {
    return <ErrorHandler status={status} />;
  }

  const actionBar = (
    <ResultButtons
      namespace={accessionToNamespace(selectedEntries[0])}
      jobType={jobType}
      jobId={match.params.id}
      selectedEntries={selectedEntries}
      inputParamsData={inputParamsData.data}
    />
  );

  const basePath = `/align/${match.params.id}/`;

  return (
    <SingleColumnLayout className={sticky['sticky-tabs-container']}>
      <HTMLHead title={title}>
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <PageIntro
        title={namespaceAndToolsLabels[jobType]}
        titlePostscript={<small> results</small>}
      />
      <DowntimeWarning>Align service</DowntimeWarning>
      <Tabs active={match.params.subPage}>
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
              <AlignResultOverview
                data={data}
                sequenceInfo={sequenceInfo}
                selectedEntries={selectedEntries}
                handleEntrySelection={handleEntrySelection}
              />
            </ErrorBoundary>
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.Trees}
          title={
            <Link to={changePathnameOnly(basePath + TabLocation.Trees)}>
              Trees
            </Link>
          }
        >
          <HTMLHead title={[title, 'Trees']} />
          {actionBar}
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <AlignResultTrees
                id={match.params.id}
                sequenceInfo={sequenceInfo}
                selectedEntries={selectedEntries}
                handleEntrySelection={handleEntrySelection}
              />
            </Suspense>
          </ErrorBoundary>
        </Tab>
        <Tab
          id={TabLocation.PIM}
          title={
            <Link to={changePathnameOnly(basePath + TabLocation.PIM)}>
              Percent Identity Matrix
            </Link>
          }
        >
          <HTMLHead title={[title, 'Phylogenetic Tree']} />
          {actionBar}
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <AlignResultPIM
                id={match.params.id}
                sequenceInfo={sequenceInfo}
                selectedEntries={selectedEntries}
                handleEntrySelection={handleEntrySelection}
              />
            </Suspense>
          </ErrorBoundary>
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
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <TextOutput id={match.params.id} jobType={jobType} />
            </Suspense>
          </ErrorBoundary>
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
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <InputParameters
                id={match.params.id}
                inputParamsData={inputParamsData}
                jobType={jobType}
              />
            </Suspense>
          </ErrorBoundary>
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
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <APIRequest jobType={jobType} inputParamsData={inputParamsData} />
            </Suspense>
          </ErrorBoundary>
        </Tab>
      </Tabs>
    </SingleColumnLayout>
  );
};

export default AlignResult;
