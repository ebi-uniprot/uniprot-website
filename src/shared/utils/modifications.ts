import * as logging from './logging';

export type Subset = { start: number; end: number };
export type Variation = Subset & { replacement: string };

// keep type open for variants for example?
// possibly accept multiple subsets in the future?
export type Modifications = {
  subsets?: Subset[];
  variations?: Variation[];
};
// NOTE: having both at the same time might be absurd/incompatible?

export type AccessionWithModifications = {
  accession: string;
  modifications?: Modifications;
};

// e.g. subset: 1, or 10-15
// variation could be like a subset, but with replacement?
// e.g. variation: var 1>T, 10-15>, 20>KMNL, or 1-4>LN
const reModification =
  /(?<start>\d+)(-(?<end>\d+))?(>(?<replacement>([A-Z]+|-)))?/;

// Note: also supporting isoform in regex
export const reAccession =
  /^(?<accession>\w+-?\d*)(\[(?<modifications>\d+(-\d+)?(>([A-Z]+|-))?(,\d+(-\d+)?(>([A-Z]+|-))?)*)\])?$/;

export const parseAccessionWithModifications = (
  stringified: string
): AccessionWithModifications => {
  const match = stringified.match(reAccession);
  /* istanbul ignore if */
  if (!match?.groups) {
    // Assume the accession is correct and hope for the best, log anyway
    logging.warn(`Trying to parse "${stringified}" as an accession, failed`);
    return { accession: stringified };
  }

  const output: AccessionWithModifications = {
    accession: match.groups.accession,
  };

  if (match.groups.modifications) {
    output.modifications = {};
    const subsets: Subset[] = [];
    const variations: Variation[] = [];
    for (const mod of match.groups.modifications.split(',')) {
      const match = mod.match(reModification);
      /* istanbul ignore if */
      if (!match?.groups) {
        // Assume the accession is correct and hope for the best, log anyway
        logging.warn(`Trying to parse "${mod}" as a modification, failed`);
        continue; // eslint-disable-line no-continue
      }
      const { start, end, replacement } = match.groups;
      const modification: Subset | Variation = {
        start: +start,
        end: +(end || start),
        replacement,
      };
      if (mod.includes('>')) {
        variations.push(modification);
      } else {
        subsets.push(modification);
      }
    }
    if (subsets.length) {
      output.modifications.subsets = subsets;
    }
    if (variations.length) {
      output.modifications.variations = variations;
    }
  }

  return output;
};

export const stringifyModifications = (modifications?: Modifications) => {
  const mods: string[] = [];

  for (const subset of modifications?.subsets || []) {
    mods.push(
      `${subset.start}${subset.end !== subset.start ? `-${subset.end}` : ''}`
    );
  }

  for (const variation of modifications?.variations || []) {
    mods.push(
      `${variation.start}${
        variation.end !== variation.start ? `-${variation.end}` : ''
      }>${variation.replacement || ''}`
    );
  }

  return mods.join(',');
};

export const stringifyAccessionWithModifications = ({
  accession,
  modifications,
}: AccessionWithModifications): string => {
  let output = accession;

  const stringifiedModifications = stringifyModifications(modifications);

  if (stringifiedModifications) {
    output += `[${stringifiedModifications}]`;
  }

  return output;
};
