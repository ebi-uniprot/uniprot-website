import { getCategories, getSubjects } from '../GORibbonHandler';
import goRibbonCategories from './__mocks__/go-ribbon-categories';
import slimmedData from './__mocks__/slimmedData';
import goSlimAGR from './__mocks__/slimSet';
// import termsToSlim from './__mocks__/termsToSlim';

describe('GORibbonHandler', () => {
  it('should generate categories from slim set', () => {
    const categories = getCategories(goSlimAGR);
    expect(categories).toEqual(goRibbonCategories);
  });

  it.skip('should generate subject from data', () => {
    const subjects = getSubjects(slimmedData);
    expect(subjects).toEqual({});
  });

  //   it('should convert the slimmed data into AGR Ribbon data', () => {
  //     const data = slimDataToAGRRibbon(termsToSlim, slimmedData, 'P05067');
  //     expect(data).toEqual(goRibbonData);
  //   });
});
