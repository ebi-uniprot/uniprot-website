import { FC, useMemo, useState } from 'react';
import { Card, DataTableWithLoader, Loader } from 'franklin-sites';

import CustomiseButton from '../../../shared/components/action-buttons/CustomiseButton';

import useDataApi from '../../../shared/hooks/useDataApi';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';

import apiUrls from '../../../shared/config/apiUrls';
import {
  defaultColumns,
  getUniParcXRefsColumns,
} from '../../config/UniParcXRefsColumnConfiguration';

import { UniParcAPIModel, UniParcXRef } from '../../adapters/uniParcConverter';
import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import { UseDataAPIWithStaleState } from '../../../shared/hooks/useDataApiWithStale';
import { Namespace } from '../../../shared/types/namespaces';

import helper from '../../../shared/styles/helper.module.scss';
import '../../../shared/components/results/styles/results-data.scss';
import './styles/XRefsSection.scss';

type DataDBModel = Array<{
  name: string;
  displayName: string;
  category: string;
  uriLink: string; // template with the ID replaced by a "%id"
  attributes: Array<{
    name: string;
    alive: boolean;
    // actually, it's always present, but might be empty string, let's consider it optional
    uriLink?: string;
  }>;
  implicit: boolean;
  linkedReason?: string;
}>;

const getIdKey = (xref: UniParcXRef) =>
  `${xref.database}-${xref.id}-${xref.versionI}-${xref.active}-${xref.chain}`;

const getTemplateMap = (dataDB?: DataDBModel) =>
  new Map(dataDB?.map((db) => [db.displayName, db.uriLink]));

type Props = {
  xrefData: UseDataAPIWithStaleState<UniParcAPIModel>;
};

const XRefsSection: FC<Props> = ({ xrefData }) => {
  const { data: dataDB } = useDataApi<DataDBModel>(apiUrls.allUniParcDatabases);
  const [columns] = useLocalStorage(
    `table columns for ${Namespace.uniparc} entry page` as const,
    defaultColumns
  );
  const firstSeen = xrefData.data?.oldestCrossRefCreated;
  const lastSeen = xrefData.data?.mostRecentCrossRefUpdated;
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

  const [nItemsToRender, setNItemsToRender] = useState(25);

  if (xrefData.loading && !xrefData.isStale) {
    return <Loader />;
  }

  if (!xrefData.data?.uniParcCrossReferences?.length) {
    return null;
  }

  return (
    <Card
      header={<h2>{getEntrySectionNameAndId(EntrySection.XRefs).name}</h2>}
      className={xrefData.isStale ? helper.stale : undefined}
    >
      <div className="button-group">
        <CustomiseButton namespace={Namespace.uniparc} />
      </div>
      <DataTableWithLoader
        onLoadMoreItems={() => setNItemsToRender((n) => n + 25)}
        hasMoreData={
          nItemsToRender < xrefData.data?.uniParcCrossReferences.length
        }
        data={xrefData.data.uniParcCrossReferences.slice(0, nItemsToRender)}
        getIdKey={getIdKey}
        density="compact"
        columns={columnDescriptors}
      />
    </Card>
  );
};

export default XRefsSection;
