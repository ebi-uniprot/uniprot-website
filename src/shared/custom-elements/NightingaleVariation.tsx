import { createComponent } from '@lit/react';
import NightingaleVariation from '@nightingale-elements/nightingale-variation';
import * as React from 'react';

const NightingaleVariationComponent = createComponent({
  tagName: 'nightingale-variation',
  elementClass: NightingaleVariation,
  react: React,
});

export default NightingaleVariationComponent;
