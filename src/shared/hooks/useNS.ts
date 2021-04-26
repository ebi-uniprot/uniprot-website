import { useRouteMatch } from 'react-router-dom';
import { allIDMappingTargetLocations } from '../../app/config/urls';

import { Namespace } from '../types/namespaces';
import { IDMappingNamespace } from '../../tools/id-mapping/types/idMappingServerParameters';

const useNS = (): [Namespace, boolean] => {
  const match = useRouteMatch<{
    namespace: Namespace;
    targetNS?: IDMappingNamespace;
  }>(allIDMappingTargetLocations);

  if (!match) {
    return [Namespace.uniprotkb, false];
  }

  const potentialNS =
    match.params.targetNS?.toLowerCase() ||
    match.params.namespace.toLowerCase();
  const isSubNS = !!match.params.targetNS;

  return [
    Object.values(Namespace).find((ns) => ns === potentialNS) ||
      Namespace.uniprotkb,
    isSubNS,
  ];
};

export default useNS;
