import { Card } from 'franklin-sites';

import FreeTextView from '../protein-data-views/FreeTextView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import { FreeTextComment } from '../../types/commentTypes';
import { UIModel } from '../../adapters/sectionConverter';
import { hasContent } from '../../../shared/utils/utils';

type Props = {
  data: UIModel;
  sequence: string;
  primaryAccession: string;
};

const FamilyAndDomainsSection = ({
  data,
  sequence,
  primaryAccession,
}: Props) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Card
      header={
        <h2>{getEntrySectionNameAndId(EntrySection.FamilyAndDomains).name}</h2>
      }
      id={EntrySection.FamilyAndDomains}
      data-entry-section
    >
      <FeaturesView features={data.featuresData} sequence={sequence} />
      <FreeTextView
        comments={
          data.commentsData.get('DOMAIN') as FreeTextComment[] | undefined
        }
        title="domain"
      />
      <FreeTextView
        comments={
          data.commentsData.get('SIMILARITY') as FreeTextComment[] | undefined
        }
        title="similarity"
      />
      <KeywordView keywords={data.keywordData} />
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default FamilyAndDomainsSection;
