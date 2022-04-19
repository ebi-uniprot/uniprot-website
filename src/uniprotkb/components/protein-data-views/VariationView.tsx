import { useMemo, Fragment, lazy, useRef, useEffect, useState } from 'react';
import { ExternalLink, Loader } from 'franklin-sites';
import joinUrl from 'url-join';
import { groupBy, intersection, union } from 'lodash-es';

import { ProteinsAPIVariation } from 'protvista-variation-adapter/dist/es/variants';
import { transformData, TransformedVariant } from 'protvista-variation-adapter';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import LazyComponent from '../../../shared/components/LazyComponent';

import useDataApi from '../../../shared/hooks/useDataApi';
import useCustomElement from '../../../shared/hooks/useCustomElement';

import apiUrls from '../../../shared/config/apiUrls';

import styles from './styles/variation-view.module.scss';

const VisualVariationView = lazy(
  () =>
    import(
      /* webpackChunkName: "visual-variation-view" */ './VisualVariationView'
    )
);

const sortByLocation = (a: TransformedVariant, b: TransformedVariant) => {
  const aStart = +a.start;
  const aEnd = a.end ? +a.end : -Infinity;
  const bStart = +b.start;
  const bEnd = b.end ? +b.end : -Infinity;
  if (aStart === bStart) {
    return aEnd - bEnd;
  }
  return aStart - bStart;
};

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
  primaryAccession: string;
  title?: string;
  onlyTable?: boolean;
};

const VariationView = ({
  primaryAccession,
  title,
  onlyTable = false,
}: VariationViewProps) => {
  const { loading, data, error, status } = useDataApi<ProteinsAPIVariation>(
    joinUrl(apiUrls.variation, primaryAccession)
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
  const dataTableElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  if (loading) {
    return <Loader />;
  }

  if (error && status !== 404) {
    // TODO: use in-page error message
    return <div>An error happened</div>;
  }

  if (
    status === 404 ||
    !transformedData ||
    !transformedData.sequence ||
    !sortedVariants?.length ||
    !filteredVariants
  ) {
    return null;
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
            Disease
            <br />
            association
          </th>
          <th>Provenance</th>
        </tr>
      </thead>
      <tbody>
        {filteredVariants.map((variantFeature) => {
          let position = variantFeature.start;
          if (variantFeature.start !== variantFeature.end) {
            position += `-${variantFeature.end}`;
          }

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
                  ).map((id, i) => (
                    <Fragment key={id}>
                      {i !== 0 && <br />}
                      {id}
                    </Fragment>
                  ))}
                </td>
                <td>{position}</td>
                <td className={styles.change}>
                  {variantFeature.wildType}
                  {'>'}
                  {variantFeature.alternativeSequence || <em>missing</em>}
                </td>
                <td>
                  {variantFeature.descriptions?.map((description) => (
                    <div key={description.value}>
                      {`${description.value} (${description.sources.join(
                        ', '
                      )})`}
                    </div>
                  ))}
                </td>
                <td>
                  {variantFeature.association &&
                  variantFeature.association.length > 0
                    ? 'Yes'
                    : 'No'}
                </td>
                <td>
                  {Array.from(new Set(variantFeature.xrefNames)).map(
                    (name, i) => (
                      <Fragment key={name}>
                        {i !== 0 && <br />}
                        {name}
                      </Fragment>
                    )
                  )}
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
                  {variantFeature.clinicalSignificances?.length ? (
                    <div>
                      <strong>Clinical significances: </strong>
                      {variantFeature.clinicalSignificances?.map(
                        (clinicalSignificance) => (
                          <div
                            key={`${clinicalSignificance.sources.join('-')}-${
                              clinicalSignificance.type
                            }`}
                          >
                            {`- ${
                              clinicalSignificance.type
                            } (${clinicalSignificance.sources.join(', ')})`}
                          </div>
                        )
                      )}
                    </div>
                  ) : null}
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
                    {variantFeature.genomicLocation}
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
                          {/* note that the type needs to be updated, evidences is optional on association object */}
                          {/* Example in P42771 */}
                          {association.evidences?.length ? (
                            // These evidences cover only one "association"
                            <UniProtKBEvidenceTag
                              evidences={association.evidences.map(
                                (evidence) => ({
                                  evidenceCode:
                                    evidence.code as `ECO:${number}`,
                                  id: evidence.source.id,
                                  source: evidence.source.name,
                                  url: evidence.source.url,
                                })
                              )}
                            />
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div>
                    <strong>Source type: </strong>{' '}
                    {variantFeature.sourceType.replace(/_/g, ' ')}
                  </div>
                  {/* note that the type needs to be updated, xrefs is optional on association object */}
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
                  {/* These evidences probably cover the variant as a whole */}
                  {variantFeature.evidences?.length ? (
                    <>
                      <br />
                      <UniProtKBEvidenceTag
                        evidences={variantFeature.evidences.map((evidence) => ({
                          evidenceCode: evidence.code as `ECO:${number}`,
                          id: evidence.source.id,
                          source: evidence.source.name,
                          url: evidence.source.url,
                        }))}
                      />
                    </>
                  ) : null}
                </td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );

  if (onlyTable) {
    return <dataTableElement.name filter-scroll>{table}</dataTableElement.name>;
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      <managerElement.name
        attributes="highlight displaystart displayend activefilters filters selectedid"
        ref={managerRef}
      >
        {!onlyTable && (
          <LazyComponent rootMargin="50px">
            <VisualVariationView {...transformedData} />
          </LazyComponent>
        )}
        <dataTableElement.name filter-scroll>{table}</dataTableElement.name>
      </managerElement.name>
    </div>
  );
};

export default VariationView;
