import { extractFromFreeText } from '../KineticsTableView';

import mock from './__mocks__/kineticsData';

describe('Kinetics section', () => {
  it('should return respective rows for KM', () => {
    const { km } = extractFromFreeText(mock.data1);
    expect(km).toHaveLength(1);

    const kmObj = km[0];
    expect(kmObj).toMatchSnapshot();
  });

  it('Kcat values are shown in notes', () => {
    const { notes } = extractFromFreeText(mock.data2);
    expect(notes).toMatchSnapshot();

    const { notes: kcatNotes } = extractFromFreeText(mock.data3);
    expect(kcatNotes).toMatchSnapshot();
  });
});
