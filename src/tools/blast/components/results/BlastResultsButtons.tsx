import React, { FC, lazy, useState, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import { DownloadIcon, BasketIcon, ReSubmitIcon } from 'franklin-sites';

import SidePanel from '../../../../shared/components/layouts/SidePanel';

import { serverParametersToFormParameters } from '../../adapters/BlastParametersAdapter';

import { LocationToPath, Location } from '../../../../app/config/urls';

import { PublicServerParameters } from '../../types/blastServerParameters';

type ResubmitButtonProps = {
  inputParamsData?: PublicServerParameters;
};

const ResubmitButton: FC<ResubmitButtonProps> = ({ inputParamsData }) => {
  const history = useHistory();

  const handleClick = () => {
    if (!inputParamsData) {
      return;
    }

    const parameters = serverParametersToFormParameters(inputParamsData);

    history.push(LocationToPath[Location.Blast], { parameters });
  };

  return (
    <button
      type="button"
      className="button tertiary"
      disabled={!inputParamsData}
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
        <button
          type="button"
          className="button tertiary"
          disabled={selectedEntries.length !== 1}
        >
          Blast
        </button>
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
