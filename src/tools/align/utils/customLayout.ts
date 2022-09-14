import { HierarchyPointNode } from 'd3';

import { polarToX, polarToY } from './trigonometry';

import { NewickTreeNode } from '../types/alignResults';

export interface CustomHierarchyNode
  extends HierarchyPointNode<NewickTreeNode> {
  links(): {
    source: CustomHierarchyNode;
    target: CustomHierarchyNode;
  }[];
  coords: {
    x: number;
    y: number;
    radius: number;
    phi: number;
    deg: number;
  };
  textSize?: number;
  linkDOM?: SVGElement;
}

const customLayout = () => {
  let maxDistance = 0;
  let maxLabelWidth = 0;
  let width = 0;
  let showDistance = true;
  let circularLayout = true;

  const outputFn = (node: HierarchyPointNode<NewickTreeNode>) => {
    // recursively do the same for the whole tree
    node.children?.map(outputFn);

    const availableWidth = width - (circularLayout ? 2 : 1) * maxLabelWidth;

    const output = node as Partial<CustomHierarchyNode>;

    const coords = {
      // switch x and y because default layout assumes top to bottom
      // direct mapping for horizontal layout
      x: output.y || 0,
      y: output.x || 0,
      // mapping through polar coordinates for circular layout
      deg: output.x || 0, // in degrees
      phi: (output.x || 0) * (Math.PI / 180), // in radians
      radius: output.y || 0,
    };
    if (showDistance) {
      coords.x =
        ((output.data?.distanceFromRoot || 0) / maxDistance) * availableWidth;
      coords.radius = coords.x / 2;
    }
    if (circularLayout) {
      // the correct data for circular layout is in polar coordinates, convert:
      coords.x = polarToX(coords.radius, coords.phi);
      coords.y = polarToY(coords.radius, coords.phi);
    }

    output.coords = coords;

    return output as CustomHierarchyNode;
  };

  // modify values in the function scope by exposing these on the output fn
  // returning the output function to be able to chain them
  outputFn.maxDistance = (value: number) => {
    maxDistance = value;
    return outputFn;
  };
  outputFn.maxLabelWidth = (value: number) => {
    maxLabelWidth = value;
    return outputFn;
  };
  outputFn.width = (value: number) => {
    width = value;
    return outputFn;
  };
  outputFn.showDistance = (value: boolean) => {
    showDistance = value;
    return outputFn;
  };
  outputFn.circularLayout = (value: boolean) => {
    circularLayout = value;
    return outputFn;
  };

  return outputFn;
};

export default customLayout;
