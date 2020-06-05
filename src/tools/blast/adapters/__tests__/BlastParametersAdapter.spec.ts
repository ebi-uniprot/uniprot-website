import convertFormParametersForServer from '../BlastParametersAdapter';
import { FormParameters } from '../../types/blastFormParameters';

describe('BlastParametersAdapter tests', () => {
  it('should translate blast parameters accurately', () => {
    const formParams: FormParameters = {
      program: 'blastp',
      matrix: 'PAM30',
      hits: 250,
      threshold: '1e-4',
      filter: 'F',
      gapped: false,
      taxIDs: [{ id: '1234', label: 'some species' }],
      stype: 'protein',
      sequence: 'ATGC',
      database: 'UniProt',
    };
    const formData = convertFormParametersForServer(formParams);
    expect(Array.from(formData.entries())).toEqual([
      ['program', 'blastp'],
      ['email', 'uuw_dev@uniprot.org'],
      ['matrix', 'PAM30'],
      ['alignments', '250'],
      ['scores', '250'],
      ['exp', '1e-4'],
      ['filter', 'F'],
      ['taxids', '1234'],
      ['stype', 'protein'],
      ['sequence', 'ATGC'],
      ['database', 'UniProt'],
    ]);
  });
});
