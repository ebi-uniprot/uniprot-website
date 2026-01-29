import { type CustomHierarchyNode } from './customLayout';
import { polarToX, polarToY } from './trigonometry';

const pathMaker =
  (circularLayout: boolean) =>
  ({
    source,
    target,
  }: {
    source: { coords: CustomHierarchyNode['coords'] };
    target: { coords: CustomHierarchyNode['coords'] };
  }) => {
    // keeping the same path structure makes it transitionable
    if (circularLayout) {
      return `M${source.coords.x} ${source.coords.y} A${source.coords.radius} ${
        source.coords.radius
      } 0 0 ${source.coords.phi > target.coords.phi ? 0 : 1} ${polarToX(
        source.coords.radius,
        target.coords.phi
      )} ${polarToY(source.coords.radius, target.coords.phi)} L${
        target.coords.x
      } ${target.coords.y}`;
    }
    return `M${source.coords.x} ${source.coords.y} A0 ${
      target.coords.y - source.coords.y
    } 0 0 ${source.coords.phi > target.coords.phi ? 0 : 1} ${source.coords.x} ${
      target.coords.y
    } L${target.coords.x} ${target.coords.y}`;
  };

export default pathMaker;
