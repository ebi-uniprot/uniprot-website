import { createComponent } from '@lit/react';
import NightingaleManager from '@nightingale-elements/nightingale-manager';
import * as React from 'react';

const NightingaleManagerComponent = createComponent({
  tagName: 'nightingale-manager',
  elementClass: NightingaleManager,
  react: React,
});

export default NightingaleManagerComponent;
