import { Link } from 'react-router-dom';
import { EnvelopeIcon } from 'franklin-sites';

import ExternalLink from '../ExternalLink';

import { LocationToPath, Location } from '../../../app/config/urls';
import { ContactLocationState } from '../../../contact/adapters/contactFormAdapter';

import footer from './styles/contact.module.scss';

import TwitterLogo from '../../../images/twitter-logo.svg';
import FacebookLogo from '../../../images/facebook-logo.svg';
import YouTubeLogo from '../../../images/youtube-logo.svg';
import BloggerLogo from '../../../images/blogger-logo.svg';
import GGroupsLogo from '../../../images/ggroups-logo.svg';

const Contact = () => (
  <div>
    <p>
      <Link<ContactLocationState>
        to={(location) => ({
          pathname: LocationToPath[Location.ContactGeneric],
          state: { referrer: location },
        })}
      >
        Get in touch <EnvelopeIcon width="2ch" />
      </Link>
    </p>
    <p className={footer.social}>
      <ExternalLink
        noIcon
        url="https://twitter.com/uniprot"
        title="UniProt posts on Twitter"
      >
        <TwitterLogo width="3ch" />
      </ExternalLink>
      <ExternalLink
        noIcon
        url="https://www.facebook.com/uniprot.org"
        title="UniProt posts on Facebook"
      >
        <FacebookLogo width="3ch" />
      </ExternalLink>
      <ExternalLink
        noIcon
        url="https://www.youtube.com/user/uniprotvideos"
        title="UniProt videos on YouTube"
      >
        <YouTubeLogo width="3ch" />
      </ExternalLink>
      <ExternalLink
        noIcon
        url="https://insideuniprot.blogspot.com/"
        title="UniProt blog"
      >
        <BloggerLogo width="3ch" />
      </ExternalLink>
      <ExternalLink
        noIcon
        url="https://groups.google.com/forum/#!forum/ebi-proteins-api"
        title="UniProt Google Group"
      >
        <GGroupsLogo width="3ch" />
      </ExternalLink>
    </p>
  </div>
);

export default Contact;
