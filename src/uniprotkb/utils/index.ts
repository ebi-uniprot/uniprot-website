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
    return Boolean('xrefData' in data && data.xrefData?.length);
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

export const stringToID = (str: string) => str.replace(/\s/g, '_');

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
// NOTE: modified to use a non-capturing group with "?:"
export const reUniProtKBAccession =
  /[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9](?:[A-Z][A-Z0-9]{2}[0-9]){1,2}/i;

export const reAC = new RegExp(`(?:AC ${reUniProtKBAccession.source})`, 'i');
export const reIsoform = /\bisoform [\w-]+/i;
const rePubMedID = /\d{7,8}/;
export const rePubMedCapture = new RegExp(
  `pubmed:(?<pmid>${rePubMedID.source})`,
  'i'
);
export const rePubMedNonCapture = new RegExp(
  `pubmed:${rePubMedID.source}`,
  'i'
);
const reDbSnpID = /rs\d+/;
export const reDbSnpCapture = new RegExp(
  `dbSNP:(?<rsid>${reDbSnpID.source})`,
  'i'
);
export const reDbSnpNonCapture = new RegExp(`dbSNP:${reDbSnpID.source}`, 'i');
export const reSubscript = /\(\d+\)/;
export const reSuperscript = /\(\d?[+-]\)|\(-\d\)/;

const reNeedsTextProcessing = new RegExp(
  `(${rePubMedNonCapture.source}|${reAC.source}|${reIsoform.source}|By similarity|${reSubscript.source}|${reSuperscript.source}|${reDbSnpNonCapture.source})`,
  'i'
);

export const getTextProcessingParts = (s?: string) =>
  // Capturing group will allow split to conserve that bit in the split parts
  // NOTE: rePubMed and reAC should be using a lookbehind eg `/(?<=pubmed:)(\d{7,8})/i` but
  // it is not supported in Safari yet. It's OK, we just get more chunks when splitting.
  // For now don't use capture groups in reNeedsTextProcessing
  s?.split(reNeedsTextProcessing);

type Sortable = { start: number | string; end: number | string };
export const sortByLocation = (a: Sortable, b: Sortable) => {
  const aStart = +a.start;
  const aEnd = a.end ? +a.end : -Infinity;
  const bStart = +b.start;
  const bEnd = b.end ? +b.end : -Infinity;
  if (aStart === bStart) {
    return aEnd - bEnd;
  }
  return aStart - bStart;
};
