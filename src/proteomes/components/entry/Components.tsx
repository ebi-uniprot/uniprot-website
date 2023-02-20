import { Fragment, FC, ReactNode, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, DataTable, LongNumber } from 'franklin-sites';

import useItemSelect from '../../../shared/hooks/useItemSelect';

import ExternalLink from '../../../shared/components/ExternalLink';
import ComponentsButtons from './ComponentsButtons';

import externalUrls from '../../../shared/config/externalUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import {
  ProteomesAPIModel,
  Component,
} from '../../adapters/proteomesConverter';

import '../styles/overview.scss';

const genomeAccessionDB = 'GenomeAccession' as const;

const getIdKey = ({ name }: Component) => name;

export const Components: FC<
  Pick<ProteomesAPIModel, 'components' | 'id' | 'proteinCount' | 'proteomeType'>
> = ({ components, id, proteinCount, proteomeType }) => {
  const [selectedEntries, setSelectedItemFromEvent] = useItemSelect();

  const columns = useMemo<
    Array<{
      label: ReactNode;
      name: string;
      render: (arg: Component) => ReactNode;
      width?: string;
      ellipsis?: boolean;
    }>
  >(
    () => [
      {
        label: 'Component name',
        name: 'component_name',
        render: ({ name }) => name,
      },
      {
        label: 'Genome accession(s)',
        name: 'genome_accession',
        render: ({ proteomeCrossReferences, genomeAnnotation }) =>
          proteomeCrossReferences
            ?.filter(({ database, id }) => id && database === genomeAccessionDB)
            .map(({ id }, index) => {
              let url;
              switch (genomeAnnotation.source) {
                case 'Refseq':
                  url = externalUrls.NCBINucleotide(id as string);
                  break;
                case 'ENA/EMBL':
                  url = externalUrls.ENABrowser(id as string);
                  break;
                case 'Ensembl':
                  url = externalUrls.Ensembl(id as string);
                  break;
                default:
                  url = '';
                  break;
              }
              return (
                <Fragment key={id}>
                  {index ? ', ' : ''}
                  {url ? (
                    <ExternalLink url={url} key={id}>
                      {id}
                    </ExternalLink>
                  ) : (
                    id
                  )}
                </Fragment>
              );
            }),
      },
      {
        label: 'Protein count',
        name: 'proteins',
        render: ({ proteinCount, name }) => {
          if (!proteinCount) {
            return 0;
          }
          if (
            // Excluded not supported at the moment, need to wait for TRM-28011
            proteomeType === 'Excluded'
          ) {
            return <LongNumber>{proteinCount}</LongNumber>;
          }
          // const shouldPointToUniParc =
          //   proteomeType === 'Excluded' || proteomeType === 'Redundant proteome';
          const shouldPointToUniParc = proteomeType === 'Redundant proteome';
          return (
            <Link
              to={{
                pathname:
                  LocationToPath[
                    shouldPointToUniParc
                      ? Location.UniParcResults
                      : Location.UniProtKBResults
                  ],
                search: `query=(${
                  shouldPointToUniParc ? 'upid' : 'proteome'
                }:${id}) AND (proteomecomponent:"${name}")`,
              }}
            >
              <LongNumber>{proteinCount}</LongNumber>
            </Link>
          );
        },
      },
    ],
    [id, proteomeType]
  );

  if (!components?.length) {
    return null;
  }

  return (
    <Card header={<h2>Components</h2>}>
      <ComponentsButtons
        components={components}
        selectedEntries={selectedEntries}
        proteinCount={proteinCount}
        id={id}
        proteomeType={proteomeType}
      />
      <DataTable
        getIdKey={getIdKey}
        density="compact"
        columns={columns}
        data={components}
        onSelectionChange={
          // Excluded not supported at the moment, need to wait for TRM-28011
          proteomeType === 'Excluded' ? undefined : setSelectedItemFromEvent
        }
        fixedLayout
      />
    </Card>
  );
};
export default Components;
