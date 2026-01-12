import { FeatureDatum } from '../components/protein-data-views/UniProtKBFeaturesView';
import {
  AlternativeProductsComment,
  GenericComment,
  Isoform,
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

export const constructIsoformSequence = (
  isoform: Isoform,
  variantSequences: FeatureDatum[],
  canonicalSequence: string
) => {
  const isoformSequence: string[] = [];
  let tailIndex = 0;
  if (isoform.sequenceIds && variantSequences.length !== 0) {
    isoform.sequenceIds.forEach((sequenceId) => {
      const variantSeq = variantSequences.find(
        (varSeq) => varSeq.featureId === sequenceId
      );
      if (variantSeq) {
        isoformSequence.push(
          canonicalSequence.slice(
            tailIndex,
            variantSeq.location.start.value - 1
          )
        );
        if (
          variantSeq.alternativeSequence?.originalSequence &&
          variantSeq.alternativeSequence?.alternativeSequences?.length
        ) {
          variantSeq.alternativeSequence?.alternativeSequences.forEach(
            (altSeq) => isoformSequence.push(altSeq)
          );
        }
        tailIndex = variantSeq.location.end.value;
      }
    });
    if (tailIndex < canonicalSequence.length) {
      isoformSequence.push(
        canonicalSequence.slice(tailIndex, canonicalSequence.length)
      );
    }
  }

  return {
    isoformId: isoform.isoformIds[0],
    sequence: isoformSequence.join(''),
  };
};

export default extractIsoforms;
