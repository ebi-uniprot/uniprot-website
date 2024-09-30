import { ApiDocsDefinition } from '../types/apiDocumentation';

export const apiDocsDefinitionToString = new Map([
  [ApiDocsDefinition.uniprotkb, 'UniProtKB'],
  [ApiDocsDefinition.uniref, 'UniRef'],
  [ApiDocsDefinition.uniparc, 'UniParc'],
  [ApiDocsDefinition.proteomes, 'Proteomes'],
  [ApiDocsDefinition.support_data, 'Supporting Data'],
  [ApiDocsDefinition.aa, 'Automatic Annotation'],
  [ApiDocsDefinition.idmapping, 'ID Mapping'],
  // [ApiDocsDefinition.async_download, 'Async Download'],
]);
