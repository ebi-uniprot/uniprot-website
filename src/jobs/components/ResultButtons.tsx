import {
  Button,
  DownloadIcon,
  ReSubmitIcon,
  SlidingPanel,
} from 'franklin-sites';
import { ReactNode, Suspense, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { sleep } from 'timing-functions';

import { jobTypeToPath } from '../../app/config/urls';
import AddToBasketButton from '../../shared/components/action-buttons/AddToBasket';
import AlignButton from '../../shared/components/action-buttons/Align';
import CustomiseButton from '../../shared/components/action-buttons/CustomiseButton';
import ToolsDropdown from '../../shared/components/action-buttons/ToolsDropdown';
import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';
import apiUrls from '../../shared/config/apiUrls/apiUrls';
import { Namespace } from '../../shared/types/namespaces';
import fetchData from '../../shared/utils/fetchData';
import lazy from '../../shared/utils/lazy';
import { pluralise } from '../../shared/utils/utils';
import { TaxonomyAPIModel } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { serverParametersToFormParameters } from '../adapters/parameters';
import { PublicServerParameters } from '../types/jobsServerParameters';
import { JobTypes } from '../types/jobTypes';

type ResubmitButtonProps<T extends JobTypes> = {
  jobType: T;
  inputParamsData?: PublicServerParameters[T];
};

export const ResubmitButton = ({
  jobType,
  inputParamsData,
}: ResubmitButtonProps<JobTypes>) => {
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);

  const handleClick = async () => {
    if (!inputParamsData) {
      return;
    }

    setDisabled(true);

    const taxonMapping = new Map();
    if (
      'taxids' in inputParamsData ||
      'negative_taxids' in inputParamsData ||
      'taxId' in inputParamsData
    ) {
      const taxonRequests = [
        ...(
          (inputParamsData as PublicServerParameters[JobTypes.BLAST]).taxids ||
          ''
        ).split(','),
        ...(
          (inputParamsData as PublicServerParameters[JobTypes.BLAST])
            .negative_taxids || ''
        ).split(','),
        (
          inputParamsData as PublicServerParameters[JobTypes.ID_MAPPING]
        ).taxId?.toString() || '',
      ].map((id) => {
        const idCleaned = id.trim();
        const url = apiUrls.entry.entry(idCleaned, Namespace.taxonomy);

        if (!idCleaned || !url) {
          return;
        }

        return fetchData<TaxonomyAPIModel>(url).then((response) => {
          const taxonName = `${response?.data?.scientificName} [${idCleaned}]`;
          taxonMapping.set(idCleaned, taxonName);
        });
      });

      try {
        // wait up to 2 seconds to get the information
        await Promise.race([Promise.all(taxonRequests), sleep(2000)]);
      } catch {
        /* */
      }
    }

    const parameters = serverParametersToFormParameters(
      jobType,
      inputParamsData,
      taxonMapping
    );

    history.push(jobTypeToPath(jobType), { parameters });
  };

  return (
    <Button
      variant="tertiary"
      disabled={!inputParamsData || disabled}
      onClick={handleClick}
    >
      <ReSubmitIcon />
      Resubmit
    </Button>
  );
};

type ResultButtonsProps<T extends JobTypes> = {
  namespace: Namespace;
  jobType: T;
  jobId: string;
  selectedEntries: string[];
  inputParamsData?: PublicServerParameters[T];
  nHits?: number;
  isTableResultsFiltered?: boolean;
};

const ResultDownload = lazy(
  () => import(/* webpackChunkName: "result-download" */ './ResultDownload')
);

const ResultButtons = ({
  namespace,
  jobType,
  jobId,
  selectedEntries,
  inputParamsData,
  nHits,
  isTableResultsFiltered,
}: ResultButtonsProps<JobTypes>) => {
  const { pathname } = useLocation();
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  let align: ReactNode | ReactNode[] = (
    <AlignButton
      selectedEntries={selectedEntries}
      textSuffix={jobType === JobTypes.BLAST ? 'selected results' : undefined}
    />
  );
  if (jobType === JobTypes.BLAST) {
    align = [
      align,
      // eslint-disable-next-line react/jsx-key
      <AlignButton
        selectedEntries={selectedEntries}
        textSuffix={`selected ${pluralise(
          'result',
          selectedEntries.length
        )} with query`}
        extraSequence={
          inputParamsData && 'sequence' in inputParamsData
            ? inputParamsData.sequence
            : undefined
        }
      />,
    ];
  }

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback={null}>
          <SlidingPanel
            position="left"
            onClose={() => setDisplayDownloadPanel(false)}
            pathname={pathname}
          >
            <ErrorBoundary>
              <ResultDownload
                jobType={jobType}
                id={jobId}
                onToggleDisplay={() =>
                  setDisplayDownloadPanel((value) => !value)
                }
                nHits={nHits}
                isTableResultsFiltered={isTableResultsFiltered}
                isTableRowSelected={selectedEntries.length > 0}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
      <div className="button-group">
        <ToolsDropdown
          selectedEntries={selectedEntries}
          blast
          align={align}
          mapID
        />
        <Button
          variant="tertiary"
          onPointerOver={ResultDownload.preload}
          onFocus={ResultDownload.preload}
          onClick={() => setDisplayDownloadPanel((value) => !value)}
        >
          <DownloadIcon />
          Download
        </Button>
        <AddToBasketButton selectedEntries={selectedEntries} />
        {jobType === JobTypes.BLAST && (
          <CustomiseButton namespace={namespace} />
        )}
        <ResubmitButton inputParamsData={inputParamsData} jobType={jobType} />
      </div>
    </>
  );
};

export default ResultButtons;
