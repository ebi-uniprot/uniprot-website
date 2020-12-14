import { MemoryRouter } from 'react-router-dom';

import UniRefColumnConfiguration from '../UniRefColumnConfiguration';

import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

jest.mock('../../../tools/utils/storage');

const data = {
  id: 'UniRef90_Q28I25',
  name: 'Cluster: CDC7 cell division cycle 7',
  entryType: 'UniRef90',
  sequenceLength: 483,
  memberCount: 9,
  memberIdTypes: ['UniParc', 'UniProtKB Unreviewed (TrEMBL)'],
  members: [
    'Q28I25',
    'A0A6I8RXP7',
    'A0A6I8SV39',
    'A0A6I8QDI3',
    'A0A6I8QHP6',
    'B7ZUP5',
    'UPI0012F6CEF4',
    'UPI0012F702BF',
    'UPI0012F66615',
  ],
  commonTaxon: 'Xenopus tropicalis (Western clawed frog) (Silurana tropicalis)',
  commonTaxonId: 8364,
  organismIds: [8364],
  organisms: ['Xenopus tropicalis (Western clawed frog) (Silurana tropicalis)'],
};

describe('UniRefColumnConfiguration component', () => {
  for (const [key, column] of UniRefColumnConfiguration) {
    test(`should render column "${key}"`, () => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(data)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(key);
    });
  }
});
