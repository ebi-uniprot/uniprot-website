import React, { useCallback, FC } from 'react';
import { Loader } from 'franklin-sites';
import { html } from 'lit-html';
import joinUrl from 'url-join';

import { filterConfig, colorConfig } from 'protvista-uniprot';
import {
  ProteinsAPIVariation,
  Feature as VariantFeature,
} from 'protvista-variation-adapter/dist/es/variants';
import { transformData } from 'protvista-variation-adapter';

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
      resolver: (d: VariantFeature) =>
        d.begin === d.end ? d.begin : `${d.begin}-${d.end}`,
    },
    change: {
      label: 'Change',
      resolver: (d: VariantFeature) => `${d.wildType}>${d.alternativeSequence}`,
    },
    consequence: {
      label: 'Consequence',
      child: true,
      resolver: (d: VariantFeature) => d.consequenceType,
    },
    predictions: {
      label: 'Predictions',
      child: true,
      resolver: (d: VariantFeature) =>
        html`${d.predictions?.map(
          (prediction) =>
            html`${prediction.predAlgorithmNameType}:
              ${prediction.predictionValType} (${prediction.score})<br />`
        )}`,
    },
    description: {
      label: 'Description',
      resolver: (d: VariantFeature) =>
        html`${d.descriptions?.map(
          (description) =>
            html`${description.value} (${description.sources.join(', ')})<br />`
        )}`,
    },
    somaticStatus: {
      label: 'Somatic',
      child: true,
      resolver: (d: VariantFeature) => (d.somaticStatus === 1 ? 'Y' : 'N'),
    },
    hasDisease: {
      label: 'Disease association',
      resolver: (d: VariantFeature) =>
        d.association && d.association.length > 0 ? 'Y' : 'N',
    },
    association: {
      label: 'Disease association',
      child: true,
      resolver: (d: VariantFeature) => {
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

  const filterDefined = useCustomElement(
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
    () =>
      import(
        /* webpackChunkName: "protvista-variation" */ 'protvista-variation'
      ),
    'protvista-variation'
  );

  const protvistaVariationRef = useCallback(
    (node) => {
      if (node && variationDefined && data && data.features) {
        const transformedData = transformData(data);
        // eslint-disable-next-line no-param-reassign
        node.colorConfig = colorConfig;
        // eslint-disable-next-line no-param-reassign
        node.data = transformedData;
        // eslint-disable-next-line no-param-reassign
        node.length = transformedData.sequence.length;
      }
    },
    [variationDefined, data]
  );

  const navigationDefined = useCustomElement(
    () =>
      import(
        /* webpackChunkName: "protvista-navigation" */ 'protvista-navigation'
      ),
    'protvista-navigation'
  );
  const sequenceDefined = useCustomElement(
    () =>
      import(/* webpackChunkName: "protvista-sequence" */ 'protvista-sequence'),
    'protvista-sequence'
  );
  const managerDefined = useCustomElement(
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
    !data ||
    !data.sequence ||
    !data.features ||
    data.features.length <= 0
  ) {
    return null;
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      <protvista-manager attributes="highlight displaystart displayend activefilters filters">
        {hasTable && (
          <div className="variation-view">
            <protvista-navigation length={data.sequence.length} />
            <protvista-sequence
              length={data.sequence.length}
              sequence={data.sequence}
              height="20"
              filter-scroll
            />
            <protvista-filter
              for="variation-component"
              ref={protvistaFilterRef}
            />
            <protvista-variation
              id="variation-component"
              length={data.sequence.length}
              ref={protvistaVariationRef}
            />
          </div>
        )}
        <FeaturesTableView
          data={data.features}
          getColumnConfig={getColumnConfig}
        />
      </protvista-manager>
    </div>
  );
};

export default VariationView;
