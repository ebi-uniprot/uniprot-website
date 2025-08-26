import { Link, type LinkProps, useLocation } from 'react-router';
import { Except } from 'type-fest';

import { Location, LocationToPath } from '../../app/config/urls';

// Make the "to" optional but apart from that keep the same type
type Props = Except<LinkProps, 'to'> & {
  to?: LinkProps['to'];
};

const ContactLink = ({ to, ...props }: Props) => {
  const location = useLocation();

  return (
    <Link
      to={to || LocationToPath[Location.ContactGeneric]}
      state={{
        // pass along the previous referrer if it was set
        // otherwise set the previous location as new referrer
        referrer: location.state?.referrer || location,
      }}
      {...props}
    />
  );
};

export default ContactLink;
