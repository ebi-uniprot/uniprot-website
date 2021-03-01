import { FC } from 'react';
import { SearchIcon } from 'franklin-sites';
import useCustomElement from '../../../shared/hooks/useCustomElement';

import './styles/nightingale-zoom-tool.scss';

// Icons and icon size TBD once designed.
const iconSize = 24;

const NightingaleZoomTool: FC<{ length: number }> = ({ length }) => {
  useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-zoom-tool" */ 'protvista-zoom-tool'
      ),
    'protvista-zoom-tool'
  );

  return (
    <div className="button-group">
      <protvista-zoom-tool length={length}>
        <span slot="zoom-in" className="nightingale-button-content">
          <SearchIcon width={iconSize} />+
        </span>
        <span slot="zoom-out" className="nightingale-button-content">
          <SearchIcon width={iconSize} />-
        </span>
        <span slot="zoom-in-seq" className="nightingale-button-content">
          <SearchIcon width={iconSize} />
          ATG
        </span>
      </protvista-zoom-tool>
    </div>
  );
};

export default NightingaleZoomTool;
