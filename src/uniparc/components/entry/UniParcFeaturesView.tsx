import { html } from 'lit-html';
import { sortBy } from 'lodash-es';
import { FC, useMemo } from 'react';

import FeaturesView, {
  ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';
import { stringToColour } from '../../../shared/utils/color';

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
        type: feature.database,
        protvistaFeatureId: feature.databaseId,
        start: locationFeature.start,
        end: locationFeature.end,
        database: feature.database,
        databaseId: feature.databaseId,
        interproGroupName: feature.interproGroup?.name,
        interproGroupId: feature.interproGroup?.id,
        color: stringToColour(feature.database),
      }))
    ),
    'interproGroupName'
  );

// DEfine columns
const columnConfig = () => ({
  interproGroup: {
    label: 'InterPro Group',
    resolver: (d: UniParcProcessedFeature) =>
      html`<a
        href="//www.ebi.ac.uk/interpro/entry/InterPro/${d.interproGroupId}"
        target="_blank"
        rel="noreferrer"
        >${d.interproGroupName}</a
      >`,
  },
  database: {
    label: 'Database',
    resolver: (d: UniParcProcessedFeature): string => d.database,
  },
  id: {
    label: 'Database Identifier',
    resolver: (d: UniParcProcessedFeature): string => d.databaseId,
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
      // trackHeight={processedData.length * 10}
    />
  );
};
export default UniParcFeaturesView;
