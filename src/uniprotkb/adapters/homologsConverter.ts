import { type Xref } from '../../shared/types/apiModel';
import EntrySection from '../types/entrySection';
import { type DatabaseInfoMaps } from '../utils/database';
import { getXrefsForSection, type XrefUIModel } from '../utils/xrefUtils';
import { type UniProtkbAPIModel } from './uniProtkbConverter';

export type HomologsUIModel = {
  xrefs: XrefUIModel[];
  primaryAccession: string;
};
const convertHomologs = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) => {
  const homologsData: HomologsUIModel = {
    primaryAccession: data.primaryAccession,
    xrefs: uniProtKBCrossReferences
      ? getXrefsForSection(
          databaseInfoMaps,
          uniProtKBCrossReferences,
          EntrySection.Homologs
        )
      : [],
  };
  return homologsData;
};
export default convertHomologs;
