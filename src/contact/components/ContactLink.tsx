import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';
import { Except } from 'type-fest';
import { LocationDescriptorObject } from 'history';

import { LocationToPath, Location } from '../../app/config/urls';
import { ContactLocationState } from './ContactForm';

type Props = Except<ComponentProps<Link<ContactLocationState>>, 'to'> & {
  to?: LocationDescriptorObject<ContactLocationState>;
};

const ContactLink = ({ to, ...props }: Props) => (
  <Link<ContactLocationState>
    to={(location) => ({
      pathname: LocationToPath[Location.ContactGeneric],
      state: {
        // pass along the previous referrer if it was set
        // otherwise set the previous location as new referrer
        referrer: location.state?.referrer || location,
      },
      ...to,
    })}
    {...props}
  />
);

export default ContactLink;
