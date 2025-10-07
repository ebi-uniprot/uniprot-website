// The regex that matches uniprot accession. Taken from:
// https://www.uniprot.org/help/accession_numbers
// NOTE: modified to use a non-capturing group with "?:"
export const reUniProtKBAccession =
  /[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9](?:[A-Z][A-Z0-9]{2}[0-9]){1,2}/i;
export const reUniProtKBAccessionWithIsoform = new RegExp(
  `(?:${reUniProtKBAccession.source})(?:-[0-9]+)?`,
  'i'
);
export const reUniRefAccession = /UniRef(?:50|90|100)_[\w|-]+/i;
export const reUniParc = /UPI[\w]{10}/i;

export const reACNonCapture = new RegExp(
  `AC ${reUniProtKBAccession.source}`,
  'i'
);
export const reAC = new RegExp(
  `AC (?<uniprotkbAccession>${reUniProtKBAccession.source})`,
  'i'
);
export const reIsoform = /\bisoform [\w-]+/i;

const rePubMedID = /\d{7,8}/;
export const rePubMedCapture = new RegExp(
  `pubmed:(?<pmid>${rePubMedID.source})`,
  'i'
);
const rePubMedNonCapture = new RegExp(`pubmed:${rePubMedID.source}`, 'i');
const reDbSnpID = /rs\d+/;
export const reDbSnpCapture = new RegExp(
  `dbSNP:(?<rsid>${reDbSnpID.source})`,
  'i'
);
const reDbSnpNonCapture = new RegExp(`dbSNP:${reDbSnpID.source}`, 'i');
export const reSubscript = /\(\d+\)/;
export const reSuperscript = /\(\d?[+-]\)|\(-\d\)/;

// Tokens that can be embedded within word characters
const tokensWithinText = `(?:${[
  reSubscript.source,
  reSuperscript.source,
  reIsoform.source,
  'By similarity',
].join('|')})`;

// Tokens that must be delimited eg shouldn't find P05067 within AP05067_
// Lookbehind and lookahead now supported by Safari (and all other major browsers)
const tokensOutsideText = `(?:(?<=^|\\W)(?:${[
  rePubMedNonCapture.source,
  reACNonCapture.source,
  reDbSnpNonCapture.source,
].join('|')})(?=\\W|$))`;

const reNeedsTextProcessing = new RegExp(
  `(${tokensWithinText}|${tokensOutsideText})`,
  'i'
);

export const getTextProcessingParts = (s?: string) =>
  // Don't use capture groups in reNeedsTextProcessing
  s?.split(reNeedsTextProcessing);
