import { getCategories, getSubjects } from '../GORibbonHandler';
import goRibbonCategories from './__mocks__/go-ribbon-categories';
import goRibbonSubjects from './__mocks__/go-ribbon-subjects';
import slimmedData from './__mocks__/slimmedData';
import goSlimAGR from './__mocks__/slimSet';
import termsToSlim from './__mocks__/termsToSlim';
// import termsToSlim from './__mocks__/termsToSlim';

describe('GORibbonHandler', () => {
  it('should generate categories from slim set', () => {
    const categories = getCategories(goSlimAGR);
    expect(categories).toEqual(goRibbonCategories);
  });

  it('should generate subjects from data', () => {
    const subjects = getSubjects(termsToSlim, slimmedData, 'P05067');
    expect(subjects).toEqual(goRibbonSubjects);
  });
});
