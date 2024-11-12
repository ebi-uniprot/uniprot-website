import * as React from 'react';
import { createComponent } from '@lit/react';
import NightingaleFilter from '@nightingale-elements/nightingale-filter';

export const NightingaleFilterComponent = createComponent({
  tagName: 'nightingale-filter',
  elementClass: NightingaleFilter,
  react: React,
});

export default NightingaleFilterComponent;
