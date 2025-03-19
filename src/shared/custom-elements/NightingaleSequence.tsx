import { createComponent } from '@lit/react';
import NightingaleSequence from '@nightingale-elements/nightingale-sequence';
import * as React from 'react';

const NightingaleSequenceComponent = createComponent({
  tagName: 'nightingale-sequence',
  elementClass: NightingaleSequence,
  react: React,
});

export default NightingaleSequenceComponent;
