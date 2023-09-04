import { AsyncDownloadFormValues } from '../config/asyncDownloadFormData';

type Props = {
  formValues: AsyncDownloadFormValues;
};

const AsyncDownloadConfirmation = ({ formValues }: Props) => {
  console.log(formValues);
  return <>{JSON.stringify(formValues)}</>;
};

export default AsyncDownloadConfirmation;
