import { render, screen, fireEvent } from '@testing-library/react';

import TextField, { TextFieldTypes } from '../TextField';

describe('TextField', () => {
  const props: TextFieldTypes = {
    field: {
      id: 'accession_field',
      label: 'UniProtKB AC',
      itemType: 'single',
      term: 'accession',
      dataType: 'string',
      fieldType: 'general',
      example: 'P12345',
      regex:
        '(?i)([OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z]([0-9][A-Z][A-Z0-9]{2}){1,2}[0-9])(-[0-9]+)?',
    },
    handleChange: jest.fn(),
  };

  beforeEach(() => {
    (props.handleChange as jest.Mock).mockReset();
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
    expect(props.handleChange).toBeCalledWith(
      {
        [props.field.term]: updatedValue.trim(),
      },
      false
    );
  });

  test("should generate correct query for 'All'", () => {
    const propsAll: TextFieldTypes = {
      field: {
        label: 'All',
        term: 'All',
        example: 'a4_human, P05067, cdc7 human',
        itemType: 'single',
        dataType: 'string',
        fieldType: 'general',
        id: 'id_all',
      },
      handleChange: jest.fn(),
    };
    render(<TextField {...propsAll} />);

    const updatedValue = 'some value';
    const inputElt = screen.getByRole('textbox', {
      name: propsAll.field.label,
    });
    fireEvent.change(inputElt, { target: { value: updatedValue } });
    expect(propsAll.handleChange).toBeCalledWith(
      {
        [propsAll.field.term]: `${updatedValue}`,
      },
      false
    );
  });

  test('should generate correct query with prefix', () => {
    const propsPrefix: TextFieldTypes = {
      field: {
        id: 'prefix',
        label: 'prefixed',
        itemType: 'single',
        term: 'prefixed_q',
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
    expect(propsPrefix.handleChange).toBeCalledWith(
      {
        [propsPrefix.field
          .term]: `${propsPrefix.field.valuePrefix}${updatedValue}`,
      },
      false
    );
  });

  test('should generate correct query for database *', () => {
    const propsPrefix: TextFieldTypes = {
      field: {
        id: 'xref_embl',
        label: 'EMBL',
        itemType: 'single',
        term: 'xref',
        dataType: 'string',
        fieldType: 'general',
        valuePrefix: 'embl-',
      },
      handleChange: jest.fn(),
    };
    render(<TextField {...propsPrefix} />);

    const inputElt = screen.getByRole('textbox', {
      name: propsPrefix.field.label,
    });
    fireEvent.change(inputElt, { target: { value: '*' } });
    expect(propsPrefix.handleChange).toBeCalledWith(
      {
        database: 'embl',
      },
      true
    );
  });

  test('should validate initial query with regex', () => {
    const propsPrefix: TextFieldTypes = {
      field: {
        id: 'proteome',
        label: 'Proteome ID',
        itemType: 'single',
        term: 'proteome',
        dataType: 'string',
        fieldType: 'general',
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
