import * as logging from './logging';

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

import { UniRuleAPIModel } from '../../automatic-annotations/unirule/adapters/uniRuleConverter';
import { ARBAAPIModel } from '../../automatic-annotations/arba/adapters/arbaConverter';

import {
  MappingFlat,
  MappingFrom,
  MappingTo,
} from '../../tools/id-mapping/types/idMappingSearchResults';

import { Namespace } from '../types/namespaces';

const fromSeparator = '||';

export const fromCleanMapper = (entry: string) => {
  if (entry.includes(fromSeparator)) {
    const split = entry.split(fromSeparator);
    /* istanbul ignore if */
    if (split.length > 2) {
      logging.warn(
        `Found more than 1 separator in "${entry}". Unexpected accession format.`
      );
    }
    return split[1];
  }
  return entry;
};

export const getIdKeyForNamespace = (
  namespace: Namespace
): ((data: APIModel) => string) => {
  switch (namespace) {
    // Main namespaces
    case Namespace.uniprotkb:
      return (data) => {
        const { from } = data as UniProtkbAPIModel;
        return `${from ? `${from}${fromSeparator}` : ''}${
          (data as UniProtkbAPIModel).primaryAccession
        }`;
      };
    case Namespace.uniref:
      return (data) => {
        const { from } = data as UniRefLiteAPIModel;
        return `${from ? `${from}${fromSeparator}` : ''}${
          (data as UniRefLiteAPIModel).id
        }`;
      };
    case Namespace.uniparc:
      return (data) => {
        const { from } = data as UniParcAPIModel;
        return `${from ? `${from}${fromSeparator}` : ''}${
          (data as UniParcAPIModel).uniParcId
        }`;
      };
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
    // Annotations
    case Namespace.unirule:
      return (data) => (data as UniRuleAPIModel).uniRuleId;
    case Namespace.arba:
      return (data) => (data as ARBAAPIModel).uniRuleId;
    case Namespace.idmapping:
      return (data) =>
        `${(data as MappingFlat).from}${fromSeparator}${
          (data as MappingTo).to
        }`;
    default:
      logging.warn(
        `getIdKeyForNamespace method not implemented for ${namespace} yet`
      );
      return () => '';
  }
};

export const getIdKeyForData = (
  datum: APIModel
): ((datum: APIModel) => string) => {
  let f: (datum: APIModel) => string = () => '';
  if (!datum) {
    return f;
  }
  if ('primaryAccession' in datum) {
    f = (d) => (d as UniProtkbAPIModel).primaryAccession;
  } else if ('id' in datum) {
    f = (d) =>
      (
        d as
          | UniRefLiteAPIModel
          | ProteomesAPIModel
          | DiseasesAPIModel
          | DatabaseAPIModel
          | LocationsAPIModel
      ).id;
  } else if ('uniParcId' in datum) {
    f = (d) => (d as UniParcAPIModel).uniParcId;
  } else if ('taxonId' in datum) {
    f = (d) => `${(d as TaxonomyAPIModel).taxonId}`;
  } else if ('keyword' in datum && 'id' in datum.keyword) {
    f = (d) => (d as KeywordsAPIModel).keyword.id;
  } else if ('citation' in datum && 'id' in datum.citation) {
    f = (d) => (d as CitationsAPIModel).citation.id;
  } else if ('uniRuleId' in datum) {
    f = (d) => (d as UniRuleAPIModel | ARBAAPIModel).uniRuleId;
  } else if ('to' in datum) {
    f = (d) => (d as MappingTo).to;
  } else {
    logging.warn(
      `getIdKeyForData method not implemented for ${JSON.stringify(datum)} yet`
    );
    return f;
  }
  return 'from' in datum
    ? (d) => `${(d as MappingFrom).from}${fromSeparator}${f(d)}`
    : f;
};
