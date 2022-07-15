import { MutableRefObject } from 'react';
import ResultsButtons from '../../../../shared/components/results/ResultsButtons';
import ResultsData from '../../../../shared/components/results/ResultsData';

import useItemSelect from '../../../../shared/hooks/useItemSelect';

import { APIModel } from '../../../../shared/types/apiModel';
import { FinishedJob } from '../../../types/toolsJob';
import { JobTypes } from '../../../types/toolsJobTypes';

type PeptideSearchResultTableProps = {
  total?: number;
  resultsDataObject: {
    allResults: APIModel[];
    initialLoading: boolean;
    progress?: number | undefined;
    hasMoreData: boolean;
    handleLoadMoreRows: () => void;
    total?: number | undefined;
    failedIds?: string[] | undefined;
  };
  accessions?: string[];
  jobSubmission: MutableRefObject<FinishedJob<JobTypes.PEPTIDE_SEARCH> | null>;
};

const PeptideSearchResultTable = ({
  total,
  resultsDataObject,
  accessions,
  jobSubmission,
}: PeptideSearchResultTableProps) => {
  const [selectedEntries, setSelectedItemFromEvent, setSelectedEntries] =
    useItemSelect();

  return (
    <>
      <ResultsButtons
        total={total || 0}
        loadedTotal={resultsDataObject.allResults.length}
        selectedEntries={selectedEntries}
        accessions={accessions}
      />
      <ResultsData
        resultsDataObject={resultsDataObject}
        setSelectedItemFromEvent={setSelectedItemFromEvent}
        setSelectedEntries={setSelectedEntries}
        // TODO: change logic when peptide search API is able to return submitted jobSubmission information
        displayPeptideSearchMatchColumns={Boolean(jobSubmission.current)}
      />
    </>
  );
};

export default PeptideSearchResultTable;
