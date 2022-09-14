import { ZoomIn, ZoomOut, ZoomToSequence } from 'franklin-sites';
import useCustomElement from '../../../shared/hooks/useCustomElement';

import './styles/nightingale-zoom-tool.scss';

// Icons and icon size TBD once designed.
export const iconSize = 19;

const NightingaleZoomTool = ({ length }: { length: number }) => {
  const protvistaZoomToolElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-zoom-tool" */ 'protvista-zoom-tool'
      ),
    'protvista-zoom-tool'
  );

  return (
    <protvistaZoomToolElement.name length={length}>
      <span slot="zoom-in" className="nightingale-button-content">
        <ZoomIn height={iconSize} />
      </span>
      <span slot="zoom-out" className="nightingale-button-content">
        <ZoomOut height={iconSize} />
      </span>
      <span slot="zoom-in-seq" className="nightingale-button-content">
        <ZoomToSequence height={iconSize} />
      </span>
    </protvistaZoomToolElement.name>
  );
};

export default NightingaleZoomTool;
