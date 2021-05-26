import FeatureType from '../types/featureType';
import KeywordCategory from '../types/keywordCategory';
import EntrySection from '../types/entrySection';
import { CommentType } from '../types/commentTypes';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';

const keywordsCategories: KeywordCategory[] = ['PTM'];

const featuresCategories: FeatureType[] = [
  'Initiator methionine',
  'Signal',
  'Transit peptide',
  'Propeptide',
  'Chain',
  'Peptide',
  'Modified residue',
  'Lipidation',
  'Glycosylation',
  'Disulfide bond',
  'Cross-link',
];

const proteinProcessingComments: CommentType[] = ['PTM'];

const convertProteinProcessing = (
  data: UniProtkbAPIModel,
  uniProtKBCrossReferences?: Xref[]
) =>
  convertSection(
    data,
    proteinProcessingComments,
    keywordsCategories,
    featuresCategories,
    EntrySection.ProteinProcessing,
    uniProtKBCrossReferences
  );

export default convertProteinProcessing;
