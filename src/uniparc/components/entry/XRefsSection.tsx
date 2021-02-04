import { FC, ReactNode, useMemo } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Card, DataTable, ExternalLink } from 'franklin-sites';

import CustomiseButton from '../../../shared/components/action-buttons/CustomiseButton';
import { EntryTypeIcon } from '../../../shared/components/entry/EntryTypeIcon';

import useStaggeredRenderingHelper from '../../../shared/hooks/useStaggeredRenderingHelper';
import useDataApi from '../../../shared/hooks/useDataApi';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';

import { defaultColumns } from '../../config/UniParcColumnConfiguration';

import apiUrls from '../../../shared/config/apiUrls';

import { Location, LocationToPath } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { Column } from '../../../shared/config/columns';
import {
  databaseToEntryType,
  UniParcXRef,
} from '../../adapters/uniParcConverter';
import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';

import './styles/XRefsSection.scss';

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
      let cell: ReactNode = xref.database;
      const entryType = databaseToEntryType[xref.database];
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
      let cell: ReactNode = xref.id;
      if (
        xref.database === 'UniProtKB/Swiss-Prot' ||
        xref.database === 'UniProtKB/TrEMBL'
      ) {
        // internal link
        cell = (
          <Link
            // TODO: #1: replace with `getEntryPath` when PR #265 is merged in
            /**
             * TODO: #2: when we have entry history pages, we need to handle it
             * differently (current website points to `/<accession>?version=*`)
             */
            to={generatePath(LocationToPath[Location.UniProtKBEntry], {
              accession: xref.id,
            })}
          >
            {xref.id}
          </Link>
        );
      } else {
        const template = templateMap.get(xref.database);
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
      'version' in xref && (
        <span className={xref.active ? undefined : 'xref-inactive'}>
          {xref.version}
        </span>
      ),
  },
  {
    label: 'Organism',
    name: 'organism',
    // eslint-disable-next-line consistent-return
    render(xref) {
      const taxProps = xref.properties?.find(
        (prop) => prop.key === 'NCBI_taxonomy_id'
      );
      if (taxProps) {
        return (
          <span className={xref.active ? undefined : 'xref-inactive'}>
            {taxProps.value}
          </span>
        );
      }
    },
  },
  {
    label: 'First seen',
    name: 'first_seen',
    // note make than time element
    render: (xref) => (
      <span className={xref.active ? undefined : 'xref-inactive'}>
        {xref.created}
      </span>
    ),
  },
  {
    label: 'Last seen',
    name: 'last_seen',
    // note make than time element
    render: (xref) => (
      <span className={xref.active ? undefined : 'xref-inactive'}>
        {xref.lastUpdated}
      </span>
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
  data?: UniParcXRef[];
};

const XRefsSection: FC<Props> = ({ data }) => {
  // TODO: switch to using UniParc-specific database endpoint when available
  const { data: dataDB } = useDataApi<DataDBModel>(apiUrls.allDatabases);
  // TODO: handle xrefs filtering from location.search after endpoint schema change
  // const { search } = useLocation();

  const [tableColumns, setTableColumns] = useLocalStorage<Column[]>(
    `table columns for ${Namespace.uniparc} xrefs`,
    defaultColumns
  );

  const columns = useMemo(() => getColumns(getTemplateMap(dataDB)), [dataDB]);

  const nItemsToRender = useStaggeredRenderingHelper({
    first: 100,
    max: data?.length,
  });

  if (!data?.length) {
    return null;
  }

  return (
    <Card title={getEntrySectionNameAndId(EntrySection.XRefs).name}>
      <div className="button-group">
        {tableColumns && (
          <CustomiseButton
            tableColumns={tableColumns}
            onTableColumnsChange={setTableColumns}
          />
        )}
      </div>
      <DataTable
        data={data.slice(0, nItemsToRender)}
        getIdKey={getIdKey}
        density="compact"
        columns={columns}
      />
    </Card>
  );
};

export default XRefsSection;
