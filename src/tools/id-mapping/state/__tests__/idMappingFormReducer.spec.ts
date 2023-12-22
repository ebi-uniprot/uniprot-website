import {
  IDMappingFormAction,
  getIDMappingFormDataReducer,
  getIDMappingFormInitialState,
} from '../idMappingFormReducer';
import * as actions from '../idMappingFormActions';
import defaultFormValues, {
  IDMappingFields,
} from '../../config/idMappingFormData';

describe('idmappingFormReducer', () => {
  it('should reset with new form values when provided then reset to default if not provided', () => {
    const reducer = getIDMappingFormDataReducer(defaultFormValues);
    const initialState = getIDMappingFormInitialState(defaultFormValues);
    let action: IDMappingFormAction = {
      type: actions.RESET,
      payload: {
        ...initialState.formValues,
        [IDMappingFields.name]: {
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
