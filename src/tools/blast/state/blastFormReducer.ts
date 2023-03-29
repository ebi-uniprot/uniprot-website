import { sequenceProcessor } from 'franklin-sites';

import { BlastFormValues, BlastFields } from '../config/BlastFormData';

export const getBlastFormDataInit = (
  defaultFormValues: Readonly<BlastFormValues>
) => ({
  ...defaultFormValues,
  parsedSequences: sequenceProcessor(
    `${defaultFormValues[BlastFields.sequence].selected}` || ''
  ),
});

export const blastFormDataUpdateReducer = (state, action) => {
  const {
    payload: { id, value },
  } = action;
  switch (id) {
    case BlastFields.stype: {
      const mightBeDNA = state.parsedSequences[0]?.likelyType === 'na';
      const selected = mightBeDNA ? 'dna' : 'protein';
      if (state[BlastFields.stype].selected === selected) {
        return state;
      }
      return {
        ...state,
        [BlastFields.stype]: {
          ...state[BlastFields.stype],
          selected,
        },
      };
    }
    case BlastFields.program: {
      const mightBeDNA = state.parsedSequences[0]?.likelyType === 'na';
      // If value explicitly provided use this otherwise we want protein by default
      const selected = value?.selected || (mightBeDNA ? 'blastx' : 'blastp');
      if (state[BlastFields.program].selected === selected) {
        // avoid unecessary rerender by keeping the same object
        return state;
      }
      return {
        ...state,
        [BlastFields.program]: {
          ...state[BlastFields.program],
          selected,
        },
      };
    }
    case 'parsedSequences':
      return { ...state, parsedSequences: value };
    default: {
      return {
        ...state,
        [id]: {
          ...state[id],
          selected: value.selected,
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
