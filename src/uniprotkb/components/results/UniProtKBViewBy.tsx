import { useState } from 'react';
import cn from 'classnames';
import { Loader, LongNumber } from 'franklin-sites';

import { useLocation } from 'react-router-dom';
import apiUrls from '../../config/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { PaginatedResults } from '../../../shared/hooks/usePagination';
import { getParamsFromURL } from '../../utils/resultsUtils';

import styles from './styles/group-by.module.scss';

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

const GroupByNode = ({ item, query }: { item: GroupByItem; query: string }) => {
  const [open, setOpen] = useState(false);
  const { loading, data, progress } = useDataApi<GroupByItem[]>(
    open ? apiUrls.viewBy('taxonomy', query) : null
  );
  if (open && loading) {
    return <Loader progress={progress} />;
  }

  if (open && !data) {
    return <>oops</>;
  }

  return (
    <li>
      <span className={styles.count}>
        <LongNumber>{item.count}</LongNumber>
      </span>
      <span className={styles.expand}>{item.expand && '►'}</span>
      <span className={styles.label}>{item.label}</span>
    </li>
  );
};

const UniProtKBViewByResults = ({ resultsDataObject }: Props) => {
  //   const { allResults, initialLoading, hasMoreData, progress } =
  //     resultsDataObject;

  //   const loading = initialLoading;

  const [{ query }] = getParamsFromURL(useLocation().search);

  const { loading, data, progress } = useDataApi<GroupByItem[]>(
    apiUrls.viewBy('taxonomy', query)
  );
  if (loading) {
    return <Loader progress={progress} />;
  }

  if (!data) {
    return <>oops</>;
  }

  return (
    <ul className={cn('no-bullet', styles.groupBy)}>
      {data.map((item) => (
        <GroupByNode key={item.id} item={item} query={query} />
      ))}
    </ul>
  );
};

export default UniProtKBViewByResults;
