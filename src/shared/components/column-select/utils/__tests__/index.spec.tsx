import { prepareFieldData, getFieldDataForColumns } from '..';

import { UniProtKBColumn } from '../../../../../uniprotkb/types/columnTypes';

import fieldData from './__mocks__/fieldData';

describe('prepareFieldData', () => {
  test('should return prepared field data', () => {
    expect(prepareFieldData(fieldData)).toEqual({
      Data: [
        {
          id: 'names_&_taxonomy',
          items: [
            {
              id: 'gene_names',
              key: 'names_&_taxonomy/gene_names',
              label: 'Gene Names',
            },
          ],
          title: 'Names & Taxonomy',
        },
      ],
      'External links': [
        {
          id: 'sequence',
          items: [
            {
              id: 'xref_ccds',
              key: 'sequence/ccds',
              label: 'CCDS',
            },
          ],
          title: 'Sequence',
        },
      ],
    });
  });

  test('should exclude column', () => {
    expect(prepareFieldData(fieldData, [UniProtKBColumn.geneNames])).toEqual({
      'External links': [
        {
          id: 'sequence',
          items: [
            {
              id: 'xref_ccds',
              key: 'sequence/ccds',
              label: 'CCDS',
            },
          ],
          title: 'Sequence',
        },
      ],
    });
  });
});

describe('getFieldDataForColumns', () => {
  const prepared = prepareFieldData(fieldData);
  test('should get field data for "data" column', () => {
    expect(
      getFieldDataForColumns([UniProtKBColumn.geneNames], prepared)
    ).toEqual([
      {
        accordionId: 'names_&_taxonomy',
        itemId: 'gene_names',
        label: 'Gene Names',
        tabId: 'Data',
      },
    ]);
  });
  test('should get field data for "links" column and deal with nonexistent data tab value', () => {
    expect(
      getFieldDataForColumns([UniProtKBColumn.xrefCcds], {
        ...prepared,
        Data: undefined,
      })
    ).toEqual([
      {
        accordionId: 'sequence',
        itemId: 'xref_ccds',
        label: 'CCDS',
        tabId: 'External links',
      },
    ]);
  });
});
