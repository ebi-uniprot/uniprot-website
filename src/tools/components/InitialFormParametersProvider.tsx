import { useEffect } from 'react';
import { Loader } from 'franklin-sites';

import * as logging from '../../shared/utils/logging';

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

  useEffect(() => {
    if (!loading && !initialFormValues) {
      logging.error('Unable to load initial form values');
    }
  }, [loading, initialFormValues]);

  if (loading) {
    return <Loader />;
  }

  // NOTE: any warning message (inline or pop-up) could be added here
  return children((initialFormValues as T | null) || defaultFormValues);
};

export default InitialFormParametersProvider;
