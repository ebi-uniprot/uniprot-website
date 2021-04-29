import { useRouteMatch } from 'react-router-dom';
import { allIDMappingTargetLocations } from '../../app/config/urls';

import { Namespace } from '../types/namespaces';
import { IDMappingNamespace } from '../../tools/id-mapping/types/idMappingServerParameters';

const useNS = (): Namespace | undefined => {
  const match = useRouteMatch<{
    namespace: Namespace;
    targetNS?: IDMappingNamespace;
  }>(allIDMappingTargetLocations);

  if (!match) {
    return undefined;
  }

  const potentialNS = match.params.namespace.toLowerCase();

  return Object.values(Namespace).find((ns) => ns === potentialNS);
};

export default useNS;
