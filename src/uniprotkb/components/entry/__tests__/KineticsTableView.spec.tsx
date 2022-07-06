import { extractFromFreeText } from '../KineticsTableView';

import mock from './__mocks__/kineticsData';

describe('Kinetics section', () => {
  it('should return respective rows for KM', () => {
    const { km } = extractFromFreeText(mock.data1);
    expect(km).toHaveLength(1);

    const kmObj = km[0];
    expect(kmObj).toMatchSnapshot();
  });

  it('Additional notes contain kcat expceptional case while kcat is empty', () => {
    const { kcats, additionalNotes } = extractFromFreeText(mock.data2);

    expect(kcats).toHaveLength(0);
    expect(additionalNotes).toMatchSnapshot();
  });

  it('Kcats should be populated when one or more values are combined in a sentence', () => {
    const { kcats, additionalNotes } = extractFromFreeText(mock.data3);

    expect(kcats).toHaveLength(2);
    expect(additionalNotes).toHaveLength(0);

    expect(kcats[0]).toMatchSnapshot();

    expect(kcats[1]).toMatchSnapshot();
  });
});
