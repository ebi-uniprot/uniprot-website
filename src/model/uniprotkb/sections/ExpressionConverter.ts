import Comment from '../../types/Comment';
import KeywordCategory from '../../types/KeywordCategory';
import EntrySection from '../../types/EntrySection';
import { convertSection } from '../SectionConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';

const keywordsCategories = [KeywordCategory.DEVELOPMENTAL_STAGE];

const commentsCategories = [Comment.TISSUE_SPECIFICITY, Comment.INDUCTION];

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
