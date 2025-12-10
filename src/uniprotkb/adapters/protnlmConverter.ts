import EntrySection from '../types/entrySection';
import { UniProtKBProtNLMAPIModel } from '../types/protNLMAPIModel';
import { UniProtkbAPIModel, UniProtkbUIModel } from './uniProtkbConverter';

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

  // Currently GO & PFAM
  // TODO: currently the ":-" GoEvidenceType breaks getEcoNumberFromGoEvidenceType
  // const protnlmCrossReferences = protnlmData.uniProtKBCrossReferences || [];

  return {
    ...data,
    comments: [
      ...(data.comments || []),
      ...protnlmFunctionComments,
      ...protnlmSubcellularLocationComments,
    ],
    // uniProtKBCrossReferences: [
    //   ...(data.uniProtKBCrossReferences || []),
    //   ...protnlmCrossReferences,
    // ],
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
