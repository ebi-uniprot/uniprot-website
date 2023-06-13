import { ActionType } from 'typesafe-actions';
import { truncate } from 'lodash-es';

import { PEPTIDE_SEARCH_MAXIMUM_LIMIT } from '../components/PeptideSearchForm';
import * as peptideSearchFormActions from './peptideSearchFormActions';
import splitAndTidyText from '../../../shared/utils/splitAndTidyText';

import {
  PeptideSearchFields,
  PeptideSearchFormValues,
} from '../config/PeptideSearchFormData';

type PeptideSearchFormState = {
  formValues: PeptideSearchFormValues;
  parsedSequences: string[];
  submitDisabled: boolean;
  sending: boolean;
};

export type PeptideSearchFormAction = ActionType<
  typeof peptideSearchFormActions
>;

const isInvalid = (parsedSequences: string[]) =>
  parsedSequences.length === 0 ||
  parsedSequences.length > PEPTIDE_SEARCH_MAXIMUM_LIMIT ||
  parsedSequences.some((parsedSequence) => parsedSequence.length < 7);

const getJobName = (parsedSequences: string[]) => {
  if (parsedSequences.length === 0) {
    return '';
  }
  return `${truncate(parsedSequences[0])}${
    parsedSequences.length > 1 ? ` +${parsedSequences.length - 1}` : ''
  }`;
};

export const getPeptideSearchFormInitialState = (
  initialFormValues: Readonly<PeptideSearchFormValues>
): PeptideSearchFormState => ({
  formValues: {
    ...initialFormValues,
    [PeptideSearchFields.name]: {
      ...initialFormValues[PeptideSearchFields.name],
      // default to true if it's been set through the history state
      userSelected: Boolean(
        initialFormValues[PeptideSearchFields.name].selected
      ),
    },
  },
  parsedSequences:
    splitAndTidyText(
      initialFormValues[PeptideSearchFields.peps].selected as string
    ) || [],
  // used when the form submission needs to be disabled
  submitDisabled: isInvalid(
    splitAndTidyText(
      initialFormValues[PeptideSearchFields.peps].selected as string
    )
  ),
  // used when the form is about to be submitted to the server
  sending: false,
});

export const peptideSearchFormSequenceReducer = (
  state: PeptideSearchFormState,
  {
    payload: peptideSequences,
  }: ActionType<typeof peptideSearchFormActions.updatePeptideSequences>
) => {
  const { formValues } = state;

  const parsedSequences = splitAndTidyText(peptideSequences);

  // Set Submit Disabled according to sequence
  const submitDisabled = isInvalid(parsedSequences);

  // Set Job Name, if user didn't already set
  const name =
    formValues[PeptideSearchFields.name].userSelected &&
    formValues[PeptideSearchFields.name].selected
      ? formValues[PeptideSearchFields.name]
      : {
          ...formValues[PeptideSearchFields.name],
          userSelected: false,
          selected: getJobName(parsedSequences),
        };

  // actual form fields
  // Set peps to raw peptide sequences no matter what
  const peps = {
    ...formValues[PeptideSearchFields.peps],
    selected: peptideSequences,
  };

  const taxIds = formValues[PeptideSearchFields.taxIds].userSelected
    ? formValues[PeptideSearchFields.taxIds]
    : {
        ...formValues[PeptideSearchFields.taxIds],
        selected: formValues[PeptideSearchFields.taxIds].selected,
      };

  const lEQi = formValues[PeptideSearchFields.lEQi].userSelected
    ? formValues[PeptideSearchFields.lEQi]
    : {
        ...formValues[PeptideSearchFields.lEQi],
        selected: formValues[PeptideSearchFields.lEQi].selected,
      };

  const spOnly = formValues[PeptideSearchFields.spOnly].userSelected
    ? formValues[PeptideSearchFields.spOnly]
    : {
        ...formValues[PeptideSearchFields.spOnly],
        selected: formValues[PeptideSearchFields.spOnly].selected,
      };

  return {
    ...state,
    parsedSequences,
    submitDisabled,
    formValues: {
      ...formValues,
      [PeptideSearchFields.peps]: peps,
      [PeptideSearchFields.taxIds]: taxIds,
      [PeptideSearchFields.lEQi]: lEQi,
      [PeptideSearchFields.spOnly]: spOnly,
      [PeptideSearchFields.name]: name,
    },
  };
};

export const peptideSearchFormUpdateSelectedReducer = (
  state: PeptideSearchFormValues,
  {
    payload: { id, selected },
  }: ActionType<typeof peptideSearchFormActions.updateSelected>
) => ({
  ...state,
  [id]: {
    ...state[id],
    selected,
    userSelected: true,
  },
});

export const getPeptideSearchFormDataReducer =
  (defaultFormValues: Readonly<PeptideSearchFormValues>) =>
  (
    state: PeptideSearchFormState,
    action: PeptideSearchFormAction
  ): PeptideSearchFormState => {
    switch (action.type) {
      case peptideSearchFormActions.UPDATE_PEPTIDE_SEQUENCES:
        return peptideSearchFormSequenceReducer(state, action);
      case peptideSearchFormActions.UPDATE_SELECTED:
        return {
          ...state,
          formValues: peptideSearchFormUpdateSelectedReducer(
            state.formValues,
            action
          ),
        };
      case peptideSearchFormActions.UPDATE_SENDING:
        return {
          ...state,
          submitDisabled: true,
          sending: true,
        };
      case peptideSearchFormActions.RESET:
        return getPeptideSearchFormInitialState(defaultFormValues);
      default:
        return state;
    }
  };
