import { useRouteMatch } from 'react-router-dom';

import { Namespace } from '../types/namespaces';

const useNS = (): Namespace | undefined => {
  const match = useRouteMatch<{ potentialNS: Namespace | string }>(
    '/:potentialNS/'
  );

  if (!match) {
    return undefined;
  }

  const potentialNS = match.params.potentialNS.toLowerCase();
  // eslint-disable-next-line consistent-return
  return Object.values(Namespace).find((ns) => ns === potentialNS);
};

export default useNS;
