import React, { Fragment, useCallback, useState } from 'react';
import { html, TemplateResult } from 'lit-html';
import ProtvistaTrack from 'protvista-track';
import ProtvistaManager from 'protvista-manager';
import ProtvistaDatatable from 'protvista-datatable';
import ProtvistaSequence from 'protvista-sequence';
import ProtvistaNavigation from 'protvista-navigation';
import { loadWebComponent } from '../../../utils/utils';
import { Evidence } from '../../../model/types/modelTypes';
import FeatureType from '../../../model/types/FeatureType';
import {
  UniProtProtvistaEvidenceTag,
  UniProtEvidenceTagContent,
} from '../../../components/UniProtEvidenceTag';
import { EvidenceData } from '../../../model/types/EvidenceCodes';

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
  };
  evidences?: Evidence[];
}[];

type ProtvistaFeature = {
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

type ProcessedDatum = {
  accession: string | undefined;
  start: number;
  end: number;
  startModifier: LocationModifier;
  endModifier: LocationModifier;
  type: FeatureType;
  description: string | undefined;
  evidences: Evidence[] | undefined;
};

const processData = (data: FeatureData): ProcessedDatum[] =>
  data.map(
    (feature): ProcessedDatum => {
      return {
        accession: feature.featureId,
        start: feature.location.start.value,
        end: feature.location.end.value,
        startModifier: feature.location.start.modifier,
        endModifier: feature.location.end.modifier,
        type: feature.type,
        description: feature.description,
        evidences: feature.evidences,
      };
    }
  );

const FeaturesView: React.FC<FeatureProps> = ({
  sequence,
  features,
}): JSX.Element | null => {
  loadWebComponent('protvista-track', ProtvistaTrack);
  loadWebComponent('protvista-manager', ProtvistaManager);
  loadWebComponent('protvista-datatable', ProtvistaDatatable);
  loadWebComponent('protvista-sequence', ProtvistaSequence);
  loadWebComponent('protvista-navigation', ProtvistaNavigation);

  const processedData = processData(features);
  const [showEvidenceTagData, setShowEvidenceTagData] = useState(false);
  const [selectedEvidenceData, setSelectedEvidenceData] = useState();
  const [selectedReferences, setSelectedReferences] = useState();

  const evidenceTagCallback = (
    evidenceData: EvidenceData,
    references: Evidence[] | undefined
  ) => {
    setSelectedEvidenceData(evidenceData);
    setSelectedReferences(references);
    setShowEvidenceTagData(true);
  };

  const columns = {
    type: {
      label: 'Type',
      resolver: (d: ProtvistaFeature): string => d.type,
    },
    positions: {
      label: 'Positions',
      resolver: (d: ProtvistaFeature): string =>
        `${d.startModifier === LocationModifier.UNKNOWN ? '?' : d.start}-${
          d.endModifier === LocationModifier.UNKNOWN ? '?' : d.end
        }`,
    },
    description: {
      label: 'Description',
      resolver: (d: ProtvistaFeature): TemplateResult =>
        html`
          ${d.description}
          ${d.evidences &&
            UniProtProtvistaEvidenceTag(d.evidences, evidenceTagCallback)}
        `,
    },
  };

  const setTrackData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = processedData;
      }
    },
    [processedData]
  );

  const setTableData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = processedData;
        // eslint-disable-next-line no-param-reassign
        node.columns = columns;
      }
    },
    [processedData, columns]
  );

  if (processedData.length <= 0) {
    return null;
  }

  return (
    <Fragment>
      <h4>Features</h4>
      <protvista-manager attributes="highlight displaystart displayend">
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
        <protvista-datatable ref={setTableData} />
      </protvista-manager>
      <div
        className={`evidence-tag-content ${showEvidenceTagData &&
          'evidence-tag-content--visible'}`}
      >
        {selectedEvidenceData && selectedReferences && (
          <UniProtEvidenceTagContent
            evidenceData={selectedEvidenceData}
            references={selectedReferences}
          />
        )}
      </div>
    </Fragment>
  );
};

export default FeaturesView;
