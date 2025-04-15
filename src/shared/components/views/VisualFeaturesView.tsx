import NightingaleManager from '@nightingale-elements/nightingale-manager';
import NightingaleNavigation from '@nightingale-elements/nightingale-navigation';
import NightingaleTrackCanvas from '@nightingale-elements/nightingale-track-canvas';
import { FullViewIcon } from 'franklin-sites';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';
import NightingaleZoomTool, {
  iconSize,
} from '../../../uniprotkb/components/protein-data-views/NightingaleZoomTool';
import { TabLocation } from '../../../uniprotkb/types/entry';
import NightingaleManagerComponent from '../../custom-elements/NightingaleManager';
import NightingaleNavigationComponent from '../../custom-elements/NightingaleNavigation';
import NightingaleSequenceComponent from '../../custom-elements/NightingaleSequence';
import NightingaleTrackCanvasComponent from '../../custom-elements/NightingaleTrackCanvas';
import { Namespace } from '../../types/namespaces';
import { sendGtagEventFeatureViewerFullViewClick } from '../../utils/gtagEvents';
import {
  getZoomedInRange,
  NightingaleViewRange,
} from '../../utils/nightingale';
import { Dataset } from '../entry/EntryDownload';
import EntryDownloadButton from '../entry/EntryDownloadButton';
import EntryDownloadPanel from '../entry/EntryDownloadPanel';
import { ProcessedFeature } from './FeaturesView';
import styles from './styles/visual-features-view.module.scss';

function getHighlightedCoordinates<T extends ProcessedFeature>(feature?: T) {
  return feature?.start && feature?.end
    ? `${feature.start}:${feature.end}`
    : undefined;
}

type Props<T> = {
  features: T[];
  sequence: string;
  trackHeight?: number;
  noLinkToFullView?: boolean;
  onFeatureClick: (feature: T) => void; // NOTE: make sure this is memoized with a callback in the consumer
  onViewRangeChange: (range: NightingaleViewRange) => void;
  highlightedFeature?: T;
  range: [number, number] | null;
};

function VisualFeaturesView<T extends ProcessedFeature>({
  features,
  sequence,
  trackHeight = 40,
  noLinkToFullView,
  onFeatureClick,
  onViewRangeChange,
  highlightedFeature,
  range,
}: Props<T>) {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const params = useParams<{ accession: string }>();
  const trackRef = useRef<NightingaleTrackCanvas>(null);
  const managerRef = useRef<NightingaleManager>(null);
  const navigationRef = useRef<NightingaleNavigation>(null);

  // NightingaleTrack data loading and feature click event handler
  useEffect(() => {
    const eventHandler = (e: Event) => {
      const { detail } = e as CustomEvent<
        NightingaleViewRange & { eventType: 'click'; feature: T }
      >;
      if (detail?.eventType === 'click' && detail?.feature) {
        onFeatureClick(detail.feature as T);
      }
    };
    if (trackRef.current) {
      trackRef.current.data = features;
      trackRef.current.addEventListener('change', eventHandler);
    }
    return () => {
      document.removeEventListener('change', eventHandler);
    };
  }, [features, onFeatureClick]);

  // Initially zoom to the AA level
  useEffect(() => {
    if (managerRef.current) {
      managerRef.current.dispatchEvent(
        new CustomEvent('change', {
          detail: getZoomedInRange(features, sequence.length),
          bubbles: true,
          cancelable: true,
        })
      );
    }
  }, [features, sequence.length]);

  // Call onViewRangeChange when NightingaleManager view range changes
  useEffect(() => {
    const eventHandler = (e: Event) => {
      const { detail } = e as CustomEvent<
        NightingaleViewRange & { eventType: 'change' }
      >;
      if (detail?.['display-start'] && detail?.['display-end']) {
        onViewRangeChange(detail);
      }
    };
    if (managerRef.current) {
      managerRef.current.addEventListener('change', eventHandler);
    }
    return () => {
      document.removeEventListener('change', eventHandler);
    };
  }, [managerRef, onViewRangeChange]);

  // Dispatch range change event to NightingaleManager
  useEffect(() => {
    if (managerRef.current && range) {
      managerRef.current.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            'display-start': range[0],
            'display-end': range[1],
          },
          bubbles: true,
          cancelable: true,
        })
      );
    }
  }, [range]);

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  const featureTypes: string[] = Array.from(
    new Set(features.flatMap((feature) => feature.type as string))
  );

  return (
    <div>
      {displayDownloadPanel && (
        <EntryDownloadPanel
          handleToggle={handleToggleDownload}
          dataset={Dataset.selectedFeatures}
          featureTypes={featureTypes}
        />
      )}
      <NightingaleZoomTool
        length={sequence.length}
        nightingaleNavigationRef={navigationRef}
      />
      <EntryDownloadButton handleToggle={handleToggleDownload} />
      {!noLinkToFullView && (
        <Link
          to={getEntryPath(
            Namespace.uniprotkb,
            params.accession,
            TabLocation.FeatureViewer
          )}
          title="View in the Feature Viewer"
          onClick={() => {
            sendGtagEventFeatureViewerFullViewClick(params.accession);
          }}
          className={styles['full-view']}
        >
          <FullViewIcon height={iconSize} />
        </Link>
      )}
      <NightingaleManagerComponent
        ref={managerRef}
        reflected-attributes="highlight,display-start,display-end,selectedid"
        highlight={getHighlightedCoordinates(highlightedFeature)}
      >
        <NightingaleNavigationComponent
          ref={navigationRef}
          length={sequence.length}
          height={40}
        />
        <NightingaleTrackCanvasComponent
          ref={trackRef}
          length={sequence.length}
          layout="non-overlapping"
          height={trackHeight}
          use-ctrl-to-zoom
        />
        <NightingaleSequenceComponent
          sequence={sequence}
          length={sequence.length}
          height={20}
          use-ctrl-to-zoom
          numberOfTicks={0}
        />
      </NightingaleManagerComponent>
    </div>
  );
}

export default VisualFeaturesView;
