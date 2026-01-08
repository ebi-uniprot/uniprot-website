import { fireEvent, render, screen } from '@testing-library/react';

import { type FieldProps } from '../Field';
import TextField from '../TextField';
import { getSearchTerm } from './__mocks__/configureSearchTerms';

describe('TextField', () => {
  const props: FieldProps = {
    field: getSearchTerm('accession_field'),
    handleChange: jest.fn(),
  };

  beforeEach(() => {
    (props.handleChange as jest.Mock).mockReset();
  });

  it('should render', () => {
    const { asFragment } = render(<TextField {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should update the input value', () => {
    render(<TextField {...props} />);
    const updatedValue = 'my_term';
    const inputElt = screen.getByRole<HTMLInputElement>('textbox');
    expect(inputElt.value).toBe('');
    fireEvent.change(inputElt, { target: { value: updatedValue } });
    expect(props.handleChange).toHaveBeenCalledWith(
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [props.field.term!]: updatedValue.trim(),
      },
      false
    );
  });

  test("should generate correct query for 'All'", () => {
    const propsAll: FieldProps = {
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
    expect(propsAll.handleChange).toHaveBeenCalledWith(
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [propsAll.field.term!]: `${updatedValue}`,
      },
      false
    );
  });

  it('should generate correct query with prefix', () => {
    const propsPrefix: FieldProps = {
      field: {
        id: 'prefix',
        label: 'prefixed',
        itemType: 'single',
        term: 'prefixed_q',
        example: 'Prefix',
        valuePrefix: 'value-',
      },
      handleChange: jest.fn(),
    };
    render(<TextField {...propsPrefix} />);

    const updatedValue = 'some value';
    const inputElt = screen.getByRole('textbox', {
      name: propsPrefix.field.label,
    });
    fireEvent.change(inputElt, { target: { value: updatedValue } });
    expect(propsPrefix.handleChange).toHaveBeenCalledWith(
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [propsPrefix.field.term!]:
          `${propsPrefix.field.valuePrefix}${updatedValue}`,
      },
      false
    );
  });

  it('should generate correct query for database *', () => {
    const propsPrefix: FieldProps = {
      field: getSearchTerm('xref_embl'),
      handleChange: jest.fn(),
    };
    render(<TextField {...propsPrefix} />);

    const inputElt = screen.getByRole('textbox', {
      name: propsPrefix.field.label,
    });
    fireEvent.change(inputElt, { target: { value: '*' } });
    expect(propsPrefix.handleChange).toHaveBeenCalledWith(
      {
        database: 'embl',
      },
      true
    );
  });

  it('should validate initial query with regex', () => {
    const propsPrefix: FieldProps = {
      field: getSearchTerm('proteome'),
      handleChange: jest.fn(),
      initialValue: { proteome: 'UP000000000' },
    };
    render(<TextField {...propsPrefix} />);

    const inputElt = screen.getByDisplayValue('UP000000000');
    expect(inputElt).toBeInTheDocument();
  });
});
