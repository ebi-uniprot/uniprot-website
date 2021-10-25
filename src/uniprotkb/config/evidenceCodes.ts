import { pluralise } from '../../shared/utils/utils';
import * as logging from '../../shared/utils/logging';

import { Evidence } from '../types/modelTypes';

export enum ECO {
  EXP = 269,
  HTP = 6056,
  IDA = 314,
  HDA = 7005,
  IPI = 353,
  IMP = 315,
  HMP = 7001,
  IGI = 316,
  HGI = 7003,
  IEP = 270,
  HEP = 7007,
  ISS = 250,
  ISO = 266,
  ISA = 247,
  ISM = 255,
  IGC = 317,
  IBA = 318,
  IBD = 319,
  IKR = 320,
  IRD = 321,
  RCA = 245,
  TAS = 304,
  NAS = 303,
  IC = 305,
  ND = 307,
  IEA = 501,
  MI = 312,
  AI = 313,
  AA = 256,
  MIXM = 244,
  MIXA = 213,
  SGNM = 260,
  SGNA = 259,
  STR = 7829,
}

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

export type EvidenceData = {
  manual: boolean;
  label: string;
  description: string;
  labelRender?: (evidences: Evidence[]) => string;
};

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

export const getEvidenceCodeData = (eco: string): EvidenceData | null => {
  const num = Number(eco.split(':')[1]);
  switch (num) {
    case ECO.EXP:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from experiment',
        labelRender: publicationCountRenderer,
      };
    case ECO.HTP:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from high throughput experiment',
      };
    case ECO.IDA:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from direct assay',
      };
    case ECO.HDA:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from high throughput direct assay',
      };
    case ECO.IPI:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from physical interaction',
      };
    case ECO.IMP:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from mutant phenotype',
      };
    case ECO.HMP:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from high throughput mutant phenotype',
      };
    case ECO.IGI:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from genetic interaction',
      };
    case ECO.HGI:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from high throughput genetic interaction',
      };
    case ECO.IEP:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from expression pattern',
      };
    case ECO.HEP:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from high throughput expression pattern',
      };
    case ECO.ISS:
      return {
        manual: true,
        label: 'Manual assertion inferred from sequence similarity',
        description: 'Inferred from sequence or structural similarity',
        labelRender: () => labels.SIMILARITY,
      };
    case ECO.ISO:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from sequence orthology',
      };
    case ECO.ISA:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from sequence alignment',
      };
    case ECO.ISM:
      return {
        manual: true,
        label: 'Automatic assertion according to rules',
        description: 'Inferred from sequence model',
        labelRender: rulesCountRenderer,
      };
    case ECO.IGC:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from genomic context',
      };
    case ECO.IBA:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from biological aspect of ancestor',
      };
    case ECO.IBD:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from biological aspect of descendant',
      };
    case ECO.IKR:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from key residues',
      };
    case ECO.IRD:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from rapid divergence',
      };
    case ECO.RCA:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from reviewed computational analysis',
      };
    case ECO.TAS:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'Traceable author statement',
      };
    case ECO.NAS:
      return {
        manual: true,
        label: 'Manual assertion based on opinion',
        description: 'Non-traceable author statement',
        labelRender: publicationCountRenderer,
      };
    case ECO.IC:
      return {
        manual: true,
        label: 'Manual assertion inferred from experiment',
        description: 'Inferred by curator',
        labelRender: (evidences: Evidence[]) =>
          evidences.some((evidence) => evidence.source)
            ? publicationCountRenderer(evidences)
            : 'Curated',
      };
    case ECO.ND:
      return {
        manual: true,
        label: 'Manual assertion based on experiment',
        description: 'No biological data available',
      };
    case ECO.IEA:
      return {
        manual: false,
        label: 'Manual assertion based on experiment',
        description: 'Inferred from electronic annotation',
      };
    case ECO.MI:
      return {
        manual: true,
        label: 'Manual assertion inferred from database entries',
        description: 'Manually imported',
        labelRender: () => labels.IMPORTED,
      };
    case ECO.AI:
      return {
        manual: false,
        label: 'Automatic assertion inferred from database entries',
        description: 'Automatically imported',
        labelRender: () => labels.IMPORTED,
      };
    case ECO.AA:
      return {
        manual: false,
        label: 'Automatic assertion according to rules',
        description: 'Automatically inferred from sequence model',
        labelRender: rulesCountRenderer,
      };
    case ECO.MIXM:
      return {
        manual: true,
        label:
          'Manual assertion inferred from combination of experimental and computational evidence',
        description: 'Combinatorial evidence used in manual assertion',
        labelRender: () => labels.COMBINED,
      };
    case ECO.MIXA:
      return {
        manual: false,
        label:
          'Automatic assertion inferred from combination of experimental and computational evidence',
        description: 'Combinatorial evidence used in automatic assertion',
        labelRender: () => labels.COMBINED,
      };
    case ECO.SGNM:
      return {
        manual: true,
        label: 'Manual assertion inferred from signature match',
        description:
          'Match to InterPro member signature evidence used in manual assertion',
      };
    case ECO.SGNA:
      return {
        manual: false,
        label: 'Automatic assertion inferred from signature match',
        description:
          'Match to InterPro member signature evidence used in automatic assertion',
        labelRender: () => labels.INTERPRO,
      };
    case ECO.STR:
      return {
        manual: false,
        label:
          'Automatic assertion inferred from combination of experimental and computational evidence',
        description:
          'Information inferred from a combination of experimental and computational evidence, without manual validation',
        labelRender: () => labels.COMBINED,
      };
    default:
      logging.warn(`Evidence code not found: ${eco}`);
      return null;
  }
};
