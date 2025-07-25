import { Card, Chip } from 'franklin-sites';

import AddToBasketButton from '../../shared/components/action-buttons/AddToBasket';
import CopyButton from '../../shared/components/action-buttons/Copy';
import ToolsDropdown from '../../shared/components/action-buttons/ToolsDropdown';
import ExternalLink from '../../shared/components/ExternalLink';
import {
  FeatureColumnConfiguration,
  ProcessedFeature,
} from '../../shared/components/views/FeaturesView';
import externalUrls from '../../shared/config/externalUrls';
import { RichText } from '../components/protein-data-views/FreeTextView';
import PtmExchangeEvidenceTag from '../components/protein-data-views/PtmExchangeEvidenceTag';
import UniProtKBEvidenceTag from '../components/protein-data-views/UniProtKBEvidenceTag';
import styles from './styles/uniprotkb-feature-column-configuration.module.scss';

// TODO: use getLabelAndTooltip?

export const UniProtKBFeatureExtraContent = (data: ProcessedFeature) => (
  <Card className={styles.sequence}>
    <strong>Sequence: </strong>
    {data.sequence}
  </Card>
);

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
      render: (data) => {
        if (!data.id) {
          return null;
        }
        if (
          data.type === 'Natural variant' &&
          data.startModifier !== 'UNSURE' &&
          data.startModifier !== 'UNKNOWN' &&
          // Expasy links are only valid for SNPs (e.g. "R → G":)
          data.sequence?.length === 5
        ) {
          return (
            <ExternalLink
              url={externalUrls.UniProt(data.id)}
              title="View in Expasy"
              noIcon
              id={data.id}
            >
              {data.id}
            </ExternalLink>
          );
        }
        return <span id={data.id}>{data.id}</span>;
      },
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
        data.primaryAccession &&
        data.end - data.start >= 2 &&
        data.type !== 'Disulfide bond' &&
        data.type !== 'Cross-link' && (
          <div className="button-group">
            <ToolsDropdown
              selectedEntries={[
                `${data.primaryAccession}[${data.start}-${data.end}]`,
              ]}
              blast
            >
              {(closeDropdown: () => unknown) => (
                <li>
                  <CopyButton
                    textToCopy={data.sequence}
                    postCopy={closeDropdown}
                  >
                    Copy sequence
                  </CopyButton>
                </li>
              )}
            </ToolsDropdown>

            <AddToBasketButton
              selectedEntries={`${data.primaryAccession}[${data.start}-${data.end}]`}
            />
          </div>
        ),
    },
  ];
