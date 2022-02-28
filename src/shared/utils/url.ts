import { matchPath } from 'react-router-dom';

import { LocationToPath } from '../../app/config/urls';

export const getLocationForPathname = (pathname: string) => {
  const found = Object.entries(LocationToPath).find(([, path]) =>
    matchPath(pathname, { path, exact: path === '/' })
  );
  return found?.[0];
};

const reJobId =
  /^\/(?<tool>align|blast|id-mapping|peptide-search)(\/(uniprotkb|uniref|uniparc))?\/(?<jobID>[^/]+)/;

export const getJobIdFromPathname = (pathname: string) => {
  const m = pathname.match(reJobId);
  if (m && m.groups?.tool && m.groups?.jobID) {
    return m.groups.jobID;
  }
  return null;
};
