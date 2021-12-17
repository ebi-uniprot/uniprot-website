import { useCallback, useMemo, Fragment } from 'react';
import { Loader } from 'franklin-sites';
import joinUrl from 'url-join';

import { filterConfig, colorConfig } from 'protvista-uniprot';
import { ProteinsAPIVariation } from 'protvista-variation-adapter/dist/es/variants';
import { transformData } from 'protvista-variation-adapter';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import useDataApi from '../../../shared/hooks/useDataApi';
import useCustomElement from '../../../shared/hooks/useCustomElement';

import apiUrls from '../../../shared/config/apiUrls';

import './styles/variation-view.scss';
import NightingaleZoomTool from './NightingaleZoomTool';

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

  const filterElement = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-filter" */ 'protvista-filter'),
    'protvista-filter'
  );

  const protvistaFilterRef = useCallback(
    (node) => {
      if (node && filterElement.defined) {
        // eslint-disable-next-line no-param-reassign
        node.filters = filterConfig;
      }
    },
    [filterElement.defined]
  );

  const variationElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-variation" */ 'protvista-variation'
      ),
    'protvista-variation'
  );

  const protvistaVariationRef = useCallback(
    (node) => {
      if (
        node &&
        variationElement.defined &&
        transformedData &&
        transformedData.variants
      ) {
        // eslint-disable-next-line no-param-reassign
        node.colorConfig = colorConfig;
        // eslint-disable-next-line no-param-reassign
        node.data = transformedData;
        // eslint-disable-next-line no-param-reassign
        node.length = transformedData.sequence.length;
      }
    },
    [variationElement.defined, transformedData]
  );

  const navigationElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-navigation" */ 'protvista-navigation'
      ),
    'protvista-navigation'
  );
  const sequenceElement = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-sequence" */ 'protvista-sequence'),
    'protvista-sequence'
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
  const ceDefined =
    filterElement.defined &&
    variationElement.defined &&
    navigationElement.defined &&
    sequenceElement.defined &&
    managerElement.defined &&
    dataTableElement.defined;

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
        {transformedData.variants.map((variantFeature) => {
          let position = variantFeature.start;
          if (variantFeature.start !== variantFeature.end) {
            position += `-${variantFeature.end}`;
          }

          return (
            <Fragment key={variantFeature.protvistaFeatureId}>
              <tr data-id={variantFeature.protvistaFeatureId}>
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
              <tr data-group-for={variantFeature.protvistaFeatureId}>
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
                                evidenceCode: evidence.code as `ECO:${number}`,
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
        {!onlyTable && ceDefined && (
          <div className="variation-view">
            <NightingaleZoomTool length={transformedData.sequence.length} />
            <navigationElement.name length={transformedData.sequence.length} />
            <sequenceElement.name
              length={transformedData.sequence.length}
              sequence={transformedData.sequence}
              height="20"
              filter-scroll
            />
            <filterElement.name
              for="variation-component"
              ref={protvistaFilterRef}
            />
            <variationElement.name
              id="variation-component"
              length={transformedData.sequence.length}
              ref={protvistaVariationRef}
            />
          </div>
        )}
        <dataTableElement.name filter-scroll>{table}</dataTableElement.name>
      </managerElement.name>
    </div>
  );
};

export default VariationView;
