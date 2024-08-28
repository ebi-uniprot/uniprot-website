import { useMemo, ReactNode } from 'react';
import { v1 } from 'uuid';

import FeaturesView, {
  LocationModifier,
  ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';
import LigandDescriptionView, {
  Ligand,
  LigandPart,
} from './LigandDescriptionView';

import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';

import listFormat from '../../../shared/utils/listFormat';

import { Evidence } from '../../types/modelTypes';
import FeatureType from '../../types/featureType';
import { Xref } from '../../../shared/types/apiModel';

import uniProtKBFeatureColumnConfiguration, {
  UniProtKBFeatureExtraContent,
} from '../../config/UniProtKBFeatureColumnConfiguration';

type FeatureLocation = {
  value: number;
  modifier: LocationModifier;
};

export type ConfidenceScore = 'Gold' | 'Silver' | 'Bronze';

export type FeatureDatum = {
  type: FeatureType;
  featureId?: string;
  description?: string; // Sometimes you do have an empty string though
  location: {
    start: FeatureLocation;
    end: FeatureLocation;
    sequence?: string;
  };
  // 🤷 originalSequence within alternativeSequence...
  alternativeSequence?: {
    originalSequence?: string;
    alternativeSequences?: string[];
  };
  evidences?: Evidence[];
  featureCrossReferences?: Xref[];
  ligand?: Ligand;
  ligandPart?: LigandPart;
  source?: string;
  confidenceScore?: ConfidenceScore;
};

type UniProtKBFeaturesViewProps = {
  primaryAccession: string;
  sequence?: string;
  features: FeatureDatum[];
  inResultsTable?: boolean;
  showSourceColumn?: boolean;
};

export const processFeaturesData = (
  data: FeatureDatum[],
  primaryAccession: string,
  sequence?: string
): ProcessedFeature[] =>
  data.map((feature): ProcessedFeature => {
    let s: string | undefined;
    let description: ReactNode = feature.description || '';
    if (feature.alternativeSequence) {
      if (
        feature.alternativeSequence.originalSequence &&
        feature.alternativeSequence.alternativeSequences
      ) {
        s = feature.alternativeSequence.originalSequence;
        if (feature.alternativeSequence.alternativeSequences?.length) {
          s += ` → ${feature.alternativeSequence.alternativeSequences
            .map(
              (alternative, index, array) =>
                `${listFormat(index, array, 'or')}${alternative}`
            )
            .join('')}`;
        }
      } else {
        s = 'Missing';
      }
    } else {
      s = sequence?.substring(
        feature.location.start.value - 1,
        feature.location.end.value
      );
    }
    if (feature.location.sequence) {
      description = `In isoform ${feature.location.sequence}; ${description}`;
    }

    if (feature.ligand) {
      description = (
        <LigandDescriptionView
          ligand={feature.ligand}
          ligandPart={feature.ligandPart}
          description={description}
        />
      );
    }

    return {
      accession: v1().toString(),
      id: feature.featureId,
      primaryAccession,
      start: feature.location.start.value,
      end: feature.location.end.value,
      startModifier: feature.location.start.modifier,
      endModifier: feature.location.end.modifier,
      type: feature.type,
      description,
      evidences: feature.evidences,
      sequence: s,
      source: feature.source || 'UniProt',
      confidenceScore: feature.confidenceScore,
      ligand: feature.ligand,
      ligandPart: feature.ligandPart,
      ligandDescription: feature.description,
    };
  });

const UniProtKBFeaturesView = ({
  primaryAccession,
  sequence,
  features,
  inResultsTable,
  showSourceColumn = false,
}: UniProtKBFeaturesViewProps) => {
  const processedData = useMemo(
    () => processFeaturesData(features, primaryAccession, sequence),
    [features, primaryAccession, sequence]
  );

  const smallScreen = useSmallScreen();

  const columns = useMemo(
    () =>
      uniProtKBFeatureColumnConfiguration.filter((column) => {
        if (column.id === 'source') {
          return showSourceColumn;
        }
        if (column.id === 'tools') {
          return !smallScreen;
        }
        return true;
      }),
    [showSourceColumn, smallScreen]
  );

  if (processedData.length === 0) {
    return null;
  }

  processedData.sort((a, b) =>
    a.start === b.start ? a.end - b.end : a.start - b.start
  );

  return (
    <FeaturesView
      features={processedData}
      sequence={sequence}
      columns={columns}
      rowExtraContent={UniProtKBFeatureExtraContent}
      withTitle={!inResultsTable}
    />
  );
};

export default UniProtKBFeaturesView;
