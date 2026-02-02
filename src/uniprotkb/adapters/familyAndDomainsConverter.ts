import { type Xref } from '../../shared/types/apiModel';
import { UniProtKBColumn } from '../types/columnTypes';
import { type CommentType } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import { type FamilyAndDomainsFeatures } from '../types/featureType';
import type KeywordCategory from '../types/keywordCategory';
import { type DatabaseInfoMaps } from '../utils/database';
import { convertSection } from './sectionConverter';
import { type UniProtkbAPIModel } from './uniProtkbConverter';

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
  'Coiled coil': UniProtKBColumn.ftCoiled,
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
