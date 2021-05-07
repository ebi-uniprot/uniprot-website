import { render } from '@testing-library/react';

import Field from '../Field';

import { DataType, ItemType } from '../../types/searchTypes';

const handleChange = jest.fn();

describe('Clause component', () => {
  test('should render a `text` field', () => {
    const field = {
      label: 'UniProtKB AC',
      itemType: ItemType.single,
      term: 'accession',
      dataType: DataType.string,
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
      id: 'id',
    };
    const { asFragment } = render(
      <Field field={field} handleChange={handleChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render a `text` field with initial value', () => {
    const field = {
      label: 'UniProtKB AC',
      itemType: ItemType.single,
      term: 'accession',
      dataType: DataType.string,
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
      id: 'id',
    };
    const { asFragment } = render(
      <Field
        field={field}
        handleChange={handleChange}
        initialValue={{ accession: 'P12345' }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render a `string` field with range', () => {
    const field = {
      label: 'UniProtKB AC',
      itemType: ItemType.single,
      term: 'accession',
      dataType: DataType.string,
      hasRange: true,
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
      id: 'id',
    };
    const { asFragment } = render(
      <Field field={field} handleChange={handleChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render an `enum` field', () => {
    const field = {
      dataType: DataType.enum,
      id: 'protein_existence',
      label: 'Protein Existence [PE]',
      itemType: ItemType.single,
      term: 'existence',
    };
    const { asFragment } = render(
      <Field field={field} handleChange={handleChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render an `integer` field', () => {
    const field = {
      label: 'Any',
      itemType: ItemType.group,
      term: 'sites',
      dataType: DataType.integer,
      description: 'Search by feature sites',
      example: 'translocation',
      id: 'id',
    };
    const { asFragment } = render(
      <Field field={field} handleChange={handleChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render an `integer` `range` field', () => {
    const field = {
      label: 'Any',
      itemType: ItemType.group,
      term: 'sites',
      dataType: DataType.integer,
      hasRange: true,
      description: 'Search by feature sites',
      example: 'translocation',
      id: 'id',
    };
    const { asFragment } = render(
      <Field field={field} handleChange={handleChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render `date` field', () => {
    const field = {
      label: 'Date Of Creation',
      itemType: ItemType.single,
      term: 'date_created',
      dataType: DataType.date,
      hasRange: true,
      description: 'Search by Date of creation',
      example: '[2018-03-04 TO 2018-03-08]',
      id: 'id',
    };
    const { asFragment } = render(
      <Field field={field} handleChange={handleChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should not return anything', () => {
    const field = {
      label: 'I dont exist',
      // We know that cast is not correct, but it's for the test
      dataType: 'whatever' as DataType,
      id: 'some_id',
      itemType: ItemType.single,
      term: 'not a term',
    };
    const { asFragment } = render(
      <Field field={field} handleChange={handleChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
