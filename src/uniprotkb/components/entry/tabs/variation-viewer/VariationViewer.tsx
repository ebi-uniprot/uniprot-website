import type NightingaleManager from '@nightingale-elements/nightingale-manager';
import {
  type ProteinsAPIVariation,
  transformData,
} from '@nightingale-elements/nightingale-variation-canvas';
import { type Virtualizer } from '@tanstack/react-virtual';
import cn from 'classnames';
import { EllipsisReveal, Loader } from 'franklin-sites';
import { filterConfig } from 'protvista-uniprot';
import {
  Fragment,
  lazy,
  type ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
  useState,
  useTransition,
} from 'react';
import { type PartialDeep, type SetRequired } from 'type-fest';

import { addMessage } from '../../../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../../../../messages/types/messagesTypes';
import { Dataset } from '../../../../../shared/components/entry/EntryDownload';
import EntryDownloadButton from '../../../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../../../shared/components/entry/EntryDownloadPanel';
import ErrorHandler from '../../../../../shared/components/error-pages/ErrorHandler';
import ExternalLink from '../../../../../shared/components/ExternalLink';
import tableStyles from '../../../../../shared/components/table/styles/table.module.scss';
import TableFromData, {
  type TableFromDataColumn,
  VIRTUALIZE_ROW_THRESHOLD,
} from '../../../../../shared/components/table/TableFromData';
import apiUrls from '../../../../../shared/config/apiUrls/apiUrls';
import externalUrls from '../../../../../shared/config/externalUrls';
import NightingaleManagerComponent from '../../../../../shared/custom-elements/NightingaleManager';
import useDataApi from '../../../../../shared/hooks/useDataApi';
import { useSmallScreen } from '../../../../../shared/hooks/useMatchMedia';
import useMessagesDispatch from '../../../../../shared/hooks/useMessagesDispatch';
import useNightingaleFeatureTableScroll from '../../../../../shared/hooks/useNightingaleFeatureTableScroll';
import helper from '../../../../../shared/styles/helper.module.scss';
import {
  type NightingaleViewRange,
  withinRange,
} from '../../../../../shared/utils/nightingale';
import { type Evidence } from '../../../../types/modelTypes';
import { type TransformedVariant } from '../../../../types/variation';
import { sortByLocation } from '../../../../utils';
import UniProtKBEvidenceTag from '../../../protein-data-views/UniProtKBEvidenceTag';
import tabsStyles from '../styles/tabs-styles.module.scss';
import styles from './styles/variation-viewer.module.scss';

const VisualVariationView = lazy(
  () =>
    import(
      /* webpackChunkName: "visual-variation-view" */ '../../../protein-data-views/VisualVariationView'
    )
);

type ProteinsAPIEvidence = SetRequired<
  PartialDeep<Exclude<TransformedVariant['evidences'], undefined>[number]>,
  'code'
>;
type Description = Exclude<
  TransformedVariant['descriptions'],
  undefined
>[number];
type Source = Description['sources'][0];

const isUniProtID = (id: string) => id.startsWith('VAR_');
const sortIDByUniProtFirst = (a: string, b: string) =>
  +isUniProtID(b) - +isUniProtID(a);

const hasUniProtSource = (description: Description) =>
  description.sources.includes('UniProt' as Source);
const sortDescriptionByUniProtFirst = (a: Description, b: Description) =>
  +hasUniProtSource(b) - +hasUniProtSource(a);

const isUniProt = (string: string) => string === 'UniProt';
const sortProvenanceByUniProtFirst = (a: string, b: string) =>
  +isUniProt(b) - +isUniProt(a);

const groupByCategory = (filters: FilterConfig, category: string) =>
  filters.filter((f) => f.type.name === category);

type FilterConfig = typeof filterConfig;
type FilterConfigItem = FilterConfig[0];

const getFilter = (haystack: FilterConfig, needle: FilterConfigItem) =>
  haystack?.find((f) => f.name === needle.name);

// copied/adapted logic from protvista-uniprot
const applyFilters = (variants: TransformedVariant[], filters: string[]) => {
  if (!filters.length) {
    return variants;
  }

  const activeFilters = filterConfig.filter((f) => filters.includes(f.name));
  const consequenceFilters = groupByCategory(activeFilters, 'consequence');
  const provenanceFilters = groupByCategory(activeFilters, 'provenance');

  const selectedConsequenceFilters = activeFilters
    .map((f) => getFilter(consequenceFilters, f))
    .filter(Boolean);
  const selectedProvenanceFilters = activeFilters
    .map((f) => getFilter(provenanceFilters, f))
    .filter(Boolean);

  return variants?.filter(
    (variant) =>
      selectedConsequenceFilters.some((filter) =>
        filter?.filterPredicate(variant)
      ) &&
      selectedProvenanceFilters.some((filter) =>
        filter?.filterPredicate(variant)
      )
  );
};

const getHighlightedCoordinates = (feature?: TransformedVariant) =>
  feature?.start && feature?.end
    ? `${feature.start}:${feature.end}`
    : undefined;

const getRowId = (data: TransformedVariant) => data.accession;

const uuidRegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const getColumns = (
  primaryAccession: string
): TableFromDataColumn<TransformedVariant>[] => [
  {
    id: 'variant-id',
    label: (
      <>
        Variant
        <br />
        ID(s)
      </>
    ),
    render: (data) => (
      <>
        {
          // note that the type needs to be updated, xrefs is optional on association object
          Array.from(
            new Set(
              data.xrefs
                ?.map((xref) => xref.id)
                // TODO: check if this can be removed, some variant IDs where
                // UUIDs (mainly from NCI-TCGA, example P15056), that's not
                // expected and not user friendly. Needs changes in Proteins API
                .filter((id) => !uuidRegExp.test(id))
            )
          )
            .sort(sortIDByUniProtFirst)
            .map((id, i) => (
              <Fragment key={id}>
                {i !== 0 && <br />}
                <span className={cn({ [helper.bold]: isUniProtID(id) })}>
                  {id}
                </span>
              </Fragment>
            ))
        }
      </>
    ),
  },
  {
    id: 'position',
    label: 'Position(s)',
    render: (data) =>
      `${data.start}${+data.end === data.start ? '' : `-${data.end}`}`,
  },
  {
    id: 'change',
    label: 'Change',
    render: (data) => {
      let from: ReactNode = data.wildType;
      if (!data.wildType) {
        from = <em>missing</em>;
      } else if (data.wildType.length > 3) {
        from = (
          <>
            {data.wildType.slice(0, 2)}
            <EllipsisReveal>{data.wildType.slice(2)}</EllipsisReveal>
          </>
        );
      }

      let to: ReactNode = data.alternativeSequence;
      if (!data.alternativeSequence) {
        to = <em>missing</em>;
      } else if (data.alternativeSequence.length > 3) {
        to = (
          <>
            {data.alternativeSequence.slice(0, 2)}
            <EllipsisReveal>{data.alternativeSequence.slice(2)}</EllipsisReveal>
          </>
        );
      }

      const change = (
        <>
          {from}
          {'>'}
          {to}
        </>
      );

      return (
        <span className={styles.change}>
          {data.consequenceType !== '-' &&
          data.wildType?.length === 1 &&
          data.alternativeSequence?.length === 1 ? (
            <ExternalLink
              url={externalUrls.ProtVar(
                `${primaryAccession} ${data.wildType}${data.start}${data.alternativeSequence}`
              )}
              title="View in ProtVar"
              noIcon
            >
              {change}
            </ExternalLink>
          ) : (
            change
          )}
        </span>
      );
    },
  },
  {
    id: 'description',
    label: 'Description',
    render: (data) => {
      const uniProtEvidences = data.evidences?.map(
        (evidence: ProteinsAPIEvidence) =>
          ({
            evidenceCode: evidence.code,
            id: evidence?.source?.id,
            source: evidence?.source?.name,
            url: evidence?.source?.url,
          }) as Evidence
      );

      return data.descriptions?.length ? (
        Array.from(data.descriptions)
          .sort(sortDescriptionByUniProtFirst)
          .map((description) => (
            <div
              key={description.value}
              className={cn({ [helper.bold]: hasUniProtSource(description) })}
            >
              {`${description.value} (${description.sources.join(', ')})`}
              <UniProtKBEvidenceTag evidences={uniProtEvidences} />
            </div>
          ))
      ) : (
        <UniProtKBEvidenceTag evidences={uniProtEvidences} />
      );
    },
  },
  {
    id: 'clinical-significance',
    label: (
      <>
        Clinical
        <br />
        significance
      </>
    ),
    render: (data) =>
      data.clinicalSignificances?.map((clinicalSignificance, i) => (
        // eslint-disable-next-line @eslint-react/no-array-index-key
        <Fragment key={i}>
          {i !== 0 && <br />}
          <span
            key={`${clinicalSignificance.sources.join('-')}-${
              clinicalSignificance.type
            }`}
          >
            {`${clinicalSignificance.type} (${clinicalSignificance.sources.join(
              ', '
            )})`}
          </span>
        </Fragment>
      )),
  },
  {
    id: 'provenance',
    label: 'Provenance',
    render: (data) =>
      Array.from(
        new Set(
          data.xrefNames.map((name) => (name === 'uniprot' ? 'UniProt' : name))
        )
      )
        .sort(sortProvenanceByUniProtFirst)
        .map((name, i) => (
          <Fragment key={name}>
            {i !== 0 && <br />}
            <span className={cn({ [helper.bold]: isUniProt(name) })}>
              {name}
            </span>
          </Fragment>
        )),
  },
];

const RowExtraContent = (data: TransformedVariant) => (
  <Fragment>
    <div>
      <strong>Consequence: </strong>
      {data.consequenceType}
    </div>
    {data.predictions?.length ? (
      <div>
        <strong>Predictions: </strong>
        {data.predictions?.map((pred) => (
          <div
            key={[
              pred.predAlgorithmNameType,
              pred.predictionValType,
              pred.score,
              pred.sources,
            ].join('-')}
          >
            {`- ${pred.predAlgorithmNameType}: ${pred.predictionValType} (${pred.score})`}
          </div>
        ))}
      </div>
    ) : null}
    <div>
      <strong>Somatic: </strong> {data.somaticStatus === 1 ? 'Yes' : 'No'}
    </div>
    {data.populationFrequencies?.length ? (
      <div>
        <strong>Population frequencies: </strong>
        {data.populationFrequencies?.map((populationFrequency) => (
          <div
            key={`${populationFrequency.source}-${populationFrequency.populationName}`}
          >
            {`- ${populationFrequency.populationName}: ${populationFrequency.frequency} (${populationFrequency.source})`}
          </div>
        ))}
      </div>
    ) : null}
    <div>
      <strong>Accession: </strong> {data.accession}
    </div>
    {data.codon && (
      <div>
        <strong>Codon: </strong> {data.codon}
      </div>
    )}
    <div>
      <strong>Consequence type: </strong> {data.consequenceType}
    </div>
    <div>
      <strong>Cytogenetic band: </strong> {data.cytogeneticBand}
    </div>
    <div>
      <strong>Genomic location: </strong> {data.genomicLocation?.join(', ')}
    </div>
    {data.locations?.length ? (
      <div>
        <strong>Locations: </strong>
        {data.locations?.map((location) => (
          <div key={`${location.loc}-${location.source}-${location.seqId}`}>
            {`- ${location.loc} (${location.source}:${location.seqId})`}
          </div>
        ))}
      </div>
    ) : null}
    {data.association?.length ? (
      <div>
        <strong>Disease association: </strong>
        {data.association?.map((association) => (
          <div key={`${association.name}-${association.description}`}>
            {'- '}
            {association.name}
          </div>
        ))}
      </div>
    ) : null}
    <div>
      <strong>Source type: </strong> {data.sourceType?.replace(/_/g, ' ')}
    </div>
    {/* note that the type needs to be updated, xrefs is optional on association object */}
    {/* Also, some xrefs don't have URLs... type should be optional */}
    {data.xrefs?.length ? (
      <div>
        <strong>Cross-references: </strong>
        {data.xrefs?.map((xref) => (
          <div key={`${xref.name}-${xref.id}`}>
            {'- '}
            <ExternalLink url={xref.url}>
              {xref.name}: {xref.id}
            </ExternalLink>
          </div>
        ))}
      </div>
    ) : null}
  </Fragment>
);

type ViewerState = {
  highlightedVariant: TransformedVariant | undefined;
  committedViewRange: NightingaleViewRange | undefined;
  isNavigating: boolean;
};

type ViewerAction =
  | { type: 'setHighlight'; variant: TransformedVariant | undefined }
  | { type: 'navigationStart' }
  | { type: 'navigationEnd'; viewRange: NightingaleViewRange | undefined };

const initialViewerState: ViewerState = {
  highlightedVariant: undefined,
  committedViewRange: undefined,
  isNavigating: false,
};

function viewerReducer(state: ViewerState, action: ViewerAction): ViewerState {
  switch (action.type) {
    case 'setHighlight':
      return { ...state, highlightedVariant: action.variant };
    case 'navigationStart':
      return state.isNavigating ? state : { ...state, isNavigating: true };
    case 'navigationEnd':
      return {
        ...state,
        isNavigating: false,
        committedViewRange: action.viewRange ?? state.committedViewRange,
      };
    default:
      return state;
  }
}

type VariationViewProps = {
  importedVariants: number | 'loading';
  primaryAccession: string;
  title?: string;
};

const VariationViewer = ({
  importedVariants,
  primaryAccession,
  title,
}: VariationViewProps) => {
  const isSmallScreen = useSmallScreen();
  const [state, dispatch] = useReducer(viewerReducer, initialViewerState);
  const { highlightedVariant, committedViewRange, isNavigating } = state;
  const tableId = useId();

  const variationTableVirtualizerRef = useRef<Virtualizer<
    HTMLDivElement,
    Element
  > | null>(null);
  const liveRangeRef = useRef<NightingaleViewRange | undefined>(undefined);
  const idleTimerRef = useRef<number | undefined>(undefined);

  const messagesDispatch = useMessagesDispatch();
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  // Previously gated on VARIANT_COUNT_LIMIT; the canvas renderer and virtual
  // scrolling now handle large datasets, so we always fetch once the count is known.
  const { loading, data, progress, error, status } =
    useDataApi<ProteinsAPIVariation>(
      importedVariants !== 'loading'
        ? apiUrls.proteinsApi.variation(primaryAccession)
        : undefined
    );

  const [filters, setFilters] = useState<string[]>([]);
  const [isFiltering, startFilterTransition] = useTransition();
  // Hold the dim+spinner feedback for a minimum of 1s after the transition
  // starts so fast filter operations don't flash on/off.
  const MIN_FILTER_FEEDBACK_MS = 750;
  const [filteringFeedbackActive, setFilteringFeedbackActive] = useState(false);
  const filteringStartTimeRef = useRef<number | undefined>(undefined);
  const filteringFeedbackTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (isFiltering) {
      setFilteringFeedbackActive(true);
      filteringStartTimeRef.current = Date.now();
      if (filteringFeedbackTimerRef.current !== undefined) {
        window.clearTimeout(filteringFeedbackTimerRef.current);
        filteringFeedbackTimerRef.current = undefined;
      }
      return undefined;
    }
    if (filteringStartTimeRef.current === undefined) {
      return undefined;
    }
    const elapsed = Date.now() - filteringStartTimeRef.current;
    const remaining = Math.max(0, MIN_FILTER_FEEDBACK_MS - elapsed);
    filteringFeedbackTimerRef.current = window.setTimeout(() => {
      setFilteringFeedbackActive(false);
      filteringFeedbackTimerRef.current = undefined;
      filteringStartTimeRef.current = undefined;
    }, remaining);
    return () => {
      if (filteringFeedbackTimerRef.current !== undefined) {
        window.clearTimeout(filteringFeedbackTimerRef.current);
        filteringFeedbackTimerRef.current = undefined;
      }
    };
  }, [isFiltering]);
  const managerRef = useRef<NightingaleManager>(null);

  // We pass the transformed data to both the variation viewer and the
  // data table as ids are set during the transformation - they are
  // used for the selection between the 2 components
  // Transform data once
  const transformedData = useMemo(
    () => (data && data.features ? transformData(data) : undefined),
    [data]
  );

  // Sort data once out of transformed data
  const sortedVariants = useMemo(
    () =>
      transformedData &&
      Array.from(transformedData.variants).sort(sortByLocation),
    [transformedData]
  );

  // Filter data on every filter interaction out of the memoised sorted data
  const filteredVariants = useMemo(
    () =>
      sortedVariants &&
      applyFilters(sortedVariants as TransformedVariant[], filters),
    [sortedVariants, filters]
  );

  const isVirtualized = Boolean(
    filteredVariants && filteredVariants.length > VIRTUALIZE_ROW_THRESHOLD
  );

  const tableScroll = useNightingaleFeatureTableScroll(
    getRowId,
    tableId,
    variationTableVirtualizerRef,
    filteredVariants
  );

  useEffect(() => {
    const { current: element } = managerRef;

    if (!element) {
      return;
    }

    const listener = (event: Event) => {
      const { detail } = event as CustomEvent;
      if (detail?.type === 'filters') {
        // Filter updates touch thousands of rows; mark as a transition so
        // React can interrupt the heavy re-render to handle further clicks.
        startFilterTransition(() => setFilters(detail.value));
      } else if (detail?.eventType === 'click' && detail?.feature) {
        dispatch({ type: 'setHighlight', variant: detail.feature });
        tableScroll(detail.feature);
      } else if (detail?.['display-start'] && detail?.['display-end']) {
        liveRangeRef.current = detail;
        dispatch({ type: 'navigationStart' });
        if (idleTimerRef.current !== undefined) {
          window.clearTimeout(idleTimerRef.current);
        }
        idleTimerRef.current = window.setTimeout(() => {
          dispatch({
            type: 'navigationEnd',
            viewRange: liveRangeRef.current,
          });
          idleTimerRef.current = undefined;
        }, 150);
      }
    };

    element.addEventListener('change', listener);

    return () => {
      element.removeEventListener('change', listener);
      if (idleTimerRef.current !== undefined) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = undefined;
      }
    };
    // `data` isn't read here, but it's the signal that the manager has
    // mounted; including it ensures the listener attaches after load.
  }, [data, tableScroll]);

  // Pair of complementary signals for navigation lifecycle: pointerdown/up
  // catch brush drags; the 150ms debounce in the change listener catches
  // wheel/pinch where there's no clear pointerup. Either signal alone may
  // miss its case, but together they cover both. Depend on `data` so this
  // runs after the manager actually mounts (it isn't rendered while loading).
  useEffect(() => {
    const manager = managerRef.current;
    if (!manager) {
      return undefined;
    }
    const onDown = () => dispatch({ type: 'navigationStart' });
    const onUp = () => {
      if (idleTimerRef.current !== undefined) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = undefined;
      }
      dispatch({
        type: 'navigationEnd',
        viewRange: liveRangeRef.current,
      });
    };
    manager.addEventListener('pointerdown', onDown, { capture: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      manager.removeEventListener('pointerdown', onDown, { capture: true });
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [data]);

  const [tableReady, setTableReady] = useState(false);
  useEffect(() => {
    // Guard is a no-op in this SPA, but kept to future-proof for SSR adoption.
    if (typeof window === 'undefined') {
      return undefined;
    }
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(() => setTableReady(true), {
        timeout: 500,
      });
      return () => window.cancelIdleCallback(handle);
    }
    const handle = window.setTimeout(() => setTableReady(true), 0);
    return () => window.clearTimeout(handle);
  }, []);

  useEffect(() => {
    if (!isVirtualized) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        !e.altKey &&
        !e.shiftKey &&
        e.key === 'f'
      ) {
        messagesDispatch(
          addMessage({
            id: 'variation-viewer-search-hint',
            content:
              "Too many rows for the browser's find to search. Use the column filters instead.",
            format: MessageFormat.POP_UP,
            level: MessageLevel.INFO,
            displayTime: 5_000,
          })
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVirtualized, messagesDispatch]);

  const memoizedColumns = useMemo(
    () => getColumns(primaryAccession),
    [primaryAccession]
  );

  const memoizedMarkBackground = useCallback(
    (datum: TransformedVariant) =>
      typeof highlightedVariant?.accession !== 'undefined' &&
      datum.accession === highlightedVariant.accession,
    [highlightedVariant?.accession]
  );

  const memoizedMarkBorder = useCallback(
    (datum: TransformedVariant) =>
      Boolean(committedViewRange) &&
      withinRange(+datum.begin, +datum.end, committedViewRange),
    [committedViewRange]
  );

  const handleRowClick = useCallback(
    (datum: TransformedVariant) =>
      dispatch({ type: 'setHighlight', variant: datum }),
    []
  );

  if (loading || importedVariants === 'loading') {
    return (
      <div className="wider-tab-content hotjar-margin">
        {title && <h3>{title}</h3>}
        <Loader progress={progress} />
      </div>
    );
  }

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  if (error && status !== 404) {
    return (
      <div className="wider-tab-content hotjar-margin">
        <ErrorHandler status={status} error={error} />
      </div>
    );
  }

  if (
    status === 404 ||
    !transformedData ||
    !transformedData.sequence ||
    !sortedVariants?.length ||
    !filteredVariants
  ) {
    return (
      <section className="wider-tab-content hotjar-margin">
        {title && <h3 data-article-id="variant_viewer">{title}</h3>}
        <div className={tabsStyles['no-data']}>
          No variation information available for {primaryAccession}
        </div>
      </section>
    );
  }

  if (isSmallScreen) {
    return (
      <section>
        {title && <h2 data-article-id="variant_viewer">{title}</h2>}
        <TableFromData
          columns={getColumns(primaryAccession)}
          data={filteredVariants}
          getRowId={getRowId}
        />
      </section>
    );
  }

  return (
    <section className="wider-tab-content hotjar-margin">
      {title && <h2 data-article-id="variant_viewer">{title}</h2>}
      <div>
        {displayDownloadPanel && (
          <EntryDownloadPanel
            handleToggle={handleToggleDownload}
            dataset={Dataset.variation}
          />
        )}
      </div>
      <EntryDownloadButton handleToggle={handleToggleDownload} />
      <div className={tableStyles['frozen-container']}>
        <div
          className={cn({
            // Dim only while filters are recomputing on large datasets; we don't
            // dim during navigation because the canvas is what the user is driving.
            [tableStyles.frozen]: filteringFeedbackActive && isVirtualized,
          })}
        >
          <NightingaleManagerComponent
            reflected-attributes="highlight,display-start,display-end,activefilters,filters,selectedid"
            ref={managerRef}
            highlight={getHighlightedCoordinates(highlightedVariant)}
          >
            <Suspense fallback={null}>
              <VisualVariationView
                sequence={transformedData.sequence}
                variants={filteredVariants}
              />
            </Suspense>
          </NightingaleManagerComponent>
        </div>
        {filteringFeedbackActive && isVirtualized && (
          <div
            className={tableStyles['frozen-overlay']}
            role="status"
            aria-live="polite"
            aria-label="Filtering variants"
          >
            <Loader />
          </div>
        )}
      </div>
      {tableReady && (
        <div className={tableStyles['frozen-container']}>
          <div
            className={cn({
              [tableStyles.frozen]:
                (isNavigating || filteringFeedbackActive) && isVirtualized,
            })}
          >
            <TableFromData
              id={tableId}
              virtualize
              virtualizerRef={variationTableVirtualizerRef}
              columns={memoizedColumns}
              data={filteredVariants}
              getRowId={getRowId}
              onRowClick={handleRowClick}
              rowExtraContent={RowExtraContent}
              markBackground={memoizedMarkBackground}
              markBorder={memoizedMarkBorder}
            />
          </div>
          {filteringFeedbackActive && isVirtualized && (
            <div
              className={tableStyles['frozen-overlay']}
              role="status"
              aria-live="polite"
              aria-label="Filtering variants"
            >
              <Loader />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default VariationViewer;
