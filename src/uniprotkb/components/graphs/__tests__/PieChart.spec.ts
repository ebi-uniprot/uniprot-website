import { StatisticsGraphItem, distributeByEntryCount } from '../PieChart';

const toStatisticsGraphItem = (numbers: number[]) =>
  numbers.map((number) => ({ entryCount: number }) as StatisticsGraphItem);

const fromStatisticsGraphItem = (items: StatisticsGraphItem[]) =>
  items.map(({ entryCount }) => entryCount);

describe('distributeByEntryCount', () => {
  it('should distribute an even number of elements', () => {
    expect(
      fromStatisticsGraphItem(
        distributeByEntryCount(toStatisticsGraphItem([3, 50, 20, 100, 4, 30]))
      )
    ).toEqual([3, 100, 4, 50, 20, 30]);
  });
  it('should distribute an odd number of elements', () => {
    expect(
      fromStatisticsGraphItem(
        distributeByEntryCount(toStatisticsGraphItem([3, 50, 20, 100, 4]))
      )
    ).toEqual([3, 100, 4, 50, 20]);
  });
});
