import { APIModel } from '../types/apiModel';

import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { ProteomesAPIModel } from '../../proteomes/adapters/proteomesConverter';
import { TaxonomyAPIModel } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { KeywordsAPIModel } from '../../supporting-data/keywords/adapters/keywordsConverter';
import { CitationsAPIModel } from '../../supporting-data/citations/adapters/citationsConverter';
import { DiseasesAPIModel } from '../../supporting-data/diseases/adapters/diseasesConverter';
import { DatabaseAPIModel } from '../../supporting-data/database/adapters/databaseConverter';
import { LocationsAPIModel } from '../../supporting-data/locations/adapters/locationsConverter';

import { Namespace } from '../types/namespaces';
import {
  MappingFlat,
  MappingTo,
} from '../../tools/id-mapping/types/idMappingSearchResults';

export const getIdKeyFor = (
  namespace: Namespace
): ((data: APIModel) => string) => {
  switch (namespace) {
    // Main namespaces
    case Namespace.uniprotkb:
      return (data) => (data as UniProtkbAPIModel).primaryAccession;
    case Namespace.uniref:
      return (data) => (data as UniRefLiteAPIModel).id;
    case Namespace.uniparc:
      return (data) => (data as UniParcAPIModel).uniParcId;
    case Namespace.proteomes:
      return (data) => (data as ProteomesAPIModel).id;
    // Supporting data
    case Namespace.taxonomy:
      return (data) => `${(data as TaxonomyAPIModel).taxonId}`;
    case Namespace.keywords:
      return (data) => (data as KeywordsAPIModel).keyword.id;
    case Namespace.citations:
      return (data) => (data as CitationsAPIModel).citation.id;
    case Namespace.diseases:
      return (data) => (data as DiseasesAPIModel).id;
    case Namespace.database:
      return (data) => (data as DatabaseAPIModel).id;
    case Namespace.locations:
      return (data) => (data as LocationsAPIModel).id;
    case Namespace.idmapping:
      return (data) => `${(data as MappingFlat).from}${(data as MappingTo).to}`;
    default:
      // eslint-disable-next-line no-console
      console.warn(`getIdKey method not implemented for ${namespace} yet`);
      return () => '';
  }
};
