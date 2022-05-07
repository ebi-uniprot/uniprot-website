import { MouseEventHandler, MouseEvent } from 'react';
import { ExternalLink } from 'franklin-sites';

import { gtagFn } from '../utils/logging';

const clickHandler = (
  event: MouseEvent<HTMLAnchorElement>,
  handler?: MouseEventHandler<HTMLAnchorElement>
) => {
  gtagFn('event', 'outbound link click', {
    event_category: 'outbound link',
    event_label: (event.target as HTMLAnchorElement).href,
    transport: 'beacon',
  });
  handler?.(event);
};

const IntrumentedExternalLink: typeof ExternalLink = ({ ...props }) => (
  <ExternalLink
    {...props}
    onClick={(event) => clickHandler(event, props.onClick)}
  />
);

export default IntrumentedExternalLink;
