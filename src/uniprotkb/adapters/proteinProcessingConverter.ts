import { ProteinProcessingFeatures } from '../types/featureType';
import KeywordCategory from '../types/keywordCategory';
import EntrySection from '../types/entrySection';
import { CommentType } from '../types/commentTypes';
import { convertSection } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../../shared/types/apiModel';
import { UniProtKBColumn } from '../types/columnTypes';
import { DatabaseInfoMaps } from '../utils/database';

const keywordsCategories: KeywordCategory[] = ['PTM'];

export const proteinProcessingFeaturesToColumns: Partial<
  Readonly<Record<ProteinProcessingFeatures, UniProtKBColumn>>
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
