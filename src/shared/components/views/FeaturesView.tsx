import { Fragment, useCallback, useMemo } from 'react';
import TransformedVariant from 'protvista-variation-adapter';

import useCustomElement from '../../hooks/useCustomElement';

import { Evidence } from '../../../uniprotkb/types/modelTypes';
import NightingaleZoomTool from '../../../uniprotkb/components/protein-data-views/NightingaleZoomTool';

import FeatureTypeHelpMappings from '../../../help/config/featureTypeHelpMappings';

import FeatureType from '../../../uniprotkb/types/featureType';
import { UniParcProcessedFeature } from '../../../uniparc/components/entry/UniParcFeaturesView';

import './styles/features-view.scss';

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
  const navigationElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-navigation" */ 'protvista-navigation'
      ),
    'protvista-navigation'
  );
  const sequenceElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-sequence" */ 'protvista-sequence'),
    'protvista-sequence'
  );
  const managerElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-manager" */ 'protvista-manager'),
    'protvista-manager'
  );
  const datatableElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  const ceDefined =
    navigationElement.defined &&
    sequenceElement.defined &&
    managerElement.defined &&
    datatableElement.defined;

  const featureTypes = useMemo(
    () => new Set<FeatureType>(features.map(({ type }) => type)),
    [features]
  );

  const trackElement = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );

  const setTrackData = useCallback(
    (node): void => {
      if (node && trackElement.defined) {
        // eslint-disable-next-line no-param-reassign
        node.data = features;
      }
    },
    [trackElement.defined, features]
  );

  if (features.length === 0) {
    return null;
  }

  return (
    <>
      {withTitle && (
        <>
          <h3>Features</h3>
          <p>
            Showing features for{' '}
            {Array.from(featureTypes).map((featureType, i) => (
              <Fragment key={featureType}>
                {i > 0 && ', '}
                {featureType === 'Other' ? (
                  featureType.toLowerCase()
                ) : (
                  <span data-article-id={FeatureTypeHelpMappings[featureType]}>
                    {featureType.toLowerCase()}
                  </span>
                )}
              </Fragment>
            ))}
            .
          </p>
        </>
      )}
      <managerElement.name attributes="highlight displaystart displayend selectedid">
        {ceDefined && sequence && (
          <>
            <NightingaleZoomTool length={sequence.length} />
            <navigationElement.name length={sequence.length} />
            <trackElement.name
              ref={setTrackData}
              length={sequence.length}
              layout="non-overlapping"
              height={trackHeight}
            />
            <sequenceElement.name
              sequence={sequence}
              length={sequence.length}
              height="20"
            />
          </>
        )}
        <datatableElement.name filter-scroll>{table}</datatableElement.name>
      </managerElement.name>
    </>
  );
};

export default FeaturesView;
