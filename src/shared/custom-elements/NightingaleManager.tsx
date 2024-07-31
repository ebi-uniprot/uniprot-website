import * as React from 'react';
import { createComponent } from '@lit/react';
import NightingaleManager from '@nightingale-elements/nightingale-manager';

export const NightingaleManagerComponent = createComponent({
  tagName: 'nightingale-manager',
  elementClass: NightingaleManager,
  react: React,
});

export default NightingaleManagerComponent;
