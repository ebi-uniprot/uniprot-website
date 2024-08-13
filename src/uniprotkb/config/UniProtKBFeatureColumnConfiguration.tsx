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
  feature: any;
  input: any;
  primaryAccession: string;
  showSourceColumn: boolean;
};

type LabelArgs = {
  showSourceColumn: boolean;
};

type FilterArgs = {
  feature: any;
  input: any;
};

export type FeatureColumnConfiguration = Map<
  UniProtKBFeatureColumn,
  {
    label: string | (({ showSourceColumn }: LabelArgs) => ReactNode);
    filter?: ({ feature, input }: FilterArgs) => boolean;
    render: ({
      feature,
      input,
      primaryAccession,
      showSourceColumn,
    }: RenderArgs) => ReactNode;
    userFilter?: boolean;
  }
>;

const uniProtKBFeatureColumnConfiguration: FeatureColumnConfiguration = new Map(
  [
    [
      'type',
      {
        label: 'Type',
        filter: ({ feature, input }) => feature.type === input,
        render: ({ feature }) => feature.type,
        userFilter: true,
      },
    ],
    [
      'accession',
      {
        label: 'ID',
        render: ({ feature, position, positionStart }) =>
          feature.type === 'Natural variant' &&
          position === positionStart &&
          // Expasy links are only valid for SNPs (e.g. "R → G":)
          feature.sequence?.length === 5 &&
          feature.accession ? (
            <ExternalLink
              url={externalUrls.UniProt(feature.accession)}
              title="View in Expasy"
              noIcon
            >
              {feature.accession}
            </ExternalLink>
          ) : (
            feature.accession
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
        render: ({ feature, showSourceColumn }) =>
          showSourceColumn && feature.source,
      },
    ],
    [
      'description',
      {
        label: 'Description',
        render: ({ feature }) => (
          <>
            {typeof feature.description === 'string' ? (
              <RichText>{feature.description}</RichText>
            ) : (
              feature.description
            )}
            {!!feature.confidenceScore && (
              <span data-article-id="mod_res_large_scale#what-is-the-goldsilverbronze-criterion">
                <Chip
                  className={`secondary ${styles[feature.confidenceScore]}`}
                  compact
                >
                  {feature.confidenceScore}
                </Chip>
              </span>
            )}
            {feature.source === 'PTMeXchange' ? (
              <PtmExchangeEvidenceTag
                evidences={feature.evidences}
                confidenceScore={feature.confidenceScore}
              />
            ) : (
              <UniProtKBEvidenceTag evidences={feature.evidences} />
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
        render: ({ feature, primaryAccession }) =>
          feature.end - feature.start >= 2 &&
          feature.type !== 'Disulfide bond' &&
          feature.type !== 'Cross-link' && (
            <div className="button-group">
              <Button
                element="a"
                variant="tertiary"
                title="BLAST the sequence corresponding to this feature"
                href={getURLToJobWithData(JobTypes.BLAST, primaryAccession, {
                  start: feature.start,
                  end: feature.end,
                })}
                translate="no"
              >
                BLAST
              </Button>
              <AddToBasketButton
                selectedEntries={`${primaryAccession}[${feature.start}-${feature.end}]`}
              />
            </div>
          ),
      },
    ],
  ]
);

export default uniProtKBFeatureColumnConfiguration;
