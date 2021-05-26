import { CommentType } from '../types/commentTypes';
import KeywordCategory from '../types/keywordCategory';
import EntrySection from '../types/entrySection';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';

const keywordsCategories: KeywordCategory[] = ['Developmental stage'];

const commentsCategories: CommentType[] = [
  'TISSUE SPECIFICITY',
  'DEVELOPMENTAL STAGE',
  'INDUCTION',
];

const convertExpression = (
  data: UniProtkbAPIModel,
  uniProtKBCrossReferences?: Xref[]
) =>
  convertSection(
    data,
    commentsCategories,
    keywordsCategories,
    undefined,
    EntrySection.Expression,
    uniProtKBCrossReferences
  );

export default convertExpression;
