import EntrySection from '../types/entrySection';
import { type UniProtKBProtNLMAPIModel } from '../types/protNLMAPIModel';
import {
  type UniProtkbAPIModel,
  type UniProtkbUIModel,
} from './uniProtkbConverter';

export const augmentAPIDataWithProtnlmPredictions = (
  protnlmData: UniProtKBProtNLMAPIModel,
  data: UniProtkbAPIModel
): UniProtkbAPIModel => {
  const protnlmFunctionComments =
    protnlmData.comments?.filter(
      (comment) => comment.commentType === 'FUNCTION'
    ) || [];

  const protnlmSubcellularLocationComments =
    protnlmData.comments?.filter(
      (comment) => comment.commentType === 'SUBCELLULAR LOCATION'
    ) || [];

  const protnlmCrossReferences = (protnlmData.uniProtKBCrossReferences || [])
    // Remove Pfam eg A0A444Y2I6
    .filter((xref) => xref.database !== 'Pfam')
    // TODO: currently the ":-" GoEvidenceType breaks getEcoNumberFromGoEvidenceType
    // Whenever this is fixed remove the transformation that is happening here.
    .map((xref) => ({
      ...xref,
      properties: xref.properties.map((property) =>
        property.key === 'GoEvidenceType' && property.value === ':-'
          ? { key: 'GoEvidenceType', value: 'IEA:ProtNLM2' }
          : property
      ),
    }));

  return {
    ...data,
    comments: [
      ...(data.comments || []),
      ...protnlmFunctionComments,
      ...protnlmSubcellularLocationComments,
    ],
    uniProtKBCrossReferences: [
      ...(data.uniProtKBCrossReferences || []),
      ...protnlmCrossReferences,
    ],
    keywords: [...(data.keywords || []), ...(protnlmData.keywords || [])],
  };
};

export const augmentUIDataWithProtnlmPredictions = (
  protnlmData: UniProtKBProtNLMAPIModel,
  data: UniProtkbUIModel
): UniProtkbUIModel => {
  const uniprotkbNamesAndTaxonomy = data[EntrySection.NamesAndTaxonomy];
  // Only proteinDescription.recommendedName.fullName at the moment.
  // If there is no evidence, assume it is filler and not actual predicted annotation.
  if (
    protnlmData.proteinDescription?.recommendedName?.fullName?.evidences
      ?.length ||
    protnlmData.proteinDescription?.submissionNames?.length
  ) {
    uniprotkbNamesAndTaxonomy.protnlmProteinNamesData =
      protnlmData.proteinDescription;
  }
  return {
    ...data,
    [EntrySection.NamesAndTaxonomy]: {
      ...uniprotkbNamesAndTaxonomy,
    },
  };
};
