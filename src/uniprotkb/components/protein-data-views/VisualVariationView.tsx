import { useCallback, useRef } from 'react';
import NightingaleVariation from '@nightingale-elements/nightingale-variation';
import NightingaleNavigation from '@nightingale-elements/nightingale-navigation';
import { Filter } from '@nightingale-elements/nightingale-filter';

import { filterConfig, colorConfig } from 'protvista-uniprot';
import NightingaleNavigationComponent from '../../../shared/custom-elements/NightingaleNavigation';
import NightingaleSequenceComponent from '../../../shared/custom-elements/NightingaleSequence';
import NightingaleVariationComponent from '../../../shared/custom-elements/NightingaleVariation';
import NightingaleFilterComponent from '../../../shared/custom-elements/NightingaleFilter';
import NightingaleZoomTool from './NightingaleZoomTool';

import { TransformedVariant } from '../../types/variation';

import styles from './styles/visual-variation-view.module.scss';

type VariationViewProps = {
  sequence: string;
  variants: TransformedVariant[];
};

const VisualVariationView = ({ sequence, variants }: VariationViewProps) => {
  const navigationRef = useRef<NightingaleNavigation>(null);
  const setNightingaleVariation = useCallback(
    (node: NightingaleVariation) => {
      if (node && sequence && variants) {
        // eslint-disable-next-line no-param-reassign
        node.colorConfig = colorConfig;
        // eslint-disable-next-line no-param-reassign
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
