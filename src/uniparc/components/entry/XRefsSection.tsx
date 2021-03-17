import { FC, ReactNode, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  DataTableWithLoader,
  ExternalLink,
  Loader,
} from 'franklin-sites';

import TaxonomyLightView from '../../../shared/components/views/TaxonomyView';
import CustomiseButton from '../../../shared/components/action-buttons/CustomiseButton';
import {
  EntryTypeIcon,
  EntryType,
} from '../../../shared/components/entry/EntryTypeIcon';

import useDataApi from '../../../shared/hooks/useDataApi';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';

import { defaultColumns } from '../../config/UniParcColumnConfiguration';

import apiUrls from '../../../shared/config/apiUrls';
import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';
import { Column } from '../../../shared/config/columns';
import {
  databaseToEntryType,
  UniParcAPIModel,
  UniParcXRef,
  XRefsInternalDatabasesEnum,
} from '../../adapters/uniParcConverter';
import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import { UseDataAPIWithStaleState } from '../../../shared/hooks/useDataApiWithStale';

import './styles/XRefsSection.scss';
import '../../../shared/components/results/styles/results-view.scss';

const getColumns = (
  templateMap: Map<string, string>
): Array<{
  label: ReactNode;
  name: string;
  render: (xref: UniParcXRef) => ReactNode;
}> => [
  {
    label: 'Database',
    name: 'database',
    render(xref) {
      if (!xref.database) {
        return null;
      }
      let cell: ReactNode = xref.database;
      const entryType = databaseToEntryType.get(xref.database);
      if (entryType === EntryType.REVIEWED) {
        cell = (
          <>
            <EntryTypeIcon entryType={EntryType.REVIEWED} />
            UniProtKB reviewed
          </>
        );
      } else if (entryType === EntryType.UNREVIEWED) {
        cell = (
          <>
            <EntryTypeIcon entryType={EntryType.UNREVIEWED} />
            UniProtKB unreviewed
          </>
        );
      }
      return (
        <span className={xref.active ? undefined : 'xref-inactive'}>
          {cell}
        </span>
      );
    },
  },
  {
    label: 'Identifier',
    name: 'identifier',
    render(xref) {
      if (!xref.id) {
        return null;
      }
      let cell: ReactNode = xref.id;
      if (
        xref.database === XRefsInternalDatabasesEnum.REVIEWED ||
        xref.database === XRefsInternalDatabasesEnum.UNREVIEWED
      ) {
        // internal link
        cell = (
          <Link
            /**
             * TODO: when we have entry history pages, we need to handle it
             * differently (current website points to `/<accession>?version=*`)
             */
            to={getEntryPath(Namespace.uniprotkb, xref.id)}
          >
            {xref.id}
          </Link>
        );
      } else {
        const template = xref.database && templateMap.get(xref.database);
        if (template) {
          cell = (
            <ExternalLink url={template.replace('%id', xref.id)}>
              {xref.id}
            </ExternalLink>
          );
        }
      }
      return (
        <span className={xref.active ? undefined : 'xref-inactive'}>
          {cell}
        </span>
      );
    },
  },
  {
    label: 'Version',
    name: 'version',
    render: (xref) =>
      xref.version && (
        <span className={xref.active ? undefined : 'xref-inactive'}>
          {xref.version}
        </span>
      ),
  },
  {
    label: 'Organism',
    name: 'organism',
    render: (xref) =>
      xref.organism && (
        <TaxonomyLightView
          organism={xref.organism}
          className={xref.active ? undefined : 'xref-inactive'}
        />
      ),
  },
  {
    label: 'First seen',
    name: 'first_seen',
    render: (xref) =>
      xref.created && (
        <time
          className={xref.active ? undefined : 'xref-inactive'}
          dateTime={new Date(xref.created).toISOString()}
        >
          {xref.created}
        </time>
      ),
  },
  {
    label: 'Last seen',
    name: 'last_seen',
    render: (xref) =>
      xref.lastUpdated && (
        <time
          className={xref.active ? undefined : 'xref-inactive'}
          dateTime={new Date(xref.lastUpdated).toISOString()}
        >
          {xref.lastUpdated}
        </time>
      ),
  },
  {
    label: 'Active',
    name: 'active',
    render: (xref) => (
      <span className={xref.active ? undefined : 'xref-inactive'}>
        {xref.active ? 'Yes' : 'No'}
      </span>
    ),
  },
];

type DataDBModel = Array<{
  name: string;
  displayName: string;
  category: string;
  uriLink: string; // template with the ID replaced by a "%id"
  attributes: Array<{
    name: string;
    xmlTag: string;
    uriLink?: string;
  }>;
  implicit: boolean;
  linkedReason?: string;
}>;

const getIdKey = (xref: UniParcXRef) =>
  `${xref.database}-${xref.id}-${xref.versionI}-${xref.active}`;

const getTemplateMap = (dataDB?: DataDBModel) =>
  new Map(dataDB?.map((db) => [db.displayName, db.uriLink]));

type Props = {
  xrefData: UseDataAPIWithStaleState<UniParcAPIModel>;
};

const XRefsSection: FC<Props> = ({ xrefData }) => {
  const [tableColumns, setTableColumns] = useLocalStorage<Column[]>(
    `table columns for ${Namespace.uniparc} xrefs`,
    defaultColumns
  );

  // TODO: switch to using UniParc-specific database endpoint when available
  const { data: dataDB } = useDataApi<DataDBModel>(apiUrls.allDatabases);
  const columns = useMemo(() => getColumns(getTemplateMap(dataDB)), [dataDB]);

  const [nItemsToRender, setNItemsToRender] = useState(25);

  if (xrefData.loading && !xrefData.isStale) {
    return <Loader />;
  }

  if (!xrefData.data?.uniParcCrossReferences?.length) {
    return null;
  }

  return (
    <Card
      title={getEntrySectionNameAndId(EntrySection.XRefs).name}
      className={xrefData.isStale ? 'is-stale' : undefined}
    >
      <div className="button-group">
        {tableColumns && (
          <CustomiseButton
            tableColumns={tableColumns}
            onTableColumnsChange={setTableColumns}
          />
        )}
      </div>
      <DataTableWithLoader
        onLoadMoreItems={() => setNItemsToRender((n) => n + 25)}
        hasMoreData={
          nItemsToRender < xrefData.data?.uniParcCrossReferences.length
        }
        data={xrefData.data.uniParcCrossReferences.slice(0, nItemsToRender)}
        getIdKey={getIdKey}
        density="compact"
        columns={columns}
      />
    </Card>
  );
};

export default XRefsSection;
