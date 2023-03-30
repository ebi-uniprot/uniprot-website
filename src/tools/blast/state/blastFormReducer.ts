import { sequenceProcessor } from 'franklin-sites';
import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';
import { BLAST_LIMIT, getAutoMatrixFor } from '../components/BlastForm';

import { BlastFormValues, BlastFields } from '../config/BlastFormData';

const isInvalid = (parsedSequences: SequenceObject[]) =>
  !parsedSequences.length ||
  parsedSequences.length > BLAST_LIMIT ||
  parsedSequences.some((parsedSequence) => !parsedSequence.valid);

export const getBlastFormDataInit = (
  defaultFormValues: Readonly<BlastFormValues>
) => ({
  ...defaultFormValues,
  parsedSequences: sequenceProcessor(
    `${defaultFormValues[BlastFields.sequence].selected || ''}`
  ),
  // used when the form submission needs to be disabled
  submitDisabled: isInvalid(
    sequenceProcessor(
      `${defaultFormValues[BlastFields.sequence].selected || ''}`
    )
  ),
});

export const blastFormDataUpdateReducer = (state, action) => {
  const {
    payload: { id, value },
  } = action;
  switch (id) {
    case 'parsedSequences': {
      const parsedSequences = value;

      // Set Submit Disabled according to sequence
      const submitDisabled = isInvalid(parsedSequences);

      // Set the "Auto" matrix according to sequence
      const autoMatrix = getAutoMatrixFor(parsedSequences[0]?.sequence);
      const matrix = {
        ...state[BlastFields.matrix],
        values: [
          { label: `Auto - ${autoMatrix}`, value: 'auto' },
          ...state[BlastFields.matrix].values.filter(
            (option) => option.value !== 'auto'
          ),
        ],
      };

      // Set Program according to sequence
      const mightBeDNA = parsedSequences[0]?.likelyType === 'na';
      const program = {
        ...state[BlastFields.program],
        selected: mightBeDNA ? 'blastx' : 'blastp',
      };

      // Set Sequence Type according to sequence
      const stype = {
        ...state[BlastFields.stype],
        selected: mightBeDNA ? 'dna' : 'protein',
      };

      return {
        ...state,
        parsedSequences,
        submitDisabled,
        [BlastFields.matrix]: matrix,
        [BlastFields.program]: program,
        [BlastFields.stype]: stype,
      };
    }
    default: {
      return {
        ...state,
        [id]: {
          ...state[id],
          selected: value.selected,
        },
      };
    }
  }
};

export const getBlastFormDataReducer =
  (defaultFormValues: Readonly<BlastFormValues>) => (state, action) => {
    switch (action.type) {
      case 'update':
        return blastFormDataUpdateReducer(state, action);
      case 'reset':
        return defaultFormValues;
      default:
        return state;
    }
  };
