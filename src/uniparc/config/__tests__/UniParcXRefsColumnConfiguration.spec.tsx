import testColumnConfiguration from '../../../shared/__test-helpers__/testColumnConfiguration';
import data from '../../__mocks__/uniparcXrefsModelData';
import { UniParcXRef } from '../../adapters/uniParcConverter';
import UniParcXRefsColumnConfiguration, {
  UniParcXRefsColumn,
} from '../UniParcXRefsColumnConfiguration';

jest.mock('../../../shared/workers/jobs/utils/storage');

describe('UniParcXRefsColumnConfiguration component', () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
  const xrefData = data.results?.[0]!;
  testColumnConfiguration<UniParcXRefsColumn, UniParcXRef>(
    UniParcXRefsColumnConfiguration,
    xrefData
  );
});
