import { CodeBlock, InfoList } from 'franklin-sites';

import { AsyncDownloadFormValues } from '../config/asyncDownloadFormData';

type Props = {
  formValues: AsyncDownloadFormValues;
};

const AsyncDownloadConfirmation = ({ formValues }: Props) => (
  <InfoList
    infoData={Object.entries(formValues).map(([k, v]) => ({
      title: k,
      content: <CodeBlock lightMode>{JSON.stringify(v)}</CodeBlock>,
    }))}
  />
);

export default AsyncDownloadConfirmation;
