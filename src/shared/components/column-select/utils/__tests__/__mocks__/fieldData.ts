import { type ReceivedFieldData } from '../../../../../../uniprotkb/types/resultsTypes';

const mock = [
  {
    groupName: 'Names & Taxonomy',
    isDatabaseGroup: false,
    id: 'names_&_taxonomy',
    fields: [
      {
        label: 'Gene Names',
        name: 'gene_names',
        sortField: 'gene',
        id: 'names_&_taxonomy/gene_names',
      },
    ],
  },
  {
    groupName: 'Sequence',
    isDatabaseGroup: true,
    id: 'sequence',
    fields: [
      {
        label: 'CCDS',
        name: 'xref_ccds',
        id: 'sequence/ccds',
      },
    ],
  },
];

export default mock as ReceivedFieldData;
