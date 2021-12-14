import UniProtKBEntryConfig from '../config/UniProtEntryConfig';

import {
  UniProtkbUIModel,
  UniProtkbAPIModel,
} from '../adapters/uniProtkbConverter';
import { GeneNamesData } from '../adapters/namesAndTaxonomyConverter';

import { Property, PropertyKey } from '../types/modelTypes';

export const hasExternalLinks = (transformedData: UniProtkbUIModel) =>
  UniProtKBEntryConfig.some(({ id }) => {
    const data = transformedData[id];
    return Boolean(data.xrefData?.length);
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

export const getListOfIsoformAccessions = (data?: UniProtkbAPIModel) => {
  // will push all isoform accessions in this variable
  const out: string[] = [];
  if (!(data && 'comments' in data && data.comments)) {
    return out;
  }
  for (const comment of data.comments) {
    // filter out all the non-"Alternative Products" comments
    if (comment.commentType !== 'ALTERNATIVE PRODUCTS') {
      continue; // eslint-disable-line no-continue
    }
    for (const isoform of comment.isoforms) {
      for (const isoformId of isoform.isoformIds) {
        if (isoformId) {
          out.push(isoformId);
        }
      }
    }
  }
  return out;
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
// NOTE: modifined to use a non-capturing group with ?:
export const uniProtKBAccessionRE =
  /[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9](?:[A-Z][A-Z0-9]{2}[0-9]){1,2}/i;

export const acRE = new RegExp(`(AC ${uniProtKBAccessionRE.source})`, 'i');
