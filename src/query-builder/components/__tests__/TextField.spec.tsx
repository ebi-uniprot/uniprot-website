import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import TextField from '../../../query-builder/components/TextField';

let rendered;

describe('TextField', () => {
  // field: SearchTermType;
  // type: string;
  // initialValue?: string;
  // handleChange: (queryBit: QueryBit) => void;

  const props = {
    field: {
      id: 'uniprot_ac',
      label: 'UniProtKB AC',
      itemType: 'single',
      term: 'accession',
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
    },
    type: 'text',
    handleChange: jest.fn(),
  };

  beforeEach(() => {
    rendered = render(<TextField {...props} />);
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should update the input value', () => {
    const updatedValue = 'my_term';
    const { getByPlaceholderText } = rendered;
    const inputElt = getByPlaceholderText('P12345');
    expect(inputElt.value).toBe('');
    fireEvent.change(inputElt, { target: { value: updatedValue } });
    expect(props.handleChange).toBeCalledWith({
      [props.field.term]: updatedValue.trim(),
    });
  });

  test('should trim add double quotes if a space is present', () => {
    const updatedValue = 'Some term ';
    const { getByPlaceholderText } = rendered;
    const inputElt = getByPlaceholderText('P12345');
    fireEvent.change(inputElt, { target: { value: updatedValue } });
    expect(props.handleChange).toBeCalledWith({
      [props.field.term]: `"${updatedValue.trim()}"`,
    });
  });

  test("should generate correct query for 'All'", () => {
    const propsAll = {
      field: {
        id: 'all',
        label: 'All',
        itemType: 'single',
        term: 'All',
        description: 'Search by UniProtKB Accession',
        example: 'All',
      },
      type: 'text',
      handleChange: jest.fn(),
    };

    const updatedValue = 'some value';
    const { getByPlaceholderText } = render(<TextField {...propsAll} />);
    const inputElt = getByPlaceholderText('All');
    fireEvent.change(inputElt, { target: { value: updatedValue } });
    expect(propsAll.handleChange).toBeCalledWith({
      [propsAll.field.term]: `"${updatedValue}"`,
    });
  });

  test('should generate correct query with prefix', () => {
    const propsPrefix = {
      field: {
        id: 'prefix',
        label: 'prefixed',
        itemType: 'single',
        term: 'prefixed_q',
        description: 'Search by UniProtKB Accession',
        example: 'Prefix',
        valuePrefix: 'value_',
      },
      type: 'text',
      handleChange: jest.fn(),
    };

    const updatedValue = 'some value';
    const { getByPlaceholderText } = render(<TextField {...propsPrefix} />);
    const inputElt = getByPlaceholderText('Prefix');
    fireEvent.change(inputElt, { target: { value: updatedValue } });
    expect(propsPrefix.handleChange).toBeCalledWith({
      [propsPrefix.field
        .term]: `"${propsPrefix.field.valuePrefix}${updatedValue}"`,
    });
  });

  test('should generate correct query for database *', () => {
    const propsPrefix = {
      field: {
        id: 'prefix',
        label: 'prefixed',
        itemType: 'single',
        term: 'xref',
        description: 'Search by UniProtKB Accession',
        example: 'Prefix',
        valuePrefix: 'embl',
      },
      type: 'text',
      handleChange: jest.fn(),
    };
    const { getByPlaceholderText } = render(<TextField {...propsPrefix} />);
    const inputElt = getByPlaceholderText('Prefix');
    fireEvent.change(inputElt, { target: { value: '*' } });
    expect(propsPrefix.handleChange).toBeCalledWith({
      [propsPrefix.field.term]: propsPrefix.field.valuePrefix,
    });
  });
});
