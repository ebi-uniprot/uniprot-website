import KeywordCategory from '../types/keywordCategory';
import { FamilyAndDomainsFeatures } from '../types/featureType';
import EntrySection from '../types/entrySection';
import { CommentType } from '../types/commentTypes';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';
import { UniProtKBColumn } from '../types/columnTypes';
import { DatabaseInfoMaps } from '../utils/database';

const keywordsCategories: KeywordCategory[] = ['Domain'];

export const familyAndDomainsFeaturesToColumns: Readonly<
  Record<FamilyAndDomainsFeatures, UniProtKBColumn>
> = {
  Domain: UniProtKBColumn.ftDomain,
  Region: UniProtKBColumn.ftRegion,
  Repeat: UniProtKBColumn.ftRepeat,
  Motif: UniProtKBColumn.ftMotif,
  'Compositional bias': UniProtKBColumn.ftCompbias,
  'Zinc finger': UniProtKBColumn.ftZnFing,
};

const featuresCategories = Object.keys(
  familyAndDomainsFeaturesToColumns
) as FamilyAndDomainsFeatures[];

const familyAndDomainsComments: CommentType[] = ['DOMAIN', 'SIMILARITY'];

const convertFamilyAndDomains = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) =>
  convertSection(
    data,
    databaseInfoMaps,
    familyAndDomainsComments,
    keywordsCategories,
    featuresCategories,
    EntrySection.FamilyAndDomains,
    uniProtKBCrossReferences
  );

export default convertFamilyAndDomains;
