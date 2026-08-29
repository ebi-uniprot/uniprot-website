import { type ProteomeType } from '../adapters/proteomesConverter';

export const isUniParcProteome = (proteomeType: ProteomeType) =>
  proteomeType === 'Non Reference proteome' || proteomeType === 'Excluded';
