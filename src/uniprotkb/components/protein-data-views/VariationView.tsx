import { useMemo, Fragment, lazy } from 'react';
import { Loader } from 'franklin-sites';
import joinUrl from 'url-join';

import { ProteinsAPIVariation } from 'protvista-variation-adapter/dist/es/variants';
import { transformData, TransformedVariant } from 'protvista-variation-adapter';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import LazyComponent from '../../../shared/components/LazyComponent';

import useDataApi from '../../../shared/hooks/useDataApi';
import useCustomElement from '../../../shared/hooks/useCustomElement';

import apiUrls from '../../../shared/config/apiUrls';

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

  // We pass the transformed data to both the variation viewer and the
  // data table as ids are set during the transformation - they are
  // used for the selection between the 2 components
  const transformedData = useMemo(
    () => (data && data.features ? transformData(data) : undefined),
    [data]
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
    !transformedData.variants?.length
  ) {
    return null;
  }

  const table = (
    <table>
      <thead>
        <tr>
          <th>Position(s)</th>
          <th>Change</th>
          <th>Description</th>
          <th>Disease association</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(transformedData.variants)
          .sort(sortByLocation)
          .map((variantFeature) => {
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
                  <td>{position}</td>
                  <td>
                    {variantFeature.wildType}
                    {'>'}
                    {variantFeature.alternativeSequence}
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
                      ? 'Y'
                      : 'N'}
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
                          {`${pred.predAlgorithmNameType}: ${pred.predictionValType} (${pred.score})`}
                        </div>
                      ))}
                    </div>
                    <div>
                      <strong>Somatic: </strong>{' '}
                      {variantFeature.somaticStatus === 1 ? 'Y' : 'N'}
                    </div>
                    <div>
                      <strong>Disease association: </strong>
                      {variantFeature.association?.map((association) => (
                        <div
                          key={`${association.name}-${association.description}`}
                        >
                          {association.name}
                          {/* note that the type needs to be updated, evidences is optional on association object */}
                          {/* Example in P42771 */}
                          {association.evidences?.length ? (
                            <UniProtKBEvidenceTag
                              evidences={association.evidences.map(
                                (evidence) => ({
                                  evidenceCode:
                                    evidence.code as `ECO:${number}`,
                                  id: evidence.source.id,
                                  source: evidence.source.name,
                                })
                              )}
                            />
                          ) : null}
                        </div>
                      ))}
                    </div>
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
      <managerElement.name attributes="highlight displaystart displayend activefilters filters selectedid">
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
