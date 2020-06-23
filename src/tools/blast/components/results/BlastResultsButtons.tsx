import React, { FC, lazy, useState, Suspense } from 'react';
import { v1 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sleep } from 'timing-functions';
import { DownloadIcon, BasketIcon, ReSubmitIcon } from 'franklin-sites';

import SidePanel from '../../../../shared/components/layouts/SidePanel';

import { serverParametersToFormParameters } from '../../adapters/BlastParametersAdapter';

import { LocationToPath, Location } from '../../../../app/config/urls';
import uniProtKBApiUrls, {
  getSuggesterUrl,
} from '../../../../uniprotkb/config/apiUrls';

import fetchData from '../../../../shared/utils/fetchData';

import { addMessage } from '../../../../messages/state/messagesActions';

import { PublicServerParameters } from '../../types/blastServerParameters';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import {
  MessageFormat,
  MessageLevel,
} from '../../../../messages/types/messagesTypes';
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

type BlastButtonProps = {
  selectedEntries: string[];
};

const BlastButton: FC<BlastButtonProps> = ({ selectedEntries }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(false);

  const handleClick = async () => {
    if (selectedEntries.length !== 1) {
      return;
    }

    setDisabled(true);

    const [accession] = selectedEntries;

    try {
      const response = await fetchData<UniProtkbAPIModel>(
        uniProtKBApiUrls.entry(accession)
      );
      const entry = response.data;

      // build FASTA
      let sequence = entry.sequence.value;
      const db = entry.entryType.includes('unreviewed') ? 'tr' : 'sp';
      let optionalProteinName = '';
      if (entry?.proteinDescription?.recommendedName?.fullName) {
        optionalProteinName = `${entry.proteinDescription.recommendedName.fullName.value} `;
      }
      let optionalOS = '';
      if (entry?.organism?.scientificName) {
        optionalOS = `OS=${entry.organism.scientificName} `;
      }
      let optionalOX = '';
      if (entry?.organism?.taxonId) {
        optionalOX = `OX=${entry.organism.taxonId} `;
      }
      let optionalGN = '';
      if (entry.genes?.[0]?.geneName?.value) {
        optionalGN = `GN=${entry.genes[0].geneName.value} `;
      }
      const pe = entry.proteinExistence[0];
      let optionalSV = '';
      if (entry?.entryAudit?.sequenceVersion) {
        optionalSV = `SV=${entry.entryAudit.sequenceVersion} `;
      }
      sequence = `>${db}|${entry.primaryAccession}|${entry.uniProtkbId} ${optionalProteinName}${optionalOS}${optionalOX} ${optionalGN}PE=${pe}${optionalSV}\n${sequence}`;

      history.push(LocationToPath[Location.Blast], {
        parameters: { sequence },
      });
    } catch (err) {
      setDisabled(false);

      if (!(err instanceof Error)) {
        return;
      }

      dispatch(
        addMessage({
          id: v1(),
          content: err.message,
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
        })
      );
    }
  };

  return (
    <button
      type="button"
      className="button tertiary"
      disabled={selectedEntries.length !== 1 || disabled}
      onClick={handleClick}
    >
      Blast
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
        <button
          type="button"
          className="button tertiary"
          disabled={selectedEntries.length <= 1}
        >
          Align
        </button>
        <button
          type="button"
          className="button tertiary"
          onClick={() => setDisplayDownloadPanel(!displayDownloadPanel)}
        >
          <DownloadIcon />
          Download
        </button>
        <button
          type="button"
          className="button tertiary"
          disabled={selectedEntries.length <= 0}
        >
          <BasketIcon />
          Add
        </button>
        <ResubmitButton inputParamsData={inputParamsData} />
      </div>
    </>
  );
};

export default BlastResultsButtons;
