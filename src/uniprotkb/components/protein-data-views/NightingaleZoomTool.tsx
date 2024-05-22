import { ZoomIn, ZoomOut, ZoomToSequence } from 'franklin-sites';
import useCustomElement from '../../../shared/hooks/useCustomElement';

import './styles/nightingale-zoom-tool.scss';

export type ZoomOperations = 'zoom-in' | 'zoom-out' | 'zoom-in-seq';

// Icons and icon size TBD once designed.
export const iconSize = 19;

const NightingaleZoomTool = ({
  length,
  onZoom,
}: {
  length: number;
  onZoom?: (x: ZoomOperations) => void;
}) => {
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
      <span
        slot="zoom-in"
        className="nightingale-button-content"
        onClick={() => onZoom?.('zoom-in')}
        aria-hidden="true"
      >
        <ZoomIn height={iconSize} />
      </span>
      <span
        slot="zoom-out"
        className="nightingale-button-content"
        onClick={() => onZoom?.('zoom-out')}
        aria-hidden="true"
      >
        <ZoomOut height={iconSize} />
      </span>
      <span
        slot="zoom-in-seq"
        className="nightingale-button-content"
        onClick={() => onZoom?.('zoom-in-seq')}
        aria-hidden="true"
      >
        <ZoomToSequence height={iconSize} />
      </span>
    </protvistaZoomToolElement.name>
  );
};

export default NightingaleZoomTool;
