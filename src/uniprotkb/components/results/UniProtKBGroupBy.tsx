/* eslint-disable uniprot-website/use-config-location */
import { useCallback, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Button, Loader, LongNumber, SpinnerIcon } from 'franklin-sites';
import qs from 'query-string';

import { sumBy } from 'lodash-es';
import AutocompleteWrapper from '../../../query-builder/components/AutocompleteWrapper';

import useDataApi from '../../../shared/hooks/useDataApi';

import apiUrls from '../../config/apiUrls';

import { getParamsFromURL } from '../../utils/resultsUtils';
import sharedApiUrls, {
  getAPIQueryParams,
} from '../../../shared/config/apiUrls';
import { parseQueryString } from '../../../shared/utils/url';

import { LocationToPath, Location } from '../../../app/config/urls';

import styles from './styles/group-by.module.scss';

type GroupByItem = {
  id: string;
  label: string;
  link: string;
  expand?: boolean;
  count: number;
};

type GroupByNodeProps = {
  query: string;
  item: GroupByItem;
};

const GroupByNode = ({ query, item }: GroupByNodeProps) => {
  const location = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));
  const [open, setOpen] = useState(false);
  const id = !item?.id ? undefined : +item.id;
  const { loading, data } = useDataApi<GroupByItem[]>(
    open ? apiUrls.groupBy('taxonomy', query, id) : null
  );

  console.log(open, !loading, !data);
  if (open && !loading && !data) {
    return <>oops</>;
  }

  const icon =
    item.expand &&
    (loading ? (
      <SpinnerIcon width="10" height="10" className={styles.spinner} />
    ) : (
      <Button
        variant="secondary"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        ►
      </Button>
    ));

  const children = data && open && (
    <ul className={cn('no-bullet', styles.groupBy)}>
      {data.map((i) => (
        <GroupByNode item={i} query={query} key={i.id} />
      ))}
    </ul>
  );

  return (
    <li className={styles.row}>
      <span className={styles.expand}>{icon}</span>
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
      <span className={styles.label}>
        <Link
          to={qs.stringifyUrl({
            url: location.pathname,
            query: {
              ...searchParams,
              parent: item.id,
            },
          })}
        >
          {item.label}
        </Link>
      </span>
      {children}
    </li>
  );
};

type GroupByRootProps = {
  query: string;
  id?: number;
  total?: number;
};

const GroupByRoot = ({ query, id, total }: GroupByRootProps) => {
  const location = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));
  const { loading, data } = useDataApi<GroupByItem[]>(
    apiUrls.groupBy('taxonomy', query, id)
  );

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return <>oops</>;
  }

  const count = sumBy(data, 'count');

  return (
    <>
      <ul className={cn('no-bullet', styles.groupBy, styles.groupBy__header)}>
        <li className={styles.header}>
          <h3 className={cn('tiny', styles.count)}>UniProtKB Entries</h3>
          <h3 className={cn('tiny', styles.label)}>Taxonomy</h3>
        </li>
        {total && (
          <li className={styles.root}>
            <span className={styles.count}>
              <Link
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: `query=${query}`,
                }}
              >
                <LongNumber>{total}</LongNumber>
              </Link>
            </span>
            <span className={styles.label}>
              <Link
                to={qs.stringifyUrl({
                  url: location.pathname,
                  query: {
                    ...searchParams,
                    parent: undefined,
                  },
                })}
              >
                <LongNumber>Top-level</LongNumber>
              </Link>
            </span>
          </li>
        )}
        {id && (
          <li className={styles.root}>
            <span className={styles.count}>
              <Link
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: `query=${query}${id ? `AND taxonomy_id:${id}` : ''}`,
                }}
              >
                <LongNumber>{count}</LongNumber>
              </Link>
            </span>
            <span className={styles.label}>{id}</span>
          </li>
        )}
      </ul>
      <ul className={cn('no-bullet', styles.groupBy, styles.groupBy__root)}>
        {data.map((i) => (
          <GroupByNode item={i} query={query} key={i.id} />
        ))}
      </ul>
    </>
  );
};
type UniProtKBGroupByResultsProps = {
  total?: number;
};

const UniProtKBGroupByResults = ({ total }: UniProtKBGroupByResultsProps) => {
  const history = useHistory();
  const locationSearch = useLocation().search;
  const [params] = getParamsFromURL(locationSearch);
  // This query will include facets
  const { query } = getAPIQueryParams(params);
  const { parent } = params;

  const handleTaxonFormValue = useCallback(
    (path: string, id?: string) => {
      // Only proceed if a node is selected
      if (id) {
        history.push(
          // eslint-disable-next-line uniprot-website/use-config-location
          {
            pathname: history.location.pathname,
            search: qs.stringify({
              ...parseQueryString(locationSearch),
              parent: id,
            }),
          }
        );
      }
      console.log(path, id);
    },
    [history, locationSearch]
  );

  return (
    <>
      <h2 className="small">Group By Taxonomy</h2>
      <section className={styles.autocomplete}>
        <AutocompleteWrapper
          placeholder="Enter taxon name or ID"
          url={sharedApiUrls.taxonomySuggester}
          onSelect={handleTaxonFormValue}
          title="Taxonomy parent"
        />
      </section>
      {/* TODO: remove cast  */}
      <GroupByRoot
        query={query}
        id={parent ? +parent : undefined}
        total={total}
      />
    </>
  );
};

export default UniProtKBGroupByResults;
