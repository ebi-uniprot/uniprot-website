import { useEffect, useRef, useState } from 'react';
import { FullViewIcon } from 'franklin-sites';
import { Link, useParams } from 'react-router-dom';
import NightingaleTrack from '@nightingale-elements/nightingale-track';
import NightingaleManager from '@nightingale-elements/nightingale-manager';

import NightingaleNavigationComponent from '../../custom-elements/NightingaleNavigation';
import NightingaleSequenceComponent from '../../custom-elements/NightingaleSequence';
import NightingalTrackComponent from '../../custom-elements/NightingaleTrack';
import NightingaleManagerComponent from '../../custom-elements/NightingaleManager';
import NightingaleZoomTool, {
  iconSize,
} from '../../../uniprotkb/components/protein-data-views/NightingaleZoomTool';
import EntryDownloadPanel from '../entry/EntryDownloadPanel';
import EntryDownloadButton from '../entry/EntryDownloadButton';

import { getEntryPath } from '../../../app/config/urls';
import { sendGtagEventFeatureViewerFullViewClick } from '../../utils/gtagEvents';

import { TabLocation } from '../../../uniprotkb/types/entry';
import { Namespace } from '../../types/namespaces';
import { Dataset } from '../entry/EntryDownload';
import { NightingaleViewRange } from '../../utils/nightingale';

import styles from './styles/visual-features-view.module.scss';
import { GenericFeature } from './FeaturesView';

const getHighlightedCoordinates = (feature?: GenericFeature) =>
  feature?.start && feature?.end
    ? `${feature.start}:${feature.end}`
    : undefined;

type Props = {
  features: GenericFeature[];
  sequence: string;
  trackHeight?: number;
  noLinkToFullView?: boolean;
  onFeatureClick: (feature: GenericFeature) => void;
  onViewRangeChange: (range: NightingaleViewRange) => void;
  highlightedFeature?: GenericFeature;
};

function VisualFeaturesView({
  features,
  sequence,
  trackHeight = 40,
  noLinkToFullView,
  onFeatureClick,
  onViewRangeChange,
  highlightedFeature,
}: Props) {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const params = useParams<{ accession: string }>();
  const trackRef = useRef<NightingaleTrack>(null);
  const managerRef = useRef<NightingaleManager>(null);

  // NightingaleTrack data loading and feature click event handler
  useEffect(() => {
    const eventHandler = (e: Event) => {
      const { detail } = e as CustomEvent<
        NightingaleViewRange & { eventType: 'click'; feature: GenericFeature }
      >;
      if (detail?.eventType === 'click' && detail?.feature) {
        onFeatureClick(detail.feature);
      }
    };
    if (trackRef.current) {
      trackRef.current.data = features;
      trackRef.current.addEventListener('change', eventHandler);
    }
    return () => {
      document.removeEventListener('change', eventHandler);
    };
  }, [trackRef, features, onFeatureClick]);

  // NightingaleManager view range event handler
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
      <NightingaleZoomTool length={sequence.length} />
      <EntryDownloadButton handleToggle={handleToggleDownload} />
      {!noLinkToFullView && (
        <Link
          to={getEntryPath(
            Namespace.uniprotkb,
            params.accession,
            TabLocation.FeatureViewer
          )}
          title="View in the GenericFeature Viewer"
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
        highlight={getHighlightedCoordinates(highlightedFeature)} // TODO: check in the nightingale code base to see if it is wired up to view the changes. Make sure the property setting logic is correct.
      >
        <NightingaleNavigationComponent length={sequence.length} height={40} />
        <NightingalTrackComponent
          ref={trackRef}
          length={sequence.length}
          layout="non-overlapping"
          height={trackHeight}
          no-scroll
        />
        <NightingaleSequenceComponent
          sequence={sequence}
          length={sequence.length}
          height={20}
          no-scroll
          numberOfTicks={0}
        />
      </NightingaleManagerComponent>
    </div>
  );
}

export default VisualFeaturesView;
