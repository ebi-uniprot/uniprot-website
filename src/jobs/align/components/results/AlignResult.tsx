import { Loader, PageIntro, Tab, Tabs } from 'franklin-sites';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../../shared/components/layouts/SingleColumnLayout';
import useDataApi, {
  UseDataAPIState,
} from '../../../../shared/hooks/useDataApi';
import useItemSelect from '../../../../shared/hooks/useItemSelect';
import sticky from '../../../../shared/styles/sticky.module.scss';
import { namespaceAndToolsLabels } from '../../../../shared/types/namespaces';
import accessionToNamespace from '../../../../shared/utils/accessionToNamespace';
import ResultButtons from '../../../components/ResultButtons';
import toolsURLs from '../../../config/urls';
import useMarkJobAsSeen from '../../../hooks/useMarkJobAsSeen';
import { JobTypes } from '../../../types/jobTypes';
import inputParamsXMLToObject from '../../adapters/inputParamsXMLToObject';
import { AlignResults, TabLocation } from '../../types/alignResults';
import { PublicServerParameters } from '../../types/alignServerParameters';
import useSequenceInfo from '../../utils/useSequenceInfo';

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

const AlignResult = () => {
  const { id, subPage } = useParams();

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
    id && urls.resultUrl(id, { format: 'aln-clustal_num' })
  );

  const inputParamsData = useParamsData(id || '');

  const sequenceInfo = useSequenceInfo(inputParamsData.data?.sequence);

  useMarkJobAsSeen(data, id);

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error || !data || !id) {
    return <ErrorHandler status={status} error={error} fullPage />;
  }

  const actionBar = (
    <ResultButtons
      namespace={accessionToNamespace(selectedEntries[0])}
      jobType={jobType}
      jobId={id}
      selectedEntries={selectedEntries}
      inputParamsData={inputParamsData.data}
    />
  );

  return (
    <SingleColumnLayout className={sticky['sticky-tabs-container']}>
      <HTMLHead title={title}>
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <PageIntro
        heading={namespaceAndToolsLabels[jobType]}
        /* Not sure why fragments and keys are needed, but otherwise gets
        the React key warnings messages and children are rendered as array... */
        headingPostscript={<small key="postscript"> results</small>}
      />
      <Tabs active={subPage}>
        <Tab
          id={TabLocation.Overview}
          title={<Link to={`../${TabLocation.Overview}`}>Overview</Link>}
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
          title={<Link to={`../${TabLocation.Trees}`}>Trees</Link>}
        >
          <HTMLHead title={[title, 'Trees']} />
          {actionBar}
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <AlignResultTrees
                id={id}
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
            <Link to={`../${TabLocation.PIM}`}>Percent Identity Matrix</Link>
          }
        >
          <HTMLHead title={[title, 'Phylogenetic Tree']} />
          {actionBar}
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <AlignResultPIM
                id={id}
                sequenceInfo={sequenceInfo}
                selectedEntries={selectedEntries}
                handleEntrySelection={handleEntrySelection}
              />
            </Suspense>
          </ErrorBoundary>
        </Tab>
        <Tab
          id={TabLocation.TextOutput}
          title={<Link to={`../${TabLocation.TextOutput}`}>Text Output</Link>}
        >
          <HTMLHead title={[title, 'Text Output']} />
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <TextOutput id={id} jobType={jobType} />
            </Suspense>
          </ErrorBoundary>
        </Tab>
        <Tab
          id={TabLocation.InputParameters}
          title={
            <Link to={`../${TabLocation.InputParameters}`}>
              Input Parameters
            </Link>
          }
        >
          <HTMLHead title={[title, 'Input Parameters']} />
          <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <InputParameters
                id={id}
                inputParamsData={inputParamsData}
                jobType={jobType}
              />
            </Suspense>
          </ErrorBoundary>
        </Tab>
        <Tab
          id={TabLocation.APIRequest}
          title={<Link to={`../${TabLocation.APIRequest}`}>API Request</Link>}
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
