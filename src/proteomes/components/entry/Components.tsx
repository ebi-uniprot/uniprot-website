import { FC, ReactNode } from 'react';
import { generatePath, Link } from 'react-router-dom';
import qs from 'query-string';
import { Card, DataTable, ExternalLink } from 'franklin-sites';

import {
  ProteomesAPIModel,
  Component,
} from '../../adapters/proteomesConverter';

import '../styles/overview.scss';
import externalUrls from '../../../shared/config/externalUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

const genomeAccessionDB = 'GenomeAccession' as const;

export const Components: FC<Pick<ProteomesAPIModel, 'components' | 'id'>> = ({
  components,
  id,
}) => {
  if (!components?.length) {
    return null;
  }

  const columns: Array<{
    label: ReactNode;
    name: string;
    render: (arg: Component) => ReactNode;
    width?: string;
    ellipsis?: boolean;
  }> = [
    {
      label: 'Component name',
      name: 'component_name',
      render: ({ name }) => name,
      //   width: '8rem',
    },
    {
      label: 'Genome accession(s)',
      name: 'genome_accession',
      render: ({ proteomeCrossReferences }) =>
        proteomeCrossReferences
          .filter(({ database, id }) => id && database === genomeAccessionDB)
          .map<React.ReactNode>(({ id }) => (
            <ExternalLink url={externalUrls.ENABrowser(id as string)} key={id}>
              {id}
            </ExternalLink>
          ))
          .reduce(
            (prev, curr) => (prev === null ? [curr] : [prev, ', ', curr]),
            null
          ),
      //   width: '8rem',
    },
    {
      label: 'Proteins',
      name: 'proteins',
      render: ({ proteinCount, name }) => (
        <Link
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: `query=(proteome:${id}) AND (proteomecomponent:"${name}")`,
          }}
        >
          {proteinCount || 'no data yet'}
        </Link>
      ),
    },
  ];

  return (
    <Card title="Components">
      <DataTable
        getIdKey={({ name }) => name}
        density="compact"
        columns={columns}
        data={components}
        // selected={selectedEntries}
        // onSelectRow={handleSelectedEntries}
        fixedLayout
      />
    </Card>
  );
};
export default Components;
