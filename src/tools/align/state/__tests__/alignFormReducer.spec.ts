import {
  AlignFormAction,
  getAlignFormDataReducer,
  getAlignFormInitialState,
} from '../alignFormReducer';
import * as actions from '../alignFormActions';
import defaultFormValues, { AlignFields } from '../../config/AlignFormData';

describe('alignFormReducer', () => {
  it('should reset with new form values when provided then reset to default if not provided', () => {
    const reducer = getAlignFormDataReducer(defaultFormValues);
    const initialState = getAlignFormInitialState(defaultFormValues);
    let action: AlignFormAction = {
      type: actions.RESET,
      payload: {
        ...initialState.formValues,
        [AlignFields.name]: {
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
