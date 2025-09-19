import cn from 'classnames';
import {
  Button,
  ExpandableList,
  HeroContainer,
  LongNumber,
} from 'franklin-sites';
import { partition } from 'lodash-es';
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
import { reUniParc } from '../../../../uniprotkb/utils/regexes';
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
  const [uniParcSuggestedIds, otherSuggestedIds] = partition(
    resultsDataObject.suggestedIds,
    ({ to }) => reUniParc.test(to)
  );
  const uniParcSuggestedIdsTo = uniParcSuggestedIds?.map(({ to }) => to);

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
            {pluralise('ID', mappedLength)} mapped to{' '}
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
              {pluralise('ID', failedLength)} not mapped:
              <ExpandableList
                descriptionString="IDs"
                numberCollapsedItems={0}
                className={styles['expandable-list']}
              >
                {resultsDataObject.failedIds}
              </ExpandableList>
            </div>
          )}
          {uniParcSuggestedIds.length > 0 && (
            <div>
              <strong>
                <LongNumber>{suggestedLength}</LongNumber>
              </strong>{' '}
              {pluralise('ID', suggestedLength)} mapped to UniParc:
              <br />
              <div
                className={cn('button-group', styles['uniparc-button-group'])}
              >
                <Button
                  variant="tertiary"
                  onClick={() =>
                    generateAndDownloadTSV(
                      uniParcSuggestedIds,
                      inputParamsData?.from
                        ? `${inputParamsData.from}_to_UniParc.tsv`
                        : `mapped_to_UniParc.tsv`
                    )
                  }
                >
                  Download as TSV
                </Button>
                {' | '}
                {uniParcSuggestedIdsTo.length <= UNIPARC_DIRECT_LINK_LIMIT ? (
                  <Link
                    to={{
                      pathname: LocationToPath[Location.UniParcResults],
                      search: `query=${uniParcSuggestedIdsTo.join(' OR ')}`,
                    }}
                    className="button tertiary"
                  >
                    View in UniParc
                  </Link>
                ) : (
                  <Link
                    to={{
                      pathname: LocationToPath[Location.IDMapping],
                      search: stringifyQuery({
                        ids: uniParcSuggestedIdsTo.join(','),
                        from: 'UniParc',
                        to: 'UniParc',
                      }),
                    }}
                  >
                    Submit ID mapping job to view all in UniParc
                  </Link>
                )}
              </div>
              <ExpandableList
                descriptionString="IDs"
                numberCollapsedItems={3}
                className={styles['expandable-list']}
              >
                {uniParcSuggestedIds?.map(({ from, to }) => (
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
          {otherSuggestedIds.length > 0 && (
            <div>
              <strong>
                <LongNumber>{suggestedLength}</LongNumber>
              </strong>{' '}
              {/* TODO: generalise */}
              {pluralise('ID', suggestedLength)} mapped to another UniProt DB:
              <ExpandableList
                descriptionString="IDs"
                numberCollapsedItems={0}
                className={styles['expandable-list']}
              >
                {otherSuggestedIds?.map(({ from, to }) => (
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
