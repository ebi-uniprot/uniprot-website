import { createComponent } from '@lit/react';
import NightingaleNavigation from '@nightingale-elements/nightingale-navigation';
import * as React from 'react';

const NightingaleNavigationComponent = createComponent({
  tagName: 'nightingale-navigation',
  elementClass: NightingaleNavigation,
  react: React,
});

export default NightingaleNavigationComponent;
