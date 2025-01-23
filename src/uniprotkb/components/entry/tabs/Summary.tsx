import { Link } from 'react-router-dom';
import { Card, HeroContainer } from 'franklin-sites';

import FreeTextView from '../../protein-data-views/FreeTextView';

import ContactLink from '../../../../contact/components/ContactLink';
import ExternalLink from '../../../../shared/components/ExternalLink';

import { getEntryPath } from '../../../../app/config/urls';

import { Namespace } from '../../../../shared/types/namespaces';
import { TabLocation } from '../../../types/entry';

const mockData = `The protein entry with accession number P05067 is reviewed and consists of 770 amino acids. The recommended name for this protein is Amyloid-beta precursor protein, also known as APP.

The protein functions as a cell surface receptor, playing a crucial role in neurite growth, neuronal adhesion, and axonogenesis. It is involved in cell mobility and transcription regulation through protein-protein interactions. APP can promote transcription activation and inhibits Notch signaling, coupling to apoptosis-inducing pathways. Additionally, it plays a role in copper homeostasis and oxidative stress, and is implicated in the internalization of amyloid-beta peptide, which is linked to mitochondrial dysfunction.

This protein is associated with several diseases, including Alzheimer disease 1 (AD1), characterized by progressive dementia and amyloid plaque deposition, and Cerebral amyloid angiopathy, APP-related (CAA-APP), which involves amyloid-beta deposition in cerebral vessels leading to recurrent strokes and mental deterioration.

Important domains of APP include the E1 and E2 domains, as well as the BPTI/Kunitz inhibitor domain, which are significant for its function. Post-translational modifications (PTMs) include proteolytic processing, N- and O-glycosylation, phosphorylation, and sulfation. These modifications are crucial for its activity and processing, influencing interactions and stability within cellular environments.`;

const SummaryTab = ({ accession }: { accession: string }) => (
  <Card header={<h2>✨ AI-generated summary ✨</h2>}>
    <HeroContainer
      headingContent="Disclaimer"
      headingLevel="h3"
      headingClassName="medium"
    >
      <em>
        The following summary has been generated using AI methods combined with
        the{' '}
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
      comments={mockData.split(/\s*\n\s*/).map((paragraph) => ({
        commentType: 'FUNCTION',
        texts: [{ value: paragraph }],
      }))}
    />
  </Card>
);

export default SummaryTab;
