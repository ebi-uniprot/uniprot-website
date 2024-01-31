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
import {
  Button,
  EllipsisReveal,
  Loader,
  LongNumber,
  Message,
} from 'franklin-sites';
import { groupBy, intersection, union } from 'lodash-es';
import cn from 'classnames';
import { PartialDeep, SetRequired } from 'type-fest';

import { ProteinsAPIVariation } from 'protvista-variation-adapter/dist/es/variants';
import { transformData, TransformedVariant } from 'protvista-variation-adapter';

import ExternalLink from '../../../../../shared/components/ExternalLink';
import UniProtKBEvidenceTag from '../../../protein-data-views/UniProtKBEvidenceTag';
import DatatableWrapper from '../../../../../shared/components/views/DatatableWrapper';
import ErrorHandler from '../../../../../shared/components/error-pages/ErrorHandler';
import EntryDownloadPanel from '../../../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../../../shared/components/entry/EntryDownloadButton';

import useDataApi from '../../../../../shared/hooks/useDataApi';
import useCustomElement from '../../../../../shared/hooks/useCustomElement';
import { useSmallScreen } from '../../../../../shared/hooks/useMatchMedia';

import apiUrls from '../../../../../shared/config/apiUrls/apiUrls';
import externalUrls from '../../../../../shared/config/externalUrls';
import { sortByLocation } from '../../../../utils';

import { Evidence } from '../../../../types/modelTypes';
import { Dataset } from '../../../../../shared/components/entry/EntryDownload';

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
const VARIANT_COUNT_LIMIT = 5_000;

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

  const [forcedRender, setForceRender] = useState(false);
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const shouldRender =
    (importedVariants !== 'loading' &&
      importedVariants <= VARIANT_COUNT_LIMIT) ||
    forcedRender;

  const { loading, data, progress, error, status } =
    useDataApi<ProteinsAPIVariation>(
      shouldRender ? apiUrls.proteinsApi.variation(primaryAccession) : undefined
    );

  const [filters, setFilters] = useState([]);
  const managerRef = useRef<HTMLElement>(null);
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

  const managerElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-manager" */ 'protvista-manager'),
    'protvista-manager'
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
        <div className={styles['too-many']}>
          <Message>
            As there are <LongNumber>{importedVariants}</LongNumber> variations,
            the variant viewer has not automatically been loaded for performance
            reasons.
          </Message>
          <Button onClick={() => setForceRender(true)}>
            Click to load the <LongNumber>{importedVariants}</LongNumber>{' '}
            variations
          </Button>
        </div>
      </div>
    );
  }

  if (error && status !== 404) {
    return (
      <div className="wider-tab-content hotjar-margin">
        <ErrorHandler status={status} />
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

  const table = (
    <table>
      <thead>
        <tr>
          <th>
            Variant
            <br />
            ID(s)
          </th>
          <th>Position(s)</th>
          <th>Change</th>
          <th>Description</th>
          <th>
            Clinical
            <br />
            significance
          </th>
          <th>Provenance</th>
        </tr>
      </thead>
      <tbody translate="no">
        {filteredVariants.map((variantFeature) => {
          let position = variantFeature.start;
          if (variantFeature.start !== variantFeature.end) {
            position += `-${variantFeature.end}`;
          }

          const uniProtEvidences = variantFeature.evidences?.map(
            (evidence: ProteinsAPIEvidence) =>
              ({
                evidenceCode: evidence.code,
                id: evidence?.source?.id,
                source: evidence?.source?.name,
                url: evidence?.source?.url,
              } as Evidence)
          );

          let from: ReactNode = variantFeature.wildType;
          if (!variantFeature.wildType) {
            from = <em>missing</em>;
          } else if (variantFeature.wildType.length > 3) {
            from = (
              <>
                {variantFeature.wildType.slice(0, 2)}
                <EllipsisReveal>
                  {variantFeature.wildType.slice(2)}
                </EllipsisReveal>
              </>
            );
          }

          let to: ReactNode = variantFeature.alternativeSequence;
          if (!variantFeature.alternativeSequence) {
            to = <em>missing</em>;
          } else if (variantFeature.alternativeSequence.length > 3) {
            to = (
              <>
                {variantFeature.alternativeSequence.slice(0, 2)}
                <EllipsisReveal>
                  {variantFeature.alternativeSequence.slice(2)}
                </EllipsisReveal>
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
            <Fragment key={variantFeature.protvistaFeatureId}>
              <tr
                data-id={variantFeature.protvistaFeatureId}
                data-start={variantFeature.start}
                data-end={variantFeature.end}
              >
                <td>
                  {Array.from(
                    // note that the type needs to be updated, xrefs is optional on association object
                    new Set(variantFeature.xrefs?.map((xref) => xref.id))
                  )
                    .sort(sortIDByUniProtFirst)
                    .map((id, i) => (
                      <Fragment key={id}>
                        {i !== 0 && <br />}
                        <span
                          className={cn({ [helper.bold]: isUniProtID(id) })}
                        >
                          {id}
                        </span>
                      </Fragment>
                    ))}
                </td>
                <td>{position}</td>
                <td className={styles.change}>
                  {variantFeature.consequenceType !== '-' &&
                  variantFeature.wildType.length === 1 &&
                  variantFeature.alternativeSequence?.length === 1 ? (
                    <ExternalLink
                      url={externalUrls.ProtVar(
                        `${primaryAccession} ${variantFeature.wildType}${variantFeature.start}${variantFeature.alternativeSequence}`
                      )}
                      title="View in ProtVar"
                      noIcon
                    >
                      {change}
                    </ExternalLink>
                  ) : (
                    change
                  )}
                  {!variantFeature.wildType &&
                    !variantFeature.alternativeSequence && <em>missing</em>}
                </td>
                <td translate="yes">
                  {variantFeature.descriptions?.length ? (
                    Array.from(variantFeature.descriptions)
                      .sort(sortDescriptionByUniProtFirst)
                      .map((description) => (
                        <div
                          key={description.value}
                          className={cn({
                            [helper.bold]: hasUniProtSource(description),
                          })}
                        >
                          {`${description.value} (${description.sources.join(
                            ', '
                          )})`}
                          <UniProtKBEvidenceTag evidences={uniProtEvidences} />
                        </div>
                      ))
                  ) : (
                    <UniProtKBEvidenceTag evidences={uniProtEvidences} />
                  )}
                </td>
                <td translate="yes">
                  {variantFeature.clinicalSignificances?.map(
                    (clinicalSignificance, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Fragment key={i}>
                        {i !== 0 && <br />}
                        <span
                          key={`${clinicalSignificance.sources.join('-')}-${
                            clinicalSignificance.type
                          }`}
                        >
                          {`${
                            clinicalSignificance.type
                          } (${clinicalSignificance.sources.join(', ')})`}
                        </span>
                      </Fragment>
                    )
                  )}
                </td>
                <td>
                  {Array.from(
                    new Set(
                      // 'uniprot' gets injected somehow in
                      // 'protvista-variation-adapter' transformData, remove it
                      variantFeature.xrefNames.map((name) =>
                        name === 'uniprot' ? 'UniProt' : name
                      )
                    )
                  )
                    .sort(sortProvenanceByUniProtFirst)
                    .map((name, i) => (
                      <Fragment key={name}>
                        {i !== 0 && <br />}
                        <span
                          className={cn({ [helper.bold]: isUniProt(name) })}
                        >
                          {name}
                        </span>
                      </Fragment>
                    ))}
                </td>
              </tr>
              <tr
                data-group-for={variantFeature.protvistaFeatureId}
                data-start={variantFeature.start}
                data-end={variantFeature.end}
              >
                <td>
                  <div>
                    <strong>Consequence: </strong>
                    {variantFeature.consequenceType}
                  </div>
                  {variantFeature.predictions?.length ? (
                    <div>
                      <strong>Predictions: </strong>
                      {variantFeature.predictions?.map((pred) => (
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
                    <strong>Somatic: </strong>{' '}
                    {variantFeature.somaticStatus === 1 ? 'Yes' : 'No'}
                  </div>
                  {variantFeature.populationFrequencies?.length ? (
                    <div>
                      <strong>Population frequencies: </strong>
                      {variantFeature.populationFrequencies?.map(
                        (populationFrequency) => (
                          <div
                            key={`${populationFrequency.source}-${populationFrequency.populationName}`}
                          >
                            {`- ${populationFrequency.populationName}: ${populationFrequency.frequency} (${populationFrequency.source})`}
                          </div>
                        )
                      )}
                    </div>
                  ) : null}
                  <div>
                    <strong>Accession: </strong> {variantFeature.accession}
                  </div>
                  {variantFeature.codon && (
                    <div>
                      <strong>Codon: </strong> {variantFeature.codon}
                    </div>
                  )}
                  <div>
                    <strong>Consequence type: </strong>{' '}
                    {variantFeature.consequenceType}
                  </div>
                  <div>
                    <strong>Cytogenetic band: </strong>{' '}
                    {variantFeature.cytogeneticBand}
                  </div>
                  <div>
                    <strong>Genomic location: </strong>{' '}
                    {variantFeature.genomicLocation?.join(', ')}
                  </div>
                  {variantFeature.locations?.length ? (
                    <div>
                      <strong>Locations: </strong>
                      {variantFeature.locations?.map((location) => (
                        <div key={`${location.loc}-${location.seqId}`}>
                          {`- ${location.loc} (${location.source}:${location.seqId})`}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {variantFeature.association?.length ? (
                    <div>
                      <strong>Disease association: </strong>
                      {variantFeature.association?.map((association) => (
                        <div
                          key={`${association.name}-${association.description}`}
                        >
                          {'- '}
                          {association.name}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div>
                    <strong>Source type: </strong>{' '}
                    {variantFeature.sourceType.replace(/_/g, ' ')}
                  </div>
                  {/* note that the type needs to be updated, xrefs is optional on association object */}
                  {/* Also, some xrefs don't have URLs... type should be optional */}
                  {variantFeature.xrefs?.length ? (
                    <div>
                      <strong>Cross-references: </strong>
                      {variantFeature.xrefs?.map((xref) => (
                        <div key={`${xref.name}-${xref.id}`}>
                          {'- '}
                          <ExternalLink url={xref.url}>
                            {xref.name}: {xref.id}
                          </ExternalLink>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );

  if (isSmallScreen) {
    return (
      <section>
        {title && <h2>{title}</h2>}
        <DatatableWrapper>{table}</DatatableWrapper>
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
      <managerElement.name
        attributes="highlight displaystart displayend activefilters filters selectedid"
        ref={managerRef}
      >
        <Suspense fallback={null}>
          <VisualVariationView {...transformedData} />
        </Suspense>
        <DatatableWrapper alwaysExpanded>{table}</DatatableWrapper>
      </managerElement.name>
    </section>
  );
};

export default VariationViewer;
