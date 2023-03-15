import deepFreeze from 'deep-freeze';

export type AsyncDownloadFormValue = {
  fieldName: string;
  selected: Readonly<string>;
};

export enum AsyncDownloadFields {
  name = 'Name',
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
});

export default formData;
