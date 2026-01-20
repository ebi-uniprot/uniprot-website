import { DataTable } from 'franklin-sites';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../../../app/config/urls';
import apiUrls from '../../../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../../../shared/hooks/useDataApi';
import helper from '../../../../../shared/styles/helper.module.scss';
import { Namespace } from '../../../../../shared/types/namespaces';
import { SearchResults } from '../../../../../shared/types/results';
import { UniProtkbAPIModel } from '../../../../adapters/uniProtkbConverter';
import { TabLocation } from '../../../../types/entry';
import { columnConfig as similarProteinsColumnConfig } from '../../similar-proteins/SimilarProteinsTable';

export const columnConfig = [
  {
    label: 'Entry',
    name: 'entry',
    render: (row: UniProtkbAPIModel) => (
      <>
        <Link
          to={getEntryPath(
            Namespace.uniprotkb,
            row.primaryAccession,
            row?.inactiveReason?.inactiveReasonType === 'MERGED' ||
              row?.inactiveReason?.inactiveReasonType === 'DEMERGED'
              ? TabLocation.History
              : TabLocation.Entry
          )}
        >
          {row.primaryAccession}
        </Link>
        {row.inactiveReason && (
          <>
            {' '}
            <em data-article-id="deleted_accessions">
              ({row.inactiveReason.inactiveReasonType.toLowerCase()})
            </em>
          </>
        )}
      </>
    ),
  },
  ...similarProteinsColumnConfig,
];

const DemergedEntriesTable = ({
  entries,
  demergedTo,
}: {
  entries: UniProtkbAPIModel[];
  demergedTo: string[];
}) => {
  const inactiveEntries = useMemo(
    () =>
      demergedTo.filter(
        (acc) => !entries.find((e) => e.primaryAccession === acc)
      ),
    [demergedTo, entries]
  );

  const entriesData = useMemo(() => entries.slice(), [entries]);

  const { data: inactiveEntriesData } = useDataApi<
    SearchResults<UniProtkbAPIModel>
  >(
    inactiveEntries.length > 0
      ? apiUrls.search.search({
          query: inactiveEntries.map((acc) => `(accession:${acc})`).join('OR'),
          facets: null,
        })
      : null
  );

  useEffect(() => {
    if (inactiveEntriesData?.results) {
      inactiveEntriesData.results.forEach((entry) => {
        if (
          !entriesData.find(
            (e) => e.primaryAccession === entry.primaryAccession
          )
        ) {
          entriesData.push(entry);
        }
      });
    }
  }, [inactiveEntriesData, entriesData]);

  return (
    <div className={helper['overflow-y-container']}>
      <DataTable
        data={entriesData}
        columns={columnConfig}
        getIdKey={(row) => row.primaryAccession}
        density="compact"
      />
    </div>
  );
};

export default DemergedEntriesTable;
