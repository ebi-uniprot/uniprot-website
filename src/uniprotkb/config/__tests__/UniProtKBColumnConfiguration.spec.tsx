import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import UniProtKBColumnConfiguration from '../UniProtKBColumnConfiguration';
import data from '../../__mocks__/entryModelData.json';
import uniProtKbConverter from '../../adapters/uniProtkbConverter';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';
jest.mock('../../../tools/utils/storage');

describe('UniProtKBColumnConfiguration component', () => {
  let transformedData;

  beforeAll(() => {
    transformedData = uniProtKbConverter(data);
    window.SVGElement.prototype.getBBox = () => ({
      width: 10,
      height: 10,
    });
  });

  test('should render all columns', () => {
    UniProtKBColumnConfiguration.forEach((column) => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot(column.label);
    });
  });
});
