import { getGoCamStructures } from '../GoCam';

describe('getGoCamStructures', () => {
  it('should get GO-CAM structures', () => {
    const allGoCamIdsResponse = [
      {
        gocam: 'http://model.geneontology.org/66b5638000002630',
        title: 'GRIM1 activates GRID1 via GNAQ in dopamine neurons (Human).',
      },
      {
        gocam: 'http://model.geneontology.org/66c7d41500000057',
        title: 'GRID1 acts as GABA receptor. (Human)',
      },
    ];

    const goCamIdToItem = new Map([
      [
        '66b5638000002630',
        {
          id: '66b5638000002630',
          label: 'GRIM1 activates GRID1 via GNAQ in dopamine neurons (Human).',
        },
      ],
      [
        '66c7d41500000057',
        {
          id: '66c7d41500000057',
          label: 'GRID1 acts as GABA receptor. (Human)',
        },
      ],
    ]);
    expect(getGoCamStructures(allGoCamIdsResponse)).toEqual(goCamIdToItem);
  });
});
