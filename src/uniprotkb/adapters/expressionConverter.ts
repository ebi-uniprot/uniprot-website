import { CommentType } from '../types/commentTypes';
import KeywordCategory from '../types/keywordCategory';
import EntrySection from '../types/entrySection';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';
import { DatabaseInfoMaps } from '../utils/database';

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
