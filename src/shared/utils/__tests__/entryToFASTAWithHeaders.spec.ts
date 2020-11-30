import entryToFASTAWithHeaders from '../entryToFASTAWithHeaders';

import modelData from '../../../uniprotkb/__mocks__/entryModelData.json';

describe('entryToFASTAWithHeaders', () => {
  it('should output a FASTA string with UniProt-style headers', () => {
    const fasta = entryToFASTAWithHeaders(modelData);
    expect(fasta).toMatchSnapshot();
  });

  it('should output a FASTA with subset', () => {
    const fasta = entryToFASTAWithHeaders(modelData, {
      subsets: [
        { start: 1, end: 1 },
        { start: 3, end: 5 },
      ],
    });
    expect(fasta).toMatchSnapshot();
  });
});
