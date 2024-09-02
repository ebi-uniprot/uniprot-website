import {
  useMemo,
  Fragment,
  useRef,
  useEffect,
  useState,
  lazy,
  ReactNode,
  Suspense,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EllipsisReveal, Loader, LongNumber, Message } from 'franklin-sites';
import { groupBy, intersection, union } from 'lodash-es';
import cn from 'classnames';
import { PartialDeep, SetRequired } from 'type-fest';
import {
  ProteinsAPIVariation,
  transformData,
} from '@nightingale-elements/nightingale-variation';
import NightingaleManager from '@nightingale-elements/nightingale-manager';

import ExternalLink from '../../../../../shared/components/ExternalLink';
import UniProtKBEvidenceTag from '../../../protein-data-views/UniProtKBEvidenceTag';
import DatatableWrapper from '../../../../../shared/components/views/DatatableWrapper';
import ErrorHandler from '../../../../../shared/components/error-pages/ErrorHandler';
import EntryDownloadPanel from '../../../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../../../shared/components/entry/EntryDownloadButton';
import NightingaleManagerComponent from '../../../../../shared/custom-elements/NightingaleManager';
import TableFromData, {
  TableFromDataColumn,
} from '../../../../../shared/components/table/TableFromData';

import useDataApi from '../../../../../shared/hooks/useDataApi';
import { useSmallScreen } from '../../../../../shared/hooks/useMatchMedia';

import apiUrls from '../../../../../shared/config/apiUrls/apiUrls';
import externalUrls from '../../../../../shared/config/externalUrls';
import { sortByLocation } from '../../../../utils';
import { getEntryPath } from '../../../../../app/config/urls';

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

// hardcoded threshold
export const VARIANT_COUNT_LIMIT = 2_000;

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

type ObjWithVariants = { variants: TransformedVariant[] };

type Filter = {
  category: string;
  filterFn: (obj: ObjWithVariants[]) => ObjWithVariants[];
};

// copied/adapted logic from protvista-variation
const deepArrayOperation = (
  arrays: ObjWithVariants[][],
  operation: typeof union | typeof intersection
) => {
  if (!arrays || arrays.length <= 0) {
    return null;
  }
  const firstArray = arrays[0];
  // Iterate over positions
  firstArray.forEach((position, i) => {
    const filteredVariants = arrays.map((array) => array[i].variants);
    /* eslint-disable no-param-reassign */
    position.variants = operation(...filteredVariants);
  });
  return firstArray;
};

// copied/adapted logic from protvista-variation
const applyFilters = (variants: TransformedVariant[], filters: Filter[]) => {
  if (!filters.length) {
    return variants;
  }

  const originalData: ObjWithVariants[] = [{ variants }];

  const groupedFilters = groupBy(filters, 'category');
  const filteredGroups = Object.values(groupedFilters).map((filterGroup) => {
    const filteredData = filterGroup.map((filterItem) =>
      filterItem.filterFn(originalData)
    );
    // Basically, *within* groups, logical OR...
    return deepArrayOperation(filteredData, union) || [];
  });

  const transformedData =
    // ... and, *across* groups, logical AND
    deepArrayOperation(filteredGroups, intersection) || [];
  return transformedData[0]?.variants;
};

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
    render: (data) => {
      let position = data.start;
      if (data.start !== data.end) {
        position += `-${data.end}`;
      }
      return position;
    },
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

      return data.consequenceType !== '-' &&
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
          } as Evidence)
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
          <div key={`${location.loc}-${location.seqId}`}>
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
      <strong>Source type: </strong> {data.sourceType.replace(/_/g, ' ')}
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

  const [filters, setFilters] = useState([]);
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
      }
    };

    element.addEventListener('change', listener);
    // eslint-disable-next-line consistent-return
    return () => element.removeEventListener('change', listener);
  }, [data]);
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
    () => sortedVariants && applyFilters(sortedVariants, filters),
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
        reflected-attributes="highlight,displaystart,displayend,activefilters,filters,selectedid"
        ref={managerRef}
      >
        <Suspense fallback={null}>
          <VisualVariationView {...transformedData} />
        </Suspense>
        <TableFromData
          columns={getColumns(primaryAccession)}
          data={filteredVariants}
          getRowId={getRowId}
          rowExtraContent={RowExtraContent}
        />
      </NightingaleManagerComponent>
    </section>
  );
};

export default VariationViewer;
