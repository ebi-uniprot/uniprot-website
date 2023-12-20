import { useCallback, useState } from 'react';
import { FullViewIcon } from 'franklin-sites';
import { Link, useParams } from 'react-router-dom';

import NightingaleZoomTool, {
  iconSize,
} from '../../../uniprotkb/components/protein-data-views/NightingaleZoomTool';
import EntryDownloadPanel from '../entry/EntryDownloadPanel';
import EntryDownloadButton from '../entry/EntryDownloadButton';

import useCustomElement from '../../hooks/useCustomElement';

import { getEntryPath } from '../../../app/config/urls';
import { sendGtagEventFeatureViewerFullViewClick } from '../../utils/gtagEvents';

import { TabLocation } from '../../../uniprotkb/types/entry';
import { Namespace } from '../../types/namespaces';
import { Dataset } from '../entry/EntryDownload';
import { GenericFeature } from './FeaturesView';

import styles from './styles/visual-features-view.module.scss';

type Props<T> = {
  features: T[];
  sequence: string;
  trackHeight?: number;
  noLinkToFullView?: boolean;
};

// Can't use arrow function because of TS generic annotation
// eslint-disable-next-line react/function-component-definition
function VisualFeaturesView<T extends GenericFeature>({
  features,
  sequence,
  trackHeight,
  noLinkToFullView,
}: Props<T>) {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const trackElement = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-track" */ 'protvista-track'),
    'protvista-track'
  );
  const navigationElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-navigation" */ 'protvista-navigation'
      ),
    'protvista-navigation'
  );
  const sequenceElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-sequence" */ 'protvista-sequence'),
    'protvista-sequence'
  );

  const params = useParams<{ accession: string }>();

  const setTrackData = useCallback(
    (node): void => {
      if (node && trackElement.defined) {
        // eslint-disable-next-line no-param-reassign
        node.data = features;
      }
    },
    [trackElement.defined, features]
  );

  const ceDefined =
    trackElement.defined &&
    navigationElement.defined &&
    sequenceElement.defined;

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  const featureTypes: string[] = Array.from(
    new Set(features.flatMap((feature) => feature.type))
  );

  return ceDefined ? (
    <>
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
      <navigationElement.name length={sequence.length} />
      <trackElement.name
        ref={setTrackData}
        length={sequence.length}
        layout="non-overlapping"
        height={trackHeight}
      />
      <sequenceElement.name
        sequence={sequence}
        length={sequence.length}
        height="20"
      />
    </>
  ) : null;
}

export default VisualFeaturesView;
