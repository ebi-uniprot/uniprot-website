import { Loader } from 'franklin-sites';

import useInitialFormParameters from '../hooks/useInitialFormParameters';

import { BlastFormValues } from '../blast/config/BlastFormData';

type FormProps = {
  initialFormValues: Readonly<BlastFormValues>;
};

type Props = {
  defaultFormValues: Readonly<BlastFormValues>;
  form: ({ initialFormValues }: FormProps) => JSX.Element;
};

function InitialFormParametersProvider({ defaultFormValues, form }: Props) {
  const { loading, initialFormValues } =
    useInitialFormParameters(defaultFormValues);
  const Form = form;
  if (loading) {
    return <Loader />;
  }
  if (!initialFormValues) {
    // TODO: at this point it's not loading and their isn't any initialFormValues
    // so should return an error?
    return null;
  }
  return <Form initialFormValues={initialFormValues} />;
}

export default InitialFormParametersProvider;
