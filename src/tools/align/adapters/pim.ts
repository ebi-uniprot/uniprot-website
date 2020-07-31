import extractAccession from '../utils/extractAccession';

import { PIM } from '../types/alignResults';

// match indices: ([1])   (                 [2])
const re = /^\d+: (\S*)\s+((\d{1,3}\.\d{2}\s*)+)$/;
const whitespaces = /\s+/;

// TODO: take into account possible NaN values (present as "-nan" in the data)!

export default (string: string): PIM => {
  const output: PIM = [];

  const lengths = new Set();

  for (const line of string.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue; // eslint-disable-line no-continue
    }

    const match = trimmed.match(re);

    if (!match) {
      continue; // eslint-disable-line no-continue
    }

    const values = match[2].split(whitespaces).map((text) => parseFloat(text));
    lengths.add(values.length);

    output.push({
      name: match[1],
      accession: extractAccession(match[1]),
      values,
    });
  }

  // sanity checks
  if (lengths.size > 1 || output[0].values.length !== output.length) {
    throw new Error('Found inconsistent number of values');
  }

  return output;
};
