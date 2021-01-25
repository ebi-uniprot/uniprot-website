import { CommentType } from '../types/commentTypes';
import KeywordCategory from '../types/keywordCategory';
import EntrySection from '../types/entrySection';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';

const keywordsCategories = [KeywordCategory.DEVELOPMENTAL_STAGE];

const commentsCategories = [
  CommentType.TISSUE_SPECIFICITY,
  CommentType.DEVELOPMENTAL_STAGE,
  CommentType.INDUCTION,
];

const convertExpression = (data: UniProtkbAPIModel) =>
  convertSection(
    data,
    commentsCategories,
    keywordsCategories,
    undefined,
    EntrySection.Expression
  );

export default convertExpression;
