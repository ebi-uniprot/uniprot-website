import { render } from '@testing-library/react';

import Field from '../Field';

import { DataType, SearchTermType } from '../../types/searchTypes';

import { getSearchTerm } from './__mocks__/configureSearchTerms';

const handleChange = jest.fn();

describe('Clause component', () => {
  it('should render a `text` field', () => {
    const { asFragment } = render(
      <Field
        field={getSearchTerm('accession_field')}
        handleChange={handleChange}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a `text` field with initial value', () => {
    const { asFragment } = render(
      <Field
        field={getSearchTerm('accession_field')}
        handleChange={handleChange}
        initialValue={{ accession: 'P12345' }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a `date` field with range', () => {
    const { asFragment } = render(
      <Field
        field={getSearchTerm('date_created')}
        handleChange={handleChange}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render an `enum` field', () => {
    const { asFragment } = render(
      <Field field={getSearchTerm('existence')} handleChange={handleChange} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render an `integer` field', () => {
    const { asFragment } = render(
      <Field
        field={getSearchTerm('length_range')}
        handleChange={handleChange}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render an `integer` `range` field', () => {
    const { asFragment } = render(
      <Field
        field={getSearchTerm('length_range')}
        handleChange={handleChange}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not return anything', () => {
    const field: SearchTermType = {
      label: 'I dont exist',
      // We know that cast is not correct, but it's for the test
      dataType: 'whatever' as DataType,
      id: 'some_id',
      itemType: 'single',
      term: 'not a term',
    };

    const { container } = render(
      <Field field={field} handleChange={handleChange} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
