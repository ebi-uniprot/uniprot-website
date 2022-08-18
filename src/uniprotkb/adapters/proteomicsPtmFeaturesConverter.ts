import { Chip } from 'franklin-sites';
import * as logging from '../../shared/utils/logging';
import { phosphorylate } from '../utils/aa';

import { ProteomicsPtmFeature } from '../types/proteomicsPtm';
import { Evidence } from '../types/modelTypes';
import { FeatureDatum } from '../components/protein-data-views/UniProtKBFeaturesView';

const convertProteomicsPtmFeature = (feature: ProteomicsPtmFeature) => {
  const evidenceCodes = [
    ...new Set(feature.evidences.map((evidence) => evidence.code)),
  ];
  if (evidenceCodes.length !== 1) {
    logging.error(
      `Encountered number of evidence codes !== 1: ${evidenceCodes}`
    );
  }
  const evidenceCode = evidenceCodes[0] as `ECO:${number}`;
  return feature.ptms
    .map((ptm): FeatureDatum | null => {
      const aa = feature.peptide[ptm.position - 1];
      const absoluteLocation = +feature.begin + ptm.position - 1;
      if (!Number.isFinite(absoluteLocation)) {
        logging.error(
          `Encountered infinite number: feature.begin + ptm.position - 1 = ${feature.begin} + ${ptm.position} - 1`
        );
        return null;
      }
      const evidences = ptm.dbReferences
        .map(({ properties }): Evidence | null => {
          if (!('Pubmed ID' in properties)) {
            logging.error(
              `Pubmed ID not present - unclear what the source is: ${JSON.stringify(
                properties
              )}`
            );
            return null;
          }
          return {
            evidenceCode,
            source: 'PubMed',
            id: properties['Pubmed ID'],
          };
        })
        .filter((evidence: Evidence | null): evidence is Evidence =>
          Boolean(evidence)
        );
      return {
        source: 'PTMeXchange',
        type: 'Modified residue (large scale)',
        location: {
          start: { value: absoluteLocation, modifier: 'EXACT' },
          end: { value: absoluteLocation, modifier: 'EXACT' },
        },
        description: phosphorylate(aa),
        confidenceScore: 'Beta', // TODO: update when API provides this
        evidences,
      };
    })
    .filter((ptm: FeatureDatum | null): ptm is FeatureDatum => Boolean(ptm));
};

export const convertProteomicsPtmFeatures = (
  features: ProteomicsPtmFeature[]
) => features.flatMap((feature) => convertProteomicsPtmFeature(feature));
