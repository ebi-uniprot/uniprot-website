import { sortBy } from 'lodash-es';
import { FC, useMemo } from 'react';

import FeaturesView, {
  ProcessedFeature,
  TableConfig,
} from '../../../shared/components/views/FeaturesView';
import externalUrls from '../../../shared/config/externalUrls';
import { stringToColour } from '../../../shared/utils/color';
import { processUrlTemplate } from '../../../uniprotkb/components/protein-data-views/XRefView';
import { databaseToDatabaseInfo } from '../../../uniprotkb/config/database';

import { SequenceFeature } from '../../adapters/uniParcConverter';

export type UniParcProcessedFeature = ProcessedFeature & {
  database: string;
  databaseId: string;
  interproGroupName?: string;
  interproGroupId?: string;
};

// Convert data
const convertData = (data: SequenceFeature[]): UniParcProcessedFeature[] =>
  sortBy(
    data.flatMap((feature) =>
      feature.locations.map((locationFeature) => ({
        type: 'Other',
        protvistaFeatureId: feature.databaseId,
        start: locationFeature.start,
        end: locationFeature.end,
        database: feature.database,
        databaseId: feature.databaseId,
        interproGroupName: feature.interproGroup?.name,
        interproGroupId: feature.interproGroup?.id,
        color: stringToColour(feature.database, 240), // use the name to define colour
      }))
    ),
    'interproGroupName'
  );

// Define table contents
const tableConfig: TableConfig<UniParcProcessedFeature> = [
  {
    columnLabel: 'InterPro Group',
    columnRenderer: (d) =>
      d.interproGroupId ? (
        <a
          href={externalUrls.InterProEntry(d.interproGroupId)}
          target="_blank"
          rel="noreferrer"
        >
          {d.interproGroupName}
        </a>
      ) : (
        'N/A'
      ),
  },
  {
    columnLabel: 'Positions',
    columnRenderer: (d) => `${d.start}-${d.end}`,
  },
  {
    columnLabel: 'Database identifier',
    columnRenderer: (d) => {
      const { database, databaseId } = d;
      const databaseInfo = databaseToDatabaseInfo[database];
      if (databaseInfo && databaseId) {
        return (
          <a
            href={processUrlTemplate(databaseInfo.uriLink, { id: databaseId })}
            target="_blank"
            rel="noreferrer"
          >
            {databaseId}
          </a>
        );
      }
      return databaseId;
    },
  },
  {
    columnLabel: 'Database',
    columnRenderer: (d): string => d.database,
  },
];

const UniParcFeaturesView: FC<{
  data: SequenceFeature[];
  sequence: string;
}> = ({ data, sequence }) => {
  const processedData = useMemo(() => convertData(data), [data]);
  return (
    <FeaturesView
      features={processedData}
      tableConfig={tableConfig}
      sequence={sequence}
    />
  );
};
export default UniParcFeaturesView;
