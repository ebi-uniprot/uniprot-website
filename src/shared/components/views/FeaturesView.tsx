import { Fragment, lazy, ReactNode, useMemo } from 'react';
import TransformedVariant from 'protvista-variation-adapter';

import LazyComponent from '../LazyComponent';
import { NightingaleManager } from '../../../nightingale/manager/NightingaleManager';
import DatatableWithToggle from './DatatableWithToggle';

import { useSmallScreen } from '../../hooks/useMatchMedia';

import FeatureTypeHelpMappings from '../../../help/config/featureTypeHelpMappings';

import FeatureType from '../../../uniprotkb/types/featureType';
import { UniParcProcessedFeature } from '../../../uniparc/components/entry/UniParcFeaturesView';
import { Evidence } from '../../../uniprotkb/types/modelTypes';
import { ConfidenceScore } from '../../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';

const VisualFeaturesView = lazy(
  () =>
    import(/* webpackChunkName: "visual-feature-view" */ './VisualFeaturesView')
);

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
  description?: ReactNode;
  evidences?: Evidence[];
  sequence?: string;
  locations?: { fragments: Fragment[] }[];
  source?: string;
  confidenceScore?: ConfidenceScore;
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
>({
  sequence,
  features,
  table,
  trackHeight,
  withTitle = true,
}: FeatureProps<T>) => {
  const isSmallScreen = useSmallScreen();

  const featureTypes = useMemo(
    () => Array.from(new Set<FeatureType>(features.map(({ type }) => type))),
    [features]
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
            {featureTypes.map((featureType, i) => (
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
      <NightingaleManager attributes="highlight displaystart displayend selectedid">
        {sequence && (
          <LazyComponent
            rootMargin="50px"
            render={isSmallScreen ? false : undefined}
            fallback={null}
          >
            <VisualFeaturesView
              features={features}
              sequence={sequence}
              trackHeight={trackHeight}
            />
          </LazyComponent>
        )}
        <DatatableWithToggle>{table}</DatatableWithToggle>
      </NightingaleManager>
    </>
  );
};

export default FeaturesView;
