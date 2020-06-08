import React from 'react';
import { render } from '@testing-library/react';
import Field from '../Field';

const handleInputChange = jest.fn();
const handleRangeInputChange = jest.fn();

describe('Clause component', () => {
  test('should render a `text` field', () => {
    const field = {
      label: 'UniProtKB AC',
      itemType: 'single',
      term: 'accession',
      dataType: 'string',
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
      id: 'id',
    };
    const { asFragment } = render(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render a `string` field with range', () => {
    const field = {
      label: 'UniProtKB AC',
      itemType: 'single',
      term: 'accession',
      dataType: 'string',
      hasRange: true,
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
      id: 'id',
    };
    const { asFragment } = render(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render an `enum` field', () => {
    const field = {
      dataType: 'enum',
    };
    const { asFragment } = render(<Field field={field} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render an `integer` field', () => {
    const field = {
      label: 'Any',
      itemType: 'feature',
      term: 'sites',
      dataType: 'integer',
      description: 'Search by feature sites',
      example: 'translocation',
      id: 'id',
    };
    const { asFragment } = render(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render an `integer` `range` field', () => {
    const field = {
      label: 'Any',
      itemType: 'feature',
      term: 'sites',
      dataType: 'integer',
      hasRange: true,
      description: 'Search by feature sites',
      example: 'translocation',
      id: 'id',
    };
    const { asFragment } = render(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render `date` field', () => {
    const field = {
      label: 'Date Of Creation',
      itemType: 'single',
      term: 'date_created',
      dataType: 'date',
      hasRange: true,
      description: 'Search by Date of creation',
      example: '[2018-03-04 TO 2018-03-08]',
      id: 'id',
    };
    const { asFragment } = render(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should not return anything', () => {
    const field = {
      label: 'I dont exist',
      dataType: 'whatever',
    };
    const { asFragment } = render(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
