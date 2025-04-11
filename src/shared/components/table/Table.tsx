import cn from 'classnames';
import { Button, ControlledDropdown } from 'franklin-sites';
import {
  Fragment,
  HTMLAttributes,
  Key,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { frame } from 'timing-functions';

// import { frame } from 'timing-functions';
import useExpandTable from '../../hooks/useExpandTable';
import styles from './styles/table.module.scss';

const Table = ({
  children,
  className,
  expandable,
  id,
  ...props
}: HTMLAttributes<HTMLTableElement> & {
  expandable?: boolean;
  id?: string;
}) => {
  const [containerRef, expandTable, setExpandTable, showButton] =
    useExpandTable(expandable);

  return expandable ? (
    <div>
      <div
        ref={containerRef}
        className={cn(styles.container, {
          [styles.collapsed]: expandable && !expandTable,
        })}
      >
        <table className={cn(styles.table, className)} id={id} {...props}>
          {children}
        </table>
      </div>
      {(showButton || expandTable) && (
        <div className={styles['expand-button-container']}>
          <Button
            variant="primary"
            onClick={() => setExpandTable((current) => !current)}
            id={id && `${id}-expand-button`}
          >
            {expandTable ? 'Collapse' : 'Expand'} table
          </Button>
        </div>
      )}
    </div>
  ) : (
    <table className={cn(styles.table, className)} {...props}>
      {children}
    </table>
  );
};

type HeadProps = HTMLAttributes<HTMLTableSectionElement> & {
  toggleAll?: boolean;
};

const Head = ({ toggleAll, children, className, ...props }: HeadProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => setExpanded((expanded) => !expanded);

  const ref = useRef<HTMLTableCellElement>(null);

  // effect to handle a click on anything closing the dropdown
  useEffect(() => {
    if (!expanded) {
      return;
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) {
        return;
      }
      const dropdown = ref.current.querySelector('div');

      if (dropdown?.parentElement?.contains(event.target as Node)) {
        return;
      }
      setExpanded(false);
    };

    window.document.addEventListener('mouseup', listener);
    window.document.addEventListener('touchend', listener);
    return () => {
      window.document.removeEventListener('mouseup', listener);
      window.document.removeEventListener('touchend', listener);
    };
  }, [expanded]);

  const handleToggle: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const button = event.target as HTMLButtonElement;
      const { expand } = button.dataset;
      const buttons = button
        .closest('table')
        ?.querySelectorAll<HTMLButtonElement>(
          // get only the direct children, not the ones within another inner table and
          // use td:first-child to avoid selecting publication tags if present in the row
          `:scope > tbody > tr > td:first-child > button[aria-expanded="${!expand}"]`
        );
      for (const button of buttons || []) {
        button.click();
      }
      frame().then(() => setExpanded(false));
    },
    []
  );

  return (
    <thead className={cn(className)} {...props}>
      <tr className={styles.row}>
        <th ref={ref}>
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

  const buttonId = useId();

  const handleClick: MouseEventHandler<HTMLTableRowElement> = (event) => {
    const toggleAllExpnaded = (event.target as HTMLElement)
      .closest('table')
      ?.querySelector<HTMLButtonElement>(
        ':scope > thead > tr > th > div[aria-expanded="true"]'
      );
    if (!toggleAllExpnaded) {
      onClick?.(event);
    }
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
