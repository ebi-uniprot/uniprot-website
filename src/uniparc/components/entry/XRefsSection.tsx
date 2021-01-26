import { FC, useMemo, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, DataTable, DENSITY_COMPACT } from 'franklin-sites';

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
        render: (xref) => <span>{xref.version}</span>,
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
    <div id={EntrySection.XRefs} data-entry-section>
      <Card title={getEntrySectionNameAndId(EntrySection.XRefs).name}>
        <DataTable
          data={data}
          getIdKey={(xref: UniParcXRef) =>
            `${xref.database}-${xref.id}-${xref.version}-${xref.active}`
          }
          density={DENSITY_COMPACT}
          columns={columns}
          onSelect={() => {
            /* Needs to be madde optional in franklin if 'selectable' is false */
          }}
        />
      </Card>
    </div>
  );
};

export default XRefsSection;
