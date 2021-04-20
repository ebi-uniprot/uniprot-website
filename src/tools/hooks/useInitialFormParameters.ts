import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { SelectedTaxon } from '../types/toolsFormData';

interface CustomLocationState<T> {
  parameters?: Partial<T>;
}

type FormValue = {
  fieldName: string;
  selected?:
    | string
    | string[]
    | number
    | boolean
    | SelectedTaxon
    | SelectedTaxon[];
  values?: Readonly<
    Array<{ label?: string; value?: string | boolean | number }>
  >;
};

type FormValues<Fields extends string> = Record<Fields, FormValue>;

function useInitialFormParameters<
  Fields extends string,
  FormParameters extends Record<Fields, unknown>
>(defaultFormValues: Readonly<FormValues<Fields>>) {
  const history = useHistory();
  const initialValues = useMemo(() => {
    // NOTE: we should use a similar logic to pre-fill fields based on querystring
    const parametersFromHistoryState = (history.location
      ?.state as CustomLocationState<FormParameters>)?.parameters;
    if (parametersFromHistoryState) {
      // if we get here, we got parameters passed with the location update to
      // use as pre-filled fields
      const formValues: Partial<FormValues<Fields>> = {};
      const defaultValuesEntries = Object.entries<FormValue>(defaultFormValues);
      // for every field of the form, get its value from the history state if
      // present, otherwise go for the default one
      for (const [key, field] of defaultValuesEntries) {
        formValues[key as Fields] = Object.freeze({
          ...field,
          selected:
            parametersFromHistoryState[
              field.fieldName as keyof FormParameters
            ] || field.selected,
        } as FormValue);
      }
      return Object.freeze(formValues as FormValues<Fields>);
    }
    // otherwise, pass the default values
    return defaultFormValues;
  }, [defaultFormValues, history.location?.state]);

  return initialValues;
}

export default useInitialFormParameters;
