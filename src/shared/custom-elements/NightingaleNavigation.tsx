import * as React from 'react';
import { createComponent } from '@lit/react';
import NightingaleNavigation from '@nightingale-elements/nightingale-navigation';

export const NightingaleNavigationComponent = createComponent({
  tagName: 'nightingale-navigation',
  elementClass: NightingaleNavigation,
  react: React,
});

export default NightingaleNavigationComponent;
