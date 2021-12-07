import { formatFASTA } from 'franklin-sites';

import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { UniRefAPIModel } from '../../uniref/adapters/uniRefConverter';
import {
  getEntryTypeFromString,
  EntryType,
} from '../components/entry/EntryTypeIcon';
import { APISequenceData } from '../../tools/blast/types/apiSequenceData';

type Subset = { start: number; end: number };

type Modifications = { subsets: Subset[] }; // keep open for variant for example?

// build a "nicely"-formatted FASTA string
// See https://www.uniprot.org/help/fasta-headers for current headers
const entryToFASTAWithHeaders = (
  entry: UniProtkbAPIModel | UniParcAPIModel | APISequenceData | UniRefAPIModel,
  modifications?: Modifications
): string => {
  let sequence =
    ('representativeMember' in entry
      ? entry.representativeMember.sequence.value
      : entry.sequence.value) || '';

  const subsets = [];
  // if any change is required on the sequence, do it here
  if (modifications) {
    if (modifications.subsets.length) {
      let subsetSequence = '';
      for (const { start, end } of modifications.subsets) {
        subsetSequence += sequence.slice(start - 1, end);
        subsets.push(`${start}-${end}`);
      }
      sequence = subsetSequence;
    }
  }

  try {
    if ('uniParcId' in entry) {
      // UniParc entry
      sequence = `>${entry.uniParcId}${
        entry.uniParcCrossReferences
          ? ` status=${entry.uniParcCrossReferences.some(
              (xref) => xref.active
            )}`
          : ''
      }\n${sequence}`;
    } else if ('representativeMember' in entry) {
      // UniRef entry
      sequence = `>${entry.id} ${entry.name.replace('Cluster: ', '')} n=${
        entry.memberCount
      } Tax=${entry.commonTaxon} TaxID=${entry.commonTaxonId} RepID=${
        entry.representativeMember.memberId
      }\n${sequence}`;
    } else {
      // UniProtKB entry
      let db;
      switch (getEntryTypeFromString(entry.entryType)) {
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
    }
  } catch {
    // empty header 🤷🏽‍♂️
    sequence = `>\n${sequence}`;
  }
  return formatFASTA(sequence);
};

export default entryToFASTAWithHeaders;
