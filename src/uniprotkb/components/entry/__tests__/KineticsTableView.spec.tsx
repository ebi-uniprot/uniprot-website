import { extractFromFreeText } from '../KineticsTableView';

import mock from './__mocks__/kineticsData';

describe('Kinetics section', () => {
  it('should return respective rows for KM', () => {
    const { km } = extractFromFreeText(mock.data1);
    expect(km).toHaveLength(1);

    const kmObj = km[0];
    expect(kmObj).toMatchSnapshot({
      constant: '438 μM',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          id: '24343376',
          source: 'PubMed',
        },
      ],
      key: '438ATP (at 42 degrees Celsius, pH 8 and 2 M NaCl)',
      notes: '   2 M NaCl',
      ph: '8',
      substrate: 'ATP',
      temp: '42',
    });
  });

  it('Additional notes contain kcat expceptional case while kcat is empty', () => {
    const { kcats, additionalNotes } = extractFromFreeText(mock.data2);

    expect(kcats).toHaveLength(0);
    expect(additionalNotes).toEqual([
      'kcat is 118.44 min(-1) and 20.80 min (-1) for glyoxalase activity with glyoxal (GO) and methylglyoxal (MGO) as substrate, respectively (at pH 7.4 and 37 degrees Celsius) (PubMed:26678554)',
      'The apparent kcat of MGO and GO degradation is 0.29 sec(-1), and 0.42 sec(-1), respectively (at 22 degrees Celsius) (PubMed:26774339).',
    ]);
  });

  it('Kcats should be populated when one or more values are combined in a sentence', () => {
    const { kcats, additionalNotes } = extractFromFreeText(mock.data3);

    expect(kcats).toHaveLength(2);
    expect(additionalNotes).toHaveLength(0);

    expect(kcats[0]).toMatchObject({
      constant: '4.5 min(-1)',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          id: '10606519',
          source: 'PubMed',
        },
      ],
      key: 'kcat4.5 min(-1)',
      notes: ' with arsenate as substrate  2 uM arsenate',
      ph: undefined,
      temp: undefined,
    });

    expect(kcats[1]).toMatchObject({
      constant: '9.9 min(-1)',
      evidences: [
        {
          evidenceCode: 'ECO:0000269',
          id: '10606519',
          source: 'PubMed',
        },
      ],
      key: 'kcat9.9 min(-1)',
      notes: ' with arsenate as substrate  10 mM arsenate',
      ph: undefined,
      temp: undefined,
    });
  });
});
