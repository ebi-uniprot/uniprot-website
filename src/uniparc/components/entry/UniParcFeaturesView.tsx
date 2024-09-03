import { useMemo } from 'react';

import ExternalLink from '../../../shared/components/ExternalLink';
import FeaturesView, {
  ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import externalUrls from '../../../shared/config/externalUrls';
import { stringToColour } from '../../../shared/utils/color';
import { processUrlTemplate } from '../../../shared/utils/xrefs';
import { sortByLocation } from '../../../uniprotkb/utils';

import { SequenceFeature } from '../../adapters/uniParcConverter';
import { TableFromDataColumn } from '../../../shared/components/table/TableFromData';

export type UniParcProcessedFeature = ProcessedFeature & {
  database: string;
  databaseId: string;
  interproGroupName?: string;
  interproGroupId?: string;
};

// Convert data
export const convertData = (
  data: SequenceFeature[]
): UniParcProcessedFeature[] =>
  data
    .flatMap((feature) =>
      feature.locations.map((locationFeature) => ({
        accession: feature.databaseId,
        type: 'Other' as const,
        start: locationFeature.start,
        end: locationFeature.end,
        database: feature.database,
        databaseId: feature.databaseId,
        interproGroupName: feature.interproGroup?.name,
        interproGroupId: feature.interproGroup?.id,
        color: stringToColour(feature.database, 240), // use the name to define colour
      }))
    )
    .sort(sortByLocation);

const getRowId = (data: UniParcProcessedFeature) => data.primaryAccession;

type UniParcFeaturesViewProps = {
  data: SequenceFeature[];
  sequence: string;
};

const UniParcFeaturesView = ({ data, sequence }: UniParcFeaturesViewProps) => {
  const processedData = useMemo(() => convertData(data), [data]);
  const databaseInfoMaps = useDatabaseInfoMaps();

  const columns: TableFromDataColumn<UniParcProcessedFeature>[] = useMemo(
    () => [
      {
        label: 'InterPro Group',
        id: 'interpro-group',
        render: (feature) =>
          feature.interproGroupId ? (
            <ExternalLink
              url={externalUrls.InterProEntry(feature.interproGroupId)}
            >
              {feature.interproGroupName}
            </ExternalLink>
          ) : (
            'N/A'
          ),
      },
      {
        label: 'Position(s)',
        id: 'position',
        render: (feature) => {
          let position = `${feature.start}`;
          if (feature.start !== feature.end) {
            position += `-${feature.end}`;
          }
          return position;
        },
      },
      {
        label: 'Database identifier',
        id: 'database-identifier',
        render: (feature) => {
          const { database, databaseId } = feature;
          const databaseInfo =
            databaseInfoMaps?.databaseToDatabaseInfo[database];
          return (
            databaseInfo?.uriLink &&
            databaseId && (
              <ExternalLink
                url={processUrlTemplate(databaseInfo.uriLink, {
                  id: databaseId,
                })}
              >
                {databaseId}
              </ExternalLink>
            )
          );
        },
      },
      {
        label: 'Database',
        id: 'database',
        render: (feature) => feature.database,
      },
    ],
    [databaseInfoMaps?.databaseToDatabaseInfo]
  );

  return (
    <FeaturesView
      features={processedData}
      columns={columns}
      getRowId={getRowId}
      sequence={sequence}
      noLinkToFullView
    />
  );
};
export default UniParcFeaturesView;
