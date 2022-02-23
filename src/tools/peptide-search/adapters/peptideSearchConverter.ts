import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { PeptideSearchMatch } from '../components/PeptideSearchMatches';

export const getMatches = (
  entrySequence: string,
  matchSequences: string[]
): PeptideSearchMatch[] =>
  matchSequences
    .map((matchSequence) => ({
      matchSequence,
      position: entrySequence.indexOf(matchSequence),
    }))
    .filter(({ position }) => position >= 0)
    .sort((a, b) => a.position - b.position);

const peptideSearchConverter = (
  results: UniProtkbAPIModel[],
  peptides?: string
): UniProtkbAPIModel[] => {
  if (!peptides) {
    return results;
  }

  const querySequences = peptides.split('\n');

  const t = results.map((result) => {
    const sequence = 'sequence' in result && result.sequence.value;
    if (sequence) {
      return {
        ...result,
        peptideSearchMatches: getMatches(sequence, querySequences),
      };
    }
    return result;
  });
  return t;
};

export default peptideSearchConverter;
