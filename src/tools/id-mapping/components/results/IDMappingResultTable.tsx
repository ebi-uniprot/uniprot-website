import { ExpandableList, HeroContainer, LongNumber } from 'franklin-sites';

import ResultsData from '../../../../shared/components/results/ResultsData';
import ResultsButtons from '../../../../shared/components/results/ResultsButtons';

import { IDMappingFromContext } from './FromColumn';

import useItemSelect from '../../../../shared/hooks/useItemSelect';

import { getSupportedFormats, rawDBToNamespace } from '../../utils';

import { Namespace } from '../../../../shared/types/namespaces';
import { PaginatedResults } from '../../../../shared/hooks/usePagination';
import { MappingDetails } from '../../types/idMappingSearchResults';

type IDMappingResultTableProps = {
  namespaceOverride: Namespace;
  resultsDataObject: PaginatedResults;
  detailsData?: MappingDetails;
  notCustomisable?: boolean;
};

const IDMappingResultTable = ({
  namespaceOverride,
  resultsDataObject,
  detailsData,
  notCustomisable = false,
}: IDMappingResultTableProps) => {
  const [selectedEntries, setSelectedItemFromEvent, setSelectedEntries] =
    useItemSelect();

  const supportedFormats = getSupportedFormats(
    resultsDataObject.allResults,
    namespaceOverride
  );

  const inputIDs = detailsData?.ids.split(',');

  return (
    <>
      <ResultsButtons
        total={resultsDataObject.total || 0}
        loadedTotal={resultsDataObject.allResults.length}
        selectedEntries={selectedEntries}
        namespaceOverride={namespaceOverride}
        disableCardToggle
        base={detailsData?.redirectURL}
        notCustomisable={
          notCustomisable || namespaceOverride === Namespace.idmapping
        }
        excludeColumns={namespaceOverride === Namespace.idmapping}
        supportedFormats={supportedFormats}
      />
      {inputIDs && (
        <HeroContainer>
          <strong>
            <LongNumber>{inputIDs.length}</LongNumber>
          </strong>{' '}
          ID
          {inputIDs.length > 1 ? 's' : ''} are mapped to{' '}
          <LongNumber>{resultsDataObject.total || 0}</LongNumber> results
        </HeroContainer>
      )}
      {resultsDataObject.failedIds && (
        <HeroContainer>
          <strong>{resultsDataObject.failedIds.length}</strong> ID
          {resultsDataObject.failedIds.length === 1 ? ' was' : 's were'} not
          mapped:
          <ExpandableList descriptionString="IDs" numberCollapsedItems={0}>
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
