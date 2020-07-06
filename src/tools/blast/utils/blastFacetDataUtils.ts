// import {
//   getSmallerMultiple,
//   getLargerMultiple,
// } from '../../../shared/utils/utils';

import {
  BlastFacet,
  BlastHit,
  BlastResults,
  BlastHsp,
} from '../types/blastResults';
import { SelectedFacet } from '../../../uniprotkb/types/resultsTypes';

const blastFacetToKeyName = {
  [BlastFacet.SCORE]: 'hsp_score',
  [BlastFacet.IDENTITY]: 'hsp_identity',
  [BlastFacet.EVALUE]: 'hsp_expect',
};

const parseBlastFacets = (facets: SelectedFacet[]): ParsedBlastFacets =>
  Object.fromEntries(
    facets.map(({ name, value }) => {
      const [min, max] = value.split('-').map((x) => Number(x));
      return [name, [min, max]];
    })
  );

export const filterBlastHitForResults = (
  hits: BlastHit[],
  min: number,
  max: number,
  facet: BlastFacet
) => {
  return hits.filter((hit) => {
    return hit.hit_hsps
      .map((hsp) => hsp[blastFacetToKeyName[facet] as keyof BlastHsp])
      .filter((score) => score >= min && score <= max).length;
  });
};

export const filterBlastDataForResults = (
  data: BlastResults,
  facets: SelectedFacet[]
) => {
  if (!data) {
    return null;
  }

  if (!data.hits || !data.hits.length || !Object.keys(facets).length) {
    return data;
  }

  let { hits } = data;

  const parsedFacets = parseBlastFacets(facets);
  Object.entries(parsedFacets).forEach(([facet, [min, max]]) => {
    if (facet in blastFacetToKeyName) {
      hits = filterBlastHitForResults(hits, min, max, facet as BlastFacet);
    }
  });

  return {
    ...data,
    hits,
    alignments: hits.length,
  };
};

export const isBlastValueWithinRange = (
  hitDatapoint: HitDatapoint,
  rangeFilters: ParsedBlastFacets,
  facet: BlastFacet
) => {
  const value = hitDatapoint[facet];
  const [min, max] = rangeFilters[facet];
  return min <= value && value <= max;
};

export const filterBlastHitForFacets = (
  hitDatapoint: HitDatapoint,
  rangeFilters: ParsedBlastFacets,
  inActiveFacet?: BlastFacet
) => {
  // Notes:
  // 1. All inactiveFacets (including user selected and not user selected) will need to
  //    have the intersection of all of the ranges applied (including the active).
  // 2. The activeFacet has only has the inactiveFacets intersection applied.

  if (!rangeFilters || !Object.keys(rangeFilters).length) {
    return hitDatapoint;
  }

  let activeFacet = inActiveFacet;
  if (!inActiveFacet) {
    if (Object.keys(rangeFilters).length > 1) {
      throw Error(
        'More than one blast hit facet provided and no active facet set.'
      );
    } else {
      // Guaranteed to be one here because it's nonzero but < 2
      const facet = Object.keys(rangeFilters);
      activeFacet = facet[0] as BlastFacet;
    }
  }

  const inactiveRangedFacets = Object.keys(rangeFilters).filter(
    (facet) => facet !== activeFacet
  );

  const includeActive = inactiveRangedFacets.every((facet) =>
    isBlastValueWithinRange(hitDatapoint, rangeFilters, facet as BlastFacet)
  );
  const includeInactive =
    includeActive &&
    isBlastValueWithinRange(
      hitDatapoint,
      rangeFilters,
      activeFacet as BlastFacet
    );

  const result = new Map<BlastFacet, number>();

  const allInactiveFacets = Object.values(BlastFacet).filter(
    (facet) => facet !== activeFacet
  );

  allInactiveFacets.forEach((facet) => {
    if (includeInactive) {
      result.set(facet, hitDatapoint[facet]);
    }
  });

  if (includeActive) {
    result.set(
      activeFacet as BlastFacet,
      hitDatapoint[activeFacet as BlastFacet]
    );
  }

  return Object.fromEntries(result);
};

const setMinMaxValues = (
  parameters: BlastHitFacetParameters,
  facet: BlastFacet,
  value: number
) => {
  const facetParameter = parameters[facet];
  if (typeof facetParameter.min === 'undefined' || facetParameter.min > value) {
    facetParameter.min = value;
  }

  if (typeof facetParameter.max === 'undefined' || facetParameter.max < value) {
    facetParameter.max = value;
  }
};

export type BlastHitFacetParameters = {
  [facet in BlastFacet]: {
    values: number[];
    min?: number;
    max?: number;
  };
};

type HitDatapoint = {
  [BlastFacet.SCORE]: number;
  [BlastFacet.IDENTITY]: number;
  [BlastFacet.EVALUE]: number;
};

export type ParsedBlastFacets = {
  [key: string]: [number, number];
};

export const getFacetParametersFromBlastHits = (
  facets: SelectedFacet[],
  activeFacet: BlastFacet,
  hits?: BlastHit[] | null
) => {
  const parameters: BlastHitFacetParameters = {
    score: {
      values: [],
    },
    identity: {
      values: [],
    },
    evalue: {
      values: [],
    },
  };

  if (!hits) {
    return parameters;
  }

  hits.forEach(({ hit_hsps: hsps }) => {
    hsps.forEach(
      ({ hsp_score: score, hsp_identity: identity, hsp_expect: evalue }) => {
        setMinMaxValues(parameters, BlastFacet.SCORE, score);
        setMinMaxValues(parameters, BlastFacet.IDENTITY, identity);
        setMinMaxValues(parameters, BlastFacet.EVALUE, evalue);

        const hitData: HitDatapoint = {
          score,
          identity,
          evalue,
        };

        const parsedFacets = parseBlastFacets(facets);

        const {
          score: filteredScore,
          identity: filteredIdentity,
          evalue: filteredEvalue,
        } = filterBlastHitForFacets(hitData, parsedFacets, activeFacet);

        // We would like to include 0 values, hence, check for 'undefined' explicitly
        if (filteredScore !== undefined) {
          parameters.score.values.push(filteredScore);
        }
        if (filteredIdentity !== undefined) {
          parameters.identity.values.push(filteredIdentity);
        }
        if (filteredEvalue !== undefined) {
          parameters.evalue.values.push(filteredEvalue);
        }
      }
    );
  });
  return parameters;
};
