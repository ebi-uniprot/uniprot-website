import { phosphorylate } from '../aa';

describe('phosphorylate', () => {
  it('should return the phosphorylated string for a lowercase amino acid', () => {
    expect(phosphorylate('r')).toEqual('Phosphoarginine');
  });
  it('should return the phosphorylated string for an uppercase amino acid', () => {
    expect(phosphorylate('Y')).toEqual('Phosphotyrosine');
  });
  it('should return an empty string for an amino acid that that cannot be phosphorylate', () => {
    expect(phosphorylate('A')).toEqual('');
  });
});
