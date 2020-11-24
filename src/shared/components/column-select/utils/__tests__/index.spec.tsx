import { removeFieldFromFieldsData } from '..';
import { UniProtKBColumn } from '../../../../../uniprotkb/types/columnTypes';
import { ColumnSelectTab } from '../../../../../uniprotkb/types/resultsTypes';
import structuredResultFieldsData from './__mocks__/structuredResultFieldsData.json';

describe('removeFieldFromFieldsData', () => {
  test('should remove field', () => {
    const entryField = {
      tabId: ColumnSelectTab.data,
      accordionId: 'Names & Taxonomy',
      itemId: UniProtKBColumn.accession,
    };
    expect(
      removeFieldFromFieldsData(entryField, structuredResultFieldsData)
    ).toEqual({
      [ColumnSelectTab.data]: [
        {
          id: 'Names & Taxonomy',
          title: 'title',
          items: [
            {
              id: UniProtKBColumn.ccAllergen,
              label: 'ccAllergen-label',
            },
          ],
        },
      ],
      [ColumnSelectTab.links]: [
        {
          id: 'Sequence',
          title: 'title',
          items: [
            {
              id: UniProtKBColumn.xrefAbcd,
              label: 'xrefAbcd-label',
            },
          ],
        },
      ],
    });
  });
});
