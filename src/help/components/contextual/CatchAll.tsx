import { useEffect } from 'react';
import { Redirect, RouteChildrenProps } from 'react-router-dom';
import { History } from 'history';

import {
  misspeltHelpTuple,
  redirectFromTo,
} from '../../../shared/components/error-pages/ResourceNotFoundPage';

const CatchAll = ({
  location,
  globalHistory,
}: RouteChildrenProps & { globalHistory: History }) => {
  const newPathname = redirectFromTo(location.pathname, [misspeltHelpTuple]);

  // Basically equivalent to Redirect, but in the global history context
  useEffect(() => {
    if (!newPathname) {
      // eslint-disable-next-line uniprot-website/use-config-location
      globalHistory.push(location);
    }
  }, [newPathname, location, globalHistory]);

  if (newPathname) {
    return <Redirect to={{ ...location, pathname: newPathname }} />;
  }

  return null;
};

export default CatchAll;
