import { truncateTaxonLabel } from '..';

describe('truncateTaxonLabel', () => {
  it('should truncate label ', () => {
    expect(truncateTaxonLabel('Homo sapiens (Man/Human/HUMAN) [9606]')).toEqual(
      'Homo sapiens [9606]'
    );
  });
  it('should be fine if there is nothing to truncate', () => {
    expect(truncateTaxonLabel('Homo sapiens [9606]')).toEqual(
      'Homo sapiens [9606]'
    );
  });
});
