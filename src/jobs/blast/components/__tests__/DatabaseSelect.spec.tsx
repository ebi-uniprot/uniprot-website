import { fireEvent, screen, within } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import { roundNumber } from '../../../../shared/utils/roundNumber';
import { databases, getSearchTime } from '../../config/BlastFormData';
import DatabaseSelect from '../DatabaseSelect';

describe('DatabaseSelect', () => {
  it('renders a selectable row for every database with its metadata', () => {
    customRender(<DatabaseSelect selected={undefined} onChange={jest.fn()} />);

    // Column headers
    [
      'Target Database (required)',
      'Sequences',
      'Search Time',
      'Description',
    ].forEach((header) =>
      expect(
        screen.getByRole('columnheader', { name: header })
      ).toBeInTheDocument()
    );

    // One radio per database
    expect(screen.getAllByRole('radio')).toHaveLength(databases.length);

    // Each row shows the database's label, sequence count, search time and
    // description
    databases.forEach((db) => {
      const row = screen.getByTestId(`database-${db.value}`).closest('tr');
      expect(row).not.toBeNull();
      const cells = within(row as HTMLElement);
      expect(cells.getByText(db.label)).toBeInTheDocument();
      expect(cells.getByText(roundNumber(db.sequences))).toBeInTheDocument();
      expect(cells.getByText(getSearchTime(db.sequences))).toBeInTheDocument();
      expect(cells.getByText(db.description)).toBeInTheDocument();
    });
  });

  it('has no database selected initially (selection is mandatory)', () => {
    customRender(<DatabaseSelect selected={undefined} onChange={jest.fn()} />);
    screen
      .getAllByRole<HTMLInputElement>('radio')
      .forEach((radio) => expect(radio.checked).toBe(false));
  });

  it('checks only the radio matching the selected value', () => {
    customRender(<DatabaseSelect selected="uniref50" onChange={jest.fn()} />);
    expect(
      screen.getByTestId<HTMLInputElement>('database-uniref50').checked
    ).toBe(true);
    expect(
      screen.getByTestId<HTMLInputElement>('database-uniprotkb').checked
    ).toBe(false);
  });

  it('calls onChange with the database value when a row is selected', () => {
    const onChange = jest.fn();
    customRender(<DatabaseSelect selected={undefined} onChange={onChange} />);
    fireEvent.click(screen.getByTestId('database-uniref90'));
    expect(onChange).toHaveBeenCalledWith('uniref90');
  });
});
