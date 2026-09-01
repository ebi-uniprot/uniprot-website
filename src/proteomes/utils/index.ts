import { type ProteomeType } from '../adapters/proteomesConverter';

export const isNonReferenceOrExcluded = (proteomeType: ProteomeType) =>
  proteomeType === 'Non Reference proteome' || proteomeType === 'Excluded';
