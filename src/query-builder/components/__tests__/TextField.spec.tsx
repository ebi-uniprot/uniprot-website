import { render, screen, fireEvent } from '@testing-library/react';

import TextField from '../TextField';

import { DataType, FieldType, ItemType } from '../../types/searchTypes';

describe('TextField', () => {
  const props = {
    field: {
      id: 'uniprot_ac',
      label: 'UniProtKB AC',
      itemType: ItemType.single,
      term: 'accession',
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
    },
    type: 'text',
    handleChange: jest.fn(),
  };

  beforeEach(() => {
    props.handleChange.mockReset();
  });

  test('should render', () => {
    const { asFragment } = render(<TextField {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should update the input value', () => {
    render(<TextField {...props} />);
    const updatedValue = 'my_term';
    const inputElt = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElt.value).toBe('');
    fireEvent.change(inputElt, { target: { value: updatedValue } });
    expect(props.handleChange).toBeCalledWith({
      [props.field.term]: updatedValue.trim(),
    });
  });

  test("should generate correct query for 'All'", () => {
    const propsAll = {
      field: {
        id: 'all',
        label: 'All',
        itemType: ItemType.single,
        term: 'All',
        description: 'Search by UniProtKB Accession',
        example: 'All',
      },
      type: 'text',
      handleChange: jest.fn(),
    };
    render(<TextField {...propsAll} />);

    const updatedValue = 'some value';
    const inputElt = screen.getByRole('textbox', {
      name: propsAll.field.label,
    });
    fireEvent.change(inputElt, { target: { value: updatedValue } });
    expect(propsAll.handleChange).toBeCalledWith({
      [propsAll.field.term]: `${updatedValue}`,
    });
  });

  test('should generate correct query with prefix', () => {
    const propsPrefix = {
      field: {
        id: 'prefix',
        label: 'prefixed',
        itemType: ItemType.single,
        term: 'prefixed_q',
        description: 'Search by UniProtKB Accession',
        example: 'Prefix',
        valuePrefix: 'value-',
      },
      type: 'text',
      handleChange: jest.fn(),
    };
    render(<TextField {...propsPrefix} />);

    const updatedValue = 'some value';
    const inputElt = screen.getByRole('textbox', {
      name: propsPrefix.field.label,
    });
    fireEvent.change(inputElt, { target: { value: updatedValue } });
    expect(propsPrefix.handleChange).toBeCalledWith({
      [propsPrefix.field
        .term]: `${propsPrefix.field.valuePrefix}${updatedValue}`,
    });
  });

  test('should generate correct query for database *', () => {
    const propsPrefix = {
      field: {
        id: 'prefix',
        label: 'prefixed',
        itemType: ItemType.single,
        term: 'xref',
        description: 'Search by UniProtKB Accession',
        example: 'Prefix',
        valuePrefix: 'embl-',
      },
      type: 'text',
      handleChange: jest.fn(),
    };
    render(<TextField {...propsPrefix} />);

    const inputElt = screen.getByRole('textbox', {
      name: propsPrefix.field.label,
    });
    fireEvent.change(inputElt, { target: { value: '*' } });
    expect(propsPrefix.handleChange).toBeCalledWith({
      database: 'embl',
    });
  });

  test('should validate initial query with regex', () => {
    const propsPrefix = {
      field: {
        id: 'proteome',
        label: 'Proteome ID',
        itemType: ItemType.single,
        term: 'proteome',
        dataType: DataType.string,
        fieldType: FieldType.general,
        example: 'UP000005640',
        regex: '(?i)^UP[0-9]{9}$',
      },
      handleChange: jest.fn(),
      initialValue: { proteome: 'UP000000000' },
    };
    render(<TextField {...propsPrefix} />);

    const inputElt = screen.getByDisplayValue('UP000000000');
    expect(inputElt).toBeInTheDocument();
  });
});
