import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { FinishedJob } from '../../types/toolsJob';
import { JobTypes } from '../../types/toolsJobTypes';

export const getQueryMatches = (
  entrySequence: string,
  matchSequences: string[]
) =>
  matchSequences
    .map((matchSequence) => ({
      matchSequence,
      position: entrySequence.indexOf(matchSequence),
    }))
    .filter(({ position }) => position >= 0)
    .sort((a, b) => a.position - b.position);

const peptideSearchConverter = (
  results: UniProtkbAPIModel[],
  job?: FinishedJob<JobTypes.PEPTIDE_SEARCH>
) => {
  if (job === undefined || !job.parameters.peps) {
    return results;
  }

  const querySequences = job.parameters.peps.split('\n');

  return results.map((result) => {
    const sequence = 'sequence' in result && result.sequence.value;
    if (sequence) {
      getQueryMatches(sequence, querySequences).map(
        ({ matchSequence, position }) =>
          `Match to ${matchSequence} at ${position}`
      );
    }
    return result;
  });
};

export default peptideSearchConverter;
