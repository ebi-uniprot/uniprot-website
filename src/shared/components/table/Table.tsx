import {
  Fragment,
  HTMLAttributes,
  Key,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Button, ControlledDropdown } from 'franklin-sites';
import cn from 'classnames';
import { v1 } from 'uuid';

import styles from './styles/table.module.scss';

const Table = ({
  children,
  className,
  collapsible,
  ...props
}: HTMLAttributes<HTMLTableElement> & { collapsible?: boolean }) => (
  // TODO: add all of the logic for the expand table possibly in a custom hook. copy/paste from
  <div className={cn(styles.container)}>
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
          // and use td:first-child to avoid selecting publication tags
          `:scope > tbody > tr > td:first-child > button[aria-expanded="${!expand}"]`
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
  onClick,
  ...props
}: HTMLAttributes<HTMLTableRowElement> & {
  extraContent?: ReactNode;
  isOdd: boolean;
}) => {
  const hasExtraContent = Boolean(extraContent);

  const [expanded, setExpanded] = useState(false);

  const idRef = useRef(v1());

  const handleClick: MouseEventHandler<HTMLElement> = (event) => {
    onClick?.(event);
    if (
      hasExtraContent &&
      !(event.target as HTMLElement).closest(
        'a, button:not([aria-controls]), input'
      )
    ) {
      setExpanded((expanded) => !expanded);
    }
  };

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
              aria-controls={idRef.current}
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
          id={idRef.current}
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
