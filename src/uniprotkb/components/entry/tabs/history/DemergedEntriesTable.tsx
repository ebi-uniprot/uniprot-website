import { DataTable } from 'franklin-sites';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../../../app/config/urls';
import apiUrls from '../../../../../shared/config/apiUrls/apiUrls';
import helper from '../../../../../shared/styles/helper.module.scss';
import { Namespace } from '../../../../../shared/types/namespaces';
import fetchData from '../../../../../shared/utils/fetchData';
import { UniProtkbAPIModel } from '../../../../adapters/uniProtkbConverter';
import { TabLocation } from '../../../../types/entry';
import { columnConfig as similarProteinsColumnConfig } from '../../similar-proteins/SimilarProteinsTable';

const columnConfig = [
  {
    label: 'Entry',
    name: 'entry',
    render: (row: UniProtkbAPIModel) => (
      <>
        <Link
          to={getEntryPath(
            Namespace.uniprotkb,
            row.primaryAccession,
            TabLocation.Entry
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

  useEffect(() => {
    if (inactiveEntries.length > 0) {
      const promises = inactiveEntries.map((accession) => {
        const url = apiUrls.entry.entry(
          accession,
          Namespace.uniprotkb
        ) as string;
        return fetchData<UniProtkbAPIModel>(url);
      });
      Promise.all(promises).then((responses) => {
        responses.forEach((response) => {
          if (
            !entriesData.find(
              (e) => e.primaryAccession === response.data.primaryAccession
            )
          ) {
            entriesData.push(response.data);
          }
        });
      });
    }
  }, [inactiveEntries, entriesData]);

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
