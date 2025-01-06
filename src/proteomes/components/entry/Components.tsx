import { Fragment, ReactNode, useMemo } from 'react';
import { Link } from 'react-router';
import { Card, DataTable, LongNumber } from 'franklin-sites';

import useItemSelect from '../../../shared/hooks/useItemSelect';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import ExternalLink from '../../../shared/components/ExternalLink';
import ComponentsButtons from './ComponentsButtons';

import { getUrlFromDatabaseInfo } from '../../../shared/utils/xrefs';

import { stringifyQuery } from '../../../shared/utils/url';
import externalUrls from '../../../shared/config/externalUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import { Xref } from '../../../shared/types/apiModel';
import {
  ProteomesAPIModel,
  Component,
} from '../../adapters/proteomesConverter';

import '../styles/overview.scss';

const genomeAccessionDB = 'GenomeAccession' as const;

type SpecificXref = Xref & {
  id: string;
  database: typeof genomeAccessionDB;
};

const getIdKey = ({ name }: Component) => name;

type ComponentsProps = Pick<
  ProteomesAPIModel,
  | 'components'
  | 'id'
  | 'proteinCount'
  | 'proteomeType'
  | 'taxonomy'
  | 'proteomeStatistics'
>;

const Components = ({
  components,
  id,
  proteinCount,
  proteomeType,
  taxonomy,
  proteomeStatistics,
}: ComponentsProps) => {
  const [selectedEntries, setSelectedItemFromEvent] = useItemSelect();
  const databaseInfoMaps = useDatabaseInfoMaps();

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
            ?.filter(
              (xref: Xref): xref is SpecificXref =>
                Boolean(xref.id) && xref.database === genomeAccessionDB
            )
            .map(({ id }, index) => {
              let url = null;
              switch (genomeAnnotation.source) {
                case 'Refseq':
                case 'RefSeq':
                  url = getUrlFromDatabaseInfo(
                    databaseInfoMaps,
                    'GenBank',
                    {
                      ProteinId: id,
                    },
                    'ProteinId'
                  );
                  break;
                case 'ENA/EMBL':
                  url = getUrlFromDatabaseInfo(databaseInfoMaps, 'EMBL', {
                    id,
                  });
                  break;
                case 'Ensembl':
                  // Not in allDatabases
                  url = externalUrls.EnsemblComponent(taxonomy.taxonId, id);
                  break;
                default:
                // skip
              }
              return (
                <Fragment key={id}>
                  {index ? ', ' : ''}
                  <ExternalLink url={url} key={id}>
                    {id}
                  </ExternalLink>
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
          const shouldPointToUniParc =
            proteomeType === 'Redundant proteome' ||
            proteomeType === 'Excluded';
          return (
            <Link
              to={{
                pathname:
                  LocationToPath[
                    shouldPointToUniParc
                      ? Location.UniParcResults
                      : Location.UniProtKBResults
                  ],
                search: stringifyQuery({
                  query: `(proteome:${id}) AND (proteomecomponent:"${name}")`,
                }),
              }}
            >
              <LongNumber>{proteinCount}</LongNumber>
            </Link>
          );
        },
      },
    ],
    [databaseInfoMaps, id, proteomeType, taxonomy.taxonId]
  );

  if (!components?.length) {
    return null;
  }

  return (
    <Card header={<h2>Components</h2>}>
      <ComponentsButtons
        components={components}
        selectedEntries={selectedEntries}
        id={id}
        proteinCount={proteinCount}
        proteomeType={proteomeType}
        proteomeStatistics={proteomeStatistics}
      />
      <DataTable
        getIdKey={getIdKey}
        density="compact"
        columns={columns}
        data={components}
        onSelectionChange={setSelectedItemFromEvent}
      />
    </Card>
  );
};
export default Components;
