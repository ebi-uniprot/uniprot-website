import { Namespace } from '../types/namespaces';

const accessionToNamespace = (accession: string): Namespace => {
  if (accession.startsWith('UniRef')) {
    return Namespace.uniref;
  }
  if (accession.startsWith('UPI')) {
    return Namespace.uniparc;
  }
  return Namespace.uniprotkb;
};

export default accessionToNamespace;
