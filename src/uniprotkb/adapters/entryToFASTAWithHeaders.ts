import { UniProtkbAPIModel, EntryType } from './uniProtkbConverter';
import { APISequenceData } from '../../tools/blast/types/apiSequenceData';

// const CHUNK_OF_TEXT_OF_SIXTY_CHARACTERS = /(.{1,60})/g;
// const CHUNK_OF_TEXT_OF_TEN_CHARACTERS = /(.{1,10})/g;

// NOTE: if we decide to do formatting here, use formatting logic from franklin
// .split(CHUNK_OF_TEXT_OF_SIXTY_CHARACTERS)
// .filter(Boolean)
// .map((line) =>
//   line.replace(CHUNK_OF_TEXT_OF_TEN_CHARACTERS, '$1 ').trim()
// )
// .join('\n');
// build a "nicely"-formatted FASTA string
// See https://www.uniprot.org/help/fasta-headers for current headers
const entryToFASTAWithHeaders = (
  entry: UniProtkbAPIModel | APISequenceData
): string => {
  let sequence = entry.sequence.value || '';
  try {
    let db;
    switch (entry.entryType) {
      case EntryType.REVIEWED:
        db = 'sp';
        break;
      case EntryType.UNREVIEWED:
        db = 'tr';
        break;
      default:
        db = '??';
    }
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
      optionalSV = `SV=${entry.entryAudit.sequenceVersion}`;
    }
    sequence = `>${db}|${entry.primaryAccession}|${entry.uniProtkbId} ${optionalProteinName}${optionalOS}${optionalOX}${optionalGN}PE=${pe} ${optionalSV}\n${sequence}`;
  } catch {
    /* */
  }
  return sequence;
};

export default entryToFASTAWithHeaders;
