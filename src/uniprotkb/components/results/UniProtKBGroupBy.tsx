/* eslint-disable uniprot-website/use-config-location */
import { useCallback, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import {
  Button,
  Loader,
  LongNumber,
  SpinnerIcon,
  WarningTriangleIcon,
} from 'franklin-sites';
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
import { Namespace } from '../../../shared/types/namespaces';
import { TaxonomyColumn } from '../../../supporting-data/taxonomy/config/TaxonomyColumnConfiguration';
import { TaxonomyAPIModel } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import { addMessage } from '../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

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
  const messagesDispatch = useMessagesDispatch();
  const [open, setOpen] = useState(false);
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));
  const url = open ? apiUrls.groupBy('taxonomy', query, item.id) : null;
  const { loading, data, error } = useDataApi<GroupByItem[]>(url);

  if (error) {
    messagesDispatch(
      addMessage({
        id: 'groupby-loading-warning',
        content: `Network error when fetching group information for: ${item.label}`,
        format: MessageFormat.POP_UP,
        level: MessageLevel.WARNING,
      })
    );
  }

  let icon;
  if (item.expand) {
    if (loading) {
      icon = <SpinnerIcon height="1em" className={styles.spinner} />;
    } else if (error) {
      icon = (
        <WarningTriangleIcon
          height="1em"
          className={styles.warning}
          // Allow user to retry after warning appears
          onClick={() => setOpen((o) => !o)}
        />
      );
    } else {
      icon = (
        <Button
          variant="secondary"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          ►
        </Button>
      );
    }
  }

  const children = data && open && (
    <ul className={cn('no-bullet', styles.groupBy)}>
      {data.map((child) => (
        <GroupByNode item={child} query={query} key={child.id} />
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
        {item.label}
        {item.expand && (
          <Link
            to={qs.stringifyUrl({
              url: location.pathname,
              query: {
                ...searchParams,
                parent: item.id,
              },
            })}
            className={styles['link-arrow']}
          >
            ↓
          </Link>
        )}
      </span>
      {children}
    </li>
  );
};

type GroupByRootProps = {
  query: string;
  id?: string;
  total?: number;
};

const GroupByRoot = ({ query, id, total }: GroupByRootProps) => {
  const location = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));
  const groupByUrl = apiUrls.groupBy('taxonomy', query, id);
  const groupByResponse = useDataApi<GroupByItem[]>(`${groupByUrl}`);
  const taxonomyUrl = id
    ? sharedApiUrls.entry(String(id), Namespace.taxonomy, [
        TaxonomyColumn.scientificName,
        TaxonomyColumn.parent,
      ])
    : null;
  const taxonomyResponse = useDataApi<TaxonomyAPIModel>(taxonomyUrl);

  if (groupByResponse.loading || (id && taxonomyResponse.loading)) {
    return <Loader />;
  }

  if (groupByResponse.error || !groupByResponse.data) {
    return <ErrorHandler status={groupByResponse.status} />;
  }

  if (taxonomyResponse.error || (id && !taxonomyResponse.data)) {
    return <ErrorHandler status={taxonomyResponse.status} />;
  }

  const count = sumBy(groupByResponse.data, 'count');

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
              <LongNumber>Top-level</LongNumber>
              <Link
                to={qs.stringifyUrl({
                  url: location.pathname,
                  query: {
                    ...searchParams,
                    parent: undefined,
                  },
                })}
                className={styles['link-arrow']}
              >
                ↑
              </Link>
            </span>
          </li>
        )}
        {id && taxonomyResponse.data && (
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
            <span className={styles.label}>
              {taxonomyResponse.data.scientificName}
            </span>
            <Link
              to={qs.stringifyUrl({
                url: location.pathname,
                query: {
                  ...searchParams,
                  parent: taxonomyResponse.data.parent?.taxonId,
                },
              })}
              className={styles['link-arrow']}
            >
              ↑
            </Link>
          </li>
        )}
      </ul>
      <ul className={cn('no-bullet', styles.groupBy, styles.groupBy__root)}>
        {groupByResponse.data.map((child) => (
          <GroupByNode item={child} query={query} key={child.id} />
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
    (_, id?: string) => {
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
          title="Search for taxonomy node"
        />
      </section>
      <GroupByRoot query={query} id={parent} total={total} />
    </>
  );
};

export default UniProtKBGroupByResults;
