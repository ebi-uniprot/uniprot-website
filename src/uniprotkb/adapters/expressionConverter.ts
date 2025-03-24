import { Xref } from '../../shared/types/apiModel';
import { CommentType } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import KeywordCategory from '../types/keywordCategory';
import { DatabaseInfoMaps } from '../utils/database';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';

const keywordsCategories: KeywordCategory[] = ['Developmental stage'];

const commentsCategories: CommentType[] = [
  'TISSUE SPECIFICITY',
  'DEVELOPMENTAL STAGE',
  'INDUCTION',
];

const convertExpression = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) =>
  convertSection(
    data,
    databaseInfoMaps,
    commentsCategories,
    keywordsCategories,
    undefined,
    EntrySection.Expression,
    uniProtKBCrossReferences
  );

export default convertExpression;
