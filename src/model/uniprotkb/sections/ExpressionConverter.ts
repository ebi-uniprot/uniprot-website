import { CommentType } from '../../types/CommentTypes';
import KeywordCategory from '../../types/KeywordCategory';
import EntrySection from '../../types/EntrySection';
import { convertSection } from '../SectionConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';

const keywordsCategories = [KeywordCategory.DEVELOPMENTAL_STAGE];

const commentsCategories = [
  CommentType.TISSUE_SPECIFICITY,
  CommentType.INDUCTION,
];

const convertExpression = (data: UniProtkbAPIModel) => {
  return convertSection(
    data,
    commentsCategories,
    keywordsCategories,
    undefined,
    EntrySection.Expression
  );
};

export default convertExpression;
