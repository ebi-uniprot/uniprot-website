import { Loader } from 'franklin-sites';

import useInitialFormParameters, {
  FormValues,
} from '../hooks/useInitialFormParameters';

const InitialFormParametersProvider = <T extends Readonly<FormValues<string>>>({
  defaultFormValues,
  children,
}: {
  defaultFormValues: T;
  children: (initialFormValues: T) => JSX.Element;
}) => {
  const { loading, initialFormValues } =
    useInitialFormParameters(defaultFormValues);
  if (loading) {
    return <Loader />;
  }
  if (!initialFormValues) {
    // TODO: at this point it's not loading and their isn't any initialFormValues
    // so should return an error?
    // or should return an empty/default form?
    return null;
  }
  return children(initialFormValues as T);
};

export default InitialFormParametersProvider;
