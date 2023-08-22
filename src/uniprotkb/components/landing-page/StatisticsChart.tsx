import { useMemo } from 'react';

import useDataApi from '../../../shared/hooks/useDataApi';

import { StatisticsPayload } from '../statistics/StatisticsPage';
import { LocationToPath, Location } from '../../../app/config/urls';
import { stringifyQuery, stringifyUrl } from '../../../shared/utils/url';

import PieChart, { StatisticsGraphItem } from '../graphs/PieChart';

export const nameToQuery = new Map<string, string>([
  ['Archaea', '(taxonomy_id:2157)'],
  ['Eukaryota', '(taxonomy_id:2759)'],
  ['Viruses', '(taxonomy_id:10239)'],
  ['Bacteria', '(taxonomy_id:2)'],
  ['Other', '((taxonomy_id:2787854) OR (taxonomy_id:2787823))'],
]);

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
      Array.from(nameToQuery.keys(), (name) => [
        name,
        {
          name,
          entryCount: 0,
          to: {
            pathname: LocationToPath[Location.UniProtKBResults],
            query: '',
          },
        },
      ])
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
        entry.to.query = stringifyQuery({
          query: nameToQuery.get(name),
        });
      } else {
        entry.to.query = stringifyQuery({
          query: `(reviewed:${reviewed}) AND ${nameToQuery.get(name)}`,
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
