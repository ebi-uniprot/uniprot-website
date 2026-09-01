import { proteomeComponentQuery } from '../query';

describe('proteomeComponentQuery', () => {
  it('fuses a single name with the proteome ID', () => {
    expect(proteomeComponentQuery('UP000005640', 'chromosome')).toBe(
      '(proteomecomponent:"UP000005640:chromosome")'
    );
  });

  it('OR-joins multiple names, each fused with the proteome ID', () => {
    expect(
      proteomeComponentQuery('UP000005640', ['chromosome', 'plasmid'])
    ).toBe(
      '(proteomecomponent:"UP000005640:chromosome" OR proteomecomponent:"UP000005640:plasmid")'
    );
  });

  it('escapes a double quote in a name so it cannot close the phrase early', () => {
    expect(proteomeComponentQuery('UP000005640', 'plasmid "pXO1"')).toBe(
      '(proteomecomponent:"UP000005640:plasmid \\"pXO1\\"")'
    );
  });

  it('keeps parentheses in a name intact, unlike the plain builder parser', () => {
    expect(proteomeComponentQuery('UP000005640', 'Chromosome (1)')).toBe(
      '(proteomecomponent:"UP000005640:Chromosome (1)")'
    );
  });
});
