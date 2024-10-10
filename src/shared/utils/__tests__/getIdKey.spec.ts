import { getIdKeyForData, getIdKeyForNamespace } from '../getIdKey';

import arbaModelData from '../../../automatic-annotations/arba/__mocks__/arbaModelData';
import citationsModelData from '../../../supporting-data/citations/__mocks__/citationsModelData';
import databaseModelData from '../../../supporting-data/database/__mocks__/databaseModelData';
import diseasesModelData from '../../../supporting-data/diseases/__mocks__/diseasesModelData';
import idMappingModelData from '../../../tools/id-mapping/components/results/__mocks__/SimpleMapping';
import keywordsModelData from '../../../supporting-data/keywords/__mocks__/keywordsModelData';
import locationsModelData from '../../../supporting-data/locations/__mocks__/locationsModelData';
import proteomesEntryModelData from '../../../proteomes/__mocks__/proteomesEntryModelData';
import taxonomyModelData from '../../../supporting-data/taxonomy/__mocks__/taxonomyModelData';
import uniparcModelData from '../../../uniparc/__mocks__/uniParcEntryModelData';
import uniprotkbModelData from '../../../uniprotkb/__mocks__/uniProtKBEntryModelData';
import unirefModelData from '../../../uniref/__mocks__/uniRefResultsData';
import uniruleModelData from '../../../automatic-annotations/unirule/__mocks__/uniRuleModelData';

import { APIModel } from '../../types/apiModel';
import { Namespace } from '../../types/namespaces';
import { MappingAPIModel } from '../../../tools/id-mapping/types/idMappingSearchResults';
import { UniRefLiteAPIModel } from '../../../uniref/adapters/uniRefConverter';

const testCases: [Namespace, APIModel, string][] = [
  [Namespace.arba, arbaModelData[0], 'ARBA00020180'],
  [Namespace.citations, citationsModelData[0], 'CI-7TL41NBKJTRQJ'],
  [Namespace.database, databaseModelData[0], 'DB-0022'],
  [Namespace.diseases, diseasesModelData[0], 'DI-01559'],
  [
    Namespace.idmapping,
    idMappingModelData.results[0] as MappingAPIModel,
    'Q9Z0H0||ENSMUSG00000029283',
  ],
  [Namespace.keywords, keywordsModelData[0], 'KW-0021'],
  [Namespace.locations, locationsModelData[0], 'SL-0037'],
  [Namespace.proteomes, proteomesEntryModelData, 'UP000005640'],
  [Namespace.taxonomy, taxonomyModelData[0], '37299'],
  [Namespace.uniparc, uniparcModelData, 'UPI0000000001'],
  [
    Namespace.uniprotkb,
    { ...uniprotkbModelData, from: 'fromId' },
    'fromId||P21802',
  ],
  [
    Namespace.uniref,
    unirefModelData.results[0] as UniRefLiteAPIModel,
    'UniRef50_A0A3E1E969',
  ],
  [Namespace.unirule, uniruleModelData[0], 'UR000048432'],
];

describe('getIdKeyForNamespace', () => {
  test.each(testCases)(
    'should get correct id key using namespace: %s',
    (namespace, data, id) => {
      expect(getIdKeyForNamespace(namespace)(data)).toEqual(id);
    }
  );
});

describe('getIdKeyForData', () => {
  test.each(testCases)(
    'should get correct id key using data for namespace: %s',
    (_namespace, data, id) => {
      expect(getIdKeyForData(data)(data)).toEqual(id);
    }
  );
});
