import { ProteinsAPIVariation } from 'protvista-variation-adapter/dist/es/variants';

// Source: https://www.ebi.ac.uk/proteins/api/variation/P0DPR3
// Retrieved: 2024-12-10
const data = {
  accession: 'P0DPR3',
  entryName: 'TRDD1_HUMAN',
  proteinName: 'T cell receptor delta diversity 1',
  geneName: 'TRDD1',
  organismName: 'Homo sapiens',
  proteinExistence: 'Evidence at protein level',
  sequence: 'EI',
  sequenceChecksum: '6943266395824062464',
  sequenceVersion: 1,
  taxid: 9606,
  features: [],
};

export default data as ProteinsAPIVariation;
