import { Namespace } from '../types/namespaces';
import { JobTypes } from '../../tools/types/toolsJobTypes';

const titles: Record<Namespace | JobTypes, string> = {
  // Main data
  [Namespace.uniprotkb]: 'UniProtKB',
  [Namespace.uniref]: 'UniRef',
  [Namespace.uniparc]: 'UniParc',
  [Namespace.proteomes]: 'Proteomes',
  // Supporting data
  [Namespace.taxonomy]: 'Taxonomy',
  [Namespace.keywords]: 'Keywords',
  [Namespace.citations]: 'Literature citations',
  [Namespace.diseases]: 'Human diseases',
  [Namespace.database]: 'Cross-referenced databases',
  [Namespace.locations]: 'Subcellular locations',
  [Namespace.idmapping]: 'ID mapping',
  // Tools
  [JobTypes.ID_MAPPING]: 'Retrieve/ID mapping',
  [JobTypes.ALIGN]: 'Align',
  [JobTypes.BLAST]: 'BLAST',
  [JobTypes.PEPTIDE_SEARCH]: 'Peptide search',
};

export default titles;
