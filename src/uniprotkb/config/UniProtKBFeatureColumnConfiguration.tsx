import { Button, Card, Chip, ExternalLink } from 'franklin-sites';

import PtmExchangeEvidenceTag from '../components/protein-data-views/PtmExchangeEvidenceTag';
import UniProtKBEvidenceTag from '../components/protein-data-views/UniProtKBEvidenceTag';
import AddToBasketButton from '../../shared/components/action-buttons/AddToBasket';
import { RichText } from '../components/protein-data-views/FreeTextView';

import { getURLToJobWithData } from '../../app/config/urls';

import externalUrls from '../../shared/config/externalUrls';

import { JobTypes } from '../../tools/types/toolsJobTypes';
import {
  FeatureColumnConfiguration,
  ProcessedFeature,
} from '../../shared/components/views/FeaturesView';

import styles from './styles/uniprotkb-feature-column-configuration.module.scss';
import {
  NightingaleViewRange,
  withinRange,
} from '../../shared/utils/nightingale';

// TODO: use getLabelAndTooltip?

export const UniProtKBFeatureExtraContent = (data: ProcessedFeature) => (
  <td colSpan={6}>
    <Card className={styles.sequence}>
      <strong>Sequence: </strong>
      {data.sequence}
    </Card>
  </td>
);

export const getRowId = (data?: ProcessedFeature) => data?.accession;

export const markBackground = (markedData: ProcessedFeature) => {
  const markedId = getRowId(markedData);
  return markedId === 'undefined'
    ? null
    : (data: ProcessedFeature) => {
        const rowId = getRowId(data);
        return Boolean(rowId && rowId === markedId);
      };
};

export const markBorder =
  (nightingaleViewRange: NightingaleViewRange) => (datum: ProcessedFeature) =>
    withinRange(datum.start, datum.end, nightingaleViewRange);

export const columnConfiguration: FeatureColumnConfiguration<ProcessedFeature>[] =
  [
    {
      id: 'type',
      label: 'Type',
      filter: (data, input) => data.type === input,
      render: (data) => data.type,
    },
    {
      id: 'id',
      label: 'ID',
      render: (data) =>
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
      render: (data) => {
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
                ? // The reason for the ↔: This is for links or bounds, it's basically because the
                  // important parts for these are really the areas at the start and at the end,
                  // not the bit in between. For a domain the whole sequence is important, but here's
                  // that's not the case thinking in 3d, it would be for example a bit of the
                  // structure when the sequence folds on itself and touches/binds, start and end
                  // would be the coordinates of the 2 parts of the sequence that touch
                  '↔'
                : '-'
            }${positionEnd}`;
      },
    },
    {
      id: 'source',
      label: 'Source',
      filter: (data, input) => data.source === input,
      render: (data) => data.source,
    },
    {
      id: 'description',
      label: 'Description',
      render: (data) => (
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
      render: (data) =>
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
