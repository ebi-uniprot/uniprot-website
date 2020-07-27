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

export const localFacets: string[] = Object.values(BlastFacet);
export const blastFacetToKeyName = {
  [BlastFacet.SCORE]: 'hsp_score',
  [BlastFacet.IDENTITY]: 'hsp_identity',
  [BlastFacet.EVALUE]: 'hsp_expect',
};

const urlBoundsRE = /\[(.+) TO (.+)\]/;
const parseLocalFacets = (facets: SelectedFacet[]): ParsedLocalFacet[] => {
  const output = [];
  for (const { name, value } of facets) {
    if (!localFacets.includes(name)) {
      // skip, it's just a server facet
      continue; // eslint-disable-line no-continue
    }
    const match = value.match(urlBoundsRE);
    if (!match) {
      // not in the right format 🤷🏽‍♂️
      continue; // eslint-disable-line no-continue
    }
    const [, min, max] = match;
    let parsedMin = -Infinity;
    let parsedMax = +Infinity;
    if (min !== '*') {
      // assume * == -Infinity
      parsedMin = parseFloat(min);
      if (Number.isNaN(parsedMin)) {
        // not a parsable number 🤷🏽‍♂️
        continue; // eslint-disable-line no-continue
      }
    }
    if (max !== '*') {
      // assume * == +Infinity
      parsedMax = parseFloat(max);
      if (Number.isNaN(parsedMax)) {
        // not a parsable number 🤷🏽‍♂️
        continue; // eslint-disable-line no-continue
      }
    }
    output.push({ name, min: parsedMin, max: parsedMax });
  }
  return output;
};

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

export const filterBlastByFacets = (facets: SelectedFacet[] = []) => {
  const parsedFacets = parseLocalFacets(
    facets.filter(({ name }) => localFacets.includes(name))
  );

  // filter function
  return (hit: BlastHit) => {
    // eslint-disable-next-line no-labels
    outer: for (const { name, min, max } of parsedFacets) {
      const keyName = blastFacetToKeyName[name as BlastFacet] as keyof BlastHsp;
      for (const hsp of hit.hit_hsps) {
        const value = hsp[keyName] as number;
        if (value >= min && value <= max) {
          // if any of the value is within range, skip to check next facet
          continue outer; // eslint-disable-line no-continue, no-labels
        }
      }
      // if none of the values was within range, this hit needs to be excluded
      return false;
    }
    // if all the hits had any value within range for all the facets, keep hit
    return true;
  };
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

  const parsedFacets = parseLocalFacets(facets);
  parsedFacets.forEach(({ name, min, max }) => {
    if (name in blastFacetToKeyName) {
      hits = filterBlastHitForResults(hits, min, max, name as BlastFacet);
    }
  });

  return {
    ...data,
    hits,
    alignments: hits.length,
  };
};

// export const isBlastValueWithinRange = (
//   hitDatapoint: HitDatapoint,
//   rangeFilters: ParsedBlastFacets,
//   facet: BlastFacet
// ) => {
//   const value = hitDatapoint[facet];
//   const rangeFilter = rangeFilters.find(({ name }) => name === facet);
//   if (!rangeFilter) {
//     return true;
//   }
//   return rangeFilter.min <= value && value <= rangeFilter.max;
// };

// export const filterBlastHitForFacets = (
//   hitDatapoint: HitDatapoint,
//   rangeFilters: ParsedBlastFacets,
//   inActiveFacet?: BlastFacet
// ) => {
//   // Notes:
//   // 1. All inactiveFacets (including user selected and not user selected) will need to
//   //    have the intersection of all of the ranges applied (including the active).
//   // 2. The activeFacet has only has the inactiveFacets intersection applied.

//   const rangeFilterNames = rangeFilters.map(({ name }) => name);

//   if (!rangeFilters || !rangeFilterNames.length) {
//     return hitDatapoint;
//   }

//   let activeFacet = inActiveFacet;
//   if (!inActiveFacet) {
//     if (rangeFilterNames.length > 1) {
//       throw Error(
//         'More than one blast hit facet provided and no active facet set.'
//       );
//     } else {
//       // Guaranteed to be one here because it's nonzero but < 2
//       const facet = rangeFilterNames;
//       activeFacet = facet[0] as BlastFacet;
//     }
//   }

//   const inactiveRangedFacets = rangeFilterNames.filter(
//     (facet) => facet !== activeFacet
//   );

//   const includeActive = inactiveRangedFacets.every((facet) =>
//     isBlastValueWithinRange(hitDatapoint, rangeFilters, facet as BlastFacet)
//   );
//   const includeInactive =
//     includeActive &&
//     isBlastValueWithinRange(
//       hitDatapoint,
//       rangeFilters,
//       activeFacet as BlastFacet
//     );

//   const result = new Map<BlastFacet, number>();

//   const allInactiveFacets = Object.values(BlastFacet).filter(
//     (facet) => facet !== activeFacet
//   );

//   allInactiveFacets.forEach((facet) => {
//     if (includeInactive) {
//       result.set(facet, hitDatapoint[facet]);
//     }
//   });

//   if (includeActive) {
//     result.set(
//       activeFacet as BlastFacet,
//       hitDatapoint[activeFacet as BlastFacet]
//     );
//   }

//   return Object.fromEntries(result);
// };

export const getFacetBounds = (facets: SelectedFacet[]) => {
  const output = Object.fromEntries(
    Object.keys(blastFacetToKeyName).map((key) => [
      key,
      { min: -Infinity, max: +Infinity },
    ])
  );
  // for every facet in the URL
  for (const { name, min, max } of parseLocalFacets(facets)) {
    output[name] = Object.freeze({ min, max });
  }
  return Object.freeze(output);
};

export const getBounds = (hits: BlastHit[]) => {
  const output = Object.fromEntries(
    Object.keys(blastFacetToKeyName).map((key) => [
      key,
      { min: +Infinity, max: -Infinity },
    ])
  );
  for (const [facet, keyName] of Object.entries(blastFacetToKeyName)) {
    const current = output[facet];
    for (const hit of hits) {
      for (const hsp of hit.hit_hsps) {
        const value = hsp[keyName as keyof BlastHsp] as number;
        if (value < current.min) {
          current.min = value;
        }
        if (value > current.max) {
          current.max = value;
        }
      }
    }
    output[facet] = Object.freeze(current);
  }
  return Object.freeze(output);
};

export const getDataPoints = (hits: BlastHit[]) => {
  const output = Object.fromEntries(
    Object.keys(blastFacetToKeyName).map((key) => [key, [] as number[]])
  );
  for (const [facet, keyName] of Object.entries(blastFacetToKeyName)) {
    // eslint-disable-next-line no-multi-assign
    const current = output[facet];
    for (const hit of hits) {
      for (const hsp of hit.hit_hsps) {
        const value = hsp[keyName as keyof BlastHsp] as number;
        if (typeof value !== 'undefined') {
          current.push(value);
        }
      }
    }
    output[facet] = current;
  }
  return Object.freeze(output);
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

export type ParsedLocalFacet = { name: string; min: number; max: number };

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
