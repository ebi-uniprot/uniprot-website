import { Namespace } from '../../shared/types/namespaces';

const keys = {
  tableColumns: (namespace: Namespace) => `table columns for ${namespace}`,
  GDPR: 'UniProt GDPR',
  xrefsTableColumns: (namespace: Namespace) =>
    `table columns for ${namespace} xrefs`,
  viewMode: 'view-mode',
};

export default keys;
