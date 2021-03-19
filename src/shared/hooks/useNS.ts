import { useRouteMatch } from 'react-router-dom';
import { allSearchResultLocations } from '../../app/config/urls';

import { Namespace } from '../types/namespaces';

const useNS = (): Namespace | undefined => {
  const match = useRouteMatch<{ namespace: Namespace }>(
    allSearchResultLocations
  );

  if (!match) {
    return undefined;
  }

  const potentialNS = match.params.namespace.toLowerCase();
  // eslint-disable-next-line consistent-return
  return Object.values(Namespace).find((ns) => ns === potentialNS);
};

export default useNS;
