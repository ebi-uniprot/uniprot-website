import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader, Message } from 'franklin-sites';

import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';
import NightingaleZoomTool from '../../protein-data-views/NightingaleZoomTool';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useCustomElement from '../../../../shared/hooks/useCustomElement';

import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { Dataset } from '../../../../shared/components/entry/EntryDownload';
import { getEntryPath } from '../../../../app/config/urls';
import { showTooltipAtCoordinates } from '../../../../shared/utils/tooltip';

import { VARIANT_COUNT_LIMIT } from '../../../../shared/config/limits';

import { Namespace } from '../../../../shared/types/namespaces';
import { TabLocation } from '../../../types/entry';
import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';

import tabsStyles from './styles/tabs-styles.module.scss';

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

  const protvistaUniprotElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-uniprot" */ 'protvista-uniprot'),
    'protvista-uniprot'
  );

  const onProtvistaUniprotChange = useCallback((e: Event) => {
    const { detail } = e as CustomEvent;
    if (hideTooltipEvents.has(detail?.eventType)) {
      hideTooltip.current?.();
    }
    if (
      detail?.eventType === 'click' &&
      detail?.feature?.tooltipContent &&
      e.target
    ) {
      const [x, y] = detail.coords;
      hideTooltip.current = showTooltipAtCoordinates(
        x,
        y,
        detail.feature.tooltipContent
      );
    }
  }, []);

  useEffect(() => {
    const ref = protvistaUniprotRef.current;
    ref?.addEventListener('change', onProtvistaUniprotChange);
  }, [onProtvistaUniprotChange, protvistaUniprotElement]);

  useEffect(
    () => () => {
      hideTooltip.current?.();
      protvistaUniprotRef.current?.removeEventListener(
        'change',
        onProtvistaUniprotChange
      );
    },
    [onProtvistaUniprotChange]
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
            <NightingaleZoomTool
              length={sequence.length}
              nightingaleNavigationGetter={() =>
                protvistaUniprotRef.current?.querySelector(
                  'nightingale-navigation'
                ) || null
              }
            />
          )}
          <EntryDownloadButton handleToggle={handleToggleDownload} />
        </>
      )}
      {shouldRender ? (
        <protvistaUniprotElement.name
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
