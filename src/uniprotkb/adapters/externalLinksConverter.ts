import idx from 'idx';
import { UIModel } from './sectionConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { CommentType } from '../types/commentTypes';
import { getXrefsForSection } from '../utils/xrefUtils';
import EntrySection from '../types/entrySection';

const convertExternalLinks = (data: UniProtkbAPIModel) => {
  const convertedData: UIModel = {
    commentsData: new Map(),
    keywordData: [],
    featuresData: [],
    xrefData: [],
  };
  const { comments, uniProtKBCrossReferences, genes, organism } = data;

  if (comments) {
    convertedData.commentsData.set(
      CommentType.WEB_RESOURCE,
      comments.filter(
        comment => comment.commentType === CommentType.WEB_RESOURCE
      )
    );
  }
  if (uniProtKBCrossReferences) {
    const commonName = idx(organism, o => o.commonName);
    convertedData.xrefData = getXrefsForSection(
      uniProtKBCrossReferences,
      EntrySection.ExternalLinks,
      genes,
      commonName
    );
  }

  return convertedData;
};
export default convertExternalLinks;
