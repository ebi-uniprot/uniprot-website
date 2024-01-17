import { useMemo, useState } from 'react';
import { Card, DataTableWithLoader, Loader, Message } from 'franklin-sites';

import CustomiseButton from '../../../shared/components/action-buttons/CustomiseButton';
import ContactLink from '../../../contact/components/ContactLink';

import useDataApi from '../../../shared/hooks/useDataApi';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';

import apiUrls from '../../../shared/config/apiUrls';
import {
  defaultColumns,
  getUniParcXRefsColumns,
} from '../../config/UniParcXRefsColumnConfiguration';
import { getEntrySectionNameAndId } from '../../utils/entrySection';

import { UniParcAPIModel, UniParcXRef } from '../../adapters/uniParcConverter';
import EntrySection from '../../types/entrySection';
import { UseDataAPIWithStaleState } from '../../../shared/hooks/useDataApiWithStale';
import { Namespace } from '../../../shared/types/namespaces';

import helper from '../../../shared/styles/helper.module.scss';
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

const PAGE_SIZE = 25;
const DATA_IMPORT_LIMIT = 10_000;

// Just use the index. The full page is reloading anyway anytime the table is filtered
// Used to be:
// `${xref.database}-${xref.id}-${xref.version}-${xref.versionI}-${xref.active}-${xref.chain}`
// but was still not enough (would need all the columns together)
const getIdKey = (_xref: UniParcXRef, index: number) => `${index}`;

const getTemplateMap = (dataDB?: DataDBModel) =>
  new Map(dataDB?.map((db) => [db.displayName, db.uriLink]));

type Props = {
  xrefData: UseDataAPIWithStaleState<UniParcAPIModel>;
  totalNResults?: number;
};

const XRefsSection = ({ xrefData, totalNResults }: Props) => {
  const { data: dataDB } = useDataApi<DataDBModel>(
    apiUrls.allDatabases(Namespace.uniparc)
  );
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

  const [nItemsToRender, setNItemsToRender] = useState(PAGE_SIZE);

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
      {totalNResults && totalNResults >= DATA_IMPORT_LIMIT && (
        <Message level="warning">
          <small>
            For performance reasons, this entry is not populated with all of its
            cross-references because it has too many of them. If you do need to
            retrieve all of them, feel free to{' '}
            <ContactLink>Contact us</ContactLink>.
          </small>
        </Message>
      )}
      <div className="button-group">
        <CustomiseButton namespace={Namespace.uniparc} />
      </div>
      <div className={helper['overflow-y-container']}>
        <DataTableWithLoader
          onLoadMoreItems={() => setNItemsToRender((n) => n + PAGE_SIZE)}
          hasMoreData={
            nItemsToRender < xrefData.data?.uniParcCrossReferences.length
          }
          data={xrefData.data.uniParcCrossReferences.slice(0, nItemsToRender)}
          getIdKey={getIdKey}
          density="compact"
          columns={columnDescriptors}
        />
      </div>
    </Card>
  );
};

export default XRefsSection;
