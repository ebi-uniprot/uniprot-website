import { sequenceProcessor } from 'franklin-sites';
import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';
import { ActionType } from 'typesafe-actions';
import { BLAST_LIMIT, getAutoMatrixFor } from '../components/BlastForm';
import * as blastFormActions from './blastFormActions';

import {
  BlastFormValues,
  BlastFields,
  BlastFormValue,
} from '../config/BlastFormData';

const isInvalid = (parsedSequences: SequenceObject[]) =>
  !parsedSequences.length ||
  parsedSequences.length > BLAST_LIMIT ||
  parsedSequences.some((parsedSequence) => !parsedSequence.valid);

export const getBlastFormDataInitialState = (
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

export const blastFormDataUpdateReducer = (
  state: BlastFormState,
  action: ActionType<typeof blastFormActions.updateFormState>
) => {
  const {
    payload: { id, value },
  } = action;
  switch (id) {
    case 'parsedSequences': {
      const parsedSequences = value as SequenceObject[];

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
      // TODO: still update values even if user selected
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
              ...(state[BlastFields.matrix].values || []).filter(
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
      if (typeof state[id] !== 'object') {
        throw new Error('Should only be instance of BlastFormValue');
      }
      const blastFormValue = state[id] as BlastFormValue;
      return {
        ...state,
        [id]: {
          ...blastFormValue,
          selected: value,
          userSelected: true,
        },
      };
    }
  }
};

type BlastFormState = ReturnType<typeof getBlastFormDataInitialState>;

export type BlastFormActionPayloadId =
  | BlastFields
  | 'parsedSequences'
  | 'submitDisabled'
  | 'sending';

export type BlastFormAction = ActionType<typeof blastFormActions>;

export const getBlastFormDataReducer =
  (defaultFormValues: Readonly<BlastFormValues>) =>
  (state: BlastFormState, action: BlastFormAction): BlastFormState => {
    switch (action.type) {
      case blastFormActions.UPDATE:
        return blastFormDataUpdateReducer(state, action);
      case blastFormActions.RESET:
        return getBlastFormDataInitialState(defaultFormValues);
      default:
        return state;
    }
  };
