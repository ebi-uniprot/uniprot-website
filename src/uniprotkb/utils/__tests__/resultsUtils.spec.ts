import {
  getSortableColumnToSortColumn,
  sortInteractionData,
} from '../resultsUtils';

import { ReceivedFieldData } from '../../types/resultsTypes';

import resultFields from '../../__mocks__/resultFields';
import { Interactant } from '../../adapters/interactionConverter';

describe('getSortableColumnToSortColumn', () => {
  it('should return columns with the sortField property', () => {
    const sortableColumnToSortColumn = getSortableColumnToSortColumn(
      resultFields as ReceivedFieldData
    );
    expect(Array.from(sortableColumnToSortColumn)).toEqual([
      ['accession', 'accession'],
      ['id', 'id'],
      ['gene_names', 'gene'],
      ['organism_name', 'organism_name'],
      ['protein_name', 'protein_name'],
      ['length', 'length'],
      ['mass', 'mass'],
      ['annotation_score', 'annotation_score'],
    ]);
  });

  it('should sort interaction data properly', () => {
    const orderedData = sortInteractionData(
      new Map<string, Interactant | string>([
        ['AB', { intActId: 'A', geneName: 'AB' }],
        ['C', { intActId: 'C' }],
        ['AA', { intActId: 'A', geneName: 'AA' }],
        ['A', 'self'],
      ])
    );
    expect(orderedData).toEqual([
      'self',
      { intActId: 'C' },
      { intActId: 'A', geneName: 'AA' },
      { intActId: 'A', geneName: 'AB' },
    ]);
  });
});
