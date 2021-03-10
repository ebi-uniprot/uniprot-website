import { Citation } from '../../supporting-data/citations/adapters/citationsConverter';

export const getCitationPubMedId = (citation: Citation) =>
  citation.citationCrossReferences &&
  citation.citationCrossReferences.find((xref) => xref.database === 'PubMed');

export const getDoiXref = (citation: Citation) =>
  citation.citationCrossReferences &&
  citation.citationCrossReferences.find((xref) => xref.database === 'DOI');

const formatCitationData = (citation: Citation) => {
  const pubMedXref = getCitationPubMedId(citation);

  const doiXref = getDoiXref(citation);

  const pubmedId = pubMedXref && pubMedXref.id;

  const journalInfo = {
    journal: citation.journal,
    volume: citation.volume,
    firstPage: citation.firstPage,
    lastPage: citation.lastPage,
    publicationDate: citation.publicationDate,
    doiId: doiXref && doiXref.id,
  };
  return { pubmedId, journalInfo };
};

export default formatCitationData;
