import { Namespace } from '../../../../shared/types/namespaces';
import extractAccession from '../extractAccession';

describe('extractDescription', () => {
  const testCases = [
    ['O76024', 'O76024', Namespace.uniprotkb],
    ['A9WZ33', 'A9WZ33', Namespace.uniprotkb],
    ['|P27272|', 'P27272', Namespace.uniprotkb],
    ['sp|B7GWQ6|ACCD_ACIB3', 'B7GWQ6', Namespace.uniprotkb],
    ['   A0A5B9VZG7   ', 'A0A5B9VZG7', Namespace.uniprotkb],
    [
      ' tr|A0A512FLJ5|A0A512FLJ5_9LACO Peptidase_C39_2 domain-containing',
      'A0A512FLJ5',
      Namespace.uniprotkb,
    ],
    ['c0hjw9', 'C0HJW9', Namespace.uniprotkb],
    ['sp|P05067-2|A4_HUMAN', 'P05067-2', Namespace.uniprotkb],
    ['UPI0000000001', 'UPI0000000001', Namespace.uniparc],
    ['UniRef100_A0A023HJ61', 'UniRef100_A0A023HJ61', Namespace.uniref],
  ];
  test.each(testCases)(
    'should extract valid accession %p',
    (string, accession, namespace) => {
      expect(extractAccession(string)).toEqual({ accession, namespace });
    }
  );

  it("shouldn't extract valid accessions within words", () => {
    expect(extractAccession('hohohoO76024')).toBeNull();
    expect(extractAccession('P27272_human')).toBeNull();
    expect(extractAccession('P2727')).toBeNull();
  });

  it("shouldn't extract accessions that look valid but are not", () => {
    expect(extractAccession('076024')).toBeNull();
    expect(extractAccession('X27272')).toBeNull();
  });
});
