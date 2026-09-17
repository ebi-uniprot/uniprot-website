import { type ProteomeType } from '../adapters/proteomesConverter';

// Non-reference and excluded proteomes only have UniParc entries, not
// UniProtKB ones, so their proteins have to be searched/linked via UniParc.
export const isNonReferenceOrExcluded = (proteomeType: ProteomeType) =>
  proteomeType === 'Non Reference proteome' || proteomeType === 'Excluded';
