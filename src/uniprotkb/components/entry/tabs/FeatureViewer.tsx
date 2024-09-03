import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader, Message } from 'franklin-sites';

import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';
// import NightingaleZoomTool from '../../protein-data-views/NightingaleZoomTool';

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

  const onProtvistaUniprotChange = useCallback((e: Event) => {
    const { detail } = e as CustomEvent;
    if (hideTooltipEvents.has(detail?.eventtype)) {
      hideTooltip.current?.();
    }
    if (
      detail?.eventtype === 'click' &&
      detail?.feature?.tooltipContent &&
      e.target
    ) {
      const [x, y] = detail.coords;
      const { feature } = detail;
      const title =
        feature.type && feature.begin && feature.end
          ? `<h4>${feature.type} ${feature.begin}-${feature.end}</h4>`
          : '';
      const content = `${title}${detail.feature.tooltipContent}`;
      hideTooltip.current = showTooltipAtCoordinates(x, y, content);
    }
  }, []);

  useEffect(() => {
    const ref = protvistaUniprotRef.current;
    ref?.addEventListener('change', onProtvistaUniprotChange);
  }, [onProtvistaUniprotChange, protvistaElement]);

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
          {/* {shouldRender && (
            <NightingaleZoomTool
              length={sequence.length}
              nightingaleNavigationRef={} // TODO: fill in once protvista-uniprot is updated
            />
          )} */}
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
