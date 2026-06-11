import cn from 'classnames';
import { type FC } from 'react';

import TableFromData, {
  type TableFromDataColumn,
} from '../../../shared/components/table/TableFromData';
import WithTooltip from '../../../shared/components/WithTooltip';
import { roundNumber } from '../../../shared/utils/roundNumber';
import {
  type BlastDatabaseOption,
  databases,
  getSearchTime,
  type SearchTime,
} from '../config/BlastFormData';
import { type Database } from '../types/blastServerParameters';
import styles from './styles/database-select.module.scss';

type Props = {
  selected: Database | undefined;
  onChange: (value: Database) => void;
};

// Stable mutable copy for TableFromData's `data` prop (it never mutates it).
const databaseRows: BlastDatabaseOption[] = [...databases];

const getRowId = (db: BlastDatabaseOption) => db.value;

// The bar length encodes search time via log10(number of sequences) — the rough
// driver of how long a search takes. Scaled across the range present so the
// smallest database is a short bar and the largest fills the track.
const logCounts = databases.map((db) => Math.log10(db.sequences));
const minLog = Math.min(...logCounts);
const maxLog = Math.max(...logCounts);
const barFraction = (sequences: number) =>
  maxLog === minLog ? 1 : (Math.log10(sequences) - minLog) / (maxLog - minLog);

// Colour reinforces the (curated) speed category: green (fast) → red (slow).
const speedClassName: Record<SearchTime, string> = {
  'Very Fast': styles['speed--very-fast'],
  Fast: styles['speed--fast'],
  Moderate: styles['speed--moderate'],
  Slow: styles['speed--slow'],
  'Very Slow': styles['speed--very-slow'],
};

const SearchTimeCell: FC<{ db: BlastDatabaseOption }> = ({ db }) => {
  // Speed category is derived from the database size (see getSearchTime).
  const searchTime = getSearchTime(db.sequences);
  return (
    // The coloured bar is the only visible element; the speed word is shown on
    // hover/focus via the app's floating-ui tooltip (WithTooltip) plus a
    // visually-hidden copy for screen readers.
    <span className={styles['search-time']}>
      <WithTooltip tooltip={searchTime}>
        <span className={styles['search-time__track']} aria-hidden="true">
          <span
            className={cn(
              styles['search-time__bar'],
              speedClassName[searchTime]
            )}
            style={{ width: `${Math.round(barFraction(db.sequences) * 100)}%` }}
          />
        </span>
      </WithTooltip>
      <span className="visually-hidden">{searchTime}</span>
    </span>
  );
};

// Mandatory target-database selector. Rendered as a table with one selectable
// radio per row so each database's size and rough search speed can be compared
// at a glance. No option is checked until the user picks one (required).
const DatabaseSelect: FC<Props> = ({ selected, onChange }) => {
  const columns: TableFromDataColumn<BlastDatabaseOption>[] = [
    {
      id: 'database',
      label: 'Target Database (required)',
      render: (db) => (
        <label className={styles['database-option']}>
          <input
            type="radio"
            name="database"
            value={db.value}
            checked={selected === db.value}
            onChange={() => onChange(db.value)}
            data-testid={`database-${db.value}`}
          />
          {db.label}
        </label>
      ),
    },
    {
      id: 'sequences',
      label: 'Sequences',
      render: (db) => roundNumber(db.sequences),
    },
    {
      id: 'search-time',
      label: 'Search Time',
      render: (db) => <SearchTimeCell db={db} />,
    },
    { id: 'description', label: 'Description', render: (db) => db.description },
  ];

  return (
    <fieldset
      className={styles['database-select']}
      aria-label="Target database (required)"
    >
      <TableFromData
        columns={columns}
        data={databaseRows}
        getRowId={getRowId}
        onRowClick={(db) => onChange(db.value)}
        expandable={false}
      />
    </fieldset>
  );
};

export default DatabaseSelect;
