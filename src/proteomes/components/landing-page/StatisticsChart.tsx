import { useMemo } from 'react';

import PieChart from '../../../uniprotkb/components/graphs/PieChart';

import useDataApi from '../../../shared/hooks/useDataApi';

import apiUrls from '../../../shared/config/apiUrls/apiUrls';

import { Namespace } from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';
import { FacetsEnum } from '../../config/ProteomesFacetConfiguration';

type StatisticsChartProps = {
  refProt: boolean;
  nonRefProt: boolean;
};

type PieChartDatum = {
  name: string;
  entryCount: number;
};

const sortByTaxonName = (a: PieChartDatum, b: PieChartDatum) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const StatisticsChart = ({ refProt, nonRefProt }: StatisticsChartProps) => {
  const refProtStats = useDataApi<SearchResults<never>>(
    apiUrls.search.search({
      namespace: Namespace.proteomes,
      query: 'proteome_type:1',
      size: 0,
      facets: [FacetsEnum.Superkingdom],
    })
  );

  const nonRefProtStats = useDataApi<SearchResults<never>>(
    apiUrls.search.search({
      namespace: Namespace.proteomes,
      query: 'proteome_type:2 OR proteome_type:3 OR proteome_type:4',
      size: 0,
      facets: [FacetsEnum.Superkingdom],
    })
  );

  const data = useMemo(() => {
    if (refProtStats.loading || nonRefProtStats.loading) {
      return undefined;
    }

    const refProtTaxonCounts = refProtStats.data?.facets
      ?.find((facet) => facet.name === FacetsEnum.Superkingdom)
      ?.values?.map((item): { name: string; entryCount: number } => ({
        name: item.value,
        entryCount: item.count,
      }))
      .sort(sortByTaxonName);

    const nonRefProtTaxonCounts = nonRefProtStats.data?.facets
      ?.find((facet) => facet.name === FacetsEnum.Superkingdom)
      ?.values?.map((item): { name: string; entryCount: number } => ({
        name: item.value,
        entryCount: item.count,
      }))
      .sort(sortByTaxonName);

    if (refProt) {
      return refProtTaxonCounts;
    }
    if (nonRefProt) {
      return nonRefProtTaxonCounts;
    }

    const taxonSummed = Object.values(
      (refProtTaxonCounts as PieChartDatum[])
        .concat(nonRefProtTaxonCounts as PieChartDatum[])
        .sort(sortByTaxonName)
        .reduce(
          (acc, { name, entryCount }) => {
            if (acc[name]) {
              acc[name].entryCount += entryCount;
            } else {
              acc[name] = {
                name,
                entryCount,
              };
            }
            return acc;
          },
          {} as Record<string, PieChartDatum>
        )
    );

    return taxonSummed;
  }, [
    refProtStats.loading,
    refProtStats.data?.facets,
    nonRefProtStats.loading,
    nonRefProtStats.data?.facets,
    refProt,
    nonRefProt,
  ]);

  return <PieChart data={data} type="taxonomy" />;
};

export default StatisticsChart;
