import { FC, ReactNode, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, DataTable, ExternalLink } from 'franklin-sites';

import CustomiseButton from '../../../shared/components/action-buttons/CustomiseButton';
import { EntryTypeIcon } from '../../../shared/components/entry/EntryTypeIcon';

import useDataApi from '../../../shared/hooks/useDataApi';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';

import { defaultColumns } from '../../config/UniParcColumnConfiguration';

import apiUrls from '../../../shared/config/apiUrls';

import { Namespace } from '../../../shared/types/namespaces';
import { Column } from '../../../shared/config/columns';
import { UniParcXRef } from '../../adapters/uniParcConverter';
import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import {
  EntryType,
  getEntryTypeFromString,
} from '../../../uniprotkb/adapters/uniProtkbConverter';

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
      const entryType = getEntryTypeFromString(xref.database);
      if (entryType === EntryType.REVIEWED) {
        return (
          <>
            <EntryTypeIcon entryType={entryType} />
            UniProtKB reviewed
          </>
        );
      }
      if (entryType === EntryType.UNREVIEWED) {
        return (
          <>
            <EntryTypeIcon entryType={entryType} />
            UniProtKB unreviewed
          </>
        );
      }
      return xref.database;
    },
  },
  {
    label: 'Identifier',
    name: 'identifier',
    render(xref) {
      const template = templateMap.get(xref.database);
      return template ? (
        <ExternalLink url={template.replace('%id', xref.id)}>
          {xref.id}
        </ExternalLink>
      ) : (
        <span>{xref.id}</span>
      );
    },
  },
  {
    label: 'Version',
    name: 'version',
    render: (xref) => 'version' in xref && <span>{xref.version}</span>,
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
        return <span>{taxProps.value}</span>;
      }
    },
  },
  {
    label: 'First seen',
    name: 'first_seen',
    // note make than time element
    render: (xref) => <span>{xref.created}</span>,
  },
  {
    label: 'Last seen',
    name: 'last_seen',
    // note make than time element
    render: (xref) => <span>{xref.lastUpdated}</span>,
  },
  {
    label: 'Active',
    name: 'active',
    render: (xref) => <span>{xref.active ? 'Yes' : 'No'}</span>,
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

const getTemplateMap = (dataDB?: DataDBModel) =>
  new Map(dataDB?.map((db) => [db.displayName, db.uriLink]));

type Props = {
  data: UniParcXRef[];
};

const XRefsSection: FC<Props> = ({ data }) => {
  const { data: dataDB } = useDataApi<DataDBModel>(apiUrls.allDatabases);
  const { search } = useLocation();

  const [tableColumns, setTableColumns] = useLocalStorage<Column[]>(
    `table columns for ${Namespace.uniparc} xrefs`,
    defaultColumns
  );

  console.log(search, dataDB, getTemplateMap(dataDB));
  const columns = useMemo(() => getColumns(getTemplateMap(dataDB)), [dataDB]);

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
        data={data}
        getIdKey={(xref: UniParcXRef) =>
          `${xref.database}-${xref.id}-${xref.versionI}-${xref.active}`
        }
        density="compact"
        columns={columns}
      />
    </Card>
  );
};

export default XRefsSection;
