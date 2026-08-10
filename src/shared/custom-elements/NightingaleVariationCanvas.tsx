import { createComponent } from '@lit/react';
import NightingaleVariationCanvas from '@nightingale-elements/nightingale-variation-canvas';
import * as React from 'react';

const NightingaleVariationCanvasComponent = createComponent({
  tagName: 'nightingale-variation-canvas',
  elementClass: NightingaleVariationCanvas,
  react: React,
});

export default NightingaleVariationCanvasComponent;
