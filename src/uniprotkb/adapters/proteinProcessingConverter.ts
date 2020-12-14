import FeatureType from '../types/featureType';
import KeywordCategory from '../types/keywordCategory';
import EntrySection from '../types/entrySection';
import { CommentType } from '../types/commentTypes';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';

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

const proteinProcessingComments = [CommentType.PTM];

const convertProteinProcessing = (data: UniProtkbAPIModel) =>
  convertSection(
    data,
    proteinProcessingComments,
    keywordsCategories,
    featuresCategories,
    EntrySection.ProteinProcessing
  );

export default convertProteinProcessing;
