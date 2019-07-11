import React from 'react';
import XRefView, { getPropertyString } from '../XRefView';
import { render } from '@testing-library/react';
import xrefUIData from '../__mocks__/XrefUIData.json';
import EntrySectionType from '../../../../model/types/EntrySection';
import { XrefUIModel } from '../../../../model/utils/XrefUtils';
import { PropertyKey } from '../../../../model/types/modelTypes';

describe('XRefView', () => {
  for (const section in EntrySectionType) {
    test(`should render for ${section} section`, () => {
      const xrefs = xrefUIData as XrefUIModel[];
      const { asFragment } = render(
        <XRefView xrefs={xrefs} primaryAccession="P01234" />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  }
});

describe('getPropertyString', () => {
  test('should return empty string', () => {
    const propertyString = getPropertyString({
      key: PropertyKey.Status,
      value: '-',
    });
    expect(propertyString).toEqual('');
  });
  test('should append value', () => {
    const propertyString = getPropertyString({
      key: PropertyKey.PathwayName,
      value: 'Amyloid fiber formation',
    });
    expect(propertyString).toEqual(' Amyloid fiber formation');
  });
  test('should append value and "hit"', () => {
    const propertyString = getPropertyString({
      key: PropertyKey.MatchStatus,
      value: '1',
    });
    expect(propertyString).toEqual(', 1 hit');
  });
  test('should append value and "hits"', () => {
    const propertyString = getPropertyString({
      key: PropertyKey.MatchStatus,
      value: '2',
    });
    expect(propertyString).toEqual(', 2 hits');
  });
  test('should if empty string if key is MatchStatus but value <= 0', () => {
    const propertyString = getPropertyString({
      key: PropertyKey.MatchStatus,
      value: '0',
    });
    expect(propertyString).toEqual('');
  });
});
