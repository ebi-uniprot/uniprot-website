import * as logging from '../../shared/utils/logging';
import { EvidenceTagSourceTypes } from '../components/protein-data-views/UniProtKBEvidenceTag';
import {
  ConfidenceScore,
  FeatureDatum,
  Modification,
} from '../components/protein-data-views/UniProtKBFeaturesView';
import { Evidence } from '../types/modelTypes';
import { ProteomicsPtmFeature, PTM } from '../types/proteomicsPtm';
import { acetylate, phosphorylate, sumoylate, ubiquitinate } from '../utils/aa';

const getDescription = (modification: Modification, aa: string) => {
  switch (modification) {
    case 'Phosphorylation':
      return phosphorylate(aa);
    case 'SUMOylation':
      return sumoylate(aa);
    case 'Ubiquitinylation':
      return ubiquitinate(aa);
    case 'Acetylation':
      return acetylate(aa);
    default:
      return '';
  }
};

const convertPtmExchangePtms = (
  ptms: PTM[],
  aa: string,
  absolutePosition: number,
  evidenceCode: `ECO:${number}`
): FeatureDatum[] => {
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
          id: id === 'Glue project' ? 'PXD012174' : id, // Glue project dataset is quite old and the 'PXD' ID is provided by PRIDE themselves
        },
      ])
    ),
  ];

  const groupPtmsByModification: Record<string, PTM[]> = {};
  for (const ptm of ptms) {
    if (groupPtmsByModification[ptm.name]) {
      groupPtmsByModification[ptm.name].push(ptm);
    } else {
      groupPtmsByModification[ptm.name] = [ptm];
    }
  }

  return Object.entries(groupPtmsByModification).map(([key, value]) => {
    const confidenceScores = new Set(
      value.flatMap(({ dbReferences }) =>
        dbReferences?.map(({ properties }) => properties['Confidence score'])
      )
    );
    let confidenceScore: ConfidenceScore | undefined;
    if (confidenceScores.size) {
      if (confidenceScores.size > 1) {
        logging.error(
          `PTMeXchange PTM has a mixture of confidence scores: ${Array.from(
            confidenceScores
          )}`
        );
      } else {
        [confidenceScore] = confidenceScores;
      }
    }

    const sources = value.flatMap(({ sources }) =>
      sources?.map((source) => source)
    );
    const [source] = sources || [''];

    return {
      source,
      type: 'Modified residue (large scale data)',
      location: {
        start: { value: absolutePosition, modifier: 'EXACT' },
        end: { value: absolutePosition, modifier: 'EXACT' },
      },
      description: getDescription(key as Modification, aa),
      confidenceScore: confidenceScore,
      evidences,
    };
  });
};

export const convertPtmExchangeFeatures = (
  features: ProteomicsPtmFeature[]
) => {
  const absolutePositionToPtms: Record<number, { ptms: PTM[]; aa: string }> =
    {};
  for (const feature of features) {
    for (const ptm of feature.ptms) {
      const absolutePosition = +feature.begin + ptm.position - 1;
      if (!Number.isFinite(absolutePosition)) {
        logging.error(
          `Encountered infinite number: +feature.begin + ptm.position - 1 = ${+feature.begin} + ${
            ptm.position
          } - 1`
        );

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

  return Object.entries(absolutePositionToPtms)
    .map(([absolutePosition, { ptms, aa }]) =>
      convertPtmExchangePtms(ptms, aa, +absolutePosition, evidenceCode)
    )
    .flat();
};
