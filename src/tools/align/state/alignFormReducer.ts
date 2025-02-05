import { sequenceProcessor } from 'franklin-sites';
import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';
import { ActionType } from 'typesafe-actions';

import * as alignFormActions from './alignFormActions';
import { pluralise } from '../../../shared/utils/utils';

import { ALIGN_LIMIT } from '../../../shared/config/limits';

import { AlignFields, AlignFormValues } from '../config/AlignFormData';

type AlignFormState = {
  formValues: AlignFormValues;
  parsedSequences: SequenceObject[];
  submitDisabled: boolean;
  sending: boolean;
};

export type AlignFormAction = ActionType<typeof alignFormActions>;

const isInvalid = (parsedSequences: SequenceObject[]) =>
  parsedSequences.length > ALIGN_LIMIT ||
  parsedSequences.length <= 1 ||
  parsedSequences.some((parsedSequence) => !parsedSequence.valid);

const getJobName = (parsedSequences: SequenceObject[]) => {
  const firstName = parsedSequences.find((item) => item.name)?.name;
  if (firstName) {
    let jobName = firstName;
    if (parsedSequences.length > 1) {
      jobName += ` +${parsedSequences.length - 1}`;
    }
    return jobName;
  }
  if (parsedSequences.length) {
    return `${parsedSequences.length} ${pluralise(
      'sequence',
      parsedSequences.length
    )}`;
  }
  return '';
};

export const getAlignFormInitialState = (
  initialFormValues: Readonly<AlignFormValues>
): AlignFormState => ({
  formValues: {
    ...initialFormValues,
    [AlignFields.name]: {
      ...initialFormValues[AlignFields.name],
    },
  },
  parsedSequences: sequenceProcessor(
    `${initialFormValues[AlignFields.sequence].selected || ''}`
  ),
  // used when the form submission needs to be disabled
  submitDisabled: isInvalid(
    sequenceProcessor(
      `${initialFormValues[AlignFields.sequence].selected || ''}`
    )
  ),
  // used when the form is about to be submitted to the server
  sending: false,
});

const alignFormParsedSequencesReducer = (
  state: AlignFormState,
  {
    payload: parsedSequences,
  }: ActionType<typeof alignFormActions.updateParsedSequences>
) => {
  const { formValues } = state;

  // Set Submit Disabled according to sequence
  const submitDisabled = isInvalid(parsedSequences);

  // Only proceed if the raw sequence has changed
  const rawSequence = parsedSequences
    .map((parsedSequence) => parsedSequence.raw)
    .join('\n');
  if (rawSequence === formValues[AlignFields.sequence]?.selected) {
    return state;
  }
  const sequence = {
    ...formValues[AlignFields.sequence],
    selected: rawSequence,
  };

  // Set Job Name, if user didn't already set
  const name =
    formValues[AlignFields.name].userSelected &&
    formValues[AlignFields.name].selected
      ? formValues[AlignFields.name]
      : {
          ...formValues[AlignFields.name],
          userSelected: false,
          selected: getJobName(parsedSequences),
        };

  // actual form fields
  const order = formValues[AlignFields.order].userSelected
    ? formValues[AlignFields.order]
    : {
        ...formValues[AlignFields.order],
        selected: formValues[AlignFields.order].selected,
      };

  const iterations = formValues[AlignFields.iterations].userSelected
    ? formValues[AlignFields.iterations]
    : {
        ...formValues[AlignFields.iterations],
        selected: formValues[AlignFields.iterations].selected,
      };

  return {
    ...state,
    parsedSequences,
    submitDisabled,
    formValues: {
      ...formValues,
      [AlignFields.sequence]: sequence,
      [AlignFields.name]: name,
      [AlignFields.order]: order,
      [AlignFields.iterations]: iterations,
    },
  };
};

const alignFormUpdateSelectedReducer = (
  state: AlignFormValues,
  {
    payload: { id, selected },
  }: ActionType<typeof alignFormActions.updateSelected>
) => ({
  ...state,
  [id]: {
    ...state[id],
    selected,
    userSelected: true,
  },
});

export const getAlignFormDataReducer =
  (defaultFormValues: Readonly<AlignFormValues>) =>
  (state: AlignFormState, action: AlignFormAction): AlignFormState => {
    switch (action.type) {
      case alignFormActions.UPDATE_PARSED_SEQUENCES:
        return alignFormParsedSequencesReducer(state, action);
      case alignFormActions.UPDATE_SELECTED:
        return {
          ...state,
          formValues: alignFormUpdateSelectedReducer(state.formValues, action),
        };
      case alignFormActions.UPDATE_SENDING:
        return {
          ...state,
          submitDisabled: true,
          sending: true,
        };
      case alignFormActions.RESET:
        return getAlignFormInitialState(action.payload || defaultFormValues);
      default:
        return state;
    }
  };
