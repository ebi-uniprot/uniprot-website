import {
  BlastFormAction,
  getBlastFormDataReducer,
  getBlastFormInitialState,
} from '../blastFormReducer';
import * as actions from '../blastFormActions';
import defaultFormValues, { BlastFields } from '../../config/BlastFormData';

describe('blastFormReducer', () => {
  it('should reset with new form values when provided then reset to default if not provided', () => {
    const reducer = getBlastFormDataReducer(defaultFormValues);
    const initialState = getBlastFormInitialState(defaultFormValues);
    let action: BlastFormAction = {
      type: actions.RESET,
      payload: {
        ...initialState.formValues,
        [BlastFields.name]: {
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
