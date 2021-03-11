import { useCallback, useMemo } from 'react';
import { Loader } from 'franklin-sites';
import { uniq } from 'lodash-es';

import useCustomElement from '../../hooks/useCustomElement';

import { Evidence } from '../../../uniprotkb/types/modelTypes';
import FeaturesTableView, { FeatureColumns } from './FeaturesTableView';
import NightingaleZoomTool from '../../../uniprotkb/components/protein-data-views/NightingaleZoomTool';
import { EvidenceData } from '../../../uniprotkb/config/evidenceCodes';
import FeatureType from '../../../uniprotkb/types/featureType';

export type Fragment = {
  start: number;
  end: number;
  shape?: string;
};

export enum LocationModifier {
  EXACT = 'EXACT',
  OUTSIDE = 'OUTSIDE',
  UNSURE = 'UNSURE',
  UNKNOWN = 'UNKNOWN',
}

export type ProcessedFeature = {
  protvistaFeatureId: string;
  featureId?: string;
  start: number;
  end: number;
  startModifier?: LocationModifier;
  endModifier?: LocationModifier;
  type: FeatureType;
  description?: string;
  evidences?: Evidence[];
  sequence?: string;
  locations?: { fragments: Fragment[] }[];
};

export type ColumnConfig<FeatureType> = (
  callback: (
    evidenceData: EvidenceData,
    references: Evidence[] | undefined
  ) => void
) => FeatureColumns<FeatureType>;

type FeatureProps<T> = {
  features: T[];
  columnConfig: ColumnConfig<T>;
  // eslint-disable-next-line react/require-default-props
  trackHeight?: number;
  // eslint-disable-next-line react/require-default-props
  sequence?: string;
};

// ProcessedFeature | TransformedVariant | UniParcProcessedFeature
const FeaturesView = <T extends Record<string, unknown>>(
  props: FeatureProps<T>
) => {
  const { sequence, features, columnConfig, trackHeight } = props;
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

  const featureTypes = useMemo(
    () => uniq(features.map(({ type }) => (type as string).toLowerCase())),
    [features]
  );

  const trackDefined = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );

  const setTrackData = useCallback(
    (node): void => {
      if (node && trackDefined) {
        // eslint-disable-next-line no-param-reassign
        node.data = features;
      }
    },
    [trackDefined, features]
  );

  if (features.length === 0) {
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
              height={trackHeight}
            />
            <protvista-sequence
              sequence={sequence}
              length={sequence.length}
              height="20"
            />
          </>
        )}
        <FeaturesTableView data={features} columnConfig={columnConfig} />
      </protvista-manager>
    </>
  );
};

export default FeaturesView;
