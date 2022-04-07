import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';
import { Except } from 'type-fest';
import { LocationDescriptorObject } from 'history';

import { LocationToPath, Location } from '../../app/config/urls';
import { ContactLocationState } from './ContactForm';

type Props = Except<ComponentProps<Link<ContactLocationState>>, 'to'> & {
  to?: LocationDescriptorObject<ContactLocationState>;
};

const ContactLink = ({ to, children, className }: Props) => (
  <Link<ContactLocationState>
    className={className}
    to={(location) => ({
      pathname: LocationToPath[Location.ContactGeneric],
      state: {
        referrer: location.state?.referrer,
      },
      ...to,
    })}
  >
    {children}
  </Link>
);

export default ContactLink;
