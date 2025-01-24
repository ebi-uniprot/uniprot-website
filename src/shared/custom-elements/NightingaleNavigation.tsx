import * as React from 'react';
import { createComponent } from '@lit/react';
import NightingaleNavigation from '@nightingale-elements/nightingale-navigation';

const NightingaleNavigationComponent = createComponent({
  tagName: 'nightingale-navigation',
  elementClass: NightingaleNavigation,
  react: React,
});

export default NightingaleNavigationComponent;
