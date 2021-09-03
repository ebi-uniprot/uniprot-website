import { html } from 'lit-html';
import { sortBy } from 'lodash-es';
import { FC, useMemo } from 'react';

import FeaturesView, {
  ColumnConfig,
  ProcessedFeature,
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

// Define columns
const columnConfig: ColumnConfig<UniParcProcessedFeature> = () => ({
  interproGroup: {
    label: 'InterPro Group',
    resolver: (d) =>
      d.interproGroupId
        ? html`<a
            href="${externalUrls.InterProEntry(d.interproGroupId)}"
            target="_blank"
            rel="noreferrer"
            >${d.interproGroupName}</a
          >`
        : 'N/A',
  },
  positions: {
    label: 'Positions',
    resolver: (d) => `${d.start}-${d.end}`,
  },
  databaseId: {
    label: 'Database identifier',
    resolver: (d) => {
      const { database, databaseId } = d;
      const databaseInfo = databaseToDatabaseInfo[database];
      if (databaseInfo && databaseId) {
        return html`<a
          href="${processUrlTemplate(databaseInfo.uriLink, { id: databaseId })}"
          target="_blank"
          rel="norefferer"
          >${databaseId}</a
        >`;
      }
      return databaseId;
    },
  },
  database: {
    label: 'Database',
    resolver: (d): string => d.database,
  },
});

const UniParcFeaturesView: FC<{
  data: SequenceFeature[];
  sequence: string;
}> = ({ data, sequence }) => {
  const processedData = useMemo(() => convertData(data), [data]);
  return (
    <FeaturesView
      features={processedData}
      columnConfig={columnConfig}
      sequence={sequence}
    />
  );
};
export default UniParcFeaturesView;
