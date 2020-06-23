import React, { FC, lazy, useState, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';
import { DownloadIcon, ReSubmitIcon } from 'franklin-sites';

import SidePanel from '../../../../shared/components/layouts/SidePanel';
import BlastButton from '../../../../shared/components/action-buttons/Blast';
import AlignButton from '../../../../shared/components/action-buttons/Align';
import AddToBasketButton from '../../../../shared/components/action-buttons/AddToBasket';

import { serverParametersToFormParameters } from '../../adapters/BlastParametersAdapter';

import { LocationToPath, Location } from '../../../../app/config/urls';
import uniProtKBApiUrls, {
  getSuggesterUrl,
} from '../../../../uniprotkb/config/apiUrls';

import fetchData from '../../../../shared/utils/fetchData';

import { PublicServerParameters } from '../../types/blastServerParameters';
import { Suggestions } from '../../../../uniprotkb/components/query-builder/AutocompleteWrapper';

type ResubmitButtonProps = {
  inputParamsData?: PublicServerParameters;
};

const ResubmitButton: FC<ResubmitButtonProps> = ({ inputParamsData }) => {
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);

  const handleClick = async () => {
    if (!inputParamsData) {
      return;
    }

    setDisabled(true);

    const taxonMapping = new Map();
    const taxonRequests = (inputParamsData.taxids || '')
      .split(',')
      .map((id) => {
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

    const parameters = serverParametersToFormParameters(
      inputParamsData,
      taxonMapping
    );

    history.push(LocationToPath[Location.Blast], { parameters });
  };

  return (
    <button
      type="button"
      className="button tertiary"
      disabled={!inputParamsData || disabled}
      onClick={handleClick}
    >
      <ReSubmitIcon />
      Resubmit
    </button>
  );
};

type BlastResultsButtonsProps = {
  jobId: string;
  selectedEntries: string[];
  inputParamsData?: PublicServerParameters;
};

const BlastResultsButtons: FC<BlastResultsButtonsProps> = ({
  jobId,
  selectedEntries,
  inputParamsData,
}) => {
  const BlastResultDownload = lazy(() =>
    import(/* webpackChunkName: "blast-download" */ './BlastResultDownload')
  );

  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  return (
    <>
      {displayDownloadPanel && (
        <Suspense fallback>
          <SidePanel>
            <BlastResultDownload
              id={jobId}
              onToggleDisplay={() =>
                setDisplayDownloadPanel(!displayDownloadPanel)
              }
            />
          </SidePanel>
        </Suspense>
      )}
      <div className="button-group">
        <BlastButton selectedEntries={selectedEntries} />
        <AlignButton selectedEntries={selectedEntries} />
        <button
          type="button"
          className="button tertiary"
          onClick={() => setDisplayDownloadPanel(!displayDownloadPanel)}
        >
          <DownloadIcon />
          Download
        </button>
        <AddToBasketButton selectedEntries={selectedEntries} />
        <ResubmitButton inputParamsData={inputParamsData} />
      </div>
    </>
  );
};

export default BlastResultsButtons;
