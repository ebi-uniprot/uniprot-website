import { useMemo, FC } from 'react';
import { html, TemplateResult } from 'lit-html';
import { v1 } from 'uuid';

import { Evidence } from '../../types/modelTypes';
import FeatureType from '../../types/featureType';
import { UniProtProtvistaEvidenceTag } from './UniProtKBEvidenceTag';
import { FeaturesTableCallback } from '../../../shared/components/views/FeaturesTableView';
import { Xref } from '../../../shared/types/apiModel';
import FeaturesView, {
  LocationModifier,
  ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';

type FeatureLocation = {
  value: number;
  modifier: LocationModifier;
};

export type FeatureData = {
  type: FeatureType;
  featureId?: string;
  description?: string;
  location: {
    start: FeatureLocation;
    end: FeatureLocation;
    sequence?: string;
  };
  alternativeSequence?: {
    originalSequence?: string;
    alternativeSequences: string[];
  };
  evidences?: Evidence[];
  featureCrossReference?: Xref;
}[];

export type ProtvistaFeature = {
  type: string;
  description: string;
  evidences: Evidence[];
  start: number;
  end: number;
  startModifier: LocationModifier;
  endModifier: LocationModifier;
};

type FeatureProps = {
  sequence?: string;
  features: FeatureData;
};

export const processFeaturesData = (
  data: FeatureData,
  sequence?: string
): ProcessedFeature[] =>
  data.map(
    (feature): ProcessedFeature => ({
      protvistaFeatureId: feature.featureId || v1(),
      featureId: feature.featureId,
      start: feature.location.start.value,
      end: feature.location.end.value,
      startModifier: feature.location.start.modifier,
      endModifier: feature.location.end.modifier,
      type: feature.type,
      description: feature.description,
      evidences: feature.evidences,
      sequence: sequence?.substring(
        feature.location.start.value - 1,
        feature.location.end.value
      ),
    })
  );

const UniProtKBFeaturesView: FC<FeatureProps> = ({
  sequence,
  features,
}): JSX.Element | null => {
  const processedData = useMemo(() => processFeaturesData(features, sequence), [
    features,
    sequence,
  ]);

  const getColumnConfig = (evidenceTagCallback?: FeaturesTableCallback) => ({
    type: {
      label: 'Type',
      resolver: (d: ProcessedFeature): string => d.type,
    },
    id: {
      label: 'ID',
      resolver: (d: ProcessedFeature): string => d.featureId || '',
    },
    positions: {
      label: 'Positions',
      resolver: (d: ProcessedFeature): string =>
        `${d.startModifier === LocationModifier.UNKNOWN ? '?' : d.start}-${
          d.endModifier === LocationModifier.UNKNOWN ? '?' : d.end
        }`,
    },
    description: {
      label: 'Description',
      resolver: (d: ProcessedFeature): TemplateResult =>
        html`
          ${d.description}
          ${d.evidences &&
          evidenceTagCallback &&
          UniProtProtvistaEvidenceTag(d.evidences, evidenceTagCallback)}
        `,
    },
    sequence: {
      label: 'Sequence',
      child: true,
      resolver: (d: ProcessedFeature) => d?.sequence || '',
    },
  });

  if (processedData.length === 0) {
    return null;
  }

  return (
    <FeaturesView
      features={processedData}
      sequence={sequence}
      columnConfig={getColumnConfig}
    />
  );
};

export default UniProtKBFeaturesView;
