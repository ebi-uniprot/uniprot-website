import { Link, type LinkProps, useLocation } from 'react-router';

import { Location, LocationToPath } from '../../app/config/urls';

const ContactLink = ({ to, ...props }: LinkProps) => {
  const location = useLocation();

  return (
    <Link
      to={LocationToPath[Location.ContactGeneric]}
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
