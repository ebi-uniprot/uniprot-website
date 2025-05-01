import { GoCamModelInfo } from '../../../types/goCamTypes';
import { getGoCamStructures, isUniprotCurated } from '../GoCam';
import gomodel5e72450500001269 from './__mocks__/goCam/5e72450500001269';
import gomodel654d809000001587 from './__mocks__/goCam/654d809000001587';
import gomodel6446bfcb00001774 from './__mocks__/goCam/6446bfcb00001774';
import gomodel65288b2200000194 from './__mocks__/goCam/65288b2200000194';
import gomodel67369e7600002132 from './__mocks__/goCam/67369e7600002132';
import models from './__mocks__/goCam/models';

describe('getGoCamStructures', () => {
  it('should get GO-CAM structures', () => {
    const goCamIdToItem = new Map([
      [
        '5e72450500001269',
        {
          id: '5e72450500001269',
          label: 'PMID:31006538_LN_enabled by TEX264 Hsap',
        },
      ],
      [
        '6446bfcb00001774',
        { id: '6446bfcb00001774', label: 'Autophagosome assembly (Human)' },
      ],
      [
        '65288b2200000194',
        {
          id: '65288b2200000194',
          label:
            'STING1 acts as a proton channel and promotes autophagosome assembly (Human)',
        },
      ],
      [
        '654d809000001587',
        {
          id: '654d809000001587',
          label:
            'Atg7-mediated  autophagosome assembly via ATM-CHK2-TRIM32 axis',
        },
      ],
      [
        '67369e7600002132',
        {
          id: '67369e7600002132',
          label:
            'IRGQ promotes degradation of misfolded MHC class I proteins b promoting their degradation by autophagy (Human).',
        },
      ],
      [
        '6796b94c00001787',
        {
          id: '6796b94c00001787',
          label:
            'RAB33B recruitment of ATG16L1-ATG12-ATG5 complex to phagophore (Human)',
        },
      ],
    ]);
    expect(getGoCamStructures(models)).toEqual(goCamIdToItem);
  });
});

describe('isUniprotCurated', () => {
  it('should determine if a GO-CAM model is UniProt curated', () => {
    const goCamModelInfo: {
      id: string;
      data: GoCamModelInfo;
    }[] = [
      { id: '5e72450500001269', data: gomodel5e72450500001269 },
      { id: '6446bfcb00001774', data: gomodel6446bfcb00001774 },
      { id: '65288b2200000194', data: gomodel65288b2200000194 },
      { id: '654d809000001587', data: gomodel654d809000001587 },
      { id: '67369e7600002132', data: gomodel67369e7600002132 },
    ];

    expect(
      goCamModelInfo
        .filter(({ data }) => isUniprotCurated(data))
        .map(({ id }) => id)
    ).toEqual([
      '6446bfcb00001774',
      '65288b2200000194',
      '654d809000001587',
      '67369e7600002132',
    ]);
  });
});
