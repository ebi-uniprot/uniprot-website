import React, { FC, useMemo, useRef, Fragment } from 'react';
import { Loader } from 'franklin-sites';
import ResultsFacets from '../../../../uniprotkb/components/results/ResultsFacets';
import { EntryType } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { Facet, FacetValue } from '../../../../uniprotkb/types/responseTypes';
import BlastResultsParametersFacets from './BlastResultsParametersFacets';
import { EnrichedData } from './BlastResult';
import { BlastHitFacetParameters } from '../../utils/blastFacetDataUtils';

const getFacetsFromData = (data?: EnrichedData | null): Facet[] => {
  const facets: Facet[] = [];
  if (!data || !data.hits.length) {
    return facets;
  }

  // status
  facets.push({
    label: 'Status',
    name: 'reviewed',
    allowMultipleSelection: false,
    values: [
      {
        label: 'Unreviewed (TrEMBL)',
        value: 'false',
        count: data.hits.filter(
          (hit) => hit.extra?.entryType === EntryType.UNREVIEWED
        ).length,
      },
      {
        label: 'Reviewed (Swiss-Prot)',
        value: 'true',
        count: data.hits.filter(
          (hit) => hit.extra?.entryType === EntryType.REVIEWED
        ).length,
      },
    ],
  });

  // organisms
  const organisms = new Map<string, FacetValue>();
  for (const { hit_uni_ox: value, hit_uni_os: label } of data.hits) {
    let organism = organisms.get(value);
    if (!organism) {
      // first time we see this organism
      organism = { label, value, count: 0 };
      organisms.set(value, organism);
    }
    organism.count += 1;
  }
  facets.push({
    label: 'Organisms',
    name: 'organism',
    allowMultipleSelection: true,
    values: Array.from(organisms.values()).sort((a, b) => b.count - a.count),
  });

  return facets;
};

type BlastResultSidebarProps = {
  loading: boolean;
  data?: EnrichedData | null;
  histogramSettings?: BlastHitFacetParameters;
};

const BlastResultSidebar: FC<BlastResultSidebarProps> = ({
  loading,
  data,
  histogramSettings,
}) => {
  const staleFacets = useRef<Facet[]>([]);
  const facets = useMemo(() => getFacetsFromData(data), [data]);

  if (facets.length) {
    staleFacets.current = facets;
  }

  if ((!staleFacets.current.length && loading) || !histogramSettings) {
    return <Loader />;
  }

  const isStale = staleFacets.current !== facets;

  return (
    <Fragment>
      <ResultsFacets facets={staleFacets.current} isStale={isStale} />
      <BlastResultsParametersFacets
        parameters={histogramSettings}
        isStale={isStale}
      />
    </Fragment>
  );
};

export default BlastResultSidebar;
