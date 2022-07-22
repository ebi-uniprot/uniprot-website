import { formatFASTA } from 'franklin-sites';

import * as logging from './logging';

import { stringifyModifications, Modifications } from './modifications';

import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import {
  UniRefAPIModel,
  UniRefLiteAPIModel,
} from '../../uniref/adapters/uniRefConverter';
import {
  getEntryTypeFromString,
  EntryType,
} from '../components/entry/EntryTypeIcon';
import { APISequenceData } from '../../tools/blast/types/apiSequenceData';

// build a "nicely"-formatted FASTA string
// See https://www.uniprot.org/help/fasta-headers for current headers
const entryToFASTAWithHeaders = (
  entry:
    | UniProtkbAPIModel
    | UniParcAPIModel
    | APISequenceData
    | UniRefAPIModel
    | UniRefLiteAPIModel,
  modifications?: Modifications
): string => {
  let sequence =
    ('representativeMember' in entry
      ? entry.representativeMember.sequence.value
      : entry.sequence.value) || '';

  // if any change is required on the sequence, do it here
  if (modifications?.subsets?.length) {
    let subsetSequence = '';
    for (const { start, end } of modifications.subsets) {
      subsetSequence += sequence.slice(start - 1, end);
    }
    sequence = subsetSequence;
  }
  // NOTE: doesn't really make sense to use subset & variations together
  if (modifications?.variations?.length) {
    // when applying multiple variations, keep track of sequence size changes
    let sizeDiff = 0;
    for (const { start, end, replacement } of modifications.variations) {
      const before = sequence.substring(0, start - 1 + sizeDiff);
      const after = sequence.substring(end + sizeDiff);
      sequence = before + (replacement === '-' ? '' : replacement) + after;
      // calculate by how much the sequence changed to apply right variations
      sizeDiff = end - start + 1;
      if (replacement !== '-') {
        sizeDiff += replacement.length;
      }
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
      } Tax=${entry.commonTaxon.scientificName} TaxID=${
        entry.commonTaxon.taxonId
      } RepID=${entry.representativeMember.memberId}\n${sequence}`;
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
      if (modifications?.subsets || modifications?.variations) {
        optionalSubset = `|${stringifyModifications(modifications)}`;
      }
      sequence = `>${db}|${entry.primaryAccession}|${entry.uniProtkbId}${optionalSubset} ${optionalProteinName}${optionalOS}${optionalOX}${optionalGN}PE=${pe} ${optionalSV}\n${sequence}`;
    }
  } catch {
    logging.warn(`Couldn't generate a FASTA header`);
    // empty header 🤷🏽‍♂️
    sequence = `>\n${sequence}`;
  }
  return formatFASTA(sequence);
};

export default entryToFASTAWithHeaders;
