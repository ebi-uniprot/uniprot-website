import { Message } from 'franklin-sites';
import { type HTMLAttributes } from 'react';

import ExternalLink from '../ExternalLink';
import ErrorComponent from './ErrorComponent';
import ArtWork from './svgs/no-results-found.img.svg';

const NordVPNIssue = (props: HTMLAttributes<HTMLDivElement>) => (
  <ErrorComponent
    {...props}
    artwork={<img src={ArtWork} width="400" height="400" alt="" />}
  >
    <Message level="failure">
      <h4>This service is currently unavailable!</h4>
      <div>
        If you have <strong>NordVPN</strong> installed, try{' '}
        <strong>disabling</strong> the &quot;
        <strong>Threat Protection</strong>&quot; feature and reloading the page.
        <br />
        If this was the issue, please{' '}
        <ExternalLink url="https://nordvpn.com/contact-us/">
          report it to NordVPN
        </ExternalLink>
        .
      </div>
    </Message>
  </ErrorComponent>
);

export default NordVPNIssue;
