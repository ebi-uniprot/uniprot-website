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

export const reNeedsTextProcessing = new RegExp(
  `(${rePubMedNonCapture.source}|${reAC.source}|${reIsoform.source}|By similarity|${reSubscript.source}|${reSuperscript.source}|${reDbSnpNonCapture.source})`,
  'i'
);

export const getTextProcessingParts = (s?: string) =>
  // Capturing group will allow split to conserve that bit in the split parts
  // NOTE: rePubMed and reAC should be using a lookbehind eg `/(?<=pubmed:)(\d{7,8})/i` but
  // it is not supported in Safari yet. It's OK, we just get more chunks when splitting.
  // For now don't use capture groups in reNeedsTextProcessing
  s?.split(reNeedsTextProcessing);
