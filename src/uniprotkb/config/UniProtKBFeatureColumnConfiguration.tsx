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

// type UniProtKBFeatureColumn =
//   | 'type'
//   | 'accession'
//   | 'position'
//   | 'source'
//   | 'description'
//   | 'tools';

// TODO: use getLabelAndTooltip?

type RenderArgs = {
  datum: any;
  input: any;
  primaryAccession: string;
  showSourceColumn: boolean;
};

type LabelArgs = {
  showSourceColumn: boolean;
};

type FilterArgs = {
  datum: any;
  input: any;
};

export type FeatureColumnConfiguration = {
  id: string;
  label: string;
  filter?: ({ datum, input }: FilterArgs) => boolean;
  render: ({
    datum,
    input,
    primaryAccession,
    showSourceColumn,
  }: RenderArgs) => ReactNode;
  optionAccessor?: (datum: any) => any;
};

export const UniProtKBFeatureExtraContent = ({ datum }) => (
  <td colSpan={6}>
    <Card>
      <strong>Sequence: </strong>
      {datum.sequence}
    </Card>
  </td>
);

const uniProtKBFeatureColumnConfiguration: FeatureColumnConfiguration[] = [
  {
    id: 'type',
    label: 'Type',
    filter: ({ datum, input }) => datum.type === input,
    render: ({ datum }) => datum.type,
    optionAccessor: ({ datum }) => datum.type,
  },
  {
    id: 'accession',
    label: 'ID',
    render: ({ datum, position, positionStart }) =>
      datum.type === 'Natural variant' &&
      position === positionStart &&
      // Expasy links are only valid for SNPs (e.g. "R → G":)
      datum.sequence?.length === 5 &&
      datum.accession ? (
        <ExternalLink
          url={externalUrls.UniProt(datum.accession)}
          title="View in Expasy"
          noIcon
        >
          {datum.accession}
        </ExternalLink>
      ) : (
        // datum.accession // TODO: fix this
        ''
      ),
  },
  {
    id: 'position',
    label: 'Position(s)',
    render: ({ datum }) => {
      const positionStart = `${datum.startModifier === 'UNSURE' ? '?' : ''}${
        datum.startModifier === 'UNKNOWN' ? '?' : datum.start
      }`;
      const positionEnd = `${datum.endModifier === 'UNSURE' ? '?' : ''}${
        datum.endModifier === 'UNKNOWN' ? '?' : datum.end
      }`;
      return positionStart === positionEnd
        ? positionStart
        : `${positionStart}${
            datum.type === 'Disulfide bond' || datum.type === 'Cross-link'
              ? '↔'
              : '-'
          }${positionEnd}`;
    },
  },
  {
    id: 'source',
    label: 'Source',
    render: ({ datum }) => datum.source,
  },
  {
    id: 'description',
    label: 'Description',
    render: ({ datum }) => (
      <>
        {typeof datum.description === 'string' ? (
          <RichText>{datum.description}</RichText>
        ) : (
          datum.description
        )}
        {!!datum.confidenceScore && (
          <span data-article-id="mod_res_large_scale#what-is-the-goldsilverbronze-criterion">
            <Chip
              className={`secondary ${styles[datum.confidenceScore]}`}
              compact
            >
              {datum.confidenceScore}
            </Chip>
          </span>
        )}
        {datum.source === 'PTMeXchange' ? (
          <PtmExchangeEvidenceTag
            evidences={datum.evidences}
            confidenceScore={datum.confidenceScore}
          />
        ) : (
          <UniProtKBEvidenceTag evidences={datum.evidences} />
        )}
      </>
    ),
  },
  {
    id: 'tools',
    // Intentionally left blank, corresponds to tools/basket
    label: '',
    render: ({ datum }) =>
      datum.end - datum.start >= 2 &&
      datum.type !== 'Disulfide bond' &&
      datum.type !== 'Cross-link' && (
        <div className="button-group">
          <Button
            element="a"
            variant="tertiary"
            title="BLAST the sequence corresponding to this feature"
            href={getURLToJobWithData(JobTypes.BLAST, datum.primaryAccession, {
              start: datum.start,
              end: datum.end,
            })}
            translate="no"
          >
            BLAST
          </Button>
          <AddToBasketButton
            selectedEntries={`${datum.primaryAccession}[${datum.start}-${datum.end}]`}
          />
        </div>
      ),
  },
];

export default uniProtKBFeatureColumnConfiguration;
