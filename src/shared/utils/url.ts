import { matchPath } from 'react-router-dom';

import {
  LocationToPath,
  pathNameToolNamespaces,
  pathNameTools,
} from '../../app/config/urls';

export const getLocationForPathname = (pathname: string) => {
  const found = Object.entries(LocationToPath).find(([, path]) =>
    matchPath(pathname, { path, exact: path === '/' })
  );
  return found?.[0];
};

const toolsPattern = pathNameTools.join('|');
const namespacesPattern = pathNameToolNamespaces.join('|');
const reJobId = RegExp(
  `^/(${toolsPattern})(/(${namespacesPattern}))?/(?<jobID>[^/]+)`
);
export const getJobIdFromPathname = (pathname: string) =>
  pathname.match(reJobId)?.groups?.jobID;
