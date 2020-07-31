/* eslint-disable @typescript-eslint/no-explicit-any */

// Keeping this util because _.omit is marked to be deprecated:
// https://github.com/lodash/lodash/wiki/Roadmap
export function removeProperty<
  O extends Record<string | number, any>,
  P extends string | number
>(obj: O, property: P): Omit<O, P> {
  const { [property]: unwantedProperty, ...objWithoutProperty } = obj;
  return objWithoutProperty;
}

export const formatLargeNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

interface WebComponentConstructor {
  new (): HTMLElement;
}

export const loadWebComponent = (
  name: string,
  className: WebComponentConstructor
) => {
  if (window.customElements && !window.customElements.get(name)) {
    window.customElements.define(name, className);
  }
};

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
