import { Fragment, lazy, useMemo } from 'react';
import TransformedVariant from 'protvista-variation-adapter';

import LazyComponent from '../LazyComponent';

import useCustomElement from '../../hooks/useCustomElement';
import useStructuredData from '../../hooks/useStructuredData';

import dataToSchema from './features.structured';

import FeatureTypeHelpMappings from '../../../help/config/featureTypeHelpMappings';

import FeatureType from '../../../uniprotkb/types/featureType';
import { UniParcProcessedFeature } from '../../../uniparc/components/entry/UniParcFeaturesView';
import { Evidence } from '../../../uniprotkb/types/modelTypes';

import './styles/features-view.scss';

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

const FeaturesView = <
  T extends ProcessedFeature | TransformedVariant | UniParcProcessedFeature
>({
  sequence,
  features,
  table,
  trackHeight,
  withTitle = true,
}: FeatureProps<T>) => {
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

  const featureTypes = useMemo(
    () => Array.from(new Set<FeatureType>(features.map(({ type }) => type))),
    [features]
  );

  const structuredData = useMemo(() => dataToSchema<T>(features), [features]);
  useStructuredData(structuredData);

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
      <managerElement.name attributes="highlight displaystart displayend selectedid">
        {sequence && (
          <LazyComponent rootMargin="50px">
            <VisualFeaturesView
              features={features}
              sequence={sequence}
              trackHeight={trackHeight}
            />
          </LazyComponent>
        )}
        <datatableElement.name filter-scroll>{table}</datatableElement.name>
      </managerElement.name>
    </>
  );
};

export default FeaturesView;
