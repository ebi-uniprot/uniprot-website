import { type Xref } from '../../shared/types/apiModel';
import { type CommentType } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import type KeywordCategory from '../types/keywordCategory';
import { type DatabaseInfoMaps } from '../utils/database';
import { convertSection } from './sectionConverter';
import { type UniProtkbAPIModel } from './uniProtkbConverter';

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
