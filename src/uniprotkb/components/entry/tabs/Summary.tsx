import { AxiosRequestConfig } from 'axios';
import { Card, HeroContainer, Loader } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../../app/config/urls';
import ContactLink from '../../../../contact/components/ContactLink';
import ExternalLink from '../../../../shared/components/ExternalLink';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { Namespace } from '../../../../shared/types/namespaces';
import { TabLocation } from '../../../types/entry';
import FreeTextView from '../../protein-data-views/FreeTextView';

const fetchOptions: AxiosRequestConfig = { responseType: 'text' };

const SummaryTab = ({ accession }: { accession: string }) => {
  const { data, loading, error, progress } = useDataApi<string>(
    `https://wwwdev.ebi.ac.uk/uniprot/api/lmic/${accession.slice(-2)}/${accession}.dat`,
    fetchOptions
  );

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error || !data) {
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
          <Link
            to={getEntryPath(Namespace.uniprotkb, accession, TabLocation.Entry)}
          >
            main entry tab
          </Link>
          . We cannot guarantee 100% accurancy and this should not replace
          exploring the actual data from UniProt.
          <br />
          Feel free to <ContactLink>contact us</ContactLink> to provide feedback
          about this summary.
        </em>
      </HeroContainer>
      <FreeTextView
        comments={data.split(/\s*\n\s*/).map((paragraph) => ({
          commentType: 'FUNCTION',
          texts: [{ value: paragraph }],
        }))}
      />
    </Card>
  );
};

export default SummaryTab;
