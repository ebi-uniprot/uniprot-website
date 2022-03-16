import { useEffect } from 'react';
import { useHistory, generatePath, useRouteMatch } from 'react-router-dom';

import { LocationToPath, Location } from '../../app/config/urls';

export const useMatchWithRedirect = <T extends { subPage?: string }>(
  location: Location,
  defaultSubPage: string
) => {
  const history = useHistory();
  const match = useRouteMatch<T>(LocationToPath[location]);

  // if URL doesn't finish with a subpage redirect to a default
  useEffect(() => {
    if (match && !match.params.subPage) {
      history.replace({
        ...history.location,
        pathname: generatePath(LocationToPath[location], {
          ...match.params,
          subPage: defaultSubPage,
        }),
      });
    }
  }, [match, history, location, defaultSubPage]);

  return match;
};
