import UniParcXRefsColumnConfiguration, {
  UniParcXRefsColumn,
} from '../UniParcXRefsColumnConfiguration';

import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';

import { UniParcXRef } from '../../adapters/uniParcConverter';

import data from '../../__mocks__/uniParcEntryModelData';

jest.mock('../../../tools/utils/storage');

// TODO: uncomment this once the column changes are stable
describe.skip('UniParcXRefsColumnConfiguration component', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  const xrefData = data.uniParcCrossReferences?.[0]!;
  testColumnConfiguration<UniParcXRefsColumn, UniParcXRef>(
    UniParcXRefsColumnConfiguration,
    xrefData
  );
});
