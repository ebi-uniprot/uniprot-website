import { ExpandableList, HeroContainer } from 'franklin-sites';

import ResultsData from '../../../../shared/components/results/ResultsData';
import ResultsButtons from '../../../../shared/components/results/ResultsButtons';

import { IDMappingFromContext } from './FromColumn';

import useItemSelect from '../../../../shared/hooks/useItemSelect';

import { rawDBToNamespace } from '../../utils';

import { Namespace } from '../../../../shared/types/namespaces';
import { PaginatedResults } from '../../../../shared/hooks/usePagination';
import { MappingDetails } from '../../types/idMappingSearchResults';

type IDMappingResultTableProps = {
  namespaceOverride: Namespace;
  resultsDataObject: PaginatedResults;
  detailsData?: MappingDetails;
};

const IDMappingResultTable = ({
  namespaceOverride,
  resultsDataObject,
  detailsData,
}: IDMappingResultTableProps) => {
  const [selectedEntries, setSelectedItemFromEvent, setSelectedEntries] =
    useItemSelect();
  return (
    <>
      <ResultsButtons
        total={resultsDataObject.total || 0}
        loadedTotal={resultsDataObject.allResults.length}
        selectedEntries={selectedEntries}
        namespaceOverride={namespaceOverride}
        disableCardToggle
        // TODO: remove this replace hack
        base={detailsData?.redirectURL?.replace(
          'https://rest.uniprot.org',
          'https://rest.uniprot.org/beta'
        )}
        notCustomisable={namespaceOverride === Namespace.idmapping}
      />
      {resultsDataObject.failedIds && (
        <HeroContainer>
          <strong>{resultsDataObject.failedIds.length}</strong> ID
          {resultsDataObject.failedIds.length === 1 ? ' is' : 's were'} not
          mapped:
          <ExpandableList descriptionString="ids" numberCollapsedItems={0}>
            {resultsDataObject.failedIds}
          </ExpandableList>
        </HeroContainer>
      )}
      <IDMappingFromContext.Provider
        value={rawDBToNamespace(detailsData?.from)}
      >
        <ResultsData
          resultsDataObject={resultsDataObject}
          setSelectedItemFromEvent={
            // No selection when not a UniProt target
            namespaceOverride === Namespace.idmapping
              ? undefined
              : setSelectedItemFromEvent
          }
          setSelectedEntries={
            // No selection when not a UniProt target
            namespaceOverride === Namespace.idmapping
              ? undefined
              : setSelectedEntries
          }
          namespaceOverride={namespaceOverride}
          displayIdMappingColumns
          disableCardToggle
        />
      </IDMappingFromContext.Provider>
    </>
  );
};

export default IDMappingResultTable;
