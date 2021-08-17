import { FC, useState, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';
import {
  Button,
  DownloadIcon,
  ReSubmitIcon,
  SlidingPanel,
} from 'franklin-sites';

import BlastButton from '../../shared/components/action-buttons/Blast';
import AlignButton from '../../shared/components/action-buttons/Align';
import AddToBasketButton from '../../shared/components/action-buttons/AddToBasket';
import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';

import { serverParametersToFormParameters } from '../adapters/parameters';

import { jobTypeToPath } from '../../app/config/urls';
import uniProtKBApiUrls, { getSuggesterUrl } from '../../shared/config/apiUrls';

import fetchData from '../../shared/utils/fetchData';
import lazy from '../../shared/utils/lazy';

import { PublicServerParameters } from '../types/toolsServerParameters';
import { Suggestions } from '../../query-builder/components/AutocompleteWrapper';
import { JobTypes } from '../types/toolsJobTypes';

type ResubmitButtonProps<T extends JobTypes> = {
  jobType: T;
  inputParamsData?: PublicServerParameters[T];
};

export const ResubmitButton: FC<ResubmitButtonProps<JobTypes>> = ({
  jobType,
  inputParamsData,
}) => {
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);

  const handleClick = async () => {
    if (!inputParamsData) {
      return;
    }

    setDisabled(true);

    const taxonMapping = new Map();
    if ('taxids' in inputParamsData || 'negative_taxids' in inputParamsData) {
      const taxonRequests = [
        ...(inputParamsData.taxids || '').split(','),
        ...(inputParamsData.negative_taxids || '').split(','),
      ].map((id) => {
        const idCleaned = id.trim();
        if (!idCleaned) {
          return;
        }
        // eslint-disable-next-line consistent-return
        return fetchData<Suggestions>(
          getSuggesterUrl(uniProtKBApiUrls.organismSuggester, idCleaned)
        ).then((response) => {
          const firstSuggestion = response?.data?.suggestions?.[0]?.value;
          if (firstSuggestion) {
            taxonMapping.set(
              idCleaned,
              `${firstSuggestion.replace(/ *\([^)]*\) */g, '')} [${idCleaned}]`
            );
          }
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

const ResultButtons: FC<ResultButtonsProps<JobTypes>> = ({
  jobType,
  jobId,
  selectedEntries,
  inputParamsData,
  nHits,
  isTableResultsFiltered,
}) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback={null}>
          <SlidingPanel
            position="left"
            onClose={() => setDisplayDownloadPanel(false)}
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
        <AlignButton selectedEntries={selectedEntries} />
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
        <ResubmitButton inputParamsData={inputParamsData} jobType={jobType} />
      </div>
    </>
  );
};

export default ResultButtons;
