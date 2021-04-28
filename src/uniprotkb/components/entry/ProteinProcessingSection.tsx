import { Card } from 'franklin-sites';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';
import FreeTextView from '../protein-data-views/FreeTextView';

import { hasContent } from '../../../shared/utils/utils';

import { CommentType, FreeTextComment } from '../../types/commentTypes';
import { UIModel } from '../../adapters/sectionConverter';

type Props = {
  data: UIModel;
  primaryAccession: string;
  sequence: string;
};

const ProteinProcessingSection = ({
  data,
  sequence,
  primaryAccession,
}: Props) => {
  if (!hasContent(data)) {
    return null;
  }
  const { featuresData, keywordData, xrefData, commentsData } = data;
  return (
    <Card
      header={
        <h2>{getEntrySectionNameAndId(EntrySection.ProteinProcessing).name}</h2>
      }
      id={EntrySection.ProteinProcessing}
      data-entry-section
    >
      <FeaturesView features={featuresData} sequence={sequence} />
      <FreeTextView
        comments={commentsData.get(CommentType.PTM) as FreeTextComment[]}
        title={CommentType.PTM}
      />
      <KeywordView keywords={keywordData} />
      <XRefView xrefs={xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default ProteinProcessingSection;
