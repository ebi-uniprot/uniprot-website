import {
  Fragment,
  HTMLAttributes,
  Key,
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

interface NodeBodyProps
  extends Omit<HTMLAttributes<HTMLTableSectionElement>, 'children'> {
  data?: never;
  children: ReactNode;
}

interface FunctionBodyProps<T>
  extends Omit<HTMLAttributes<HTMLTableSectionElement>, 'children'> {
  data: T[];
  children: (
    datum: T,
    index: number,
    array: T[]
  ) => {
    key: Key;
    row: ReactNode;
    extraContent?: ReactNode;
  };
}

function Body<T>({
  children,
  data,
  className,
  ...props
}: NodeBodyProps | FunctionBodyProps<T>) {
  return (
    <tbody className={cn(className)} {...props}>
      {data
        ? data.map((datum, index, data) => {
            const { key, row, extraContent } = children(datum, index, data);
            return (
              <Table.Row
                key={key}
                isOdd={Boolean((index + 1) % 2)}
                extraContent={extraContent}
              >
                {row}
              </Table.Row>
            );
          })
        : children}
    </tbody>
  );
}

const Row = ({
  children,
  className,
  extraContent,
  isOdd,
  ...props
}: HTMLAttributes<HTMLTableRowElement> & {
  extraContent?: ReactNode;
  isOdd: boolean;
}) => {
  const hasExtraContent = Boolean(extraContent);

  const [expanded, setExpanded] = useState(false);

  const handleClick: MouseEventHandler<HTMLElement> | undefined =
    hasExtraContent
      ? (event) => {
          if (
            (event.target as HTMLElement).closest(
              'a, button:not([data-toggle]), input'
            )
          ) {
            return;
          }
          setExpanded((expanded) => !expanded);
        }
      : undefined;

  return (
    <Fragment>
      <tr
        className={cn(
          styles.row,
          {
            [styles.odd]: isOdd,
            [styles['has-extra-content']]: hasExtraContent,
          },
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <td>
          {hasExtraContent && (
            <button type="button" data-toggle>
              {expanded ? '-' : '+'}
            </button>
          )}
        </td>
        {children}
      </tr>
      {expanded && (
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
