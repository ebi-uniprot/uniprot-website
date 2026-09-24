import 'protvista-uniprot';

import { Loader, Message } from 'franklin-sites';
import type ProtvistaUniprot from 'protvista-uniprot';
import { use, useCallback, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getEntryPath } from '../../../../app/config/urls';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { VARIANT_COUNT_LIMIT } from '../../../../shared/config/limits';
import { BotDetectionContext } from '../../../../shared/contexts/BotDetection';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { Namespace } from '../../../../shared/types/namespaces';
import { showTooltipAtCoordinates } from '../../../../shared/utils/tooltip';
import { type UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import {
  getTooltipContent,
  registerRichAdapters,
} from '../../../config/protvistaTooltips';
import { TabLocation } from '../../../types/entry';
import NightingaleZoomTool from '../../protein-data-views/NightingaleZoomTool';
import tabsStyles from './styles/tabs-styles.module.scss';
import ZoomHint from './ZoomHint';

const hideTooltipEvents = new Set([undefined, 'reset', 'click']);

const fetchOptions = { method: 'HEAD' };

// protvista-uniprot renders each track as `<nightingale-* id="<prefix>-track-<rowId>-<trackId>">`.
// The prefix is build-hashed, but `-track-` is a stable separator.
const trackKeyFromElementId = (id: string | undefined) =>
  id?.split('-track-')[1];

type ConfigTrack = { id: string; kind?: string };
type ConfigRow = ConfigTrack & { tracks?: ConfigTrack[] };

// A standalone row (no `tracks:`) is normalised into a single-track row that
// reuses its own id, hence the `${id}-${id}` key.
const buildTrackKinds = (rows: ConfigRow[]) => {
  const kinds = new Map<string, string | undefined>();
  for (const row of rows) {
    if (row.tracks) {
      for (const track of row.tracks) {
        kinds.set(`${row.id}-${track.id}`, track.kind);
      }
    } else {
      kinds.set(`${row.id}-${row.id}`, row.kind);
    }
  }
  return kinds;
};

const FeatureViewer = ({
  accession,
  importedVariants,
  sequence,
}: {
  accession: string;
  importedVariants: number | 'loading';
  sequence: string;
}) => {
  const protvistaUniprotRef = useRef<ProtvistaUniprot>(null);
  const hideTooltip = useRef<ReturnType<
    typeof showTooltipAtCoordinates
  > | null>(null);
  // The config loads asynchronously, so resolve it on first use rather than on mount
  const trackKinds = useRef<Map<string, string | undefined> | null>(null);

  // just to make sure not to render protvista-uniprot if we won't get any data
  const { loading, status } = useDataApi<UniProtkbAPIModel>(
    apiUrls.proteinsApi.proteins(accession),
    fetchOptions
  );

  const onProtvistaUniprotChange = useCallback((e: Event) => {
    const { detail } = e as CustomEvent;
    // The linegraph track spells it `eventtype`, every other track `eventType`
    const eventType = detail?.eventType ?? detail?.eventtype;
    if (hideTooltipEvents.has(eventType)) {
      hideTooltip.current?.();
    }
    if (eventType !== 'click' || !detail?.feature || !detail?.coords) {
      return;
    }

    if (!trackKinds.current) {
      // `getConfig` only exists once the element has been upgraded, and the
      // config itself arrives asynchronously — before then we fall back to the
      // library's own tooltipContent rather than failing to show anything.
      const viewer = protvistaUniprotRef.current;
      const rows =
        typeof viewer?.getConfig === 'function'
          ? (viewer.getConfig()?.rows as ConfigRow[] | undefined)
          : undefined;
      if (rows) {
        trackKinds.current = buildTrackKinds(rows);
      }
    }
    const trackKey = trackKeyFromElementId((e.target as Element | null)?.id);
    const kind = trackKey ? trackKinds.current?.get(trackKey) : undefined;

    const content =
      getTooltipContent(kind, detail.feature) ??
      detail.feature.tooltipContent ??
      '';
    if (!content) {
      return;
    }
    const [x, y] = detail.coords;
    hideTooltip.current = showTooltipAtCoordinates(x, y, content);
  }, []);

  // A callback ref, not an effect: the viewer is rendered behind a loading
  // gate, so on the first pass it is not in the DOM yet and a mount-time effect
  // would bind its listener to nothing and never re-run.
  const protvistaUniprotRefCallback = useCallback(
    (node: ProtvistaUniprot | null) => {
      protvistaUniprotRef.current = node;
      trackKinds.current = null;
      node?.addEventListener('change', onProtvistaUniprotChange);
      if (node) {
        // Rendered with `suspend`, so the element has not loaded anything yet:
        // swap in our adapters, then release it. The library declares `suspend`
        // private, so go through the attribute it reflects.
        registerRichAdapters(node);
        node.removeAttribute('suspend');
      }
      return () => {
        node?.removeEventListener('change', onProtvistaUniprotChange);
        protvistaUniprotRef.current = null;
      };
    },
    [onProtvistaUniprotChange]
  );

  // Dismiss any lingering tooltip when the viewer unmounts
  useEffect(
    () => () => {
      hideTooltip.current?.();
    },
    []
  );

  // TODO: when updating to react 19, update below pattern to use ref callback
  // with cleanup function as return function and not in another useEffect
  // https://react.dev/reference/react-dom/components/common#ref-callback
  // Ideally, this should be done through normal page anchoring when doing SSR
  const moRef = useRef<MutationObserver | null>(null);
  const containerRefCallback = useCallback((node: HTMLElement) => {
    if (location.hash !== '#structure') {
      return;
    }

    moRef.current = new MutationObserver(() => {
      const molstar = node.querySelector(
        // Make sure to wait for not only when the canvas is available, but also
        // for when it has a height as we want to scroll its end to the bottom
        // of the viewport
        '#molstar-canvas[height]'
      );
      if (molstar) {
        moRef.current?.disconnect();
        moRef.current = null;
        molstar.scrollIntoView({ block: 'end' });
      }
    });
    moRef.current.observe(node, {
      subtree: true,
      attributes: true,
      attributeFilter: ['height'],
    });
  }, []);
  // Clean up function on component unmount
  useEffect(
    () => () => {
      moRef.current?.disconnect();
      moRef.current = null;
    },
    []
  );

  const searchParams = new URLSearchParams(useLocation().search);
  const loadAllFeatures = searchParams.get('loadFeatures');

  if (use(BotDetectionContext) !== 'human') {
    return (
      <Message level="info">
        Please interact with the page to view the Feature Viewer
      </Message>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (status !== 200) {
    return (
      <section className="wider-tab-content">
        <h3 data-article-id="feature_viewer">Feature viewer</h3>
        <div className={tabsStyles['no-data']}>
          No feature information available for {accession}
        </div>
      </section>
    );
  }

  const shouldRender =
    (importedVariants !== 'loading' &&
      importedVariants <= VARIANT_COUNT_LIMIT) ||
    loadAllFeatures;

  return (
    <section className="wider-tab-content" ref={containerRefCallback}>
      <h3 data-article-id="feature_viewer">Feature viewer</h3>
      {shouldRender && (
        <div className={tabsStyles['zoom-tool-row']}>
          <NightingaleZoomTool
            length={sequence.length}
            nightingaleNavigationGetter={() =>
              protvistaUniprotRef.current?.querySelector(
                'nightingale-navigation'
              ) || null
            }
          />
        </div>
      )}

      {shouldRender ? (
        <ZoomHint>
          <protvista-uniprot
            accession={accession}
            notooltip
            suspend
            ref={protvistaUniprotRefCallback}
          />
        </ZoomHint>
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
