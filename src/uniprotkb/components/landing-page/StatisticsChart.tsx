import { useMemo } from 'react';

import PieChart, { StatisticsGraphItem } from '../graphs/PieChart';

import useDataApi from '../../../shared/hooks/useDataApi';

import { nameToQueryKingdoms } from '../statistics/taxonomyQueries';
import { stringifyQuery, stringifyUrl } from '../../../shared/utils/url';
import apiUrls from '../../../shared/config/apiUrls';

import { LocationToPath, Location } from '../../../app/config/urls';
import {
  StatisticsItem,
  StatisticsPayload,
} from '../statistics/StatisticsPage';

type StatisticsChartProps = {
  releaseNumber?: string;
  reviewed: boolean;
  unreviewed: boolean;
};

const StatisticsChart = ({
  releaseNumber,
  reviewed,
  unreviewed,
}: StatisticsChartProps) => {
  const reviewedStats = useDataApi<StatisticsPayload>(
    releaseNumber &&
      stringifyUrl(apiUrls.statistics(releaseNumber, 'unreviewed'), {
        categories: 'superkingdom',
      })
  );

  const unreviewedStats = useDataApi<StatisticsPayload>(
    releaseNumber &&
      stringifyUrl(apiUrls.statistics(releaseNumber, 'unreviewed'), {
        categories: 'superkingdom',
      })
  );

  const data: StatisticsGraphItem[] | undefined = useMemo(() => {
    if (reviewedStats.loading || unreviewedStats.loading) {
      return undefined;
    }
    const taxonSummed = Object.fromEntries(
      Array.from<string, [name: string, graphItem: StatisticsGraphItem]>(
        nameToQueryKingdoms.keys(),
        (name) => [
          name,
          {
            name,
            entryCount: 0,
            to: {
              pathname: LocationToPath[Location.UniProtKBResults],
              search: '',
            },
          },
        ]
      )
    );

    const reviewedCounts = new Map(
      reviewedStats.data?.results
        .find((category) => category.categoryName === 'SUPERKINGDOM')
        ?.items.map((item: StatisticsItem): [name: string, count: number] => [
          item.name,
          item.count,
        ])
    );

    const unreviewedCounts = new Map(
      unreviewedStats.data?.results
        .find((category) => category.categoryName === 'SUPERKINGDOM')
        ?.items.map((item: StatisticsItem): [name: string, count: number] => [
          item.name,
          item.count,
        ])
    );

    for (const [name, entry] of Object.entries(taxonSummed)) {
      if (reviewed) {
        entry.entryCount += reviewedCounts.get(name) || 0;
      }
      if (unreviewed) {
        entry.entryCount += unreviewedCounts.get(name) || 0;
      }
      if (reviewed && unreviewed) {
        entry.to.search = stringifyQuery({
          query: nameToQueryKingdoms.get(name),
        });
      } else {
        entry.to.search = stringifyQuery({
          query: `(reviewed:${reviewed}) AND ${nameToQueryKingdoms.get(name)}`,
        });
      }
    }

    return Object.values(taxonSummed);
  }, [
    reviewed,
    reviewedStats.data?.results,
    reviewedStats.loading,
    unreviewed,
    unreviewedStats.data?.results,
    unreviewedStats.loading,
  ]);

  return <PieChart data={data} type="taxonomy" />;
};

export default StatisticsChart;
