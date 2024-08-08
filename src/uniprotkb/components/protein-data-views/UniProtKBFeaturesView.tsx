import { useMemo, ReactNode } from 'react';
import { v1 } from 'uuid';
import { Button, Card, Chip } from 'franklin-sites';

import UniProtKBEvidenceTag from './UniProtKBEvidenceTag';
import FeaturesView, {
  LocationModifier,
  ProcessedFeature,
} from '../../../shared/components/views/FeaturesView';
import { RichText } from './FreeTextView';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import LigandDescriptionView, {
  Ligand,
  LigandPart,
} from './LigandDescriptionView';
import ExternalLink from '../../../shared/components/ExternalLink';
import Table from '../../../shared/components/table/Table';

import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';

import listFormat from '../../../shared/utils/listFormat';
import { getURLToJobWithData } from '../../../app/config/urls';
import { stringToID } from '../../utils';
import externalUrls from '../../../shared/config/externalUrls';

import { Evidence } from '../../types/modelTypes';
import FeatureType from '../../types/featureType';
import { Xref } from '../../../shared/types/apiModel';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import PtmExchangeEvidenceTag from './PtmExchangeEvidenceTag';

import styles from './styles/uniprotkb-features-view.module.scss';

type FeatureLocation = {
  value: number;
  modifier: LocationModifier;
};

export type ConfidenceScore = 'Gold' | 'Silver' | 'Bronze';

export type FeatureDatum = {
  type: FeatureType;
  featureId?: string;
  description?: string; // Sometimes you do have an empty string though
  location: {
    start: FeatureLocation;
    end: FeatureLocation;
    sequence?: string;
  };
  // 🤷 originalSequence within alternativeSequence...
  alternativeSequence?: {
    originalSequence?: string;
    alternativeSequences?: string[];
  };
  evidences?: Evidence[];
  featureCrossReferences?: Xref[];
  ligand?: Ligand;
  ligandPart?: LigandPart;
  source?: string;
  confidenceScore?: ConfidenceScore;
};

type UniProtKBFeaturesViewProps = {
  primaryAccession: string;
  sequence?: string;
  features: FeatureDatum[];
  inResultsTable?: boolean;
  showSourceColumn?: boolean;
};

type FeatureRowProps = {
  isOdd: boolean;
  feature: ProcessedFeature;
  primaryAccession: string;
  smallScreen: boolean;
  inResultsTable?: boolean;
  showSourceColumn?: boolean;
};

export const processFeaturesData = (
  data: FeatureDatum[],
  sequence?: string,
  includeSource?: boolean
): ProcessedFeature[] =>
  data.map((feature): ProcessedFeature => {
    let s: string | undefined;
    let description: ReactNode = feature.description || '';
    if (feature.alternativeSequence) {
      if (
        feature.alternativeSequence.originalSequence &&
        feature.alternativeSequence.alternativeSequences
      ) {
        s = feature.alternativeSequence.originalSequence;
        if (feature.alternativeSequence.alternativeSequences?.length) {
          s += ` → ${feature.alternativeSequence.alternativeSequences
            .map(
              (alternative, index, array) =>
                `${listFormat(index, array, 'or')}${alternative}`
            )
            .join('')}`;
        }
      } else {
        s = 'Missing';
      }
    } else {
      s = sequence?.substring(
        feature.location.start.value - 1,
        feature.location.end.value
      );
    }
    if (feature.location.sequence) {
      description = `In isoform ${feature.location.sequence}; ${description}`;
    }

    if (feature.ligand) {
      description = (
        <LigandDescriptionView
          ligand={feature.ligand}
          ligandPart={feature.ligandPart}
          description={description}
        />
      );
    }

    return {
      accession: feature.featureId || v1().toString(),
      start: feature.location.start.value,
      end: feature.location.end.value,
      startModifier: feature.location.start.modifier,
      endModifier: feature.location.end.modifier,
      type: feature.type,
      description,
      evidences: feature.evidences,
      sequence: s,
      source: includeSource ? feature.source || 'UniProt' : undefined,
      confidenceScore: feature.confidenceScore,
      ligand: feature.ligand,
      ligandPart: feature.ligandPart,
      ligandDescription: feature.description,
    };
  });

const FeatureRow = ({
  isOdd,
  feature,
  smallScreen,
  primaryAccession,
  inResultsTable,
  showSourceColumn,
}: FeatureRowProps) => {
  const start = feature.startModifier === 'UNKNOWN' ? '?' : feature.start;
  const end = feature.endModifier === 'UNKNOWN' ? '?' : feature.end;
  const positionStart = `${
    feature.startModifier === 'UNSURE' ? '?' : ''
  }${start}`;
  const positionEnd = `${feature.endModifier === 'UNSURE' ? '?' : ''}${end}`;
  // feature of type Disulfide bonds and Cross-links describe links, not subsequences.
  const isLink =
    feature.type === 'Disulfide bond' || feature.type === 'Cross-link';

  const position =
    positionStart === positionEnd
      ? positionStart
      : `${positionStart}${isLink ? '↔' : '-'}${positionEnd}`;

  const description =
    typeof feature.description === 'string' ? (
      <RichText>{feature.description}</RichText>
    ) : (
      feature.description
    );

  const extraContent = (
    <td colSpan={5}>
      <Card>
        <strong>Sequence: </strong>
        {feature.sequence}
      </Card>
    </td>
  );
  return (
    <Table.Row
      isOdd={isOdd}
      data-id={feature.accession}
      data-start={feature.start}
      data-end={feature.end}
      extraContent={extraContent}
    >
      {inResultsTable ? (
        <td>{feature.type}</td>
      ) : (
        <td data-filter="type" data-filter-value={feature.type}>
          {feature.type}
        </td>
      )}
      <td id={feature.accession}>
        {feature.type === 'Natural variant' &&
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
        )}
      </td>
      <td>{position}</td>
      {showSourceColumn && (
        <td data-filter="source" data-filter-value={feature.source}>
          {feature.source}
        </td>
      )}
      <td
        id={
          feature.accession?.startsWith('PRO') &&
          typeof feature.description === 'string'
            ? stringToID(feature.description)
            : `description${position}`
        }
      >
        {description}
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
      </td>
      {smallScreen ? null : (
        <td>
          {feature.end - feature.start >= 2 &&
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
            )}
        </td>
      )}
    </Table.Row>
  );
};

const UniProtKBFeaturesView = ({
  primaryAccession,
  sequence,
  features,
  inResultsTable,
  showSourceColumn = false,
}: UniProtKBFeaturesViewProps) => {
  const processedData = useMemo(
    () => processFeaturesData(features, sequence, showSourceColumn),
    [features, sequence, showSourceColumn]
  );

  const smallScreen = useSmallScreen();

  if (processedData.length === 0) {
    return null;
  }

  processedData.sort((a, b) =>
    a.start === b.start ? a.end - b.end : a.start - b.start
  );

  const table = (
    <Table className={styles.features}>
      <Table.Head toggleAll>
        {inResultsTable ? <th>Type</th> : <th data-filter="type">Type</th>}
        <th>ID</th>
        <th>Position(s)</th>
        {showSourceColumn && <th data-filter="source">Source</th>}
        <th>Description</th>
        {smallScreen ? null : (
          <th>{/* Intentionally left blank, corresponds to tools/basket */}</th>
        )}
      </Table.Head>
      <Table.Body>
        {processedData.map((feature: ProcessedFeature, index) => (
          <FeatureRow
            isOdd={!(index % 2)}
            primaryAccession={primaryAccession}
            feature={feature}
            smallScreen={smallScreen}
            inResultsTable={inResultsTable}
          />
        ))}
      </Table.Body>
    </Table>
  );

  return (
    <FeaturesView
      features={processedData}
      sequence={sequence}
      table={table}
      withTitle={!inResultsTable}
    />
  );
};

export default UniProtKBFeaturesView;
