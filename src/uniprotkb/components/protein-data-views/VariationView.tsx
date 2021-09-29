import { useCallback, FC, useMemo, Fragment } from 'react';
import { Loader } from 'franklin-sites';
import joinUrl from 'url-join';

import { filterConfig, colorConfig } from 'protvista-uniprot';
import {
  ProteinsAPIVariation,
  Variant,
} from 'protvista-variation-adapter/dist/es/variants';
import { transformData } from 'protvista-variation-adapter';
import { ProtvistaVariationDatum } from 'protvista-variation/types/protvista-variation';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';

import useDataApi from '../../../shared/hooks/useDataApi';
import useCustomElement from '../../../shared/hooks/useCustomElement';

import apiUrls from '../../../shared/config/apiUrls';

import './styles/variation-view.scss';
import NightingaleZoomTool from './NightingaleZoomTool';

const VariationView: FC<{
  primaryAccession: string;
  title?: string;
  hasTable?: boolean;
}> = ({ primaryAccession, title, hasTable = true }) => {
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

  const filterDefined = useCustomElement(
    /* istanbul ignore next */
    () => import(/* webpackChunkName: "protvista-filter" */ 'protvista-filter'),
    'protvista-filter'
  );

  const protvistaFilterRef = useCallback(
    (node) => {
      if (node && filterDefined) {
        // eslint-disable-next-line no-param-reassign
        node.filters = filterConfig;
      }
    },
    [filterDefined]
  );

  const variationDefined = useCustomElement(
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
        variationDefined &&
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
    [variationDefined, transformedData]
  );

  const navigationDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-navigation" */ 'protvista-navigation'
      ),
    'protvista-navigation'
  );
  const sequenceDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-sequence" */ 'protvista-sequence'),
    'protvista-sequence'
  );
  const managerDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(/* webpackChunkName: "protvista-manager" */ 'protvista-manager'),
    'protvista-manager'
  );
  const dataTableDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );
  const ceDefined =
    filterDefined &&
    variationDefined &&
    navigationDefined &&
    sequenceDefined &&
    managerDefined &&
    dataTableDefined;

  if (loading || !ceDefined) {
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
    !transformedData.variants ||
    transformedData.variants.length <= 0
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
        {transformedData.variants.map(
          (variantFeature: Variant & ProtvistaVariationDatum) => (
            <Fragment key={variantFeature.protvistaFeatureId}>
              <tr data-id={variantFeature.protvistaFeatureId}>
                <td>
                  {variantFeature.start}-{variantFeature.end}
                </td>
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
                        key={`${pred.predAlgorithmNameType}${
                          pred.predictionValType
                        }${pred.sources.join('-')}`}
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
                      <p key={association.name}>
                        {association.name}
                        <UniProtKBEvidenceTag
                          evidences={association.evidences.map((evidence) => ({
                            evidenceCode: evidence.code as `ECO:${number}`,
                            id: evidence.source.id,
                            source: evidence.source.name,
                          }))}
                        />
                      </p>
                    ))}
                  </div>
                </td>
              </tr>
            </Fragment>
          )
        )}
      </tbody>
    </table>
  );

  return (
    <div>
      {title && <h3>{title}</h3>}
      <protvista-manager attributes="highlight displaystart displayend activefilters filters selectedid">
        {hasTable && (
          <div className="variation-view">
            <NightingaleZoomTool length={transformedData.sequence.length} />
            <protvista-navigation length={transformedData.sequence.length} />
            <protvista-sequence
              length={transformedData.sequence.length}
              sequence={transformedData.sequence}
              height="20"
              filter-scroll
            />
            <protvista-filter
              for="variation-component"
              ref={protvistaFilterRef}
            />
            <protvista-variation
              id="variation-component"
              length={transformedData.sequence.length}
              ref={protvistaVariationRef}
            />
          </div>
        )}
        <protvista-datatable filter-scroll>{table}</protvista-datatable>
      </protvista-manager>
    </div>
  );
};

export default VariationView;
