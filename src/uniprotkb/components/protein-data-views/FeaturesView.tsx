import { useCallback, useMemo, FC } from 'react';
import { html, TemplateResult } from 'lit-html';
import { v1 } from 'uuid';
import { Loader } from 'franklin-sites';
import { uniq } from 'lodash-es';

import useCustomElement from '../../../shared/hooks/useCustomElement';

import { Evidence } from '../../types/modelTypes';
import FeatureType from '../../types/featureType';
import { UniProtProtvistaEvidenceTag } from './UniProtKBEvidenceTag';
import FeaturesTableView, { FeaturesTableCallback } from './FeaturesTableView';
import { Xref } from '../../../shared/types/apiModel';
import NightingaleZoomTool from './NightingaleZoomTool';

export enum LocationModifier {
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

type Fragment = {
  start: number;
  end: number;
  shape?: string;
};

export type ProcessedFeature = {
  protvistaFeatureId: string;
  featureId?: string;
  start: number;
  end: number;
  startModifier: LocationModifier;
  endModifier: LocationModifier;
  type: FeatureType;
  description?: string;
  evidences?: Evidence[];
  sequence?: string;
  locations?: { fragments: Fragment[] }[];
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

const FeaturesView: FC<FeatureProps> = ({
  sequence,
  features,
}): JSX.Element | null => {
  const navigationDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-navigation" */ 'protvista-navigation'
      ),
    'protvista-navigation'
  );
  const sequenceDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-sequence" */ 'protvista-sequence'),
    'protvista-sequence'
  );
  const managerDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-manager" */ 'protvista-manager'),
    'protvista-manager'
  );
  const ceDefined = navigationDefined && sequenceDefined && managerDefined;

  const processedData = useMemo(() => processFeaturesData(features, sequence), [
    features,
    sequence,
  ]);
  const featureTypes = useMemo(
    () => uniq(features.map(({ type }) => type.toLowerCase())),
    [features]
  );

  const getColumnConfig = (evidenceTagCallback: FeaturesTableCallback) => ({
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
          UniProtProtvistaEvidenceTag(d.evidences, evidenceTagCallback)}
        `,
    },
    sequence: {
      label: 'Sequence',
      child: true,
      resolver: (d: ProcessedFeature) => d?.sequence || '',
    },
  });

  const trackDefined = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );

  const setTrackData = useCallback(
    (node): void => {
      if (node && trackDefined) {
        // eslint-disable-next-line no-param-reassign
        node.data = processedData;
      }
    },
    [trackDefined, processedData]
  );

  if (processedData.length === 0) {
    return null;
  }

  if (!ceDefined) {
    return <Loader />;
  }

  return (
    <>
      <h3>Features</h3>
      <p>Showing features for {featureTypes.join(', ')}.</p>
      <protvista-manager attributes="highlight displaystart displayend selectedid">
        {sequence && (
          <>
            <NightingaleZoomTool length={sequence.length} />
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
          </>
        )}
        <FeaturesTableView
          data={processedData}
          getColumnConfig={getColumnConfig}
        />
      </protvista-manager>
    </>
  );
};

export default FeaturesView;
