import { type Xref } from '../../shared/types/apiModel';
import { UniProtKBColumn } from '../types/columnTypes';
import { type CommentType } from '../types/commentTypes';
import EntrySection from '../types/entrySection';
import { type ProteinProcessingFeatures } from '../types/featureType';
import type KeywordCategory from '../types/keywordCategory';
import { type DatabaseInfoMaps } from '../utils/database';
import { convertSection } from './sectionConverter';
import { type UniProtkbAPIModel } from './uniProtkbConverter';

const keywordsCategories: KeywordCategory[] = ['PTM'];

export const proteinProcessingFeaturesToColumns: Readonly<
  Record<ProteinProcessingFeatures, UniProtKBColumn>
> = {
  'Initiator methionine': UniProtKBColumn.ftInitMet,
  Signal: UniProtKBColumn.ftSignal,
  'Transit peptide': UniProtKBColumn.ftTransit,
  Propeptide: UniProtKBColumn.ftPropep,
  Chain: UniProtKBColumn.ftChain,
  Peptide: UniProtKBColumn.ftPeptide,
  'Modified residue': UniProtKBColumn.ftModRes,
  Lipidation: UniProtKBColumn.ftLipid,
  Glycosylation: UniProtKBColumn.ftCarbohyd,
  'Disulfide bond': UniProtKBColumn.ftDisulfid,
  'Cross-link': UniProtKBColumn.ftCrosslnk,
};

const featuresCategories = Object.keys(
  proteinProcessingFeaturesToColumns
) as ProteinProcessingFeatures[];

const proteinProcessingComments: CommentType[] = ['PTM'];

const convertProteinProcessing = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) =>
  convertSection(
    data,
    databaseInfoMaps,
    proteinProcessingComments,
    keywordsCategories,
    featuresCategories,
    EntrySection.ProteinProcessing,
    uniProtKBCrossReferences
  );

export default convertProteinProcessing;
