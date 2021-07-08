import { RequireAtLeastOne } from 'type-fest';

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

export const getBEMClassName = ({
  b,
  e: elements = null,
  m: modifiers = null,
}: {
  b: string;
  e?: string | string[] | null;
  m?: (string | boolean) | (string | boolean)[] | null;
}) => {
  let className: string = b;
  if (elements) {
    const e = Array.isArray(elements) ? elements.join('__') : elements;
    className = `${b}__${e}`;
  }
  if (modifiers) {
    if (Array.isArray(modifiers)) {
      className = modifiers.reduce(
        (accum: string, modifier: string | boolean) =>
          modifier ? `${accum} ${className}--${modifier}` : accum,
        className
      );
    } else {
      className += ` ${className}--${modifiers}`;
    }
  }
  return className;
};

export const hasContent = (obj: Record<string | number | symbol, unknown>) =>
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

type TransformedData = {
  transformedData: RequireAtLeastOne<
    Record<string, unknown>,
    'id' | 'primaryAccession'
  >;
};

export const isSameEntry = (
  { transformedData: prev }: TransformedData,
  { transformedData: next }: TransformedData
) =>
  prev?.primaryAccession !== undefined
    ? prev.primaryAccession === next.primaryAccession
    : prev.id === next.id;

export const deepFindAllByKey = (
  o: Record<string, unknown> | Record<string, unknown>[],
  predicateKey: string,
  accum: string[] = []
) => {
  if (typeof o === 'object') {
    Object?.entries(o).forEach(([key, value]) => {
      if (key === predicateKey) {
        accum.push(value as string);
      } else {
        deepFindAllByKey(value as Record<string, unknown>, predicateKey, accum);
      }
    });
  }
  return accum;
};
