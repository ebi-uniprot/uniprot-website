import { getOtherDiffs } from '../history/History';

describe('getOtherDiffs', () => {
  test('the case the first version is greater than second version, should return empty array', () => {
    expect(getOtherDiffs(309, 308, 310)).toEqual([]);
  });
  test('the case where no lastVersion is undfined, should return emtpy array', () => {
    expect(getOtherDiffs(308, 309, undefined)).toEqual([]);
  });
  test("the case we're viewing the page 308,309 there should be 1 link to 307,308 and 1 link to 309,310", () => {
    expect(getOtherDiffs(308, 309, 310)).toEqual([
      [307, 308],
      [309, 310],
    ]);
  });
  test("the case we're vieweing the page 1,2 there should be only 1 link to 2,3", () => {
    expect(getOtherDiffs(1, 2, 310)).toEqual([[2, 3]]);
  });
  test("the case we're vieweing the page 309,310 and assuming that 310 is the last version, there should be only 1 link to 308,309", () => {
    expect(getOtherDiffs(309, 310, 310)).toEqual([[308, 309]]);
  });
  test("the case we're viewing the page 1,310 and assuming that 310 is the last version, return 1 link to 1,2 and 1 link to 309,310", () => {
    expect(getOtherDiffs(1, 310, 310)).toEqual([
      [1, 2],
      [309, 310],
    ]);
  });
  test("the case we're viewing the page 200,250 there should be 1 link to 199,200 and 1 link to 250,251", () => {
    expect(getOtherDiffs(200, 250, 310)).toEqual([
      [199, 200],
      [250, 251],
    ]);
  });
  test("the case we're vieweing the page 300,310 and assuming that 310 is the last version, there should be 1 link to 299,300 and one links to 308,309", () => {
    expect(getOtherDiffs(300, 310, 310)).toEqual([
      [299, 300],
      [309, 310],
    ]);
  });
  test("the case we're vieweing the page 1,300, there should be 1 link to 1,2 and one links to 300,301", () => {
    expect(getOtherDiffs(1, 300, 310)).toEqual([
      [1, 2],
      [300, 301],
    ]);
  });
});
