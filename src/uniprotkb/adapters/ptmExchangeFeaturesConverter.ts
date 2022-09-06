import * as logging from '../../shared/utils/logging';
import { phosphorylate } from '../utils/aa';

import { ProteomicsPtmFeature, PTM } from '../types/proteomicsPtm';
import { Evidence } from '../types/modelTypes';
import {
  ConfidenceScore,
  FeatureDatum,
} from '../components/protein-data-views/UniProtKBFeaturesView';
import { EvidenceTagSourceTypes } from '../components/protein-data-views/UniProtKBEvidenceTag';

const convertPtmExchangePtms = (
  ptms: PTM[],
  aa: string,
  absolutePosition: number,
  evidenceCode: `ECO:${number}`
): FeatureDatum => {
  const evidences = [
    {
      evidenceCode,
      source: 'PeptideAtlas',
    },
    ...ptms.flatMap(({ dbReferences }) =>
      dbReferences?.flatMap(({ id, properties }): Evidence[] => [
        {
          evidenceCode,
          source: EvidenceTagSourceTypes.PUBMED,
          id: properties['Pubmed ID'],
        },
        {
          evidenceCode,
          source: 'PRIDE',
          id,
        },
      ])
    ),
  ];
  const confidenceScores = Array.from(
    new Set(
      ptms.flatMap(({ dbReferences }) =>
        dbReferences.map(({ properties }) => properties['Confidence score'])
      )
    )
  );
  let confidenceScore: ConfidenceScore = 'Bronze';
  if (!confidenceScores.length) {
    logging.error('PTMeXchange PTM has no confidence score');
  } else if (confidenceScores.length > 1) {
    logging.error(
      `PTMeXchange PTM has a mixture of confidence scores: ${confidenceScores}`
    );
  } else {
    [confidenceScore] = confidenceScores;
  }

  return {
    source: 'PTMeXchange',
    type: 'Modified residue (large scale)',
    location: {
      start: { value: absolutePosition, modifier: 'EXACT' },
      end: { value: absolutePosition, modifier: 'EXACT' },
    },
    description: phosphorylate(aa),
    confidenceScore,
    evidences,
  };
};

export const convertPtmExchangeFeatures = (
  features: ProteomicsPtmFeature[]
) => {
  const absolutePositionToPtms: Record<number, { ptms: PTM[]; aa: string }> =
    {};
  for (const feature of features) {
    for (const ptm of feature.ptms) {
      if (!ptm.sources?.includes('PTMeXchange')) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const absolutePosition = +feature.begin + ptm.position - 1;
      if (!Number.isFinite(absolutePosition)) {
        logging.error(
          `Encountered infinite number: +feature.begin + ptm.position - 1 = ${+feature.begin} + ${
            ptm.position
          } - 1`
        );
        // eslint-disable-next-line no-continue
        continue;
      }
      const aa = feature.peptide[ptm.position - 1];
      if (absolutePosition in absolutePositionToPtms) {
        if (absolutePositionToPtms[absolutePosition].aa !== aa) {
          logging.error(
            `One PTM has different amino acid values: [${absolutePositionToPtms[absolutePosition].aa}, ${aa}]`
          );
        } else {
          absolutePositionToPtms[absolutePosition].ptms.push(ptm);
        }
      } else {
        absolutePositionToPtms[absolutePosition] = { ptms: [ptm], aa };
      }
    }
  }

  // NOTE: we can expect the ECO code to be the same for all of the features
  const evidenceCode = features[0].evidences[0].code as `ECO:${number}`;

  return Object.entries(absolutePositionToPtms).map(
    ([absolutePosition, { ptms, aa }]) =>
      convertPtmExchangePtms(ptms, aa, +absolutePosition, evidenceCode)
  );
};
