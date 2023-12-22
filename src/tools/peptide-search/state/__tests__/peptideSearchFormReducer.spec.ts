import {
  PeptideSearchFormAction,
  getPeptideSearchFormDataReducer,
  getPeptideSearchFormInitialState,
} from '../peptideSearchFormReducer';
import * as actions from '../peptideSearchFormActions';
import defaultFormValues, {
  PeptideSearchFields,
} from '../../config/PeptideSearchFormData';

describe('peptidesearchFormReducer', () => {
  it('should reset with new form values when provided then reset to default if not provided', () => {
    const reducer = getPeptideSearchFormDataReducer(defaultFormValues);
    const initialState = getPeptideSearchFormInitialState(defaultFormValues);
    let action: PeptideSearchFormAction = {
      type: actions.RESET,
      payload: {
        ...initialState.formValues,
        [PeptideSearchFields.name]: {
          fieldName: 'name',
          selected: 'foo',
        },
      },
    };
    let state = reducer(initialState, action);
    expect(state.formValues.Name.selected).toEqual(
      action.payload?.Name.selected
    );
    action = {
      type: actions.RESET,
      payload: undefined,
    };
    state = reducer(state, action);
    expect(state).toEqual(initialState);
  });
});
