import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { PeptideSearchMatch } from '../components/PeptideSearchMatches';

export const getMatches = (
  entrySequence: string,
  matchSequences: string[]
): PeptideSearchMatch[] =>
  matchSequences
    .map((matchSequence) => {
      const start = entrySequence.indexOf(matchSequence);
      return {
        matchSequence,
        start,
        end: start + matchSequence.length - 1,
      };
    })
    .filter(({ start }) => start >= 0)
    .sort((a, b) => a.start - b.start);

const peptideSearchConverter = (
  results: UniProtkbAPIModel[],
  peptides?: string
): UniProtkbAPIModel[] => {
  if (!peptides) {
    return results;
  }

  const querySequences = peptides.split('\n');

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
