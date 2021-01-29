import { FC, useMemo, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, DataTable } from 'franklin-sites';

import { UniParcXRef } from '../../adapters/uniParcConverter';
import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';

type Props = {
  data: UniParcXRef[];
};

const XRefsSection: FC<Props> = ({ data }) => {
  const { search } = useLocation();

  console.log(search);

  const columns = useMemo<
    Array<{
      label: ReactNode;
      name: string;
      render: (xref: UniParcXRef) => ReactNode;
    }>
  >(
    () => [
      {
        label: 'Database',
        name: 'database',
        render: (xref) => <span>{xref.database}</span>,
      },
      {
        label: 'Identifier',
        name: 'identifier',
        render: (xref) => <span>{xref.id}</span>,
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
    ],
    []
  );

  return (
    <div id={EntrySection.XRefs}>
      <Card title={getEntrySectionNameAndId(EntrySection.XRefs).name}>
        <DataTable
          data={data}
          getIdKey={(xref) =>
            `${xref.database}-${xref.id}-${xref.versionI}-${xref.active}`
          }
          density="compact"
          columns={columns}
        />
      </Card>
    </div>
  );
};

export default XRefsSection;
