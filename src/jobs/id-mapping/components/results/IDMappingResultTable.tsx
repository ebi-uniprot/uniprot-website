import {
  Button,
  ExpandableList,
  HeroContainer,
  LongNumber,
} from 'franklin-sites';
import { Link } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../../app/config/urls';
import ResultsButtons from '../../../../shared/components/results/ResultsButtons';
import ResultsData from '../../../../shared/components/results/ResultsData';
import useItemSelect from '../../../../shared/hooks/useItemSelect';
import { PaginatedResults } from '../../../../shared/hooks/usePagination';
import { Namespace } from '../../../../shared/types/namespaces';
import splitAndTidyText from '../../../../shared/utils/splitAndTidyText';
import { stringifyQuery } from '../../../../shared/utils/url';
import {
  generateAndDownloadTSV,
  pluralise,
} from '../../../../shared/utils/utils';
import { TabLocation } from '../../../../uniparc/types/entry';
import { JobTypes } from '../../../types/jobTypes';
import { MappingDetails } from '../../types/idMappingSearchResults';
import { PublicServerParameters } from '../../types/idMappingServerParameters';
import { rawDBToNamespace } from '../../utils';
import { IDMappingFromContext } from './FromColumn';
import styles from './styles/id-mapping-result-table.module.scss';

const UNIPARC_DIRECT_LINK_LIMIT = 93;

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
              {pluralise('ID was', failedLength, 'IDs were')} not mapped:
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
              {pluralise('ID was', suggestedLength, 'IDs were')} mapped to
              UniParc:
              <br />
              <Button
                variant="tertiary"
                style={{
                  color: '#014371',
                  fontSize: '16px',
                  marginBottom: 0,
                  fontWeight: 600,
                }}
                onClick={() =>
                  generateAndDownloadTSV(
                    resultsDataObject.suggestedIds,
                    inputParamsData?.from
                      ? `${inputParamsData.from}_to_UniParc.tsv`
                      : `mapped_to_UniParc.tsv`
                  )
                }
                className={styles['uniparc-download']}
              >
                Download as TSV
              </Button>
              {' | '}
              {suggestedLength <= UNIPARC_DIRECT_LINK_LIMIT ? (
                <Link
                  to={{
                    pathname: LocationToPath[Location.UniParcResults],
                    search: `query=${resultsDataObject.suggestedIds?.map(({ to }) => to).join(' OR ')}`,
                  }}
                  className={styles['uniparc-link']}
                >
                  View in UniParc
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: LocationToPath[Location.IDMapping],
                    search: stringifyQuery({
                      ids: resultsDataObject.suggestedIds
                        ?.map(({ to }) => to)
                        .join(','),
                      from: 'UniParc',
                      to: 'UniParc',
                    }),
                  }}
                  className={styles['uniparc-link']}
                >
                  Submit ID mapping job to view all in UniParc
                </Link>
              )}
              <ExpandableList
                descriptionString="IDs"
                numberCollapsedItems={3}
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
