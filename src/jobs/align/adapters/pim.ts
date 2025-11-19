import { PIM } from '../types/alignResults';
import extractAccession from '../utils/extractAccession';

const whitespaces = /\s+/;

export default (string: string): PIM => {
  const output: PIM = [];

  const linesOfData = string
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => Boolean(line) && !line.startsWith('#'));

  // square matrix, so we expect the same number of lines and number of values
  const numberOfValues = linesOfData.length;

  // match indices:
  //        ([1])      (                                                 [2])
  const re = new RegExp(
    `^\\d+: (\\S(?:.*\\S)?)\\s+(((\\d{1,3}\\.\\d{2}|(-?nan))\\s*){${numberOfValues}})$`
    //  ↳ index of the sequence in the file
    //         ↳ identifier of the sequence (group match)
    //                              ↳ any decimal number between 0.00 and 100.00
    //                                               ↳ "-nan" is a possible value
    //                                                              ↳ n values per line
  );

  for (const line of linesOfData) {
    const match = line.match(re);

    if (!match) {
      throw new Error('Unexpected format in PIM values');
    }

    const values = match[2].split(whitespaces).map((text) => parseFloat(text));

    output.push({
      name: match[1],
      accession: extractAccession(match[1])?.accession,
      values,
    });
  }

  // sanity check
  if (
    // Any of the value arrays doesn't have the right number of items
    output.some((outputItem) => outputItem.values.length !== numberOfValues)
  ) {
    throw new Error('Found inconsistent number of values');
  }

  return output;
};
