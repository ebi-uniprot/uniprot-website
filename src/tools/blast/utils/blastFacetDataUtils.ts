import deepFreeze from 'deep-freeze';

import {
  BlastFacet,
  BlastHit,
  BlastResults,
  BlastHsp,
} from '../types/blastResults';
import { SelectedFacet } from '../../../uniprotkb/types/resultsTypes';

export const localFacets: BlastFacet[] = Object.values(BlastFacet);
export const blastFacetToKeyName = {
  [BlastFacet.IDENTITY]: 'hsp_identity',
  [BlastFacet.SCORE]: 'hsp_score',
  [BlastFacet.EVALUE]: 'hsp_expect',
};
export const blastFacetToNiceName = {
  [BlastFacet.IDENTITY]: 'Identity',
  [BlastFacet.SCORE]: 'Score',
  [BlastFacet.EVALUE]: 'E-Value',
};

export type ParsedLocalFacet = { name: string; min: number; max: number };

const urlBoundsRE = /\[(.+) TO (.+)\]/;
const parseLocalFacets = (facets: SelectedFacet[]): ParsedLocalFacet[] => {
  const output = [];
  for (const { name, value } of facets) {
    if (!localFacets.includes(name as BlastFacet)) {
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

/**
 * Returns a filter function to be used in an array "filter" method
 * @param {SelectedFacet[]} facets - facets extracted from the URL querystring
 * @param {string} ignoredFacet - optional ignored facet name
 * @returns {function} - function to use to filter BlastHits
 */
export const filterBlastByFacets = (
  facets: SelectedFacet[],
  ignoredFacet = ''
) => {
  const parsedFacets = parseLocalFacets(
    facets.filter(
      ({ name }) =>
        localFacets.includes(name as BlastFacet) && name !== ignoredFacet
    )
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
  if (!data.hits?.length || !facets.length) {
    return data;
  }

  const hits = data.hits.filter(filterBlastByFacets(facets));

  return {
    ...data,
    hits,
    alignments: hits.length,
  };
};

export const getFacetBounds = (facets: SelectedFacet[]) => {
  const output = Object.fromEntries(
    Object.keys(blastFacetToKeyName).map((key) => [
      key,
      { min: -Infinity, max: +Infinity },
    ])
  );
  // for every facet in the URL
  for (const { name, min, max } of parseLocalFacets(facets)) {
    output[name] = { min, max };
  }
  return deepFreeze(output);
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
    output[facet] = current;
  }
  return deepFreeze(output);
};

export const getDataPoints = (hits: BlastHit[]) => {
  const output: Record<string, number[]> = Object.fromEntries(
    Object.keys(blastFacetToKeyName).map((key) => [key, []])
  );
  for (const [facet, keyName] of Object.entries(blastFacetToKeyName)) {
    const current = output[facet];
    for (const hit of hits) {
      for (const hsp of hit.hit_hsps) {
        const value = hsp[keyName as keyof BlastHsp];
        const number = +value;
        if (value && !Number.isNaN(number)) {
          current.push(number);
        }
      }
    }
    output[facet] = current;
  }
  return deepFreeze(output);
};
