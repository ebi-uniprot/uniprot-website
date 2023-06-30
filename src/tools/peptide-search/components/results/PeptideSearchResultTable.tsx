import ResultsButtons from '../../../../shared/components/results/ResultsButtons';
import ResultsData from '../../../../shared/components/results/ResultsData';

import useItemSelect from '../../../../shared/hooks/useItemSelect';

import { APIModel } from '../../../../shared/types/apiModel';

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
};

const PeptideSearchResultTable = ({
  total,
  resultsDataObject,
  accessions,
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
        displayPeptideSearchMatchColumns
      />
    </>
  );
};

export default PeptideSearchResultTable;
