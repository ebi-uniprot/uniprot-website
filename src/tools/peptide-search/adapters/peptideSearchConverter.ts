import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { PeptideSearchMatch } from '../components/PeptideSearchMatches';

export const getMatches = (
  entrySequence: string,
  matchSequences: string[]
): PeptideSearchMatch[] => {
  const matches: PeptideSearchMatch[] = [];

  for (const matchSequence of matchSequences) {
    let start = entrySequence.indexOf(matchSequence.toUpperCase(), 0);
    while (start !== -1) {
      matches.push({
        matchSequence,
        start,
        end: start + matchSequence.length - 1,
      });

      // find the next match
      start = entrySequence.indexOf(matchSequence.toUpperCase(), start + 1);
    }
  }

  return matches.sort((a, b) => a.start - b.start);
};

const peptideSearchConverter = (
  results: UniProtkbAPIModel[],
  peptides?: string
): UniProtkbAPIModel[] => {
  if (!peptides) {
    return results;
  }

  const querySequences = peptides.split(/\s+/).filter(Boolean);

  return results.map((result) => {
    const sequence = 'sequence' in result && result.sequence.value;
    if (sequence) {
      return {
        ...result,
        peptideSearchMatches: getMatches(sequence, querySequences),
      };
    }
    return result;
  });
};

export default peptideSearchConverter;
