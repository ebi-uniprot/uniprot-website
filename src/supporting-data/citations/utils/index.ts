import { Citation, getCitationPubMedId } from '../adapters/citationsConverter';

export const getCitationItemId = (citation: Citation, index: number) => {
  const pubMedXref = getCitationPubMedId(citation);
  let id = pubMedXref?.id;
  if (!id) {
    id = citation.authors
      ? citation.authors?.join('')
      : citation.authoringGroup?.join('');
  }
  return id || `${index}`;
};
