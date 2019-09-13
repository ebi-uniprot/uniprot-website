import FeatureType from '../../types/FeatureType';
import KeywordCategory from '../../types/KeywordCategory';
import EntrySection from '../../types/EntrySection';
import Comment from '../../types/Comment';
import { convertSection } from '../SectionConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';

const keywordsCategories = [KeywordCategory.PTM];

const featuresCategories = [
  FeatureType.INIT_MET,
  FeatureType.SIGNAL,
  FeatureType.TRANSIT,
  FeatureType.PROPEP,
  FeatureType.CHAIN,
  FeatureType.PEPTIDE,
  FeatureType.MOD_RES,
  FeatureType.LIPID,
  FeatureType.CARBOHYD,
  FeatureType.DISULFID,
  FeatureType.CROSSLNK,
];

const proteinProcessingComments = [Comment.PTM];

const convertProteinProcessing = (data: UniProtkbAPIModel) => {
  return convertSection(
    data,
    proteinProcessingComments,
    keywordsCategories,
    featuresCategories,
    EntrySection.ProteinProcessing
  );
};

export default convertProteinProcessing;
