import { createComponent } from '@lit/react';
import NightingaleFilter from '@nightingale-elements/nightingale-filter';
import * as React from 'react';

const NightingaleFilterComponent = createComponent({
  tagName: 'nightingale-filter',
  elementClass: NightingaleFilter,
  react: React,
});

export default NightingaleFilterComponent;
