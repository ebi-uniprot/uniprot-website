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
  uniprotkbNamesAndTaxonomy.protnlmProteinNamesData =
    protnlmData.proteinDescription;

  return {
    ...data,
    [EntrySection.NamesAndTaxonomy]: {
      ...uniprotkbNamesAndTaxonomy,
      protnlmProteinNamesData: protnlmData.proteinDescription,
    },
  };
};
