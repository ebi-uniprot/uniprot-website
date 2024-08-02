import { useCallback, useState } from 'react';
import { FullViewIcon } from 'franklin-sites';
import { Link, useParams } from 'react-router-dom';
import { Feature } from '@nightingale-elements/nightingale-track';
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
// import { GenericFeature } from './FeaturesView';

import styles from './styles/visual-features-view.module.scss';

type Props = {
  features: Feature[];
  sequence: string;
  trackHeight?: number;
  noLinkToFullView?: boolean;
};

function VisualFeaturesView({
  features,
  sequence,
  trackHeight = 40,
  noLinkToFullView,
}: Props) {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const params = useParams<{ accession: string }>();

  const setTrackData = useCallback(
    (node: { data: Feature[] } | null): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = features;
      }
    },
    [features]
  );

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  const featureTypes: string[] = Array.from(
    new Set(
      features
        .flatMap((feature) => feature.type)
        .filter((type): type is string => typeof type === 'string')
    )
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
          title="View in the Feature Viewer"
          onClick={() => {
            sendGtagEventFeatureViewerFullViewClick(params.accession);
          }}
          className={styles['full-view']}
        >
          <FullViewIcon height={iconSize} />
        </Link>
      )}
      <NightingaleManagerComponent>
        <NightingaleNavigationComponent length={sequence.length} height={40} />
        <NightingalTrackComponent
          ref={setTrackData}
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
