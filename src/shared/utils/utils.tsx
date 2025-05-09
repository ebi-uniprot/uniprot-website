import { Link } from 'react-router-dom';

import { getURLToJobWithData } from '../../app/config/urls';
import { JobTypes } from '../../jobs/types/jobTypes';

export type Key = string | number | symbol;

export const formatPercentage = (n: number, maximumFractionDigits = 1) =>
  `${n.toLocaleString('en-US', {
    maximumFractionDigits,
  })}%`;

export const pluralise = (singular: string, count: number, plural?: string) => {
  if (count === 1) {
    return singular;
  }
  if (plural) {
    return plural;
  }
  return `${singular}s`;
};

export function moveItemInArray<T>(array: T[], from: number, to: number): T[] {
  const newArray = array.slice();
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0]
  );
  return newArray;
}

export function removeItemFromArray<T>(array: T[], index: number) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export const hasContent = (obj: Record<Key, unknown>) =>
  Object.values(obj).some((val) => {
    if (Array.isArray(val)) {
      const valArray = val as unknown[];
      return valArray.length > 0;
    }
    if (typeof val === 'object' && val) {
      if (val instanceof Map) {
        return Array.from(val.values()).some(
          (value) => value && value.length > 0
        );
      }
      return Object.values(val).length > 0;
    }
    return typeof val !== 'undefined';
  });

export function* deepFindAllByKey(
  input: unknown,
  predicateKey: string,
  groupLabel?: string
): Generator<string, void, never> {
  if (Array.isArray(input)) {
    for (const item of input) {
      yield* deepFindAllByKey(item, predicateKey, groupLabel);
    }
  } else if (input && typeof input === 'object') {
    for (const [key, value] of Object.entries(input)) {
      if (key === predicateKey) {
        if (groupLabel === 'ecNumbers') {
          yield `EC:${value}`;
        } else {
          yield value;
        }
      } else {
        yield* deepFindAllByKey(value, predicateKey, key);
      }
    }
  }
}

export const addBlastLinksToFreeText = (
  texts: string[],
  primaryAccession: string
) =>
  texts.map((text) => {
    const splitText = text.split(/(\d+-\d+)/);
    return splitText
      .map((splitItem, i) => {
        if (i % 2 === 1) {
          const range = splitItem.split('-');
          return (
            <Link
              to={getURLToJobWithData(JobTypes.BLAST, primaryAccession, {
                start: +range[0],
                end: +range[1],
              })}
              key={splitItem}
            >
              {splitItem}
            </Link>
          );
        }
        return splitItem;
      })
      .filter((item) => item);
  });

export function keysToLowerCase<T>(o: { [k: string]: T } = {}): {
  [key: string]: T;
} {
  return Object.fromEntries(
    Object.entries(o).map(([k, v]) => [k.toLowerCase(), v])
  );
}

export function defaultdict<T>(defaultFactory: () => T) {
  return new Proxy<Record<string | symbol, T>>(
    {},
    {
      get: (dict, key: string | symbol) => {
        if (!(key in dict)) {
          dict[key] = defaultFactory();
        }
        return dict[key];
      },
    }
  );
}

export const counter = (initialCount = 0) => defaultdict(() => initialCount);

export function excludeKeys<T>(
  o?: Record<Key, T>,
  keys?: Key[]
): Record<Key, T> | undefined {
  if (typeof o === 'undefined') {
    return {};
  }
  if (typeof keys === 'undefined' || !keys.length) {
    return o;
  }
  const setKeys = new Set(keys);
  return Object.fromEntries(Object.entries(o).filter(([k]) => !setKeys.has(k)));
}
