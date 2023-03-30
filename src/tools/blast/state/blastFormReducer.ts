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
  [BlastFields.name]: {
    ...defaultFormValues[BlastFields.name],
    // default to true if it's been set through the history state
    userSelected: Boolean(defaultFormValues[BlastFields.name].selected),
  },
  parsedSequences: sequenceProcessor(
    `${defaultFormValues[BlastFields.sequence].selected || ''}`
  ),
  // used when the form submission needs to be disabled
  submitDisabled: isInvalid(
    sequenceProcessor(
      `${defaultFormValues[BlastFields.sequence].selected || ''}`
    )
  ),
  sending: false,
});

export const blastFormDataUpdateReducer = (state, action) => {
  const {
    payload: { id, value },
  } = action;
  switch (id) {
    case 'parsedSequences': {
      const parsedSequences = value;

      // Only proceed if the raw sequence has changed
      const rawSequence = parsedSequences
        .map((parsedSequence) => parsedSequence.raw)
        .join('\n');
      if (rawSequence === state[BlastFields.sequence]?.selected) {
        return state;
      }
      const sequence = {
        ...[BlastFields.sequence],
        selected: rawSequence,
      };

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

      // Set Job Name if the user didn't manually set this
      const name =
        state[BlastFields.name].userSelected && state[BlastFields.name].selected
          ? state[BlastFields.name]
          : {
              ...state[BlastFields.name],
              selected: parsedSequences[0]?.name || '',
            };
      return {
        ...state,
        parsedSequences,
        submitDisabled,
        [BlastFields.matrix]: matrix,
        [BlastFields.name]: name,
        [BlastFields.program]: program,
        [BlastFields.sequence]: sequence,
        [BlastFields.stype]: stype,
      };
    }
    case 'sending':
      // used when the form is about to be submitted to the server
      return {
        ...state,
        submitDisabled: true,
        sending: true,
      };
    default: {
      return {
        ...state,
        [id]: {
          ...state[id],
          selected: value,
          userSelected: true,
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
