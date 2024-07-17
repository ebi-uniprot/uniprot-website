import { useState, Suspense } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { sleep } from 'timing-functions';
import {
  Button,
  DownloadIcon,
  ReSubmitIcon,
  SlidingPanel,
} from 'franklin-sites';

import BlastButton from '../../shared/components/action-buttons/Blast';
import AlignButton from '../../shared/components/action-buttons/Align';
import MapIDButton from '../../shared/components/action-buttons/MapID';
import AddToBasketButton from '../../shared/components/action-buttons/AddToBasket';
import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';
import CustomiseButton from '../../shared/components/action-buttons/CustomiseButton';

import { serverParametersToFormParameters } from '../adapters/parameters';

import { jobTypeToPath } from '../../app/config/urls';
import apiUrls from '../../shared/config/apiUrls/apiUrls';

import fetchData from '../../shared/utils/fetchData';
import lazy from '../../shared/utils/lazy';

import { PublicServerParameters } from '../types/toolsServerParameters';
import { TaxonomyAPIModel } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { JobTypes } from '../types/toolsJobTypes';
import { Namespace } from '../../shared/types/namespaces';

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
        // eslint-disable-next-line consistent-return
        return fetchData<TaxonomyAPIModel>(url).then((response) => {
          const taxonName = `${response?.data?.scientificName} [${idCleaned}]`;
          taxonMapping.set(idCleaned, taxonName);
        });
      });

      try {
        // wait up to 2 seconds to get the information
        await Promise.race([Promise.all(taxonRequests), sleep(2000)]);
      } catch (_) {
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
        <BlastButton selectedEntries={selectedEntries} />
        <AlignButton
          selectedEntries={selectedEntries}
          inputParamsData={inputParamsData}
        />
        <MapIDButton selectedEntries={selectedEntries} namespace={namespace} />
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
