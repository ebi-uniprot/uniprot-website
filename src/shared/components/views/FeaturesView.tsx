import { useCallback, useMemo } from 'react';
import { Loader } from 'franklin-sites';
import TransformedVariant from 'protvista-variation-adapter';

import useCustomElement from '../../hooks/useCustomElement';
import useStructuredData from '../../hooks/useStructuredData';

import dataToSchema from './features.structured';

import { Evidence } from '../../../uniprotkb/types/modelTypes';
import NightingaleZoomTool from '../../../uniprotkb/components/protein-data-views/NightingaleZoomTool';

import FeatureType from '../../../uniprotkb/types/featureType';
import { UniParcProcessedFeature } from '../../../uniparc/components/entry/UniParcFeaturesView';

export type Fragment = {
  start: number;
  end: number;
  shape?: string;
};

export type LocationModifier = 'EXACT' | 'OUTSIDE' | 'UNSURE' | 'UNKNOWN';

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

type FeatureProps<T> = {
  features: T[];
  table: JSX.Element;
  trackHeight?: number;
  sequence?: string;
  withTitle?: boolean;
};

// ProcessedFeature | TransformedVariant | UniParcProcessedFeature
const FeaturesView = <
  T extends ProcessedFeature | TransformedVariant | UniParcProcessedFeature
>(
  props: FeatureProps<T>
) => {
  const { sequence, features, table, trackHeight, withTitle = true } = props;
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
  const datatableDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  const ceDefined =
    navigationDefined && sequenceDefined && managerDefined && datatableDefined;

  const featureTypes = useMemo(
    () => Array.from(new Set(features.map(({ type }) => type.toLowerCase()))),
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

  const structuredData = useMemo(() => dataToSchema(features), [features]);
  useStructuredData(structuredData);

  if (features.length === 0) {
    return null;
  }

  if (!ceDefined) {
    return <Loader />;
  }

  return (
    <>
      {withTitle && (
        <>
          <h3>Features</h3>
          <p>Showing features for {featureTypes.join(', ')}.</p>
        </>
      )}
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
        <protvista-datatable filter-scroll>{table}</protvista-datatable>
      </protvista-manager>
    </>
  );
};

export default FeaturesView;
