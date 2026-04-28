import extractIsoforms from './extractIsoformsConverter';
import { type UniProtkbAPIModel } from './uniProtkbConverter';

export type SimilarProteinsUIModel = {
  canonical: string;
  isoforms: string[];
};
const convertSimilarProteins = (data: UniProtkbAPIModel) => {
  const similarProteinsData: SimilarProteinsUIModel = {
    ...extractIsoforms(data),
  };
  return similarProteinsData;
};
export default convertSimilarProteins;
