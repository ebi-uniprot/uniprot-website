import {
  GenericComment,
  AlternativeProductsComment,
} from '../types/commentTypes';
import { UniProtkbAPIModel } from './uniProtkbConverter';

const finder = (
  comment: GenericComment
): comment is AlternativeProductsComment =>
  comment.commentType === 'ALTERNATIVE PRODUCTS';

const extractIsoforms = (data: UniProtkbAPIModel) => {
  const alternativeProducts = data.comments?.find(finder);
  const isoforms = alternativeProducts?.isoforms.flatMap((isoform) =>
    isoform.isoformIds.map((isoformId) => isoformId)
  );
  return { isoforms: isoforms || [] };
};

export default extractIsoforms;
