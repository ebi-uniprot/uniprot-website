import * as logging from '../../shared/utils/logging';
import { phosphorylate } from '../utils/aa';

import { ProteomicsPtmFeature, PTM } from '../types/proteomicsPtm';
import { Evidence } from '../types/modelTypes';
import { FeatureDatum } from '../components/protein-data-views/UniProtKBFeaturesView';

const convertProteomicsPtms = (
  ptms: PTM[],
  aa: string,
  absolutePosition: number,
  evidenceCode: `ECO:${number}`
): FeatureDatum => {
  // TODO: figure out when we have non PTM-exchange data
  const evidences = [
    {
      evidenceCode,
      source: 'PeptideAtlas',
    },
    ...ptms.flatMap(({ dbReferences }) =>
      dbReferences?.flatMap(({ id, properties }): Evidence[] => [
        {
          evidenceCode,
          source: 'PubMedFoo',
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
  return {
    source: 'PTMeXchange',
    type: 'Modified residue (large scale)',
    location: {
      start: { value: absolutePosition, modifier: 'EXACT' },
      end: { value: absolutePosition, modifier: 'EXACT' },
    },
    description: phosphorylate(aa),
    confidenceScore: 'Beta', // TODO: update when API provides this
    evidences,
  };
};

export const convertProteomicsPtmFeatures = (
  features: ProteomicsPtmFeature[]
) => {
  const absolutePositionToPtms: Record<number, { ptms: PTM[]; aa: string }> =
    {};
  // TODO: get the shortest evidence.source.url
  for (const feature of features) {
    for (const ptm of feature.ptms) {
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
        absolutePositionToPtms[absolutePosition].ptms.push(ptm);
        if (absolutePositionToPtms[absolutePosition].aa !== aa) {
          logging.error(
            `One PTM has different amino acid values: [${absolutePositionToPtms[absolutePosition].aa}, ${aa}]`
          );
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
      convertProteomicsPtms(ptms, aa, +absolutePosition, evidenceCode)
  );
};
