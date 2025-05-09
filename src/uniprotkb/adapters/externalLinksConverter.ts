import { Xref } from '../../shared/types/apiModel';
import EntrySection from '../types/entrySection';
import { DatabaseInfoMaps } from '../utils/database';
import { getXrefsForSection } from '../utils/xrefUtils';
import { UIModel } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';

const convertExternalLinks = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) => {
  const convertedData: UIModel = {
    commentsData: new Map(),
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };
  const { comments, genes, organism } = data;

  if (comments) {
    convertedData.commentsData.set(
      'WEB RESOURCE',
      comments.filter((comment) => comment.commentType === 'WEB RESOURCE')
    );
  }
  if (uniProtKBCrossReferences) {
    convertedData.xrefData = getXrefsForSection(
      databaseInfoMaps,
      uniProtKBCrossReferences,
      EntrySection.ExternalLinks,
      genes,
      organism?.commonName
    );
  }

  return convertedData;
};
export default convertExternalLinks;
