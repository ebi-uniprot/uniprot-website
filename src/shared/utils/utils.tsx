import { Link } from 'react-router-dom';

import { getURLToJobWithData } from '../../app/config/urls';
import { JobTypes } from '../../tools/types/toolsJobTypes';

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

export function moveItemInList<T>(
  list: T[],
  srcIndex: number,
  destIndex: number
) {
  const result = Array.from(list);
  const [removed] = result.splice(srcIndex, 1);
  result.splice(destIndex, 0, removed);
  return result;
}

export function removeItemFromList<T>(list: T[], index: number) {
  return [...list.slice(0, index), ...list.slice(index + 1)];
}

export const hasContent = (
  obj: Record<string | number | symbol, unknown>,
  exclude?: string
) =>
  Object.entries(obj).some(([key, val]) => {
    // If certain property has to be excluded while checking for content (like section specific)
    if (key === exclude) {
      return false;
    }
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

export function* deepFindAllByKey<T = string>(
  input: unknown,
  predicateKey: string
): Generator<T, void, never> {
  if (Array.isArray(input)) {
    for (const item of input) {
      yield* deepFindAllByKey<T>(item, predicateKey);
    }
  } else if (input && typeof input === 'object') {
    for (const [key, value] of Object.entries(input)) {
      if (key === predicateKey) {
        yield value;
      } else {
        yield* deepFindAllByKey(value, predicateKey);
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
