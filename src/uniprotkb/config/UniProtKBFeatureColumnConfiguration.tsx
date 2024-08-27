import { ReactNode } from 'react';
import { Button, Card, Chip, ExternalLink } from 'franklin-sites';

import PtmExchangeEvidenceTag from '../components/protein-data-views/PtmExchangeEvidenceTag';
import UniProtKBEvidenceTag from '../components/protein-data-views/UniProtKBEvidenceTag';
import AddToBasketButton from '../../shared/components/action-buttons/AddToBasket';
import { RichText } from '../components/protein-data-views/FreeTextView';

import { getURLToJobWithData } from '../../app/config/urls';

import externalUrls from '../../shared/config/externalUrls';

import { JobTypes } from '../../tools/types/toolsJobTypes';

import styles from '../components/protein-data-views/styles/uniprotkb-features-view.module.scss';

// TODO: use getLabelAndTooltip?

type RenderArgs = {
  data: any;
  input: any;
  primaryAccession: string;
  showSourceColumn: boolean;
};

type FilterArgs = {
  data: any;
  input: any;
};

export type FeatureColumnConfiguration = {
  id: string;
  label: string;
  filter?: ({ data, input }: FilterArgs) => boolean;
  render: ({
    data,
    input,
    primaryAccession,
    showSourceColumn,
  }: RenderArgs) => ReactNode;
  optionAccessor?: (data: any) => any;
};

export const UniProtKBFeatureExtraContent = ({ data }) => (
  <td colSpan={6}>
    <Card>
      <strong>Sequence: </strong>
      {data.sequence}
    </Card>
  </td>
);

const uniProtKBFeatureColumnConfiguration: FeatureColumnConfiguration[] = [
  {
    id: 'type',
    label: 'Type',
    filter: ({ data, input }) => data.type === input,
    render: ({ data }) => data.type,
  },
  {
    id: 'id',
    label: 'ID',
    render: ({ data }) =>
      data.type === 'Natural variant' &&
      data.startModifier !== 'UNSURE' &&
      data.startModifier !== 'UNKNOWN' &&
      // Expasy links are only valid for SNPs (e.g. "R → G":)
      data.sequence?.length === 5 &&
      data.id ? (
        <ExternalLink
          url={externalUrls.UniProt(data.id)}
          title="View in Expasy"
          noIcon
        >
          {data.id}
        </ExternalLink>
      ) : (
        data.id
      ),
  },
  {
    id: 'position',
    label: 'Position(s)',
    render: ({ data }) => {
      const positionStart = `${data.startModifier === 'UNSURE' ? '?' : ''}${
        data.startModifier === 'UNKNOWN' ? '?' : data.start
      }`;
      const positionEnd = `${data.endModifier === 'UNSURE' ? '?' : ''}${
        data.endModifier === 'UNKNOWN' ? '?' : data.end
      }`;
      return positionStart === positionEnd
        ? positionStart
        : `${positionStart}${
            data.type === 'Disulfide bond' || data.type === 'Cross-link'
              ? '↔' // I guess this is convention?
              : '-'
          }${positionEnd}`;
    },
  },
  {
    id: 'source',
    label: 'Source',
    filter: ({ data, input }) => data.source === input,
    render: ({ data }) => data.source,
  },
  {
    id: 'description',
    label: 'Description',
    render: ({ data }) => (
      <>
        {typeof data.description === 'string' ? (
          <RichText>{data.description}</RichText>
        ) : (
          data.description
        )}
        {!!data.confidenceScore && (
          <span data-article-id="mod_res_large_scale#what-is-the-goldsilverbronze-criterion">
            <Chip
              className={`secondary ${styles[data.confidenceScore]}`}
              compact
            >
              {data.confidenceScore}
            </Chip>
          </span>
        )}
        {data.source === 'PTMeXchange' ? (
          <PtmExchangeEvidenceTag
            evidences={data.evidences}
            confidenceScore={data.confidenceScore}
          />
        ) : (
          <UniProtKBEvidenceTag evidences={data.evidences} />
        )}
      </>
    ),
  },
  {
    id: 'tools',
    // Intentionally left blank, corresponds to tools/basket
    label: '',
    render: ({ data }) =>
      data.end - data.start >= 2 &&
      data.type !== 'Disulfide bond' &&
      data.type !== 'Cross-link' && (
        <div className="button-group">
          <Button
            element="a"
            variant="tertiary"
            title="BLAST the sequence corresponding to this feature"
            href={getURLToJobWithData(JobTypes.BLAST, data.primaryAccession, {
              start: data.start,
              end: data.end,
            })}
            translate="no"
          >
            BLAST
          </Button>
          <AddToBasketButton
            selectedEntries={`${data.primaryAccession}[${data.start}-${data.end}]`}
          />
        </div>
      ),
  },
];

export default uniProtKBFeatureColumnConfiguration;
