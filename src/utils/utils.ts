/* eslint-disable @typescript-eslint/no-explicit-any */
export const serializableDeepCopy = (x: object) =>
  JSON.parse(JSON.stringify(x));

export const serializableDeepAreEqual = (obj1: object, obj2: object) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

export const removeProperty = (
  obj: { [key: string]: any },
  property: string | number
): { [key: string]: object } => {
  const { [property]: unwantedProperty, ...objWithoutProperty } = obj;
  return objWithoutProperty;
};

export const formatLargeNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const loadWebComponent = (name: string, className: Function) => {
  if (window.customElements && !window.customElements.get(name)) {
    window.customElements.define(name, className);
  }
};

export const flattenArrays = (arrays: any[][]) =>
  [].concat(...(arrays as any[]));

export const moveItemInList = (
  list: any[],
  srcIndex: number,
  destIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(srcIndex, 1);
  result.splice(destIndex, 0, removed);
  return result;
};

export const removeItemFromList = (list: any[], index: number) => [
  ...list.slice(0, index),
  ...list.slice(index + 1),
];

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

export const truncateStringWithEllipsis = (
  string: string,
  maxLength: number
) => {
  if (string.length <= maxLength) {
    return string;
  }
  return `${string.slice(0, maxLength - 3)}...`;
};

export const groupBy = (list: any[], keyGetter: Function) => {
  const map = new Map();
  list.forEach(item => {
    const key = keyGetter(item);
    if (!map.has(key)) {
      map.set(key, [item]);
    } else {
      map.get(key).push(item);
    }
  });
  return map;
};
