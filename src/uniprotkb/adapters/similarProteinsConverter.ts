import { type Xref } from '../../shared/types/apiModel';
import EntrySection from '../types/entrySection';
import { type DatabaseInfoMaps } from '../utils/database';
import { getXrefsForSection, type XrefUIModel } from '../utils/xrefUtils';
import extractIsoforms from './extractIsoformsConverter';
import { type UniProtkbAPIModel } from './uniProtkbConverter';

export type SimilarProteinsUIModel = {
  canonical: string;
  isoforms: string[];
  xrefs: XrefUIModel[];
  primaryAccession: string;
};
const convertSimilarProteins = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) => {
  const similarProteinsData: SimilarProteinsUIModel = {
    primaryAccession: data.primaryAccession,
    ...extractIsoforms(data),
    xrefs: uniProtKBCrossReferences
      ? getXrefsForSection(
          databaseInfoMaps,
          uniProtKBCrossReferences,
          EntrySection.SimilarProteins
        )
      : [],
  };
  return similarProteinsData;
};
export default convertSimilarProteins;
