import classNames from 'classnames';
import { DataTable, Loader } from 'franklin-sites';

import apiUrls from '../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../shared/hooks/useDataApi';
import helper from '../../shared/styles/helper.module.scss';
import { SearchResults } from '../../shared/types/results';
import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { columnConfig } from '../../uniprotkb/components/entry/tabs/history/DemergedEntriesTable';
import styles from './styles/suggestion-entries-table.module.scss';

type Props = {
  activeEntries: string[];
  inactiveEntries: string[];
};

const entryOrder: Record<string, number> = {
  'UniProtKB reviewed (Swiss-Prot)': 0,
  'UniProtKB unreviewed (TrEMBL)': 1,
  Inactive: 2,
};

const SuggestionEntriesTable = ({ activeEntries, inactiveEntries }: Props) => {
  const {
    loading: activeEntriesLoading,
    data: activeEntriesData,
    progress: activeEntriesProgress,
  } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    activeEntries.length
      ? apiUrls.search.accessions(activeEntries, { noSort: true, facets: null })
      : undefined
  );

  const {
    loading: inactiveEntriesLoading,
    data: inactiveEntriesData,
    progress: inactiveEntriesProgress,
  } = useDataApi<SearchResults<UniProtkbAPIModel>>(
    inactiveEntries.length > 0
      ? apiUrls.search.search({
          query: inactiveEntries.map((acc) => `(accession:${acc})`).join('OR'),
          facets: null,
          noSort: true,
        })
      : null
  );

  if (activeEntriesLoading || inactiveEntriesLoading) {
    return (
      <Loader progress={activeEntriesProgress || inactiveEntriesProgress} />
    );
  }

  const mergedData = [
    ...(activeEntriesData?.results || []),
    ...(inactiveEntriesData?.results || []),
  ].sort((a, b) => entryOrder[a.entryType] - entryOrder[b.entryType]);

  if (mergedData.length === 0) {
    return null;
  }

  return (
    <div
      className={classNames(
        helper['overflow-y-container'],
        styles['suggestion-list-table']
      )}
    >
      {activeEntriesData?.results.length ? (
        <DataTable
          data={mergedData}
          columns={columnConfig}
          getIdKey={(row) => row.primaryAccession}
          density="compact"
        />
      ) : null}
    </div>
  );
};
export default SuggestionEntriesTable;
