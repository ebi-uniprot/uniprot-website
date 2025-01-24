import * as React from 'react';
import { createComponent } from '@lit/react';
import NightingaleVariation from '@nightingale-elements/nightingale-variation';

const NightingaleVariationComponent = createComponent({
  tagName: 'nightingale-variation',
  elementClass: NightingaleVariation,
  react: React,
});

export default NightingaleVariationComponent;
