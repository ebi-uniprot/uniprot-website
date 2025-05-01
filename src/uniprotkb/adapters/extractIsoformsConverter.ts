import {
  AlternativeProductsComment,
  GenericComment,
} from '../types/commentTypes';
import { UniProtkbAPIModel } from './uniProtkbConverter';

const finder = (
  comment: GenericComment
): comment is AlternativeProductsComment =>
  comment.commentType === 'ALTERNATIVE PRODUCTS';

const extractIsoforms = (data: UniProtkbAPIModel) => {
  const alternativeProducts = data.comments?.find(finder);
  const canonical =
    alternativeProducts?.isoforms.find(
      (isoform) => isoform.isoformSequenceStatus === 'Displayed'
    )?.isoformIds[0] || data.primaryAccession;
  const isoforms = alternativeProducts?.isoforms.flatMap(
    (isoform) => isoform.isoformIds
  ) || [data.primaryAccession];
  return { canonical, isoforms };
};

export const extractIsoformNames = (data?: UniProtkbAPIModel) => {
  if (!data) {
    return [];
  }
  const alternativeProducts = data.comments?.find(finder);
  return alternativeProducts?.isoforms.flatMap((isoform) => isoform.name.value);
};

export default extractIsoforms;
