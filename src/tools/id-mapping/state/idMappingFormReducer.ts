import { ActionType } from 'typesafe-actions';

import * as idMappingFormActions from './idMappingFormActions';
import splitAndTidyText from '../../../shared/utils/splitAndTidyText';

import { ID_MAPPING_LIMIT } from '../../../shared/config/limits';

import {
  IDMappingFields,
  IDMappingFormValue,
  IDMappingFormValues,
} from '../config/idMappingFormData';

type IDMappingFormState = {
  formValues: IDMappingFormValues;
  textIDs: string;
  submitDisabled: boolean;
  sending: boolean;
};

export type IDMappingFormAction = ActionType<typeof idMappingFormActions>;

const isInvalid = (ids: IDMappingFormValue['selected']) =>
  !Array.isArray(ids) || !ids.length || ids.length > ID_MAPPING_LIMIT;

export const getJobName = (
  parsedIDs: string[],
  fromDb: string,
  toDb: string
) => {
  if (parsedIDs.length > 0) {
    const firstParsedID = parsedIDs[0];
    return `${firstParsedID}${
      parsedIDs.length > 1 ? ` +${parsedIDs.length - 1}` : ''
    } ${fromDb} → ${toDb}`;
  }
  return '';
};

export const getIDMappingFormInitialState = (
  initialFormValues: Readonly<IDMappingFormValues>
): IDMappingFormState => ({
  formValues: {
    ...initialFormValues,
    [IDMappingFields.name]: {
      ...initialFormValues[IDMappingFields.name],
      // default to true if it's been set through the history state
      userSelected: Boolean(initialFormValues[IDMappingFields.name].selected),
    },
  },
  textIDs: (initialFormValues[IDMappingFields.ids]?.selected as string[])?.join(
    '\n'
  ),
  // used when the form submission needs to be disabled
  submitDisabled: isInvalid(initialFormValues[IDMappingFields.ids].selected),
  // used when the form is about to be submitted to the server
  sending: false,
});

export const idMappingFormInputTextIDsReducer = (
  state: IDMappingFormState,
  {
    payload: textIDs,
  }: ActionType<typeof idMappingFormActions.updateInputTextIDs>
) => {
  const { formValues } = state;

  const parsedIDs = Array.from(new Set(splitAndTidyText(textIDs)));

  // Set Submit Disabled according to ids
  const submitDisabled = isInvalid(parsedIDs);

  // Set Job Name, if user didn't already set
  const name =
    formValues[IDMappingFields.name].userSelected &&
    formValues[IDMappingFields.name].selected
      ? formValues[IDMappingFields.name]
      : {
          ...formValues[IDMappingFields.name],
          userSelected: false,
          selected: getJobName(
            parsedIDs,
            formValues[IDMappingFields.fromDb].selected as string,
            formValues[IDMappingFields.toDb].selected as string
          ),
        };

  // actual form fields
  const ids = formValues[IDMappingFields.ids].userSelected
    ? formValues[IDMappingFields.ids]
    : {
        ...formValues[IDMappingFields.ids],
        selected: formValues[IDMappingFields.ids].selected,
      };

  const fromDb = formValues[IDMappingFields.fromDb].userSelected
    ? formValues[IDMappingFields.fromDb]
    : {
        ...formValues[IDMappingFields.fromDb],
        selected: formValues[IDMappingFields.fromDb].selected,
      };

  const toDb = formValues[IDMappingFields.toDb].userSelected
    ? formValues[IDMappingFields.toDb]
    : {
        ...formValues[IDMappingFields.toDb],
        selected: formValues[IDMappingFields.toDb].selected,
      };
  const taxID = formValues[IDMappingFields.taxons].userSelected
    ? formValues[IDMappingFields.taxons]
    : {
        ...formValues[IDMappingFields.taxons],
        selected: formValues[IDMappingFields.taxons].selected,
      };

  return {
    ...state,
    textIDs,
    submitDisabled,
    formValues: {
      ...formValues,
      [IDMappingFields.ids]: ids,
      [IDMappingFields.fromDb]: fromDb,
      [IDMappingFields.toDb]: toDb,
      [IDMappingFields.name]: name,
      [IDMappingFields.taxons]: taxID,
    },
  };
};

export const idMappingFormUpdateSelectedReducer = (
  state: IDMappingFormValues,
  {
    payload: { id, selected },
  }: ActionType<typeof idMappingFormActions.updateSelected>
) => ({
  ...state,
  [id]: {
    ...state[id],
    selected,
    userSelected: true,
  },
});

export const getIDMappingFormDataReducer =
  (defaultFormValues: Readonly<IDMappingFormValues>) =>
  (
    state: IDMappingFormState,
    action: IDMappingFormAction
  ): IDMappingFormState => {
    switch (action.type) {
      case idMappingFormActions.UPDATE_PARSED_IDS:
        return idMappingFormInputTextIDsReducer(state, action);
      case idMappingFormActions.UPDATE_SELECTED:
        return {
          ...state,
          formValues: idMappingFormUpdateSelectedReducer(
            state.formValues,
            action
          ),
        };
      case idMappingFormActions.UPDATE_SENDING:
        return {
          ...state,
          submitDisabled: true,
          sending: true,
        };
      case idMappingFormActions.RESET:
        return getIDMappingFormInitialState(
          action.payload || defaultFormValues
        );
      default:
        return state;
    }
  };
