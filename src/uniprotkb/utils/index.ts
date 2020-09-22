import UniProtKBEntryConfig from '../config/UniProtEntryConfig';

import { UniProtkbUIModel } from '../adapters/uniProtkbConverter';
import { GeneNamesData } from '../adapters/namesAndTaxonomyConverter';

import { Property, PropertyKey } from '../types/modelTypes';

export const hasExternalLinks = (transformedData: UniProtkbUIModel) =>
  UniProtKBEntryConfig.some(({ name }) => {
    const data = transformedData[name];
    return typeof data.xrefData && data.xrefData.length > 0;
  });

export const flattenGeneNameData = (geneNamesData: GeneNamesData) => {
  const geneNames = new Set<string>();
  geneNamesData.forEach(
    ({ geneName, synonyms = [], orfNames = [], orderedLocusNames = [] }) => {
      if (geneName) {
        geneNames.add(geneName.value);
      }
      [synonyms, orfNames, orderedLocusNames].forEach((names) => {
        names.forEach(({ value }) => {
          geneNames.add(value);
        });
      });
    }
  );
  return Array.from(geneNames);
};

export const transfromProperties = (properties: Property[]) => {
  const o: { [key: string]: string } = {};
  properties.forEach(({ key, value }) => {
    if (key && value) {
      o[key] = value;
    }
  });
  return o;
};

// This function is useful because our API returns arrays of objects of shape: { key: x, value: y}
export const getPropertyValue = (
  properties: Property[],
  propertyKey: PropertyKey
) => {
  const found = properties.find(({ key }) => key === propertyKey);
  return found ? found.value : null;
};

// The regex that matches uniprot accession. Taken from:
// https://www.uniprot.org/help/accession_numbers
export const uniProtKBAccessionRegEx = /[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}/i;
