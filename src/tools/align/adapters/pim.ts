import extractAccession from '../utils/extractAccession';

import { PIM } from '../types/alignResults';

// match indices: ([1])   (                 [2])
const re = /^\d+: (\S*)\s+((\d{1,3}\.\d{2}\s*)+)$/;
const whitespaces = /\s+/;

export default (string: string): PIM => {
  const output: PIM = [];

  for (const line of string.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue; // eslint-disable-line no-continue
    }

    const match = trimmed.match(re);

    if (!match) {
      continue; // eslint-disable-line no-continue
    }

    output.push({
      name: match[1],
      accession: extractAccession(match[1]),
      values: match[2].split(whitespaces).map((text) => parseFloat(text)),
    });
  }

  return output;
};
