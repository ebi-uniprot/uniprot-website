import React, { useCallback, FC, useMemo } from 'react';
import { Loader } from 'franklin-sites';
import { html } from 'lit-html';
import joinUrl from 'url-join';

import { filterConfig, colorConfig } from 'protvista-uniprot';
import { ProteinsAPIVariation } from 'protvista-variation-adapter/dist/es/variants';
import { transformData, TransformedVariant } from 'protvista-variation-adapter';

import { UniProtProtvistaEvidenceTag } from './UniProtKBEvidenceTag';
import FeaturesTableView, { FeaturesTableCallback } from './FeaturesTableView';

import useDataApi from '../../../shared/hooks/useDataApi';
import useCustomElement from '../../../shared/hooks/useCustomElement';

import apiUrls from '../../../shared/config/apiUrls';

import { Evidence } from '../../types/modelTypes';

import './styles/variation-view.scss';

const getColumnConfig = (evidenceTagCallback: FeaturesTableCallback) => {
  return {
    positions: {
      label: 'Position(s)',
      resolver: (d: TransformedVariant) =>
        d.start === d.end ? d.start : `${d.start}-${d.end}`,
    },
    change: {
      label: 'Change',
      resolver: (d: TransformedVariant) =>
        `${d.wildType}>${d.alternativeSequence}`,
    },
    consequence: {
      label: 'Consequence',
      child: true,
      resolver: (d: TransformedVariant) => d.consequenceType,
    },
    predictions: {
      label: 'Predictions',
      child: true,
      resolver: (d: TransformedVariant) =>
        html`${d.predictions?.map(
          (prediction) =>
            html`${prediction.predAlgorithmNameType}:
              ${prediction.predictionValType} (${prediction.score})<br />`
        )}`,
    },
    description: {
      label: 'Description',
      resolver: (d: TransformedVariant) =>
        html`${d.descriptions?.map(
          (description) =>
            html`${description.value} (${description.sources.join(', ')})<br />`
        )}`,
    },
    somaticStatus: {
      label: 'Somatic',
      child: true,
      resolver: (d: TransformedVariant) => (d.somaticStatus === 1 ? 'Y' : 'N'),
    },
    hasDisease: {
      label: 'Disease association',
      resolver: (d: TransformedVariant) =>
        d.association && d.association.length > 0 ? 'Y' : 'N',
    },
    association: {
      label: 'Disease association',
      child: true,
      resolver: (d: TransformedVariant) => {
        if (!d.association) {
          return '';
        }
        return d.association.map((association) => {
          return html`
            <p>
              ${association.name}
              ${association.evidences &&
              UniProtProtvistaEvidenceTag(
                association.evidences.map((evidence) => {
                  return {
                    evidenceCode: evidence.code,
                    source: evidence.source.name,
                    id: evidence.source.id,
                  } as Evidence;
                }),
                evidenceTagCallback
              )}
            </p>
          `;
        });
      },
    },
  };
};

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
  const ceDefined =
    filterDefined &&
    variationDefined &&
    navigationDefined &&
    sequenceDefined &&
    managerDefined;

  if (loading || !ceDefined) return <Loader />;

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

  return (
    <div>
      {title && <h3>{title}</h3>}
      <protvista-manager attributes="highlight displaystart displayend activefilters filters selectedid">
        {hasTable && (
          <div className="variation-view">
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
        <FeaturesTableView
          data={transformedData.variants}
          getColumnConfig={getColumnConfig}
        />
      </protvista-manager>
    </div>
  );
};

export default VariationView;
