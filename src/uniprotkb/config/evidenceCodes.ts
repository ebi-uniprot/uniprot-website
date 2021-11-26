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
  IEA: 501,
  MI: 312,
  AI: 313,
  AA: 256,
  MIXM: 244,
  MIXA: 213,
  SGNM: 260,
  SGNA: 259,
  CMBA: 7829,
  CMBM: 7744,
};

export type EcoCode = keyof typeof ecoCode;

enum labels {
  IMPORTED = 'Imported',
  COMBINED = 'Combined sources',
  INTERPRO = 'InterPro annotation',
  SIMILARITY = 'By similarity',
  CURATED = 'Curated',
  PUBLICATION = 'publication',
  AA = 'automatic annotation',
  SEQ_ANA = 'Sequence analysis',
}

const publicationCountRenderer = (evidences: Evidence[]) => {
  const { length } = evidences;
  return length > 0
    ? `${length} ${pluralise(labels.PUBLICATION, length)}`
    : labels.CURATED;
};

const rulesCountRenderer = (evidences: Evidence[]) => {
  const { length } = evidences;
  const isSAMPhobius = evidences.some(
    (evidence) =>
      typeof evidence.source !== 'undefined' &&
      evidence.source === 'SAM' &&
      evidence.id === 'Phobius'
  );
  if (isSAMPhobius) {
    return labels.SEQ_ANA;
  }
  return `${length} ${pluralise(labels.AA, length)}`;
};

export const ecoCodeToData = {
  [ecoCode.EXP]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from experiment',
    labelRender: publicationCountRenderer,
  },
  [ecoCode.HTP]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from high throughput experiment',
  },
  [ecoCode.IDA]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from direct assay',
  },
  [ecoCode.HDA]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from high throughput direct assay',
  },
  [ecoCode.IPI]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from physical interaction',
  },
  [ecoCode.IMP]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from mutant phenotype',
  },
  [ecoCode.HMP]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from high throughput mutant phenotype',
  },
  [ecoCode.IGI]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from genetic interaction',
  },
  [ecoCode.HGI]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from high throughput genetic interaction',
  },
  [ecoCode.IEP]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from expression pattern',
  },
  [ecoCode.HEP]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from high throughput expression pattern',
  },
  [ecoCode.ISS]: {
    manual: true,
    label: 'Manual assertion inferred from sequence similarity',
    description: 'Inferred from sequence or structural similarity',
    labelRender: () => labels.SIMILARITY,
  },
  [ecoCode.ISO]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from sequence orthology',
  },
  [ecoCode.ISA]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from sequence alignment',
  },
  [ecoCode.ISM]: {
    manual: false,
    label: 'Automatic assertion according to rules',
    description: 'Inferred from sequence model',
    labelRender: rulesCountRenderer,
  },
  [ecoCode.IGC]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from genomic context',
  },
  [ecoCode.IBA]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from biological aspect of ancestor',
  },
  [ecoCode.IBD]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from biological aspect of descendant',
  },
  [ecoCode.IKR]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from key residues',
  },
  [ecoCode.IRD]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from rapid divergence',
  },
  [ecoCode.RCA]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from reviewed computational analysis',
  },
  [ecoCode.TAS]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'Traceable author statement',
  },
  [ecoCode.NAS]: {
    manual: true,
    label: 'Manual assertion based on opinion',
    description: 'Non-traceable author statement',
    labelRender: publicationCountRenderer,
  },
  [ecoCode.IC]: {
    manual: true,
    label: 'Manual assertion inferred from experiment',
    description: 'Inferred by curator',
    labelRender: (evidences: Evidence[]) =>
      evidences.some((evidence) => evidence.source)
        ? publicationCountRenderer(evidences)
        : 'Curated',
  },
  [ecoCode.ND]: {
    manual: true,
    label: 'Manual assertion based on experiment',
    description: 'No biological data available',
  },
  [ecoCode.IEA]: {
    manual: false,
    label: 'Manual assertion based on experiment',
    description: 'Inferred from electronic annotation',
  },
  [ecoCode.MI]: {
    manual: true,
    label: 'Manual assertion inferred from database entries',
    description: 'Manually imported',
    labelRender: () => labels.IMPORTED,
  },
  [ecoCode.AI]: {
    manual: false,
    label: 'Automatic assertion inferred from database entries',
    description: 'Automatically imported',
    labelRender: () => labels.IMPORTED,
  },
  [ecoCode.AA]: {
    manual: false,
    label: 'Automatic assertion according to rules',
    description: 'Automatically inferred from sequence model',
    labelRender: rulesCountRenderer,
  },
  [ecoCode.MIXM]: {
    manual: true,
    label:
      'Manual assertion inferred from combination of experimental and computational evidence',
    description: 'Combinatorial evidence used in manual assertion',
    labelRender: () => labels.COMBINED,
  },
  [ecoCode.MIXA]: {
    manual: false,
    label:
      'Automatic assertion inferred from combination of experimental and computational evidence',
    description: 'Combinatorial evidence used in automatic assertion',
    labelRender: () => labels.COMBINED,
  },
  [ecoCode.SGNM]: {
    manual: true,
    label: 'Manual assertion inferred from signature match',
    description:
      'Match to InterPro member signature evidence used in manual assertion',
  },
  [ecoCode.SGNA]: {
    manual: false,
    label: 'Automatic assertion inferred from signature match',
    description:
      'Match to InterPro member signature evidence used in automatic assertion',
    labelRender: () => labels.INTERPRO,
  },
  [ecoCode.CMBA]: {
    manual: false,
    label:
      'Automatic assertion inferred from combination of experimental and computational evidence',
    description:
      'Information inferred from a combination of experimental and computational evidence, without manual validation',
    labelRender: () => labels.COMBINED,
  },
  [ecoCode.CMBM]: {
    manual: true,
    label:
      'Manual assertion inferred from combination of experimental and computational evidence',
    description:
      'Manually validated information inferred from a combination of experimental and computational evidence.',
    labelRender: () => labels.COMBINED,
  },
};

export type EvidenceData = {
  manual: boolean;
  label: string;
  description: string;
  labelRender?: (evidences: Evidence[]) => string;
};

export const getEcoNumberFromString = (eco: string) => {
  // eg ECO:0000001
  const tokens = eco.split(':');
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
  if (tokens.length !== 2) {
    logging.warn(`Ill-formed GoEvidenceType: ${goEvidenceType}`);
    return null;
  }
  const initials = tokens[0] as EcoCode;
  const num = ecoCode?.[initials];
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
  if (!data) {
    logging.warn(`Evidence code not found: ${eco}`);
    return null;
  }
  return data;
};
