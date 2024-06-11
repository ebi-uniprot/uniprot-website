import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader, Message } from 'franklin-sites';

import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';
import NightingaleZoomTool, {
  ZoomOperations,
} from '../../protein-data-views/NightingaleZoomTool';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useCustomElement from '../../../../shared/hooks/useCustomElement';

import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { Dataset } from '../../../../shared/components/entry/EntryDownload';
import { VARIANT_COUNT_LIMIT } from './variation-viewer/VariationViewer';
import { getEntryPath } from '../../../../app/config/urls';

import { Namespace } from '../../../../shared/types/namespaces';
import { TabLocation } from '../../../types/entry';

import tabsStyles from './styles/tabs-styles.module.scss';
import { showTooltipAtCoordinates } from '../../../../shared/utils/tooltip';

interface ProtvistaManager extends HTMLElement {
  displaystart: number;
  displayend: number;
}

const hideTooltipEvents = new Set([undefined, 'reset', 'click']);

const FeatureViewer = ({
  accession,
  importedVariants,
  sequence,
}: {
  accession: string;
  importedVariants: number | 'loading';
  sequence: string;
}) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const protvistaUniprotRef = useRef<HTMLElement>(null);
  const hideTooltip = useRef<ReturnType<
    typeof showTooltipAtCoordinates
  > | null>(null);
  // just to make sure not to render protvista-uniprot if we won't get any data
  const { loading, data } = useDataApi<UniProtkbAPIModel>(
    apiUrls.proteinsApi.proteins(accession)
  );

  const protvistaElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-uniprot" */ 'protvista-uniprot'),
    'protvista-uniprot'
  );

  const handleZoom = useCallback(
    (operation: ZoomOperations) => {
      if (!protvistaElement.defined || !protvistaUniprotRef.current) {
        return;
      }
      const manager: ProtvistaManager | null =
        protvistaUniprotRef.current.querySelector('protvista-manager');
      if (!manager) {
        return;
      }
      // Following logic is lifted from ProtvistaZoomTool
      const scaleFactor = sequence.length / 5;
      const { displayend, displaystart } = manager;
      let k = 0;
      if (operation === 'zoom-in') {
        k = scaleFactor;
      } else if (operation === 'zoom-out') {
        k = -scaleFactor;
      } else if (operation === 'zoom-in-seq') {
        k = displayend - displaystart - 29;
      }
      const newEnd = displayend - k;
      let newStart = displaystart;
      // if we've reached the end when zooming out, remove from start
      if (newEnd > sequence.length) {
        newStart -= newEnd - sequence.length;
      }
      if (displaystart < newEnd) {
        manager.setAttribute('displaystart', Math.max(1, newStart).toString());
        manager.setAttribute(
          'displayend',
          Math.min(newEnd, sequence.length).toString()
        );
      }
    },
    [protvistaElement.defined, sequence]
  );

  const onProtvistaUniprotChange = (e: Event) => {
    const { detail } = e as CustomEvent;
    if (hideTooltipEvents.has(detail?.eventtype)) {
      hideTooltip.current?.();
    }
    if (
      detail?.eventtype === 'click' &&
      detail?.feature?.tooltipContent &&
      e.target
    ) {
      const content = detail.feature.tooltipContent;
      const [x, y] = detail.coords;
      hideTooltip.current = showTooltipAtCoordinates(x, y, content);
    }
  };

  useEffect(() => {
    const ref = protvistaUniprotRef.current;
    ref?.addEventListener('change', onProtvistaUniprotChange);
  }, [protvistaElement]);

  useEffect(
    () => () => {
      hideTooltip.current?.();
      protvistaUniprotRef.current?.removeEventListener(
        'change',
        onProtvistaUniprotChange
      );
    },
    []
  );

  const searchParams = new URLSearchParams(useLocation().search);
  const loadAllFeatures = searchParams.get('loadFeatures');

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  const shouldRender =
    (importedVariants !== 'loading' &&
      importedVariants <= VARIANT_COUNT_LIMIT) ||
    loadAllFeatures;

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <section className="wider-tab-content hotjar-margin">
      <h3>Feature viewer</h3>
      {displayDownloadPanel && (
        <EntryDownloadPanel
          handleToggle={handleToggleDownload}
          dataset={Dataset.features}
          sequence={sequence}
        />
      )}
      {data?.features && (
        <>
          {shouldRender && (
            <NightingaleZoomTool length={sequence.length} onZoom={handleZoom} />
          )}
          <EntryDownloadButton handleToggle={handleToggleDownload} />
        </>
      )}
      {shouldRender ? (
        <protvistaElement.name
          accession={accession}
          ref={protvistaUniprotRef}
        />
      ) : (
        <div className={tabsStyles['too-many']}>
          <Message>
            Due to the large number of features for this entry, the feature
            viewer will not be loaded automatically for performance reasons.
          </Message>
          <Link
            className="button primary"
            to={{
              pathname: getEntryPath(
                Namespace.uniprotkb,
                accession,
                TabLocation.FeatureViewer
              ),
              search: new URLSearchParams({
                loadFeatures: 'true',
              }).toString(),
            }}
            target="features"
          >
            Click to load the feature viewer
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeatureViewer;
