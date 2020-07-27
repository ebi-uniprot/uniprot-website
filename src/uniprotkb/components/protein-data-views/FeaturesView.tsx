import React, { Fragment, useCallback } from 'react';
import { html, TemplateResult } from 'lit-html';
import ProtvistaTrack from 'protvista-track';
import ProtvistaManager from 'protvista-manager';
import ProtvistaSequence from 'protvista-sequence';
import ProtvistaNavigation from 'protvista-navigation';
import { v1 } from 'uuid';
import { loadWebComponent } from '../../../shared/utils/utils';
import { Evidence } from '../../types/modelTypes';
import FeatureType from '../../types/featureType';
import { UniProtProtvistaEvidenceTag } from './UniProtKBEvidenceTag';
import FeaturesTableView, { FeaturesTableCallback } from './FeaturesTableView';
import { Xref } from '../../types/commentTypes';

enum LocationModifier {
  EXACT = 'EXACT',
  OUTSIDE = 'OUTSIDE',
  UNSURE = 'UNSURE',
  UNKNOWN = 'UNKNOWN',
}

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

export type ProcessedFeature = {
  protvistaFeatureId?: string;
  start: number;
  end: number;
  startModifier: LocationModifier;
  endModifier: LocationModifier;
  type: FeatureType;
  description?: string;
  evidences?: Evidence[];
  sequence?: string;
};

export const processFeaturesData = (
  data: FeatureData,
  sequence?: string
): ProcessedFeature[] =>
  data.map(
    (feature): ProcessedFeature => ({
      protvistaFeatureId: feature.featureId ? feature.featureId : v1(),
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

const FeaturesView: React.FC<FeatureProps> = ({
  sequence,
  features,
}): JSX.Element | null => {
  loadWebComponent('protvista-track', ProtvistaTrack);
  loadWebComponent('protvista-manager', ProtvistaManager);
  loadWebComponent('protvista-sequence', ProtvistaSequence);
  loadWebComponent('protvista-navigation', ProtvistaNavigation);

  const processedData = processFeaturesData(features, sequence);

  const getColumnConfig = (evidenceTagCallback: FeaturesTableCallback) => ({
    type: {
      label: 'Type',
      resolver: (d: ProcessedFeature): string => {
        return d.type;
      },
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
          UniProtProtvistaEvidenceTag(d.evidences, evidenceTagCallback)}
        `,
    },
    sequence: {
      label: 'Sequence',
      child: true,
      resolver: (d: ProcessedFeature) => (d.sequence ? d.sequence : ''),
    },
  });

  const setTrackData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = processedData;
      }
    },
    [processedData]
  );

  if (processedData.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <h3>Features</h3>
      <protvista-manager attributes="highlight displaystart displayend selectedid">
        {sequence && (
          <Fragment>
            <protvista-navigation length={sequence.length} />
            <protvista-track
              ref={setTrackData}
              length={sequence.length}
              layout="non-overlapping"
            />
            <protvista-sequence
              sequence={sequence}
              length={sequence.length}
              height="20"
            />
          </Fragment>
        )}
        <FeaturesTableView
          data={processedData}
          getColumnConfig={getColumnConfig}
        />
      </protvista-manager>
    </Fragment>
  );
};

export default FeaturesView;
