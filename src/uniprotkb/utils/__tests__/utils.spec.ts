import { transfromProperties, getPropertyValue } from '../index';
import { PropertyKey } from '../../types/modelTypes';

const testingProperties = [
  { key: PropertyKey.Project, value: 'foo' },
  { key: PropertyKey.GeneName, value: 'A1' },
];

describe('transformProperties', () => {
  test('should transform array of properties to object', () => {
    expect(transfromProperties(testingProperties)).toEqual({
      [PropertyKey.Project]: 'foo',
      [PropertyKey.GeneName]: 'A1',
    });
  });
});

describe('getPropertyValue', () => {
  test('should find and return property value', () => {
    expect(getPropertyValue(testingProperties, PropertyKey.GeneName)).toEqual(
      'A1'
    );
  });
});
