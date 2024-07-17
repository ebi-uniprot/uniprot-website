import {
  escapeInvalidSearchFieldQueryWithColon,
  getSortableColumnToSortColumn,
  isInvalidSearchFieldQueryWithColon,
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

describe('isInvalidSearchFieldQueryWithColon', () => {
  it('should return true with invalid field error and colon in query string', () => {
    expect(
      isInvalidSearchFieldQueryWithColon(
        'PTHR34313:SF2',
        ["'PTHR34313' is not a valid search field"],
        Namespace.uniprotkb
      )
    ).toBe(true);
  });
  it('should return false when there are no API error message', () => {
    expect(
      isInvalidSearchFieldQueryWithColon(
        'PTHR34313:SF2',
        [],
        Namespace.uniprotkb
      )
    ).toBe(false);
  });
  it('should return false when not in uniprotkb namespace', () => {
    expect(
      isInvalidSearchFieldQueryWithColon(
        'PTHR34313:SF2',
        ["'PTHR34313' is not a valid search field"],
        Namespace.uniparc
      )
    ).toBe(false);
  });
  it('should return false when not in uniprotkb namespace', () => {
    expect(
      isInvalidSearchFieldQueryWithColon('P05067', ['foo'], Namespace.uniprotkb)
    ).toBe(false);
  });
});

describe('escapeInvalidSearchFieldQueryWithColon', () => {
  it('should return escaped colon in query string', () => {
    expect(escapeInvalidSearchFieldQueryWithColon('PTHR34313:SF2')).toBe(
      'PTHR34313\\:SF2'
    );
  });
});
