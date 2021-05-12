import { UIModel } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { getXrefsForSection } from '../utils/xrefUtils';
import EntrySection from '../types/entrySection';
import { Xref } from '../../shared/types/apiModel';

const convertExternalLinks = (
  data: UniProtkbAPIModel,
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
      uniProtKBCrossReferences,
      EntrySection.ExternalLinks,
      genes,
      organism?.commonName
    );
  }

  return convertedData;
};
export default convertExternalLinks;
