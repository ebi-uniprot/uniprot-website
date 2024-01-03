import { Link } from 'react-router-dom';
import { EnvelopeIcon } from 'franklin-sites';

import ExternalLink from '../ExternalLink';

import {
  blogspot,
  facebook,
  googleGroups,
  twitter,
  youtube,
} from '../../../app/config/socialUrls';

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
      <ExternalLink noIcon url={twitter} title="UniProt posts on Twitter">
        <TwitterLogo width="3ch" />
      </ExternalLink>
      <ExternalLink noIcon url={facebook} title="UniProt posts on Facebook">
        <FacebookLogo width="3ch" />
      </ExternalLink>
      <ExternalLink noIcon url={youtube} title="UniProt videos on YouTube">
        <YouTubeLogo width="3ch" />
      </ExternalLink>
      <ExternalLink noIcon url={blogspot} title="UniProt blog">
        <BloggerLogo width="3ch" />
      </ExternalLink>
      <ExternalLink noIcon url={googleGroups} title="UniProt Google Group">
        <GGroupsLogo width="3ch" />
      </ExternalLink>
    </p>
  </div>
);

export default Contact;
