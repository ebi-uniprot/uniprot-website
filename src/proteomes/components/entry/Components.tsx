import { Fragment, FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card, DataTable, ExternalLink, LongNumber } from 'franklin-sites';

import useItemSelect from '../../../shared/hooks/useItemSelect';

import ComponentsButtons from './ComponentsButtons';

import externalUrls from '../../../shared/config/externalUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import {
  ProteomesAPIModel,
  Component,
} from '../../adapters/proteomesConverter';

import '../styles/overview.scss';

const genomeAccessionDB = 'GenomeAccession' as const;

export const Components: FC<
  Pick<ProteomesAPIModel, 'components' | 'id' | 'proteinCount'>
> = ({ components, id, proteinCount }) => {
  const [selectedEntries, handleItemSelection] = useItemSelect();

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
    },
    {
      label: 'Genome accession(s)',
      name: 'genome_accession',
      render: ({ proteomeCrossReferences }) =>
        proteomeCrossReferences
          ?.filter(({ database, id }) => id && database === genomeAccessionDB)
          .map(({ id }, index) => (
            <Fragment key={id}>
              {index ? ', ' : ''}
              <ExternalLink
                url={externalUrls.ENABrowser(id as string)}
                key={id}
              >
                {id}
              </ExternalLink>
            </Fragment>
          )),
    },
    {
      label: 'Protein count',
      name: 'proteins',
      render: ({ proteinCount, name }) =>
        proteinCount ? (
          <Link
            to={{
              pathname: LocationToPath[Location.UniProtKBResults],
              search: `query=(proteome:${id}) AND (proteomecomponent:"${name}")`,
            }}
          >
            <LongNumber>{proteinCount}</LongNumber>
          </Link>
        ) : (
          0
        ),
    },
  ];

  return (
    <Card header={<h2>Components</h2>}>
      <ComponentsButtons
        components={components}
        selectedEntries={selectedEntries}
        proteinCount={proteinCount}
        id={id}
      />
      <DataTable
        getIdKey={({ name }) => name}
        density="compact"
        columns={columns}
        data={components}
        selected={selectedEntries}
        onSelectRow={handleItemSelection}
        fixedLayout
      />
    </Card>
  );
};
export default Components;
