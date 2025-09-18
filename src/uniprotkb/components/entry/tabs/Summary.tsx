import { Card, HeroContainer } from 'franklin-sites';
import { Link } from 'react-router';

import ContactLink from '../../../../contact/components/ContactLink';
import ExternalLink from '../../../../shared/components/ExternalLink';
import { FreeTextComment } from '../../../types/commentTypes';
import { TabLocation } from '../../../types/entry';
import FreeTextView from '../../protein-data-views/FreeTextView';

type Props = {
  accession: string;
  comments?: FreeTextComment[];
};

const SummaryTab = ({ accession, comments }: Props) => {
  if (!comments) {
    return (
      <Card header={<h2>✨ AI-generated summary ✨</h2>}>
        No AI-generated summary available for this entry
      </Card>
    );
  }

  return (
    <Card header={<h2>✨ AI-generated summary ✨</h2>}>
      <HeroContainer
        headingContent="Disclaimer"
        headingLevel="h3"
        headingClassName="medium"
      >
        <em>
          The following summary has been generated using AI methods combined
          with the{' '}
          <ExternalLink
            url={`https://rest.uniprot.org/uniprotkb/${accession}.txt`}
          >
            underlying UniProtKB data
          </ExternalLink>
          .<br />
          This provides an overview of the actual information that we have
          available on the{' '}
          <Link to={`../${TabLocation.Entry}?force`}>main entry tab</Link>
          . We cannot guarantee 100% accurancy and this should not replace
          exploring the actual data from UniProt.
          <br />
          Feel free to <ContactLink>contact us</ContactLink> to provide feedback
          about this summary.
        </em>
      </HeroContainer>
      <FreeTextView comments={comments} />
    </Card>
  );
};

export default SummaryTab;
