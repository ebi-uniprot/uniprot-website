import {
  getSmallerMultiple,
  getLargerMultiple,
} from '../../../shared/utils/utils';

import { BlastResults, BlastFacets } from '../types/blastResults';

export const isBlastValueWithinRange = (
  blastResultDatum,
  selectedRanges,
  facet
) => {
  try {
    const value = blastResultDatum[facet];
    const [min, max] = selectedRanges[facet];
    return min <= value && value <= max;
  } catch (e) {
    console.log('error:', e);
  }
};

export const filterBlastDatum = (
  blastResultDatum,
  selectedRanges,
  activeFacet
) => {
  // All inactiveFacets (including user selected and not user selected) will need to have the intersection of all of the ranges applied (including the active).
  // The activeFacet has only has the inactiveFacets intersection applied.

  // TODO check if the ranges aren't empty arrays

  if (!selectedRanges || !Object.keys(selectedRanges).length) {
    return blastResultDatum;
  }

  const inactiveRangedFacets = Object.keys(selectedRanges).filter(
    (facet) => facet !== activeFacet
  );

  const includeActive = inactiveRangedFacets.every((facet) =>
    isBlastValueWithinRange(blastResultDatum, selectedRanges, facet)
  );
  const includeInactive =
    includeActive &&
    isBlastValueWithinRange(blastResultDatum, selectedRanges, activeFacet);

  const result = {};

  const allInactiveFacets = Object.values(BlastFacets).filter(
    (facet) => facet !== activeFacet
  );

  allInactiveFacets.forEach((facet) => {
    if (includeInactive) {
      result[facet] = blastResultDatum[facet];
    }
  });

  if (includeActive) {
    result[activeFacet] = blastResultDatum[activeFacet];
  }

  return result;
};

const setMinMaxValues = (results, facet, value) => {
  if (typeof results[facet].min === 'undefined' || results[facet].min > value) {
    results[facet].min = value;
  }

  if (typeof results[facet].max === 'undefined' || results[facet].max < value) {
    results[facet].max = value;
  }
};

export const getBlastParametersFacetsFromData = (
  facets: SelectedFacet[],
  activeFacet: string,
  data?: BlastResults | null,
  histogramBinSize: number
) => {
  const results = {
    score: {
      values: [],
      min: undefined,
      max: undefined,
    },
    identity: {
      values: [],
      min: undefined,
      max: undefined,
    },
    evalue: {
      values: [],
      min: undefined,
      max: undefined,
    },
  };

  if (!data) {
    return results;
  }

  const parsedFacets = Object.fromEntries(
    facets.map(({ name, value }) => {
      const [min, max] = value.split('-').map((x) => parseInt(x, 10));
      return [name, [min, max]];
    })
  );

  data.hits.forEach(({ hit_hsps }) => {
    hit_hsps.forEach(({ hsp_score, hsp_identity, hsp_expect }) => {
      const datum = {
        score: hsp_score,
        identity: hsp_identity,
        evalue: hsp_expect,
      };

      const { score, identity, evalue } = filterBlastDatum(
        datum,
        parsedFacets,
        activeFacet
      );

      setMinMaxValues(results, 'score', hsp_score);
      setMinMaxValues(results, 'identity', hsp_identity);
      setMinMaxValues(results, 'evalue', hsp_expect);

      // We would like to include 0 values, hence, check for 'undefined' explicitly
      if (score !== undefined) {
        results.score.values.push(score);
      }
      if (identity !== undefined) {
        results.identity.values.push(identity);
      }
      if (evalue !== undefined) {
        results.evalue.values.push(evalue);
      }
    });
  });

  return results;
};
