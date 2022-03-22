import { useEffect } from 'react';
import { useHistory, generatePath, useRouteMatch } from 'react-router-dom';

import { LocationToPath, Location } from '../../app/config/urls';

const useMatchWithRedirect = <T extends { subPage?: string }>(
  location: Location,
  defaultSubPage: string,
  possibleSubPages: Record<string, string>
) => {
  const history = useHistory();
  const match = useRouteMatch<T>(LocationToPath[location]);

  useEffect(() => {
    if (
      match &&
      // if URL doesn't finish with a subpage redirect to the default
      (!match.params.subPage ||
        // if URL doesn't finish with an a valid subpage redirect to the default
        !Object.values(possibleSubPages).includes(match.params.subPage))
    ) {
      history.replace({
        ...history.location,
        pathname: generatePath(LocationToPath[location], {
          ...match.params,
          subPage: defaultSubPage,
        }),
      });
    }
  }, [match, history, location, defaultSubPage, possibleSubPages]);

  return match;
};

export default useMatchWithRedirect;
