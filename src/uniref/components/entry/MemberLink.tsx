import { FC } from 'react';
import { Link } from 'react-router-dom';

import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';

const MemberLink: FC<React.PropsWithChildren<{ accession: string }>> = ({
  accession,
  children,
}) => {
  const path = getEntryPath(
    accession.startsWith('UPI') ? Namespace.uniparc : Namespace.uniprotkb,
    accession
  );

  return <Link to={path}>{children || accession}</Link>;
};

export default MemberLink;
