import { formatFASTA } from 'franklin-sites';

import { UniProtkbAPIModel, EntryType } from './uniProtkbConverter';
import { APISequenceData } from '../../tools/blast/types/apiSequenceData';

type Subset = { start: number; end: number };

type Modifications = { subsets: Subset[] }; // keep open for variant for example?

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
  entry: UniProtkbAPIModel | APISequenceData,
  modifications?: Modifications
): string => {
  let sequence = entry.sequence.value || '';

  const subsets = [];
  // if any change is required on the sequence, do it here
  if (modifications) {
    if (modifications.subsets) {
      let subsetSequence = '';
      for (const { start, end } of modifications.subsets) {
        subsetSequence += sequence.slice(start - 1, end);
        subsets.push(`${start}-${end}`);
      }
      sequence = subsetSequence;
    }
  }

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
    let optionalSubset = '';
    if (subsets.length) {
      optionalSubset = `|${subsets.join(',')}`;
    }
    sequence = `>${db}|${entry.primaryAccession}|${entry.uniProtkbId}${optionalSubset} ${optionalProteinName}${optionalOS}${optionalOX}${optionalGN}PE=${pe} ${optionalSV}\n${sequence}`;
  } catch {
    /* */
  }
  return formatFASTA(sequence);
};

export default entryToFASTAWithHeaders;
