import { useMemo } from 'react';
import { v1 } from 'uuid';

import { type TableFromDataColumn } from '../../../shared/components/table/TableFromData';
import FeaturesView, {
  type ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';
import { markBackground, markBorder } from '../../../shared/utils/nightingale';
import UniProtKBEvidenceTag from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';
import type FeatureType from '../../../uniprotkb/types/featureType';
import { sortByLocation } from '../../../uniprotkb/utils';
import { type ModifiedPrediction } from '../../adapters/uniParcSubEntryConverter';
import annotationTypeToSection from '../../config/UniFireAnnotationTypeToSection';

// Convert data
export const convertData = (data: ModifiedPrediction[]): ProcessedFeature[] =>
  data
    .flatMap((prediction) => ({
      accession: v1(), // there is no accession
      type: annotationTypeToSection[prediction.annotationType]
        .featureType as FeatureType,
      start: Number(prediction.start),
      end: Number(prediction.end),
      description: prediction.annotationValue,
      evidences: prediction.evidence,
    }))
    .sort(sortByLocation);

const getRowId = (data: ProcessedFeature) => data.accession;

type SubEntryFeaturesViewProps = {
  predictions: ModifiedPrediction[];
  sequence: string;
};

const SubEntryFeaturesView = ({
  predictions,
  sequence,
}: SubEntryFeaturesViewProps) => {
  const processedData = useMemo(() => convertData(predictions), [predictions]);

  const columns: TableFromDataColumn<ProcessedFeature>[] = [
    {
      label: 'Type',
      id: 'type',
      render: (feature) => feature.type,
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
      label: 'Description',
      id: 'description',
      render: (feature) => (
        <span>
          {feature.description || ''}{' '}
          <UniProtKBEvidenceTag evidences={feature.evidences} />
        </span>
      ),
    },
  ];

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
export default SubEntryFeaturesView;
