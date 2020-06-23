import entryToFASTAWithHeaders from '../entryToFASTAWithHeaders';

import modelData from '../../__mocks__/entryModelData.json';

import { UniProtkbAPIModel } from '../uniProtkbConverter';

describe('entryToFASTAWithHeaders', () => {
  it('should output a FASTA string with UniProt-style headers', () => {
    const fasta = entryToFASTAWithHeaders(modelData as UniProtkbAPIModel);
    expect(fasta).toMatchSnapshot();
  });
});
