import { useEffect } from 'react';
import { useHistory, generatePath, useRouteMatch } from 'react-router-dom';

import { LocationToPath, Location } from '../../app/config/urls';

// Typos identified in Google Search Console of websites linking to wrong URL
const weirdTypos = /^ |.html?$|;|&.*$/g;

const useMatchWithRedirect = <
  T extends { accession?: string; subPage?: string }
>(
  location: Location,
  possibleSubPages: Record<string, string>,
  defaultSubPage?: string,
  redirect?: Record<string, string>
) => {
  const history = useHistory();
  const match = useRouteMatch<T>(LocationToPath[location]);

  useEffect(() => {
    if (!match) {
      return;
    }
    if (
      'accession' in match.params &&
      typeof match.params.accession === 'string'
    ) {
      const { accession } = match.params;
      const cleanedAccession = accession
        .replaceAll(weirdTypos, '')
        .toUpperCase();
      if (accession !== cleanedAccession) {
        history.replace({
          ...history.location,
          pathname: generatePath(LocationToPath[location], {
            ...match.params,
            accession: cleanedAccession,
          }),
        });
        return;
      }
    }
    const { subPage } = match.params;
    // if the subpage matches a redirect pattern, redirect to new subpage
    if (subPage && redirect?.[subPage]) {
      history.replace({
        ...history.location,
        pathname: generatePath(LocationToPath[location], {
          ...match.params,
          subPage: redirect[subPage],
        }),
      });
      return;
    }
    const subPageValues = Object.values(possibleSubPages);
    if (
      // if URL doesn't finish with a subpage redirect to the default
      !subPage ||
      // if URL doesn't finish with an a valid subpage redirect to the default
      !subPageValues.includes(subPage)
    ) {
      history.replace({
        ...history.location,
        pathname: generatePath(LocationToPath[location], {
          ...match.params,
          subPage: defaultSubPage || subPageValues[0],
        }),
      });
    }
  }, [match, history, location, defaultSubPage, possibleSubPages, redirect]);

  return match;
};

export default useMatchWithRedirect;
