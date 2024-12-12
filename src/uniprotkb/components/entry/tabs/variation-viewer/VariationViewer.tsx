import {
  useMemo,
  Fragment,
  useRef,
  useEffect,
  useState,
  lazy,
  ReactNode,
  Suspense,
  useId,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EllipsisReveal, Loader, LongNumber, Message } from 'franklin-sites';
import cn from 'classnames';
import { PartialDeep, SetRequired } from 'type-fest';
import {
  ProteinsAPIVariation,
  transformData,
} from '@nightingale-elements/nightingale-variation';
import NightingaleManager from '@nightingale-elements/nightingale-manager';
import { filterConfig } from 'protvista-uniprot';

import ExternalLink from '../../../../../shared/components/ExternalLink';
import UniProtKBEvidenceTag from '../../../protein-data-views/UniProtKBEvidenceTag';
import ErrorHandler from '../../../../../shared/components/error-pages/ErrorHandler';
import EntryDownloadPanel from '../../../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../../../shared/components/entry/EntryDownloadButton';
import NightingaleManagerComponent from '../../../../../shared/custom-elements/NightingaleManager';
import TableFromData, {
  TableFromDataColumn,
} from '../../../../../shared/components/table/TableFromData';

import useDataApi from '../../../../../shared/hooks/useDataApi';
import { useSmallScreen } from '../../../../../shared/hooks/useMatchMedia';
import useNightingaleFeatureTableScroll from '../../../../../shared/hooks/useNightingaleFeatureTableScroll';

import apiUrls from '../../../../../shared/config/apiUrls/apiUrls';
import externalUrls from '../../../../../shared/config/externalUrls';

import { sortByLocation } from '../../../../utils';
import { getEntryPath } from '../../../../../app/config/urls';
import {
  NightingaleViewRange,
  withinRange,
} from '../../../../../shared/utils/nightingale';

import { VARIANT_COUNT_LIMIT } from '../../../../../shared/config/limits';

import { Evidence } from '../../../../types/modelTypes';
import { Namespace } from '../../../../../shared/types/namespaces';
import { TabLocation } from '../../../../types/entry';
import { Dataset } from '../../../../../shared/components/entry/EntryDownload';
import { TransformedVariant } from '../../../../types/variation';

import styles from './styles/variation-viewer.module.scss';
import tabsStyles from '../styles/tabs-styles.module.scss';
import helper from '../../../../../shared/styles/helper.module.scss';

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

  const filteredVariants = variants
    ?.filter((variant) =>
      selectedConsequenceFilters.some((filter) =>
        filter?.filterPredicate(variant)
      )
    )
    .filter((variant) =>
      selectedProvenanceFilters.some((filter) =>
        filter?.filterPredicate(variant)
      )
    );
  return filteredVariants;
};

const getHighlightedCoordinates = (feature?: TransformedVariant) =>
  feature?.begin && feature?.end
    ? `${feature.begin}:${feature.end}`
    : undefined;

const getRowId = (data: TransformedVariant) => data.accession;

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
          Array.from(new Set(data.xrefs?.map((xref) => xref.id)))
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
        // eslint-disable-next-line react/no-array-index-key
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
  const [highlightedVariant, setHighlightedVariant] =
    useState<TransformedVariant>();
  const [nightingaleViewRange, setNightingaleViewRange] =
    useState<NightingaleViewRange>();
  const tableId = useId();
  const tableScroll = useNightingaleFeatureTableScroll(getRowId, tableId);

  const searchParams = new URLSearchParams(useLocation().search);
  const loadAllVariants = searchParams.get('loadVariants');

  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const shouldRender =
    (importedVariants !== 'loading' &&
      importedVariants <= VARIANT_COUNT_LIMIT) ||
    loadAllVariants;

  const { loading, data, progress, error, status } =
    useDataApi<ProteinsAPIVariation>(
      shouldRender ? apiUrls.proteinsApi.variation(primaryAccession) : undefined
    );

  const [filters, setFilters] = useState<string[]>([]);
  const managerRef = useRef<NightingaleManager>(null);
  useEffect(() => {
    const { current: element } = managerRef;

    if (!element) {
      return;
    }

    const listener = (event: Event) => {
      const { detail } = event as CustomEvent;
      if (detail?.type === 'filters') {
        setFilters(detail.value);
      } else if (detail?.eventType === 'click' && detail?.feature) {
        setHighlightedVariant(detail.feature);
        tableScroll(detail.feature);
      } else if (detail?.['display-start'] && detail?.['display-end']) {
        setNightingaleViewRange(detail);
      }
    };

    element.addEventListener('change', listener);
    // eslint-disable-next-line consistent-return
    return () => element.removeEventListener('change', listener);
  }, [data, tableScroll]);
  // 'data' is not directly used in the effect, but we know it's when we're
  // ready to attach the event listener and avoid re-calling this on each render

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
  if (!shouldRender) {
    return (
      <div className="wider-tab-content hotjar-margin">
        {title && <h3>{title}</h3>}
        {displayDownloadPanel && (
          <EntryDownloadPanel
            handleToggle={handleToggleDownload}
            dataset={Dataset.variation}
          />
        )}
        <EntryDownloadButton handleToggle={handleToggleDownload} />
        <div className={tabsStyles['too-many']}>
          <Message>
            Due to the large number (<LongNumber>{importedVariants}</LongNumber>
            ) of variations for this entry, the variant viewer will not be
            loaded automatically for performance reasons.
          </Message>
          <Link
            className="button primary"
            to={{
              pathname: getEntryPath(
                Namespace.uniprotkb,
                primaryAccession,
                TabLocation.VariantViewer
              ),
              search: new URLSearchParams({
                loadVariants: 'true',
              }).toString(),
            }}
            target="variants"
          >
            Click to load the <LongNumber>{importedVariants}</LongNumber>{' '}
            variations
          </Link>
        </div>
      </div>
    );
  }

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
        {title && <h3>{title}</h3>}
        <div className={tabsStyles['no-data']}>
          No variation information available for {primaryAccession}
        </div>
      </section>
    );
  }

  if (isSmallScreen) {
    return (
      <section>
        {title && <h2>{title}</h2>}
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
      {title && <h2>{title}</h2>}
      {displayDownloadPanel && (
        <EntryDownloadPanel
          handleToggle={handleToggleDownload}
          dataset={Dataset.variation}
        />
      )}
      <EntryDownloadButton handleToggle={handleToggleDownload} />
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
      <TableFromData
        id={tableId}
        columns={getColumns(primaryAccession)}
        data={filteredVariants}
        getRowId={getRowId}
        onRowClick={setHighlightedVariant}
        rowExtraContent={RowExtraContent}
        markBackground={(datum) =>
          typeof highlightedVariant?.accession !== 'undefined' &&
          datum.accession === highlightedVariant.accession
        }
        markBorder={(datum) =>
          Boolean(nightingaleViewRange) &&
          withinRange(+datum.begin, +datum.end, nightingaleViewRange)
        }
      />
    </section>
  );
};

export default VariationViewer;
