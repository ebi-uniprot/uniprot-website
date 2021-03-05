import { UniProtKBColumn } from '../types/columnTypes';

const fieldsForCards: UniProtKBColumn[] = [
  UniProtKBColumn.commentCount,
  UniProtKBColumn.featureCount,
  UniProtKBColumn.length,
  UniProtKBColumn.structure3D,
  UniProtKBColumn.annotationScore,
  UniProtKBColumn.proteinExistence,
  UniProtKBColumn.litPubmedId,
  UniProtKBColumn.accession,
  UniProtKBColumn.organismName,
  UniProtKBColumn.proteinName,
  UniProtKBColumn.reviewed,
  UniProtKBColumn.keyword,
  UniProtKBColumn.id,
];

export default fieldsForCards;
