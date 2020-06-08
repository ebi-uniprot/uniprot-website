import { getSortableColumnToSortColumn } from '../resultsUtils';
import resultFields from '../../__mocks__/resultFields.json';

describe('getSortableColumnToSortColumn', () => {
  it('should return columns with the sortField property', () => {
    const sortableColumnToSortColumn = getSortableColumnToSortColumn(
      resultFields
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
});
