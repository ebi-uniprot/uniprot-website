import { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

interface CustomLocationState<T> {
  parameters?: Partial<T>;
}

type FormValues<Fields, FormValue> = Record<Fields, Readonly<FormValue>>;

// export type BlastFormValues = Record<BlastFields, Readonly<BlastFormValue>>
function useInitialFormParameters<Fields, FormValue, FormParameters>(
  defaultFormValues: Readonly<FormValues<Fields, FormValue>>
) {
  const history = useHistory();
  return useMemo(() => {
    // NOTE: we should use a similar logic to pre-fill fields based on querystring
    const parametersFromHistoryState = (history.location
      ?.state as CustomLocationState<FormParameters>)?.parameters;
    if (parametersFromHistoryState) {
      // if we get here, we got parameters passed with the location update to
      // use as pre-filled fields
      const formValues: Partial<FormValues<Fields, FormValue>> = {};
      const defaultValuesEntries = Object.entries(defaultFormValues) as [
        Fields,
        FormValue
      ][];
      // for every field of the form, get its value from the history state if
      // present, otherwise go for the default one
      for (const [key, field] of defaultValuesEntries) {
        formValues[key] = Object.freeze({
          ...field,
          selected:
            parametersFromHistoryState[
              field.fieldName as keyof FormParameters
            ] || field.selected,
        }) as Readonly<FormValue>;
      }
      return Object.freeze(formValues) as Readonly<
        FormValues<Fields, FormValue>
      >;
    }
    // otherwise, pass the default values
    return defaultFormValues;
  }, [history]);
}

export default useInitialFormParameters;
