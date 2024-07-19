import { ApiDocsDefinition } from '../types/apiDocumentation';

export const apiDocsDefinitionToString = new Map([
  [ApiDocsDefinition.uniprotkb, 'UniProtKB'],
  [ApiDocsDefinition.uniref, 'UniRef'],
  [ApiDocsDefinition.uniparc, 'UniParc'],
  [ApiDocsDefinition.proteome, 'Proteomes'],
  [ApiDocsDefinition.support_data, 'Supporting Data'],
  [ApiDocsDefinition.aa, 'AA'],
  [ApiDocsDefinition.idmapping, 'ID Mapping'],
  [ApiDocsDefinition.async, 'Async Download'],
]);
