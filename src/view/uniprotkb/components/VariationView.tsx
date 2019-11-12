import React, { useCallback, FC } from 'react';
import ProtvistaManager from 'protvista-manager';
import ProtvistaSequence from 'protvista-sequence';
import ProtvistaNavigation from 'protvista-navigation';
import ProtvistaVariation from 'protvista-variation';
import ProtvistaVariationAdapter from 'protvista-variation-adapter';
import ProtvistaFilter, { ProtvistaCheckbox } from 'protvista-filter';
import { html } from 'lit-html';
import { loadWebComponent } from '../../../utils/utils';
import useDataApi from '../../../utils/useDataApi';
import apiUrls, { joinUrl } from '../../../utils/apiUrls';
import FeatureType from '../../../model/types/FeatureType';
import './styles/VariationView.scss';
import { UniProtProtvistaEvidenceTag } from '../../../components/UniProtEvidenceTag';
import { Evidence } from '../../../model/types/modelTypes';
import FeaturesTableView, { FeaturesTableCallback } from './FeaturesTableView';

export type ProtvistaVariant = {
  begin: number;
  end: number;
  type: FeatureType.VARIANT;
  wildType: string;
  alternativeSequence: string;
  polyphenPrediction?: string;
  polyphenScore?: number;
  siftPrediction?: string;
  siftScore?: number;
  description?: string;
  consequenceType: string;
  cytogeneticBand?: string;
  genomicLocation?: string;
  somaticStatus?: number;
  sourceType: string;
  association?: {
    description: string;
    disease: boolean;
    name: string;
    evidences: { code: string; source: { name: string; id: string } }[];
  }[];
  xrefs: {
    alternativeUrl?: string;
    id: string;
    name: string;
    url: string;
  }[];
};

interface ChangeEvent extends Event {
  detail?: { type: string; value: string[] };
}

loadWebComponent('protvista-variation', ProtvistaVariation);
loadWebComponent('protvista-navigation', ProtvistaNavigation);
loadWebComponent('protvista-sequence', ProtvistaSequence);
loadWebComponent('protvista-manager', ProtvistaManager);
loadWebComponent('protvista-filter', ProtvistaFilter);
loadWebComponent('protvista-checkbox', ProtvistaCheckbox);
loadWebComponent('protvista-variation-adapter', ProtvistaVariationAdapter);

const formatVariantDescription = (description: string) => {
  /* eslint-disable no-useless-escape */
  const pattern = /\[(\w+)\]: ([^\[]+)/g;
  const match = description.match(pattern);
  return match;
};

const getColumnConfig = (evidenceTagCallback: FeaturesTableCallback) => {
  return {
    positions: {
      label: 'Position(s)',
      resolver: (d: ProtvistaVariant) =>
        d.begin === d.end ? d.begin : `${d.begin}-${d.end}`,
    },
    change: {
      label: 'Change',
      resolver: (d: ProtvistaVariant) =>
        `${d.wildType}>${d.alternativeSequence}`,
    },
    consequence: {
      label: 'Consequence',
      child: true,
      resolver: (d: ProtvistaVariant) => d.consequenceType,
    },
    sift: {
      label: 'SIFT prediction',
      child: true,
      resolver: (d: ProtvistaVariant) =>
        d.siftPrediction ? `${d.siftPrediction} (${d.siftScore})` : '',
    },
    polyphen: {
      label: 'Polyphen prediction',
      child: true,
      resolver: (d: ProtvistaVariant) =>
        d.polyphenPrediction
          ? `${d.polyphenPrediction} (${d.polyphenScore})`
          : '',
    },
    description: {
      label: 'Description',
      resolver: (d: ProtvistaVariant) => {
        if (!d.description) {
          return '';
        }
        const formatedDescription = formatVariantDescription(d.description);
        return formatedDescription
          ? formatedDescription.map(
              descriptionLine =>
                html`
                  <p>${descriptionLine}</p>
                `
            )
          : '';
      },
    },
    somaticStatus: {
      label: 'Somatic',
      child: true,
      resolver: (d: ProtvistaVariant) => (d.somaticStatus === 1 ? 'Y' : 'N'),
    },
    hasDisease: {
      label: 'Disease association',
      resolver: (d: ProtvistaVariant) =>
        d.association && d.association.length > 0 ? 'Y' : 'N',
    },
    association: {
      label: 'Disease association',
      child: true,
      resolver: (d: ProtvistaVariant) => {
        if (!d.association) {
          return '';
        }
        return d.association.map(association => {
          return html`
            <p>
              ${association.name}
              ${association.evidences &&
                UniProtProtvistaEvidenceTag(
                  association.evidences.map(evidence => {
                    return ({
                      evidenceCode: evidence.code,
                      source: evidence.source.name,
                      id: evidence.source.id,
                    } as unknown) as Evidence;
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

const VariationView: FC<{ primaryAccession: string }> = ({
  primaryAccession,
}) => {
  const data = useDataApi(joinUrl(apiUrls.variation, primaryAccession));

  const setTrackData = useCallback(
    node => {
      if (node !== null && data.features) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
        // eslint-disable-next-line no-param-reassign
        node.length = data.sequence.length;
      }
    },
    [data]
  );

  if (!data.sequence) {
    return null;
  }

  return (
    <div>
      <h4>Variants</h4>
      <protvista-manager attributes="highlight displaystart displayend activefilters filters">
        <div className="variation-view">
          <protvista-navigation length={data.sequence.length} />
          <protvista-sequence
            length={data.sequence.length}
            sequence={data.sequence}
            height="20"
          />
          <protvista-filter />
          <protvista-variation length={data.sequence.length}>
            <protvista-variation-adapter ref={setTrackData} />
          </protvista-variation>
        </div>
        <FeaturesTableView
          data={data.features}
          getColumnConfig={getColumnConfig}
        />
      </protvista-manager>
    </div>
  );
};

export default VariationView;
