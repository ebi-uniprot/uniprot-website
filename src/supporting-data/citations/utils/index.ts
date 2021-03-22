import {
  CitationsAPIModel,
  getCitationPubMedId,
} from '../adapters/citationsConverter';

export const getCitationItemId = (item: CitationsAPIModel, index: number) => {
  const { citation } = item;
  const pubMedXref = getCitationPubMedId(citation);
  let id = pubMedXref?.id;
  if (!id) {
    id = citation.authors
      ? citation.authors?.join('')
      : citation.authoringGroup?.join('');
  }
  return id || `${index}`;
};
