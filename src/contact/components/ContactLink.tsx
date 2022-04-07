import { Link, useLocation } from 'react-router-dom';

import { LocationDescriptor } from 'history';
import { SetOptional } from 'type-fest';
import { ContactLocationState } from './ContactForm';

import { LocationToPath, Location } from '../../app/config/urls';

const ContactLink = ({
  to: initialTo,
  children,
  className,
}: SetOptional<React.ComponentProps<Link<ContactLocationState>>, 'to'>) => {
  const location = useLocation<ContactLocationState>();
  const defaultTo = {
    pathname: LocationToPath[Location.ContactGeneric],
    state: {
      referrer: location.state?.referrer,
    },
  };
  let to: LocationDescriptor<ContactLocationState> | null = null;
  if (typeof initialTo === 'undefined') {
    to = defaultTo;
  } else if (typeof initialTo === 'string') {
    to = {
      ...defaultTo,
      pathname: initialTo,
    };
  } else if (typeof initialTo === 'object') {
    to = {
      ...defaultTo,
      ...initialTo,
    };
  } else {
    const computedTo = initialTo(location);
    if (typeof computedTo === 'string') {
      to = {
        ...defaultTo,
        pathname: computedTo,
      };
    } else {
      to = {
        ...defaultTo,
        ...computedTo,
      };
    }
  }
  return (
    <Link<ContactLocationState>
      className={className}
      // eslint-disable-next-line uniprot-website/use-config-location
      to={to}
    >
      {children}
    </Link>
  );
};

export default ContactLink;
