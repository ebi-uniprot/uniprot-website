import { ZoomIn, ZoomOut, ZoomToSequence } from 'franklin-sites';

import './styles/nightingale-zoom-tool.scss';

export type ZoomOperations = 'zoom-in' | 'zoom-out' | 'zoom-in-seq';

// Icons and icon size TBD once designed.
export const iconSize = 19;

// TODO: use own zoom tool here

const NightingaleZoomTool = ({
  onZoom,
}: {
  onZoom?: (x: ZoomOperations) => void;
}) => (
  <>
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
  </>
);

export default NightingaleZoomTool;
