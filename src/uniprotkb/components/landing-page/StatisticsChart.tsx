import { useMemo } from 'react';

import useDataApi from '../../../shared/hooks/useDataApi';

import { nameToQueryKingdoms } from '../statistics/taxonomyQueries';
import { stringifyQuery, stringifyUrl } from '../../../shared/utils/url';

import { LocationToPath, Location } from '../../../app/config/urls';
import { StatisticsPayload } from '../statistics/StatisticsPage';

import PieChart, { StatisticsGraphItem } from '../graphs/PieChart';

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
      stringifyUrl(
        `${API_PREFIX}/statistics/releases/${releaseNumber}/reviewed`,
        { categories: 'superkingdom' }
      )
  );

  const unreviewedStats = useDataApi<StatisticsPayload>(
    releaseNumber &&
      stringifyUrl(
        `${API_PREFIX}/statistics/releases/${releaseNumber}/unreviewed`,
        { categories: 'superkingdom' }
      )
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

    const reviewedData = reviewedStats.data?.results.find(
      (category) => category.categoryName === 'SUPERKINGDOM'
    );

    const unreviewedData = unreviewedStats.data?.results.find(
      (category) => category.categoryName === 'SUPERKINGDOM'
    );

    for (const [name, entry] of Object.entries(taxonSummed)) {
      if (reviewed) {
        entry.entryCount +=
          reviewedData?.items.find((item) => item.name === name)?.entryCount ||
          0;
      }
      if (unreviewed) {
        entry.entryCount +=
          unreviewedData?.items.find((item) => item.name === name)
            ?.entryCount || 0;
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
