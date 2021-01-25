import { AlternativeProductsComment, CommentType } from '../types/commentTypes';
import { UniProtkbAPIModel } from './uniProtkbConverter';

const extractIsoforms = (data: UniProtkbAPIModel) => {
  const alternativeProducts = data.comments?.find(
    (comment) => comment.commentType === CommentType.ALTERNATIVE_PRODUCTS
  ) as AlternativeProductsComment;
  const isoforms = alternativeProducts?.isoforms
    .map((isoform) => isoform.isoformIds.map((isoformId) => isoformId))
    .flat();
  return { isoforms: isoforms || [] };
};

export default extractIsoforms;
