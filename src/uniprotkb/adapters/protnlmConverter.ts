import { UniProtKBProtNLMAPIModel } from '../types/protNLMAPIModel';
import { UniProtkbAPIModel } from './uniProtkbConverter';

const augmentProtnlmPredictions = (
  protnlmData: UniProtKBProtNLMAPIModel,
  data: UniProtkbAPIModel
): UniProtkbAPIModel => {
  const protnlmFunctionComments =
    protnlmData.comments?.filter(
      (comment) => comment.commentType === 'FUNCTION'
    ) || [];

  const protnlmSubcellularLocatoinComments =
    protnlmData.comments?.filter(
      (comment) => comment.commentType === 'SUBCELLULAR LOCATION'
    ) || [];

  return {
    ...data,
    comments: [
      ...(data.comments || []),
      ...protnlmFunctionComments,
      ...protnlmSubcellularLocatoinComments,
    ],
  };
};

export default augmentProtnlmPredictions;
