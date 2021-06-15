import { useMemo, useCallback, SetStateAction, Dispatch } from 'react';

import useLocalStorage from './useLocalStorage';

import { Namespace } from '../types/namespaces';

export type Basket = {
  [Namespace.uniprotkb]: Set<string>;
  [Namespace.uniref]: Set<`UniRef${50 | 90 | 100}_${string}`>;
  [Namespace.uniparc]: Set<`UPI${string}`>;
};

type StringifiableBasket = {
  [Namespace.uniprotkb]: Array<string>;
  [Namespace.uniref]: Array<`UniRef${50 | 90 | 100}_${string}`>;
  [Namespace.uniparc]: Array<`UPI${string}`>;
};

const deserialise = (stringifiableBasket: StringifiableBasket): Basket => {
  const entries = Object.entries(stringifiableBasket);
  const object = Object.fromEntries(
    entries.map(([key, value]) => [key, new Set(value.filter(Boolean))])
  ) as Basket;
  return object;
};

const serialise = (basket: Basket): StringifiableBasket => {
  const entries = Object.entries(basket);
  const object = Object.fromEntries(
    entries.map(([key, value]) => [key, Array.from(value).filter(Boolean)])
  ) as StringifiableBasket;
  return object;
};

export const basketableNS = new Set([
  Namespace.uniprotkb,
  Namespace.uniref,
  Namespace.uniparc,
]);

const useBasket = (): [
  state: Basket,
  setState: Dispatch<SetStateAction<Basket>>
] => {
  const [state, setState] = useLocalStorage<StringifiableBasket>('basket', {
    [Namespace.uniprotkb]: [],
    [Namespace.uniref]: [],
    [Namespace.uniparc]: [],
  });

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
