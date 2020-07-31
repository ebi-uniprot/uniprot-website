import extractAccession from '../extractAccession';

describe('extractDescription', () => {
  it('should extract valid accessions', () => {
    expect(extractAccession('O76024')).toBe('O76024');
    expect(extractAccession('A9WZ33')).toBe('A9WZ33');
    expect(extractAccession('|P27272|')).toBe('P27272');
    expect(extractAccession('sp|B7GWQ6|ACCD_ACIB3')).toBe('B7GWQ6');
    expect(extractAccession('   A0A5B9VZG7   ')).toBe('A0A5B9VZG7');
    expect(
      extractAccession(
        ' tr|A0A512FLJ5|A0A512FLJ5_9LACO Peptidase_C39_2 domain-containing'
      )
    ).toBe('A0A512FLJ5');
    expect(extractAccession('c0hjw9')).toBe('C0HJW9');
  });

  it("shouldn't extract valid accessions within words", () => {
    expect(extractAccession('hohohoO76024')).toBeUndefined();
    expect(extractAccession('P27272_human')).toBeUndefined();
    expect(extractAccession('P2727')).toBeUndefined();
  });

  it("shouldn't extract accessions that look valid but are not", () => {
    expect(extractAccession('076024')).toBeUndefined();
    expect(extractAccession('X27272')).toBeUndefined();
  });
});
