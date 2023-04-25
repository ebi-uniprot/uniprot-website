import { MouseEventHandler, MouseEvent } from 'react';
import { ExternalLink } from 'franklin-sites';

import { sendGtagEventOutboundLinkClick } from '../utils/gtagEvents';

const clickHandler = (
  event: MouseEvent<HTMLAnchorElement>,
  handler?: MouseEventHandler<HTMLAnchorElement>
) => {
  try {
    const url = new URL((event.target as HTMLAnchorElement).href);
    // TODO: double check GA4 uses beacon automatically
    sendGtagEventOutboundLinkClick(url.toString());
  } catch {
    /**/
  }
  handler?.(event);
};

const IntrumentedExternalLink: typeof ExternalLink = ({ ...props }) => (
  <ExternalLink
    {...props}
    onClick={(event) => clickHandler(event, props.onClick)}
  />
);

export default IntrumentedExternalLink;
