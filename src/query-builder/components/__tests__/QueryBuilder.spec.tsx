import { fireEvent, screen, getByText } from '@testing-library/react';

import QueryBuilder from '../QueryBuilder';

import { IDMappingDetailsContext } from '../../../shared/contexts/IDMappingDetails';

import customRender from '../../../shared/__test-helpers__/customRender';
import searchTermData from './__mocks__/configureSearchTerms';

import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';

jest.mock('../../../shared/hooks/useDataApi');

let rendered: ReturnType<typeof customRender>;

const onCancel = jest.fn();

describe('QueryBuilder', () => {
  beforeEach(async () => {
    onCancel.mockClear();
    (useDataApi as jest.Mock).mockReturnValue({ data: searchTermData });

    rendered = customRender(
      <IDMappingDetailsContext.Provider value={null}>
        <QueryBuilder
          onCancel={onCancel}
          initialSearchspace={Namespace.uniprotkb}
        />
      </IDMappingDetailsContext.Provider>
    );
  });

  // only exception where we want different payload
  test('should render loading', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });

    rendered = customRender(
      <QueryBuilder
        onCancel={onCancel}
        initialSearchspace={Namespace.uniprotkb}
      />
    );

    expect(rendered.asFragment()).toMatchSnapshot();
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should add a clause', () => {
    fireEvent.click(screen.getByTestId('query-builder-add-field'));
    const clauses = screen.getAllByTestId('search__clause');
    expect(clauses.length).toBe(5);
  });

  test('should remove clauses', () => {
    // Go through all the default clauses one by one and remove them
    fireEvent.click(screen.getAllByTestId('clause-list-button-remove')[0]);
    let clauses = screen.getAllByTestId('search__clause');
    expect(clauses.length).toBe(3);
    fireEvent.click(screen.getAllByTestId('clause-list-button-remove')[0]);
    clauses = screen.getAllByTestId('search__clause');
    expect(clauses.length).toBe(2);
    fireEvent.click(screen.getAllByTestId('clause-list-button-remove')[0]);
    clauses = screen.getAllByTestId('search__clause');
    expect(clauses.length).toBe(1);
    // Check special case where only one clause left,
    // a new empty clause should be added
    fireEvent.click(screen.getAllByTestId('clause-list-button-remove')[0]);
    clauses = screen.getAllByTestId('search__clause');
    expect(clauses.length).toBe(1);
  });

  test('should select field', () => {
    let entryNameField = screen.queryByPlaceholderText('P53_HUMAN');
    expect(entryNameField).toBeFalsy();
    const dropdownButton = screen.getByText(/All/, {
      selector: '.button.dropdown',
    });
    const clause = dropdownButton.closest<HTMLElement>(
      '[data-testid="search__clause"]'
    );
    fireEvent.click(dropdownButton);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const entryNameFieldOption = getByText(clause!, /Entry Name \[ID\]/);
    fireEvent.click(entryNameFieldOption);
    entryNameField = screen.queryByPlaceholderText('P53_HUMAN');
    expect(entryNameField).toBeInTheDocument();
  });

  test('should submit a simple query', async () => {
    const input = screen.getByPlaceholderText(/ydj1/);
    fireEvent.change(input, { target: { value: 'zen' } });
    const all = screen.getByPlaceholderText(/a4_human/);
    fireEvent.change(all, { target: { value: 'eve' } });
    const reviewedLogic = screen.getAllByRole('combobox', {
      name: 'logical operator',
    });
    // Note this should be 1 as the first line shouldn't have one
    fireEvent.change(reviewedLogic[3], { target: { value: 'OR' } });
    const search = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(search);

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(rendered.history.location.pathname).toBe('/uniprotkb');
    expect(rendered.history.location.search).toBe(
      '?query=%28gene%3Azen%29+OR+eve'
    );
  });
});
