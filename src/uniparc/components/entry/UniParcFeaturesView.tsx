import { useMemo } from 'react';
import { v1 } from 'uuid';

import ExternalLink from '../../../shared/components/ExternalLink';
import { type TableFromDataColumn } from '../../../shared/components/table/TableFromData';
import FeaturesView, {
  type ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';
import externalUrls from '../../../shared/config/externalUrls';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import { stringToColour } from '../../../shared/utils/color';
import { markBackground, markBorder } from '../../../shared/utils/nightingale';
import { processUrlTemplate } from '../../../shared/utils/xrefs';
import { sortByLocation } from '../../../uniprotkb/utils';
import { type SequenceFeature } from '../../adapters/uniParcConverter';

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
        accession: v1(), // Can't rely on feature.databaseId being unique
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

const getRowId = (data: UniParcProcessedFeature) => data.accession;

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
        label: 'InterPro Name',
        id: 'interpro-name',
        render: (feature) =>
          feature.interproGroupId ? (
            <ExternalLink
              url={externalUrls.InterProEntry(feature.interproGroupId)}
            >
              {feature.interproGroupName}
            </ExternalLink>
          ) : (
            <em>Not integrated into an InterPro entry</em>
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
          // Additional prefix 'G3DSA:' in UniParc will be removed in https://www.ebi.ac.uk/panda/jira/browse/TRM-32164.
          // Adjust the below logic accordingly
          let revisedDatabaseId = databaseId;
          if (databaseId && (database === 'FunFam' || database === 'Gene3D')) {
            revisedDatabaseId = databaseId.replace('G3DSA:', '');
          }

          if (revisedDatabaseId) {
            if (databaseInfo?.uriLink) {
              return (
                <ExternalLink
                  url={processUrlTemplate(databaseInfo.uriLink, {
                    id: revisedDatabaseId,
                  })}
                >
                  {revisedDatabaseId}
                </ExternalLink>
              );
            } else {
              return revisedDatabaseId;
            }
          }

          return (
            <>
              {databaseInfo?.uriLink && databaseId && (
                <ExternalLink
                  url={processUrlTemplate(databaseInfo.uriLink, {
                    id: revisedDatabaseId || databaseId,
                  })}
                >
                  {databaseId}
                </ExternalLink>
              )}
            </>
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
      markBorder={markBorder}
      markBackground={markBackground}
    />
  );
};
export default UniParcFeaturesView;
