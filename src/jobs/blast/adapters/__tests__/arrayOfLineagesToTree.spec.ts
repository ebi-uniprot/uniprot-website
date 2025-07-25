import arrayOfLineagesToTree from '../arrayOfLineagesToTree';

describe('arrayOfLineagesToTree tests', () => {
  it('should handle empty array', () => {
    expect(arrayOfLineagesToTree([])).toBe(null);
  });

  it('should transform an array of lineages to a taxonomy tree', () => {
    expect(
      arrayOfLineagesToTree([
        ['Eukaryota', 'Metazoa', 'Chordata'],
        ['Eukaryota', 'Fungi', 'Dikarya'],
      ])
    ).toMatchSnapshot();
  });

  it('should handle mismatching lineage lengths', () => {
    expect(
      arrayOfLineagesToTree([
        ['Eukaryota', 'Metazoa', 'Chordata'],
        ['Eukaryota', 'Fungi', 'Dikarya'],
        ['Eukaryota', 'Fungi', 'Dikarya', 'Ascomycota', 'Saccharomycotina'],
      ])
    ).toMatchSnapshot();
  });
});
