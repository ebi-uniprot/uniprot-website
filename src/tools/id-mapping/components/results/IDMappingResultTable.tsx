import { ExpandableList, HeroContainer, LongNumber } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../../app/config/urls';
import ResultsButtons from '../../../../shared/components/results/ResultsButtons';
import ResultsData from '../../../../shared/components/results/ResultsData';
import useItemSelect from '../../../../shared/hooks/useItemSelect';
import { PaginatedResults } from '../../../../shared/hooks/usePagination';
import { Namespace } from '../../../../shared/types/namespaces';
import splitAndTidyText from '../../../../shared/utils/splitAndTidyText';
import { stringifyQuery } from '../../../../shared/utils/url';
import { pluralise } from '../../../../shared/utils/utils';
import { TabLocation } from '../../../../uniparc/components/entry/Entry';
import { JobTypes } from '../../../types/toolsJobTypes';
import { MappingDetails } from '../../types/idMappingSearchResults';
import { PublicServerParameters } from '../../types/idMappingServerParameters';
import { rawDBToNamespace } from '../../utils';
import { IDMappingFromContext } from './FromColumn';
import styles from './styles/id-mapping-result-table.module.scss';

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
  const inputIDs = splitAndTidyText(detailsData?.ids);
  const inputLength = inputIDs?.length || 0;
  const failedLength = resultsDataObject.failedIds?.length || 0;
  const suggestedLength = resultsDataObject.suggestedIds?.length || 0;
  const obsoleteLength = resultsDataObject.obsoleteCount || 0;

  const mappedLength = inputLength - failedLength - suggestedLength;
  const activeLength = mappedLength - obsoleteLength;

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
        jobType={JobTypes.ID_MAPPING}
        inputParamsData={inputParamsData}
      />
      {inputIDs && (
        <HeroContainer className={styles.statistics}>
          <div>
            <strong>
              <LongNumber>{mappedLength}</LongNumber>
            </strong>{' '}
            {pluralise('ID', mappedLength)}{' '}
            {pluralise('was', mappedLength, 'were')} mapped to{' '}
            <strong>
              <LongNumber>{resultsDataObject.total || 0}</LongNumber>
            </strong>{' '}
            {pluralise('result', resultsDataObject.total || 0)}
          </div>
          {failedLength > 0 && (
            <div>
              <strong>
                <LongNumber>{failedLength}</LongNumber>
              </strong>{' '}
              ID {pluralise('was', failedLength, 'were')} not mapped:
              <ExpandableList
                descriptionString="IDs"
                numberCollapsedItems={0}
                className={styles['expandable-list']}
              >
                {resultsDataObject.failedIds}
              </ExpandableList>
            </div>
          )}
          {suggestedLength > 0 && (
            <div>
              <strong>
                <LongNumber>{suggestedLength}</LongNumber>
              </strong>{' '}
              ID {pluralise('was', suggestedLength, 'were')} mapped to UniParc
              instead:
              <ExpandableList
                descriptionString="IDs"
                numberCollapsedItems={0}
                className={styles['expandable-list']}
              >
                {resultsDataObject.suggestedIds?.map(({ from, to }) => (
                  <span key={`${from}|${to}`}>
                    {from} →{' '}
                    <Link
                      to={getEntryPath(
                        Namespace.uniparc,
                        to,
                        TabLocation.Entry
                      )}
                    >
                      {to}
                    </Link>
                  </span>
                ))}
              </ExpandableList>
            </div>
          )}
          {obsoleteLength > 0 && (
            <div>
              {activeLength ? (
                <>
                  <strong>
                    <LongNumber>{activeLength}</LongNumber>
                  </strong>{' '}
                  <Link
                    to={(location) => ({
                      ...location,
                      search: stringifyQuery({ query: 'active:true' }),
                    })}
                  >
                    active
                  </Link>{' '}
                  {pluralise('entry', activeLength, 'entries')} and{' '}
                </>
              ) : null}
              <strong>
                <LongNumber>{obsoleteLength}</LongNumber>
              </strong>{' '}
              <Link
                to={(location) => ({
                  ...location,
                  search: stringifyQuery({ query: 'active:false' }),
                })}
              >
                obsolete
              </Link>{' '}
              {pluralise('entry', obsoleteLength, 'entries')}{' '}
              {pluralise('is', mappedLength, 'are')} found
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
