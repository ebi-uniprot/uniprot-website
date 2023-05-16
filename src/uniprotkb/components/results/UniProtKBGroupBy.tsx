import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Button, LongNumber, SpinnerIcon } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import apiUrls from '../../config/apiUrls';

import { getParamsFromURL } from '../../utils/resultsUtils';
import { getAPIQueryParams } from '../../../shared/config/apiUrls';
import { getNumberChars } from '../../../shared/utils/utils';

import { LocationToPath, Location } from '../../../app/config/urls';

import styles from './styles/group-by.module.scss';

type GroupByItem = {
  id: string;
  label: string;
  link: string;
  expand?: boolean;
  count: number;
};

const GroupByNode = ({
  query,
  item,
  root = false,
  countWidth = 20,
}: {
  query: string;
  item?: GroupByItem;
  root?: boolean;
  countWidth?: number;
}) => {
  const [open, setOpen] = useState(false);
  const parent = root || !item?.id ? undefined : +item?.id;
  const { loading, data } = useDataApi<GroupByItem[]>(
    root || open ? apiUrls.viewBy('taxonomy', query, parent) : null
  );

  if (loading) {
    return <SpinnerIcon width="12" height="12" className={styles.spinner} />;
  }

  if (open && !data) {
    return <>oops</>;
  }

  const row = item && (
    <>
      <span className={styles.expand}>
        {item.expand ? (
          <Button
            variant="secondary"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            ►
          </Button>
        ) : (
          <>&nbsp;</>
        )}
      </span>
      <span className={styles.count} style={{ width: `${countWidth}ch` }}>
        <Link
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: `query=${query} AND taxonomy_id:${item.id}`,
          }}
        >
          <LongNumber>{item.count}</LongNumber>
        </Link>
      </span>
      <span className={styles.label}>{item.label}</span>
    </>
  );

  let children = null;
  if (data && (root || open)) {
    const countWidth = Math.max(
      ...data.map(({ count }) => getNumberChars(count))
    );
    children = (
      <ul
        className={cn('no-bullet', styles.groupBy, {
          [styles.groupBy__root]: root,
        })}
      >
        {root && (
          <li className={styles.header}>
            <h2 className={cn('tiny', styles.count)}>UniProtKB Entries</h2>
            <h2 className={cn('tiny', styles.label)}>Taxonomy</h2>
          </li>
        )}
        {data.map((i) => (
          <GroupByNode
            item={i}
            query={query}
            key={i.id}
            countWidth={countWidth}
          />
        ))}
      </ul>
    );
  }

  if (root) {
    return children;
  }

  return (
    <li className={styles.row}>
      {row}
      {children}
    </li>
  );
};

const UniProtKBGroupByResults = () => {
  const [params] = getParamsFromURL(useLocation().search);
  // This includes facets
  const { query } = getAPIQueryParams(params);
  return <GroupByNode query={query} root />;
};

export default UniProtKBGroupByResults;
