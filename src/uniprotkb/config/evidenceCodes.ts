import { pluralise } from '../../shared/utils/utils';
import * as logging from '../../shared/utils/logging';

import { Evidence, GoEvidenceType } from '../types/modelTypes';

export const ecoCode = {
  EXP: 269,
  HTP: 6056,
  IDA: 314,
  HDA: 7005,
  IPI: 353,
  IMP: 315,
  HMP: 7001,
  IGI: 316,
  HGI: 7003,
  IEP: 270,
  HEP: 7007,
  ISS: 250,
  ISO: 266,
  ISA: 247,
  ISM: 255,
  IGC: 317,
  IBA: 318,
  IBD: 319,
  IKR: 320,
  IRD: 321,
  RCA: 245,
  TAS: 304,
  NAS: 303,
  IC: 305,
  ND: 307,
  IEA: 7669,
  MI: 312,
  AI: 313,
  AA: 256,
  PNLM: 8006,
  MIXM: 7744,
  MIXA: 7829,
  SGNM: 260,
  SGNA: 259,
};

export type EcoCode = keyof typeof ecoCode;

export enum labels {
  IMPORTED = 'Imported',
  COMBINED = 'Combined sources',
  INTERPRO = 'InterPro annotation',
  SIMILARITY = 'By similarity',
  CURATED = 'Curated',
  PUBLICATION = 'publication',
  AA = 'automatic annotation',
  SEQ_ANA = 'Sequence analysis',
  UNIRULE_ANA = 'UniRule annotation', // HAMAP-Rule (taken from Legacy as reference)
  PROSITE_RULE = 'PROSITE-ProRule annotation',
}

const publicationCountRenderer = (evidences: Evidence[]) => {
  const { length } = evidences;
  return length > 0
    ? `${length} ${pluralise(labels.PUBLICATION, length)}`
    : labels.CURATED;
};

const isSAMEvidence = (evidences: Evidence[]) =>
  evidences.some(
    (evidence) =>
      typeof evidence.source !== 'undefined' && evidence.source === 'SAM'
  );

const manualevidenceTagLabeler = (evidences: Evidence[]) => {
  let label = labels.SEQ_ANA;
  for (const evidence of evidences) {
    const { source } = evidence;
    if (source === 'PROSITE-ProRule') {
      label = labels.PROSITE_RULE;
    } else if (source === 'HAMAP-Rule') {
      label = labels.UNIRULE_ANA;
    }
  }
  return label;
};

const ecoCodeToData = {
  [ecoCode.EXP]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from experiment',
    evidenceTagLabel: publicationCountRenderer,
  },
  [ecoCode.HTP]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from high throughput experiment',
  },
  [ecoCode.IDA]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from direct assay',
  },
  [ecoCode.HDA]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO:
      'Inferred from high throughput direct assay',
  },
  [ecoCode.IPI]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from physical interaction',
  },
  [ecoCode.IMP]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from mutant phenotype',
  },
  [ecoCode.HMP]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO:
      'Inferred from high throughput mutant phenotype',
  },
  [ecoCode.IGI]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from genetic interaction',
  },
  [ecoCode.HGI]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO:
      'Inferred from high throughput genetic interaction',
  },
  [ecoCode.IEP]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from expression pattern',
  },
  [ecoCode.HEP]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO:
      'Inferred from high throughput expression pattern',
  },
  [ecoCode.ISS]: {
    manual: true,
    evidenceTagContentHeading: () =>
      'Manual assertion inferred from sequence similarity',
    evidenceTagContentHeadingForGO:
      'Inferred from sequence or structural similarity',
    evidenceTagLabel: () => labels.SIMILARITY,
  },
  [ecoCode.ISO]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from sequence orthology',
  },
  [ecoCode.ISA]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from sequence alignment',
  },
  [ecoCode.ISM]: {
    manual: true,
    evidenceTagContentHeading: (evidences: Evidence[]) =>
      evidences.some((evidence) => evidence.source)
        ? 'Manual assertion according to rules'
        : 'Manual assertion according to sequence analysis',
    evidenceTagContentHeadingForGO: 'Inferred from sequence model',
    evidenceTagLabel: manualevidenceTagLabeler,
  },
  [ecoCode.IGC]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from genomic context',
  },
  [ecoCode.IBA]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO:
      'Inferred from biological aspect of ancestor',
  },
  [ecoCode.IBD]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO:
      'Inferred from biological aspect of descendant',
  },
  [ecoCode.IKR]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from key residues',
  },
  [ecoCode.IRD]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from rapid divergence',
  },
  [ecoCode.RCA]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO:
      'Inferred from reviewed computational analysis',
  },
  [ecoCode.TAS]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Traceable author statement',
  },
  [ecoCode.NAS]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on opinion',
    evidenceTagContentHeadingForGO: 'Non-traceable author statement',
    evidenceTagLabel: publicationCountRenderer,
  },
  [ecoCode.IC]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion inferred by curator',
    evidenceTagContentHeadingForGO: 'Inferred by curator',
    evidenceTagLabel: (evidences: Evidence[]) =>
      evidences.some((evidence) => evidence.source)
        ? publicationCountRenderer(evidences)
        : 'Curated',
  },
  [ecoCode.ND]: {
    manual: true,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'No biological data available',
  },
  [ecoCode.IEA]: {
    manual: false,
    evidenceTagContentHeading: () => 'Manual assertion based on experiment',
    evidenceTagContentHeadingForGO: 'Inferred from electronic annotation',
  },
  [ecoCode.MI]: {
    manual: true,
    evidenceTagContentHeading: () =>
      'Manual assertion inferred from database entries',
    evidenceTagContentHeadingForGO: 'Manually imported',
    evidenceTagLabel: () => labels.IMPORTED,
  },
  [ecoCode.AI]: {
    manual: false,
    evidenceTagContentHeading: () =>
      'Automatic assertion inferred from database entries',
    evidenceTagContentHeadingForGO: 'Automatically imported',
    evidenceTagLabel: () => labels.IMPORTED,
  },
  [ecoCode.AA]: {
    manual: false,
    evidenceTagContentHeading: (evidences: Evidence[]) => {
      if (isSAMEvidence(evidences)) {
        /**
         * Sequence Analysis Methods (SAM) evidences should be labeled as
         * 'Sequence analysis' with AA flag.
         * For more info - https://www.uniprot.org/help/sam
         */
        return 'Automatic assertion according to sequence analysis';
      }
      return 'Automatic assertion according to rules';
    },
    evidenceTagContentHeadingForGO:
      'Automatically inferred from sequence model',
    evidenceTagLabel: () => labels.AA,
  },
  [ecoCode.PNLM]: {
    manual: false,
    evidenceTagContentHeading: () =>
      'Deep learning method evidence used in automatic assertion',
    evidenceTagContentHeadingForGO:
      'Automatically inferred from sequence model',
    evidenceTagLabel: () => labels.AA,
  },
  [ecoCode.MIXM]: {
    manual: true,
    evidenceTagContentHeading: () =>
      'Manual assertion inferred from combination of experimental and computational evidence',
    evidenceTagContentHeadingForGO:
      'Combinatorial evidence used in manual assertion',
    evidenceTagLabel: () => labels.COMBINED,
  },
  [ecoCode.MIXA]: {
    manual: false,
    evidenceTagContentHeading: () =>
      'Automatic assertion inferred from combination of experimental and computational evidence',
    evidenceTagContentHeadingForGO:
      'Combinatorial evidence used in automatic assertion',
    evidenceTagLabel: () => labels.COMBINED,
  },
  [ecoCode.SGNM]: {
    manual: true,
    evidenceTagContentHeading: () =>
      'Manual assertion inferred from signature match',
    evidenceTagContentHeadingForGO:
      'Match to InterPro member signature evidence used in manual assertion',
  },
  [ecoCode.SGNA]: {
    manual: false,
    evidenceTagContentHeading: () =>
      'Automatic assertion inferred from signature match',
    evidenceTagContentHeadingForGO:
      'Match to InterPro member signature evidence used in automatic assertion',
    evidenceTagLabel: () => labels.INTERPRO,
  },
};

export type EvidenceData = {
  manual: boolean;
  evidenceTagContentHeading: (evidences: Evidence[]) => string;
  evidenceTagContentHeadingForGO: string;
  evidenceTagLabel?: (evidences: Evidence[]) => string;
};

export const getEcoNumberFromString = (eco: string) => {
  // eg ECO:0000001
  const tokens = eco.split(':');
  /* istanbul ignore if */
  if (tokens.length !== 2) {
    logging.warn(`Ill-formed eco code string: ${eco}`);
    return null;
  }
  return Number(tokens[1]);
};

export const getEcoNumberFromGoEvidenceType = (
  goEvidenceType: GoEvidenceType
) => {
  // eg IMP:ARUK-UCL
  const tokens = goEvidenceType.split(':');
  /* istanbul ignore if */
  if (tokens.length !== 2) {
    logging.warn(`Ill-formed GoEvidenceType: ${goEvidenceType}`);
    return null;
  }
  const initials = tokens[0] as EcoCode;
  const num = ecoCode?.[initials];
  /* istanbul ignore if */
  if (!num) {
    logging.warn(`Cannot find ECO number for initials: ${initials}`);
    return null;
  }
  return num;
};

export const getEvidenceCodeData = (
  eco: number | null
): EvidenceData | null => {
  if (!eco) {
    return null;
  }
  const data = ecoCodeToData[eco];
  /* istanbul ignore if */
  if (!data) {
    logging.warn(`Evidence code not found: ${eco}`);
    return null;
  }
  return data;
};
