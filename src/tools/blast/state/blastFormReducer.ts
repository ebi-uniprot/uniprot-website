import { sequenceProcessor } from 'franklin-sites';
import { getAutoMatrixFor } from '../components/BlastForm';

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
    // case BlastFields.matrix: {

    // }
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
    case 'parsedSequences': {
      // set the "Auto" matrix to the have the correct label depending on sequence
      const autoMatrix = getAutoMatrixFor(value[0]?.sequence);
      return {
        ...state,
        parsedSequences: value,
        [BlastFields.matrix]: {
          ...state[BlastFields.matrix],
          values: [
            { label: `Auto - ${autoMatrix}`, value: 'auto' },
            ...state[BlastFields.matrix].values.filter(
              (option) => option.value !== 'auto'
            ),
          ],
        },
      };
    }
    default: {
      return {
        ...state,
        [id]: {
          ...state[id],
          selected: value,
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
