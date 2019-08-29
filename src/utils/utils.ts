import mem from 'mem';

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

// Memoizing because this function is going to be called a lot and most often
// with the same arguments. Without doing this the app slows down when throlling
// cpu: 6x slowdown 
export const getBEMClassName = mem(({ b, e: elements = null, m: modifiers = null }) => {
  let clasName = b;
  if (!!elements) {
    const e = Array.isArray(elements) ? elements : [elements];
    clasName = [b, ...e].join("__");
  }
  if (!!modifiers) {
    const m = Array.isArray(modifiers) ? modifiers : [modifiers];
    clasName = m.reduce((accum, modifier) => {
      if (!!modifier) {
        accum += ` ${clasName}--${modifier}`;
      }
      return accum;
    }, clasName);  
  }
  return clasName;
})