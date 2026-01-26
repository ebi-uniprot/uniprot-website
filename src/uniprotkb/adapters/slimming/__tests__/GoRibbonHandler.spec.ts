import { type TaxonomyDatum } from '../../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { type GeneNamesData } from '../../namesAndTaxonomyConverter';
import { getCategories, getSubjects } from '../GORibbonHandler';
import slimmedData from './__mocks__/slimmedData';
import goSlimAGR from './__mocks__/slimSet';
import termsToSlim from './__mocks__/termsToSlim';

const geneNamesData: GeneNamesData = [{ geneName: { value: 'TP53' } }];
const organismData: TaxonomyDatum = {
  scientificName: 'Homo sapiens',
  taxonId: 9606,
};

describe('GORibbonHandler', () => {
  it('should generate categories from slim set', () => {
    const categories = getCategories(goSlimAGR);
    expect(categories).toMatchSnapshot();
  });

  it('should generate subjects from data', () => {
    const subjects = getSubjects(
      termsToSlim,
      slimmedData,
      'P05067',
      geneNamesData,
      organismData
    );
    expect(subjects).toMatchSnapshot();
  });
});
