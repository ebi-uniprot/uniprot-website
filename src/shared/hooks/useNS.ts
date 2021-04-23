import { useRouteMatch } from 'react-router-dom';
import { allIDMappingTargetLocations } from '../../app/config/urls';

import { Namespace } from '../types/namespaces';
import { IDMappingNamespace } from '../../tools/id-mapping/types/idMappingServerParameters';

const useNS = (): [Namespace, Namespace | undefined] => {
  const match = useRouteMatch<{
    namespace: Namespace;
    targetNS?: IDMappingNamespace;
  }>(allIDMappingTargetLocations);

  if (!match) {
    return [Namespace.uniprotkb, undefined];
  }

  const potentialNS = match.params.namespace.toLowerCase();
  const potentialSubNS = match.params.targetNS?.toLowerCase();

  // eslint-disable-next-line consistent-return
  return [
    Object.values(Namespace).find((ns) => ns === potentialNS) ||
      Namespace.uniprotkb,
    Object.values(Namespace).find((ns) => ns === potentialSubNS),
  ];
};

export default useNS;
