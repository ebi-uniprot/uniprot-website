import { useMemo } from 'react';
import { Card, DataTableWithLoader, Loader } from 'franklin-sites';

import CustomiseButton from '../../../shared/components/action-buttons/CustomiseButton';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../shared/hooks/useDataApi';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';

import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import {
  defaultColumns,
  getUniParcXRefsColumns,
} from '../../config/UniParcXRefsColumnConfiguration';
import { getEntrySectionNameAndId } from '../../utils/entrySection';

import { UniParcUIModel, UniParcXRef } from '../../adapters/uniParcConverter';
import EntrySection from '../../types/entrySection';
import { Namespace } from '../../../shared/types/namespaces';
import { PaginatedResults } from '../../../shared/hooks/usePagination';

import helper from '../../../shared/styles/helper.module.scss';
import './styles/XRefsSection.scss';

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
  xRefData: PaginatedResults<UniParcXRef>;
};

const XRefsSection = ({ entryData, xRefData: xRefDataObject }: Props) => {
  const { data: dataDB } = useDataApi<DataDBModel>(
    apiUrls.configure.allDatabases(Namespace.uniparc)
  );
  const [columns] = useLocalStorage(
    `table columns for ${Namespace.uniparc} entry page` as const,
    defaultColumns
  );

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
        firstSeen,
        lastSeen
      ),
    [columns, dataDB, firstSeen, lastSeen]
  );

  if (initialLoading) {
    return <Loader progress={progress} />;
  }

  return (
    <Card header={<h2>{getEntrySectionNameAndId(EntrySection.XRefs).name}</h2>}>
      {total && allResults.length ? (
        <>
          <div className="button-group">
            <CustomiseButton namespace={Namespace.uniparc} />
          </div>
          <div className={helper['overflow-y-container']}>
            <DataTableWithLoader
              getIdKey={getIdKey}
              columns={columnDescriptors}
              data={allResults}
              onLoadMoreItems={handleLoadMoreRows}
              hasMoreData={hasMoreData}
              density="compact"
            />
          </div>
        </>
      ) : (
        <ErrorHandler
          status={xRefDataObject.status}
          error={xRefDataObject.error}
          fullPage
        />
      )}
    </Card>
  );
};

export default XRefsSection;
