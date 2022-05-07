import { MouseEventHandler, MouseEvent } from 'react';
import { ExternalLink } from 'franklin-sites';

import { gtagFn } from '../utils/logging';

const clickHandler = (
  event: MouseEvent<HTMLAnchorElement>,
  handler?: MouseEventHandler<HTMLAnchorElement>
) => {
  try {
    const url = new URL((event.target as HTMLAnchorElement).href);
    gtagFn('event', url.origin, {
      event_category: 'outbound link',
      event_label: url,
      transport: 'beacon',
    });
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
