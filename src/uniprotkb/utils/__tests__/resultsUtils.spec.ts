import {
  getParamsFromURL,
  getSortableColumnToSortColumn,
  sortInteractionData,
} from '../resultsUtils';

import { ReceivedFieldData } from '../../types/resultsTypes';

import resultFields from '../../__mocks__/resultFields';
import { Interactant } from '../../adapters/interactionConverter';
import { InteractionType } from '../../types/commentTypes';
import { Namespace } from '../../../shared/types/namespaces';

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
      new Map<string, Interactant | InteractionType.SELF>([
        ['AB', { intActId: 'A', geneName: 'AB' }],
        ['C', { intActId: 'C' }],
        ['AA', { intActId: 'A', geneName: 'AA' }],
        ['A', InteractionType.SELF],
      ])
    );
    expect(orderedData).toEqual([
      InteractionType.SELF,
      { intActId: 'C' },
      { intActId: 'A', geneName: 'AA' },
      { intActId: 'A', geneName: 'AB' },
    ]);
  });
});

describe('getParamsFromURL', () => {
  it('should get parameters from URL', () => {
    expect(
      getParamsFromURL(
        '?query=*&sort=id&dir=ascend&fields=accession,reviewed,id&view=table',
        Namespace.uniprotkb
      )
    ).toEqual([
      {
        query: '*',
        selectedFacets: [],
        sortColumn: 'id',
        sortDirection: 'ascend',
        direct: false,
        columns: ['accession', 'reviewed', 'id'],
        viewMode: 'table',
      },
      [],
      [],
    ]);
  });
  it('should get parameters, invalid values, unknown params from URL', () => {
    expect(
      getParamsFromURL(
        '?query=*&sort=id&dir=ascend&fields=accession,reviewed,id,foo&view=table&bar=baz',
        Namespace.uniprotkb
      )
    ).toEqual([
      {
        query: '*',
        selectedFacets: [],
        sortColumn: 'id',
        sortDirection: 'ascend',
        direct: false,
        columns: ['accession', 'reviewed', 'id'],
        viewMode: 'table',
      },
      [{ parameter: 'columns', value: ['foo'] }],
      ['bar'],
    ]);
  });
});
