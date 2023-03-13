import deepFreeze from 'deep-freeze';
import { FormParameters } from '../types/asyncDownloadFormParameters';

export type AsyncDownloadFormValue = {
  fieldName: string;
  selected?: Readonly<string | FormParameters>;
};

export enum AsyncDownloadFields {
  name = 'Name',
  options = 'Options',
}

export type AsyncDownloadFormValues = Record<
  AsyncDownloadFields,
  Readonly<AsyncDownloadFormValue>
>;

const formData: Readonly<AsyncDownloadFormValues> = deepFreeze({
  [AsyncDownloadFields.name]: {
    fieldName: 'name',
    selected: '',
  },
  [AsyncDownloadFields.options]: {
    fieldName: 'options',
    selected: undefined,
  },
});

export default formData;
