import { sequenceProcessor } from 'franklin-sites';
import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';
import { ActionType } from 'typesafe-actions';

import { getAutoMatrixFor } from '../utils';

import * as blastFormActions from './blastFormActions';

import { BLAST_LIMIT } from '../../../shared/config/limits';

import { BlastFormValues, BlastFields } from '../config/BlastFormData';

type BlastFormState = {
  formValues: BlastFormValues;
  parsedSequences: SequenceObject[];
  submitDisabled: boolean;
  sending: boolean;
};

export type BlastFormAction = ActionType<typeof blastFormActions>;

const isInvalid = (parsedSequences: SequenceObject[]) =>
  !parsedSequences.length ||
  parsedSequences.length > BLAST_LIMIT ||
  parsedSequences.some((parsedSequence) => !parsedSequence.valid);

export const getBlastFormInitialState = (
  initialFormValues: Readonly<BlastFormValues>
): BlastFormState => ({
  formValues: {
    ...initialFormValues,
    [BlastFields.name]: {
      ...initialFormValues[BlastFields.name],
      // default to true if it's been set through the history state
      userSelected: Boolean(initialFormValues[BlastFields.name].selected),
    },
  },
  parsedSequences: sequenceProcessor(
    `${initialFormValues[BlastFields.sequence].selected || ''}`
  ),
  // used when the form submission needs to be disabled
  submitDisabled: isInvalid(
    sequenceProcessor(
      `${initialFormValues[BlastFields.sequence].selected || ''}`
    )
  ),
  // used when the form is about to be submitted to the server
  sending: false,
});

export const blastFormParsedSequencesReducer = (
  state: BlastFormState,
  {
    payload: parsedSequences,
  }: ActionType<typeof blastFormActions.updateParsedSequences>
) => {
  const { formValues } = state;

  // Only proceed if the raw sequence has changed
  const rawSequence = parsedSequences
    .map((parsedSequence) => parsedSequence.raw)
    .join('\n');
  if (rawSequence === formValues[BlastFields.sequence]?.selected) {
    return state;
  }
  const sequence = {
    ...formValues[BlastFields.sequence],
    selected: rawSequence,
  };

  // Set Submit Disabled according to sequence
  const submitDisabled = isInvalid(parsedSequences);

  // Set the "Auto" matrix according to sequence. The selected value
  // isn't changed just which of the values is marked as auto.
  const matrix = {
    ...formValues[BlastFields.matrix],
    values: [
      {
        label: `Auto - ${getAutoMatrixFor(parsedSequences[0]?.sequence)}`,
        value: 'auto',
      },
      ...(formValues[BlastFields.matrix].values || []).filter(
        (option) => option.value !== 'auto'
      ),
    ],
  };

  const mightBeDNA = parsedSequences[0]?.likelyType === 'na';

  // Set Program according to sequence, if user didn't already set
  const program = formValues[BlastFields.program].userSelected
    ? formValues[BlastFields.program]
    : {
        ...formValues[BlastFields.program],
        selected: mightBeDNA ? 'blastx' : 'blastp',
      };

  // Set Sequence Type according to sequence, if user didn't already set
  const stype = formValues[BlastFields.stype].userSelected
    ? formValues[BlastFields.stype]
    : {
        ...formValues[BlastFields.stype],
        selected: mightBeDNA ? 'dna' : 'protein',
      };

  // Set Job Name, if user didn't already set
  const name =
    formValues[BlastFields.name].userSelected &&
    formValues[BlastFields.name].selected
      ? formValues[BlastFields.name]
      : {
          ...formValues[BlastFields.name],
          userSelected: false,
          // Set the job name empty when there are multiple sequences copy-pasted
          selected:
            parsedSequences.length === 1 ? parsedSequences[0]?.name : '',
        };

  return {
    ...state,
    parsedSequences,
    submitDisabled,
    formValues: {
      ...formValues,
      [BlastFields.matrix]: matrix,
      [BlastFields.name]: name,
      [BlastFields.program]: program,
      [BlastFields.sequence]: sequence,
      [BlastFields.stype]: stype,
    },
  };
};

export const blastFormUpdateSelectedReducer = (
  state: BlastFormValues,
  {
    payload: { id, selected },
  }: ActionType<typeof blastFormActions.updateSelected>
) => ({
  ...state,
  [id]: {
    ...state[id],
    selected,
    userSelected: true,
  },
});

export const getBlastFormDataReducer =
  (defaultFormValues: Readonly<BlastFormValues>) =>
  (state: BlastFormState, action: BlastFormAction): BlastFormState => {
    switch (action.type) {
      case blastFormActions.UPDATE_PARSED_SEQUENCES:
        return blastFormParsedSequencesReducer(state, action);
      case blastFormActions.UPDATE_SELECTED:
        return {
          ...state,
          formValues: blastFormUpdateSelectedReducer(state.formValues, action),
        };
      case blastFormActions.UPDATE_SENDING:
        return {
          ...state,
          submitDisabled: true,
          sending: true,
        };
      case blastFormActions.RESET:
        return getBlastFormInitialState(action.payload || defaultFormValues);
      default:
        return state;
    }
  };
