import { useMatch } from 'react-router';

import {
  mainNamespaces,
  Namespace,
  supportingDataNamespaces,
} from '../types/namespaces';

const tools = new Set(['blast', 'align', 'id-mapping', 'peptide-search']);
const toolNamespaces = new Set(['uniprotkb', 'uniref', 'uniparc']);

const useNS = (override?: Namespace): Namespace | undefined => {
  const match = useMatch(`/:namespaceOrTool/:maybeNamespaceIfTool?`);

  const { namespaceOrTool, maybeNamespaceIfTool } = match?.params || {};

  if (override) {
    return override;
  }

  if (!namespaceOrTool) {
    return undefined;
  }

  if (tools.has(namespaceOrTool)) {
    // e.g. /blast...
    if (maybeNamespaceIfTool && toolNamespaces.has(maybeNamespaceIfTool)) {
      // e.g. /blast/uniprotkb...
      return maybeNamespaceIfTool as Namespace;
    }
    // e.g /blast exactly
    return undefined;
  }

  // rename, here we know it's not a tool
  const namespace = namespaceOrTool;

  if (
    mainNamespaces.has(namespace) ||
    supportingDataNamespaces.has(namespace)
  ) {
    return namespace as Namespace;
  }
};

export default useNS;
