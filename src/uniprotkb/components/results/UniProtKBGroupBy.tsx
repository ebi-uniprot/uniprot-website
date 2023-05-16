import { useState } from 'react';
import cn from 'classnames';
import { Button, LongNumber, SpinnerIcon } from 'franklin-sites';

import { Link, useLocation } from 'react-router-dom';
import apiUrls from '../../config/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { PaginatedResults } from '../../../shared/hooks/usePagination';
import { getParamsFromURL } from '../../utils/resultsUtils';

import styles from './styles/group-by.module.scss';
import { LocationToPath, Location } from '../../../app/config/urls';

type Props = {
  resultsDataObject: PaginatedResults;
};

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
}: {
  query: string;
  item?: GroupByItem;
  root?: boolean;
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
      <span className={styles.count}>
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

  const children = (root || open) && data && (
    <ul className={cn('no-bullet', styles.groupBy)}>
      {data.map((i) => (
        <GroupByNode item={i} query={query} key={i.id} />
      ))}
    </ul>
  );

  if (root) {
    return children;
  }

  return (
    <li>
      {row}
      {children}
    </li>
  );
};

const UniProtKBGroupByResults = ({ resultsDataObject }: Props) => {
  //   const { allResults, initialLoading, hasMoreData, progress } =
  //     resultsDataObject;

  //   const loading = initialLoading;

  const [{ query }] = getParamsFromURL(useLocation().search);

  return (
    <>
      <ul className={cn('no-bullet', styles.groupBy)}>
        <li>
          <b className={styles.expand}>&nbsp;</b>
          <b className={styles.count}>UniProtKB Entries</b>
          <b className={styles.label}>Taxonomy</b>
        </li>
      </ul>
      <GroupByNode query={query} root />
    </>
  );
};

export default UniProtKBGroupByResults;
