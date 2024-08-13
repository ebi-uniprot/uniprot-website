import { ReactNode } from 'react';
import { Button, Chip, ExternalLink } from 'franklin-sites';

import PtmExchangeEvidenceTag from '../components/protein-data-views/PtmExchangeEvidenceTag';
import UniProtKBEvidenceTag from '../components/protein-data-views/UniProtKBEvidenceTag';
import AddToBasketButton from '../../shared/components/action-buttons/AddToBasket';
import { RichText } from '../components/protein-data-views/FreeTextView';

import { getURLToJobWithData } from '../../app/config/urls';

import externalUrls from '../../shared/config/externalUrls';

import { JobTypes } from '../../tools/types/toolsJobTypes';

import styles from '../components/protein-data-views/styles/uniprotkb-features-view.module.scss';

type UniProtKBFeatureColumn =
  | 'type'
  | 'accession'
  | 'position'
  | 'source'
  | 'description'
  | 'tools';

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

export type FeatureColumnConfiguration = Map<
  UniProtKBFeatureColumn,
  {
    label: string | (({ showSourceColumn }: LabelArgs) => ReactNode);
    filter?: ({ datum, input }: FilterArgs) => boolean;
    render: ({
      datum,
      input,
      primaryAccession,
      showSourceColumn,
    }: RenderArgs) => ReactNode;
    optionAccessor?: (datum: any) => any;
  }
>;

const uniProtKBFeatureColumnConfiguration: FeatureColumnConfiguration = new Map(
  [
    [
      'type',
      {
        label: 'Type',
        filter: ({ datum, input }) => datum.type === input,
        render: ({ datum }) => datum.type,
        optionAccessor: ({ datum }) => datum.type,
      },
    ],
    [
      'accession',
      {
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
            datum.accession
          ),
      },
    ],
    [
      'position',
      {
        label: 'Position(s)',
        render: ({ position }) => position,
      },
    ],
    [
      'source',
      {
        label: ({ showSourceColumn }) => showSourceColumn && 'Source',
        render: ({ datum, showSourceColumn }) =>
          showSourceColumn && datum.source,
      },
    ],
    [
      'description',
      {
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
    ],
    [
      'tools',
      {
        // Intentionally left blank, corresponds to tools/basket
        label: (smallScreen) => (smallScreen ? null : ''),
        render: ({ datum, primaryAccession }) =>
          datum.end - datum.start >= 2 &&
          datum.type !== 'Disulfide bond' &&
          datum.type !== 'Cross-link' && (
            <div className="button-group">
              <Button
                element="a"
                variant="tertiary"
                title="BLAST the sequence corresponding to this feature"
                href={getURLToJobWithData(JobTypes.BLAST, primaryAccession, {
                  start: datum.start,
                  end: datum.end,
                })}
                translate="no"
              >
                BLAST
              </Button>
              <AddToBasketButton
                selectedEntries={`${primaryAccession}[${datum.start}-${datum.end}]`}
              />
            </div>
          ),
      },
    ],
  ]
);

export default uniProtKBFeatureColumnConfiguration;
