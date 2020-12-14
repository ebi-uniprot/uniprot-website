import { FC } from 'react';
import { generatePath, Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';

export const MemberLink: FC<{ accession: string }> = ({
  accession,
  children,
}) => {
  const path = generatePath(
    LocationToPath[
      accession.startsWith('UPI')
        ? Location.UniParcEntry
        : Location.UniProtKBEntry
    ],
    { accession }
  );

  return <Link to={path}>{children || accession}</Link>;
};

export default MemberLink;
