import { type Filter } from '@nightingale-elements/nightingale-filter';
import type NightingaleNavigation from '@nightingale-elements/nightingale-navigation';
import type NightingaleVariation from '@nightingale-elements/nightingale-variation';
import { colorConfig, filterConfig } from 'protvista-uniprot';
import { useCallback, useRef } from 'react';

import NightingaleFilterComponent from '../../../shared/custom-elements/NightingaleFilter';
import NightingaleNavigationComponent from '../../../shared/custom-elements/NightingaleNavigation';
import NightingaleSequenceComponent from '../../../shared/custom-elements/NightingaleSequence';
import NightingaleVariationComponent from '../../../shared/custom-elements/NightingaleVariation';
import { type TransformedVariant } from '../../types/variation';
import NightingaleZoomTool from './NightingaleZoomTool';
import styles from './styles/visual-variation-view.module.scss';

type VariationViewProps = {
  sequence: string;
  variants: TransformedVariant[];
};

const VisualVariationView = ({ sequence, variants }: VariationViewProps) => {
  const navigationRef = useRef<NightingaleNavigation | null>(null);
  const setNightingaleVariation = useCallback(
    (node: NightingaleVariation) => {
      if (node && sequence && variants) {
        node.colorConfig = colorConfig;

        node.data = { sequence, variants };
      }
    },
    [sequence, variants]
  );

  return (
    <div className={styles['variation-view']}>
      <NightingaleZoomTool
        length={sequence.length}
        nightingaleNavigationRef={navigationRef}
      />
      <NightingaleNavigationComponent
        ref={navigationRef}
        length={sequence.length}
        height={40}
      />
      <NightingaleSequenceComponent
        length={sequence.length}
        sequence={sequence}
        height={20}
        use-ctrl-to-zoom
      />

      <NightingaleFilterComponent
        for="variation-component"
        filters={filterConfig as Filter[]}
      />
      <NightingaleVariationComponent
        id="variation-component"
        length={sequence.length}
        height={430}
        ref={setNightingaleVariation}
        use-ctrl-to-zoom
      />
    </div>
  );
};

export default VisualVariationView;
