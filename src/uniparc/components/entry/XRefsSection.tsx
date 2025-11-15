import './styles/XRefsSection.scss';

import { Card, DataTableWithLoader, Loader } from 'franklin-sites';
import { useMemo } from 'react';

import CustomiseButton from '../../../shared/components/action-buttons/CustomiseButton';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import usePagination from '../../../shared/hooks/usePagination';
import helper from '../../../shared/styles/helper.module.scss';
import { Namespace } from '../../../shared/types/namespaces';
import { UniParcUIModel, UniParcXRef } from '../../adapters/uniParcConverter';
import {
  defaultColumns,
  getUniParcXRefsColumns,
} from '../../config/UniParcXRefsColumnConfiguration';
import EntrySection from '../../types/entrySection';
import { getEntrySectionNameAndId } from '../../utils/entrySection';
import useXref from './hooks/useXref';

export type DataDBModel = Array<{
  name: string;
  displayName: string;
  uriLink: string; // template with the ID replaced by a "%id"
  alive: boolean;
}>;

// Just use the index. The full page is reloading anyway anytime the table is filtered
// Used to be:
// `${xref.database}-${xref.id}-${xref.version}-${xref.versionI}-${xref.active}-${xref.chain}`
// but was still not enough (would need all the columns together)
const getIdKey = (_xref: UniParcXRef, index: number) => `${index}`;

const getTemplateMap = (dataDB?: DataDBModel) =>
  new Map(dataDB?.map((db) => [db.displayName, db.uriLink]));

type Props = {
  entryData: UniParcUIModel;
};

const XRefsSection = ({ entryData }: Props) => {
  const initialApiUrl = useXref({
    accession: entryData.uniParcId,
    withFacets: false,
  });

  const xRefDataObject = usePagination<UniParcXRef, UniParcXRef>(initialApiUrl);

  const { data: dataDB } = useDataApi<DataDBModel>(
    apiUrls.configure.allDatabases(Namespace.uniparc)
  );

  const [resetFlag, setResetFlag] = useLocalStorage<boolean>(
    'reset-Nov-2025' as const,
    false
  );

  const [columns, setColumns] = useLocalStorage(
    `table columns for ${Namespace.uniparc} entry page` as const,
    defaultColumns
  );

  // TEMPORARY: One-time reset to add proteome column to default view
  // This resets all users' column preferences to include the new proteome column
  // TODO: Remove this block after sufficient time has passed (i.e. 2026_01 release)
  // When removing, also:
  // 1. Remove the 'reset-Nov-2025' key from UserPreferenceKey type in useLocalStorage.ts
  // 2. Remove the resetFlag useState declaration above
  // 3. Change [columns, setColumns] back to [columns] (read-only)
  // jira link: https://embl.atlassian.net/browse/TRM-33318
  if (!resetFlag) {
    setColumns(defaultColumns);
    setResetFlag(true);
  }

  const {
    initialLoading,
    progress,
    total,
    allResults,
    hasMoreData,
    handleLoadMoreRows,
  } = xRefDataObject;

  const firstSeen = entryData?.oldestCrossRefCreated;
  const lastSeen = entryData?.mostRecentCrossRefUpdated;

  const columnDescriptors = useMemo(
    () =>
      getUniParcXRefsColumns(
        columns,
        getTemplateMap(dataDB),
        entryData.uniParcId,
        firstSeen,
        lastSeen
      ),
    [columns, dataDB, entryData.uniParcId, firstSeen, lastSeen]
  );

  if (initialLoading) {
    return <Loader progress={progress} />;
  }

  return (
    <Card header={<h2>{getEntrySectionNameAndId(EntrySection.XRefs).name}</h2>}>
      <div className="button-group">
        <CustomiseButton namespace={Namespace.uniparc} />
      </div>
      <div className={helper['overflow-y-container']}>
        {total && allResults.length ? (
          <DataTableWithLoader
            getIdKey={getIdKey}
            columns={columnDescriptors}
            data={allResults}
            onLoadMoreItems={handleLoadMoreRows}
            hasMoreData={hasMoreData}
            density="compact"
          />
        ) : null}
      </div>
    </Card>
  );
};

export default XRefsSection;
