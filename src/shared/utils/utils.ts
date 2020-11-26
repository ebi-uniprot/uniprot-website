// Keeping this util because _.omit is marked to be deprecated:
// https://github.com/lodash/lodash/wiki/Roadmap
export function removeProperty<
  O extends Record<string | number, unknown>,
  P extends string | number
>(obj: O, property: P): Omit<O, P> {
  const { [property]: unwantedProperty, ...objWithoutProperty } = obj;
  return objWithoutProperty;
}

export const formatLargeNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

export const hasContent = (obj: Record<string | number | symbol, unknown>) => {
  return Object.values(obj).some((val) => {
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
    return false;
  });
};

export const downloadFileInNewTab = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.setAttribute('download', '');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
