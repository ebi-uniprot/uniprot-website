import { UniProtkbAPIModel } from './uniProtkbConverter';

const entryToFASTAWithHeaders = (entry: UniProtkbAPIModel): string => {
  let sequence = entry.sequence.value;
  try {
    const db = entry.entryType.includes('unreviewed') ? 'tr' : 'sp';
    let optionalProteinName = '';
    if (entry?.proteinDescription?.recommendedName?.fullName) {
      optionalProteinName = `${entry.proteinDescription.recommendedName.fullName.value} `;
    }
    let optionalOS = '';
    if (entry?.organism?.scientificName) {
      optionalOS = `OS=${entry.organism.scientificName} `;
    }
    let optionalOX = '';
    if (entry?.organism?.taxonId) {
      optionalOX = `OX=${entry.organism.taxonId} `;
    }
    let optionalGN = '';
    if (entry.genes?.[0]?.geneName?.value) {
      optionalGN = `GN=${entry.genes[0].geneName.value} `;
    }
    const pe = entry.proteinExistence[0];
    let optionalSV = '';
    if (entry?.entryAudit?.sequenceVersion) {
      optionalSV = `SV=${entry.entryAudit.sequenceVersion} `;
    }
    sequence = `>${db}|${entry.primaryAccession}|${entry.uniProtkbId} ${optionalProteinName}${optionalOS}${optionalOX}${optionalGN}PE=${pe} ${optionalSV}\n${sequence}`;
  } catch {
    /* */
  }
  return sequence;
};

export default entryToFASTAWithHeaders;
