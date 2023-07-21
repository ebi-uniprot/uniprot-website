import { ExpandableList, HeroContainer, LongNumber } from 'franklin-sites';

import ResultsData from '../../../../shared/components/results/ResultsData';
import ResultsButtons from '../../../../shared/components/results/ResultsButtons';

import { IDMappingFromContext } from './FromColumn';

import useItemSelect from '../../../../shared/hooks/useItemSelect';

import { getSupportedFormats, rawDBToNamespace } from '../../utils';
import { pluralise } from '../../../../shared/utils/utils';
import splitAndTidyText from '../../../../shared/utils/splitAndTidyText';

import { Namespace } from '../../../../shared/types/namespaces';
import { PaginatedResults } from '../../../../shared/hooks/usePagination';
import { MappingDetails } from '../../types/idMappingSearchResults';
import { JobTypes } from '../../../types/toolsJobTypes';
import { PublicServerParameters } from '../../types/idMappingServerParameters';

type IDMappingResultTableProps = {
  namespaceOverride: Namespace;
  resultsDataObject: PaginatedResults;
  detailsData?: MappingDetails;
  notCustomisable?: boolean;
  inputParamsData: PublicServerParameters;
};

const IDMappingResultTable = ({
  namespaceOverride,
  resultsDataObject,
  detailsData,
  notCustomisable = false,
  inputParamsData,
}: IDMappingResultTableProps) => {
  const [selectedEntries, setSelectedItemFromEvent, setSelectedEntries] =
    useItemSelect();

  const supportedFormats = getSupportedFormats(
    resultsDataObject.allResults,
    namespaceOverride
  );

  const inputIDs = splitAndTidyText(detailsData?.ids);

  const inputLength: number = inputIDs?.length || 0;
  const failedLength: number = resultsDataObject.failedIds?.length || 0;

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
        jobType={JobTypes.ID_MAPPING}
        inputParamsData={inputParamsData}
      />
      {inputIDs && (
        <HeroContainer>
          <div>
            <strong>
              <LongNumber>{inputLength - failedLength}</LongNumber>
            </strong>{' '}
            {pluralise('ID', inputLength - failedLength)}{' '}
            {pluralise('was', inputLength - failedLength, 'were')} mapped to{' '}
            <LongNumber>{resultsDataObject.total || 0}</LongNumber>{' '}
            {pluralise('result', resultsDataObject.total || 0)}
          </div>
          {failedLength > 0 && (
            <div>
              <strong>{failedLength}</strong> ID{' '}
              {pluralise('was', failedLength, 'were')} not mapped:
              <ExpandableList descriptionString="IDs" numberCollapsedItems={0}>
                {resultsDataObject.failedIds}
              </ExpandableList>
            </div>
          )}
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
