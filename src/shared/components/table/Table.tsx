import {
  Fragment,
  HTMLAttributes,
  Key,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useId,
  useState,
} from 'react';
import { Button, ControlledDropdown } from 'franklin-sites';
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

type HeadProps = HTMLAttributes<HTMLTableSectionElement> & {
  toggleAll?: boolean;
};

const Head = ({ toggleAll, children, className, ...props }: HeadProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => setExpanded((expanded) => !expanded);

  const handleToggle: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const button = event.target as HTMLButtonElement;
      const { expand } = button.dataset;
      const buttons = button
        .closest('table')
        ?.querySelectorAll<HTMLButtonElement>(
          // get only the direct children, not the ones within another inner table
          `:scope > tbody > tr > td > button[aria-expanded="${!expand}"]`
        );
      for (const button of buttons || []) {
        button.click();
      }
      setExpanded(false);
    },
    []
  );

  return (
    <thead className={cn(className)} {...props}>
      <tr className={styles.row}>
        <th>
          {toggleAll && (
            <ControlledDropdown
              visibleElement={
                <Button variant="tertiary" onClick={handleClick}>
                  ±
                </Button>
              }
              expanded={expanded}
            >
              <ul>
                <li>
                  <Button variant="tertiary" onClick={handleToggle} data-expand>
                    Expand all
                  </Button>
                </li>
                <li>
                  <Button variant="tertiary" onClick={handleToggle}>
                    Collapse all
                  </Button>
                </li>
              </ul>
            </ControlledDropdown>
          )}
        </th>
        {children}
      </tr>
    </thead>
  );
};

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

  const buttonId = useId();

  const handleClick: MouseEventHandler<HTMLElement> | undefined =
    hasExtraContent
      ? (event) => {
          if (
            (event.target as HTMLElement).closest(
              'a, button:not([aria-controls]), input'
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
            <button
              type="button"
              aria-expanded={expanded ? 'true' : 'false'}
              aria-controls={buttonId}
            >
              {expanded ? '-' : '+'}
            </button>
          )}
        </td>
        {children}
      </tr>
      {hasExtraContent && (
        <tr
          className={cn(styles.row, styles['extra-content'], {
            [styles.odd]: isOdd,
          })}
          id={buttonId}
          hidden={!expanded}
        >
          {/* Placeholder cell for the expand toggle column */}
          <td />
          {expanded && extraContent}
        </tr>
      )}
    </Fragment>
  );
};

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;

export default Table;
