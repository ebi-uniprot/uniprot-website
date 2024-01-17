import { useCallback } from 'react';

// We have to import this specific file otherwise it gets everything in at the
// same time (including molstar...). But this path causes issues with Jest
// because it doesn't support es modules natively yet. So, not testable atm
import filterConfig, {
  colorConfig,
} from 'protvista-uniprot/dist/es/filterConfig';
import { TransformedVariant } from 'protvista-variation-adapter';

import NightingaleZoomTool from './NightingaleZoomTool';

import useCustomElement from '../../../shared/hooks/useCustomElement';

import styles from './styles/visual-variation-view.module.scss';

type VariationViewProps = {
  sequence: string;
  variants: TransformedVariant[];
};

const VisualVariationView = ({ sequence, variants }: VariationViewProps) => {
  const filterElement = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-filter" */ 'protvista-filter'),
    'protvista-filter'
  );

  const protvistaFilterRef = useCallback(
    (node) => {
      if (node && filterElement.defined) {
        // eslint-disable-next-line no-param-reassign
        node.filters = filterConfig;
      }
    },
    [filterElement.defined]
  );

  const variationElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-variation" */ 'protvista-variation'
      ),
    'protvista-variation'
  );

  const protvistaVariationRef = useCallback(
    (node) => {
      if (node && variationElement.defined && variants) {
        // eslint-disable-next-line no-param-reassign
        node.colorConfig = colorConfig;
        // eslint-disable-next-line no-param-reassign
        node.data = { sequence, variants };
        // eslint-disable-next-line no-param-reassign
        node.length = sequence.length;
      }
    },
    [variationElement.defined, sequence, variants]
  );

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

  const ceDefined =
    filterElement.defined &&
    variationElement.defined &&
    navigationElement.defined &&
    sequenceElement.defined;

  return (
    <>
      {ceDefined && (
        <div className={styles['variation-view']}>
          <NightingaleZoomTool length={sequence.length} />
          <navigationElement.name length={sequence.length} />
          <sequenceElement.name
            length={sequence.length}
            sequence={sequence}
            height="20"
            filter-scroll
            no-scroll
          />
          <filterElement.name
            for="variation-component"
            ref={protvistaFilterRef}
          />
          <variationElement.name
            id="variation-component"
            length={sequence.length}
            ref={protvistaVariationRef}
            no-scroll
          />
        </div>
      )}
    </>
  );
};

export default VisualVariationView;
