import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
} from 'react';

import { Namespace } from '../types/namespaces';
import useLocalStorage from './useLocalStorage';

export type Basket = Map<Namespace, Set<string>>;

type StringifiableBasket = { [key in Namespace]?: Array<string> };

const deserialise = (stringifiableBasket: StringifiableBasket): Basket => {
  const entries = Object.entries(stringifiableBasket);
  const object: Basket = new Map(
    entries.map(([key, value]) => [
      key as Namespace,
      new Set(value?.filter(Boolean)),
    ])
  );
  return object;
};

const basketableNS = new Set([
  Namespace.uniprotkb,
  Namespace.uniref,
  Namespace.uniparc,
]);

const serialise = (basket: Basket): StringifiableBasket => {
  const entries = Array.from(basket.entries());
  const object: StringifiableBasket = Object.fromEntries(
    entries
      // Safeguard, make sure to only store namespaces that belong in the basket
      .filter(([key]) => basketableNS.has(key))
      // Transform Array into Set, removes possibly empty values (safeguard)
      .map(([key, value]) => [key, Array.from(value).filter(Boolean)])
  );
  return object;
};

const useBasket = (): [
  state: Basket,
  setState: Dispatch<SetStateAction<Basket>>,
] => {
  const [state, setState] = useLocalStorage<StringifiableBasket>(
    'basket',
    Object.fromEntries(Array.from(basketableNS).map((key) => [key, []]))
  );

  const basket = useMemo(() => deserialise(state), [state]);

  const setBasket = useCallback<Dispatch<SetStateAction<Basket>>>(
    (valueOrSetter) => {
      setState((currentState) => {
        const valueToStore =
          typeof valueOrSetter === 'function'
            ? valueOrSetter(deserialise(currentState))
            : valueOrSetter;
        return serialise(valueToStore);
      });
    },
    [setState]
  );

  return [basket, setBasket];
};

export default useBasket;
