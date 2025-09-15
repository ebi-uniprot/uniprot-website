import { EnvelopeIcon } from 'franklin-sites';
import { Link, useLocation } from 'react-router';

import {
  blogspot,
  linkedIn,
  twitterX,
  youtube,
} from '../../../app/config/socialUrls';
import { Location, LocationToPath } from '../../../app/config/urls';
import BloggerLogo from '../../../images/blogger-logo.svg?react';
import LinkedInLogo from '../../../images/linkedin-logo.svg?react';
import XLogo from '../../../images/x-logo.svg?react';
import YouTubeLogo from '../../../images/youtube-logo.svg?react';
import ExternalLink from '../ExternalLink';
import footer from './styles/contact.module.scss';

const Contact = () => {
  const location = useLocation();

  return (
    <div>
      <p>
        <Link
          to={LocationToPath[Location.ContactGeneric]}
          state={{ referrer: location }}
        >
          Get in touch <EnvelopeIcon width="2ch" />
        </Link>
      </p>
      <p className={footer.social}>
        <ExternalLink noIcon url={linkedIn} title="UniProt posts on LinkedIn">
          <LinkedInLogo width="3ch" />
        </ExternalLink>
        <ExternalLink
          noIcon
          url={twitterX}
          title="UniProt posts on X (formerly Twitter)"
        >
          <XLogo width="3ch" />
        </ExternalLink>
        <ExternalLink noIcon url={youtube} title="UniProt videos on YouTube">
          <YouTubeLogo width="3ch" />
        </ExternalLink>
        <ExternalLink noIcon url={blogspot} title="UniProt blog">
          <BloggerLogo width="3ch" />
        </ExternalLink>
      </p>
    </div>
  );
};

export default Contact;
