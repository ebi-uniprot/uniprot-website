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
  // used when the form is about to be submitted to the server
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

      // Set the "Auto" matrix according to sequence if user didn't already set
      const matrix = state[BlastFields.matrix].userSelected
        ? state[BlastFields.matrix]
        : {
            ...state[BlastFields.matrix],
            values: [
              {
                label: `Auto - ${getAutoMatrixFor(
                  parsedSequences[0]?.sequence
                )}`,
                value: 'auto',
              },
              ...state[BlastFields.matrix].values.filter(
                (option) => option.value !== 'auto'
              ),
            ],
          };

      const mightBeDNA = parsedSequences[0]?.likelyType === 'na';

      // Set Program according to sequence, if user didn't already set
      const program = state[BlastFields.program].userSelected
        ? state[BlastFields.program]
        : {
            ...state[BlastFields.program],
            selected: mightBeDNA ? 'blastx' : 'blastp',
          };

      // Set Sequence Type according to sequence, if user didn't already set
      const stype = state[BlastFields.stype].userSelected
        ? state[BlastFields.stype]
        : {
            ...state[BlastFields.stype],
            selected: mightBeDNA ? 'dna' : 'protein',
          };

      // Set Job Name, if user didn't already set
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
