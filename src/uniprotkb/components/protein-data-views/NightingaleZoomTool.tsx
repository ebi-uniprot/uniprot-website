import { FC } from 'react';
import { ZoomIn, ZoomOut, ZoomToSequence } from 'franklin-sites';
import useCustomElement from '../../../shared/hooks/useCustomElement';

import './styles/nightingale-zoom-tool.scss';

// Icons and icon size TBD once designed.
const iconSize = 19;

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
    <protvista-zoom-tool length={length}>
      <span slot="zoom-in" className="nightingale-button-content">
        <ZoomIn height={iconSize} />
      </span>
      <span slot="zoom-out" className="nightingale-button-content">
        <ZoomOut height={iconSize} />
      </span>
      <span slot="zoom-in-seq" className="nightingale-button-content">
        <ZoomToSequence height={iconSize} />
      </span>
    </protvista-zoom-tool>
  );
};

export default NightingaleZoomTool;
