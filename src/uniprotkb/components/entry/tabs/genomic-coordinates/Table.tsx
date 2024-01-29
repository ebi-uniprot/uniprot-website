import {
  Fragment,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  useState,
} from 'react';
import cn from 'classnames';

import styles from './styles/table.module.scss';

const Table = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableElement>) => (
  <div className={styles.container}>
    <table className={cn(styles.table, className)} {...props}>
      {children}
    </table>
  </div>
);

const Head = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn(className)} {...props}>
    <tr className={styles.row}>
      {/* Placeholder cell for the expand toggle column */}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <th />
      {children}
    </tr>
  </thead>
);

const Body = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn(className)} {...props}>
    {children}
  </tbody>
);

const Row = ({
  children,
  className,
  extraContent,
  isOdd,
  ...props
}: HTMLAttributes<HTMLTableRowElement> & {
  extraContent?: ReactNode;
  isOdd?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick: MouseEventHandler<HTMLElement> = (event) => {
    if (
      (event.target as HTMLElement).closest(
        'a, button:not([data-toggle]), input'
      )
    ) {
      return;
    }
    setExpanded((expanded) => !expanded);
  };

  return (
    <Fragment>
      <tr
        className={cn(
          styles.row,
          { [styles.odd]: isOdd, [styles['has-extra-content']]: extraContent },
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <td>
          {extraContent && (
            <button type="button" data-toggle>
              {expanded ? '-' : '+'}
            </button>
          )}
        </td>
        {children}
      </tr>
      {extraContent && (
        <tr
          className={cn(styles.row, styles['extra-content'], {
            [styles.expanded]: expanded,
            [styles.odd]: isOdd,
          })}
        >
          {/* Placeholder cell for the expand toggle column */}
          <td />
          {extraContent}
        </tr>
      )}
    </Fragment>
  );
};

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;

export default Table;
