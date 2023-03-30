// import { BlastFormValue } from '../config/BlastFormData';

export const updateFormState = (id, value) => ({
  type: 'update',
  payload: { id, value },
});
