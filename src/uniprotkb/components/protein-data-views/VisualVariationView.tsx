import { useCallback } from 'react';

// We have to import this specific file otherwise it gets everything in at the
// same time (including molstar...). But this path causes issues with Jest
// because it doesn't support es modules natively yet. So, not testable atm
import { colorConfig } from 'protvista-uniprot/dist/es/filterConfig';

import NightingaleNavigationComponent from '../../../shared/custom-elements/NightingaleNavigation';
import NightingaleSequenceComponent from '../../../shared/custom-elements/NightingaleSequence';
import NightingaleVariationComponent from '../../../shared/custom-elements/NightingaleVariation';

import NightingaleZoomTool from './NightingaleZoomTool';

import { TransformedVariant } from '../../types/variation';

import styles from './styles/visual-variation-view.module.scss';

type VariationViewProps = {
  sequence: string;
  variants: TransformedVariant[];
};

const VisualVariationView = ({ sequence, variants }: VariationViewProps) => {
  const nightingaleVariationRef = useCallback(
    (
      node: {
        colorConfig: typeof colorConfig;
        data: VariationViewProps;
        length: number;
      } | null
    ) => {
      if (node && variants) {
        // eslint-disable-next-line no-param-reassign
        node.colorConfig = colorConfig;
        // eslint-disable-next-line no-param-reassign
        node.data = { sequence, variants };
        // eslint-disable-next-line no-param-reassign
        node.length = sequence.length;
      }
    },
    [sequence, variants]
  );

  return (
    <div className={styles['variation-view']}>
      <NightingaleZoomTool length={sequence.length} />
      <NightingaleNavigationComponent length={sequence.length} />
      <NightingaleSequenceComponent
        length={sequence.length}
        sequence={sequence}
        height={20}
        filter-scroll
        no-scroll
      />
      {/*
          TODO: replace with new
           <filterElement.name
            for="variation-component"
            ref={protvistaFilterRef}
          /> */}
      <NightingaleVariationComponent
        id="variation-component"
        length={sequence.length}
        ref={nightingaleVariationRef}
        no-scroll
      />
    </div>
  );
};

export default VisualVariationView;
