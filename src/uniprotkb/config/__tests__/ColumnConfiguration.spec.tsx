import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ColumnConfiguration from '../ColumnConfiguration';
import data from '../../__mocks__/entryModelData.json';
import uniProtKbConverter from '../../adapters/uniProtkbConverter';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';
jest.mock('../../../tools/utils/storage');

describe('ColumnConfiguration component', () => {
  let transformedData;

  beforeAll(() => {
    transformedData = uniProtKbConverter(data);
    window.SVGElement.prototype.getBBox = () => ({
      width: 10,
      height: 10,
    });
  });

  test('should render all columns', () => {
    ColumnConfiguration.forEach((column) => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(column.label);
    });
  });
});
