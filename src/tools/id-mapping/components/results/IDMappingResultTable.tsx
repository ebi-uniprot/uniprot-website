import { Link } from 'react-router-dom';
import { ExpandableList, HeroContainer, LongNumber } from 'franklin-sites';

import ResultsData from '../../../../shared/components/results/ResultsData';
import ResultsButtons from '../../../../shared/components/results/ResultsButtons';

import { IDMappingFromContext } from './FromColumn';

import useItemSelect from '../../../../shared/hooks/useItemSelect';

import { rawDBToNamespace } from '../../utils';
import { pluralise } from '../../../../shared/utils/utils';
import splitAndTidyText from '../../../../shared/utils/splitAndTidyText';
import { stringifyQuery } from '../../../../shared/utils/url';
import { getEntryPath } from '../../../../app/config/urls';

import { Namespace } from '../../../../shared/types/namespaces';
import { TabLocation } from '../../../../uniparc/components/entry/Entry';
import { PaginatedResults } from '../../../../shared/hooks/usePagination';
import { MappingDetails } from '../../types/idMappingSearchResults';
import { JobTypes } from '../../../types/toolsJobTypes';
import { PublicServerParameters } from '../../types/idMappingServerParameters';

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
                    // eslint-disable-next-line uniprot-website/use-config-location
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
                // eslint-disable-next-line uniprot-website/use-config-location
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
      {resultsDataObject.allResults.length ? (
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
      ) : null}
    </>
  );
};

export default IDMappingResultTable;
