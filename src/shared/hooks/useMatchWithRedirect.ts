import { useEffect } from 'react';
import { generatePath, useLocation, useMatch, useNavigate } from 'react-router';

import { Location, LocationToPath } from '../../app/config/urls';

// Typos identified in Google Search Console of websites linking to wrong URL
const weirdTypos = /^ |.html?$|;|&.*$/g;

const useMatchWithRedirect = (
  location: Location,
  possibleSubPages: Record<string, string>,
  defaultSubPage?: string,
  redirect?: Record<string, string>
) => {
  const navigate = useNavigate();
  const historyLocation = useLocation();
  const match = useMatch(LocationToPath[location]);

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
        navigate(
          {
            ...historyLocation,
            pathname: generatePath(LocationToPath[location], {
              ...match.params,
              accession: cleanedAccession,
            }),
          },
          { replace: true }
        );
        return;
      }
    }
    const { subPage } = match.params;
    // if the subpage matches a redirect pattern, redirect to new subpage
    if (subPage && redirect?.[subPage]) {
      navigate(
        {
          ...historyLocation,
          pathname: generatePath(LocationToPath[location], {
            ...match.params,
            subPage: redirect[subPage],
          }),
        },
        { replace: true }
      );
      return;
    }
    const subPageValues = Object.values(possibleSubPages);
    if (
      // if URL doesn't finish with a subpage redirect to the default
      !subPage ||
      // if URL doesn't finish with an a valid subpage redirect to the default
      !subPageValues.includes(subPage)
    ) {
      navigate(
        {
          ...historyLocation,
          pathname: generatePath(LocationToPath[location], {
            ...match.params,
            subPage: defaultSubPage || subPageValues[0],
          }),
        },
        { replace: true }
      );
    }
  }, [
    match,
    navigate,
    location,
    defaultSubPage,
    possibleSubPages,
    redirect,
    historyLocation,
  ]);

  return match;
};

export default useMatchWithRedirect;
