/* eslint-disable uniprot-website/use-config-location */
import { useCallback, useState } from 'react';
import { Link, generatePath, useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import {
  Button,
  Loader,
  LongNumber,
  SpinnerIcon,
  WarningTriangleIcon,
} from 'franklin-sites';
import qs from 'query-string';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import AutocompleteWrapper from '../../../query-builder/components/AutocompleteWrapper';

import useDataApi from '../../../shared/hooks/useDataApi';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';

import apiUrls from '../../config/apiUrls';

import { addMessage } from '../../../messages/state/messagesActions';
import { getParamsFromURL } from '../../utils/resultsUtils';
import sharedApiUrls, {
  getAPIQueryParams,
  getAPIQueryUrl,
} from '../../../shared/config/apiUrls';
import { parseQueryString } from '../../../shared/utils/url';

import { LocationToPath, Location } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { TaxonomyColumn } from '../../../supporting-data/taxonomy/config/TaxonomyColumnConfiguration';
import { TaxonomyAPIModel } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

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
    <li className={styles.node}>
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
          to={generatePath(LocationToPath[Location.TaxonomyEntry], {
            accession: item.id,
          })}
        >
          {`${item.label} [${item.id}]`}
        </Link>
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
  const parentUrl = id
    ? getAPIQueryUrl({ query: `taxonomy_id:${id}`, size: 0, facets: null })
    : null;
  const parentResponse = useDataApi<UniProtkbAPIModel>(parentUrl);
  // const parenr = useNSQuery({})
  const taxonomyUrl = id
    ? sharedApiUrls.entry(String(id), Namespace.taxonomy, [
        TaxonomyColumn.scientificName,
        TaxonomyColumn.parent,
      ])
    : null;
  const taxonomyResponse = useDataApi<TaxonomyAPIModel>(taxonomyUrl);

  if (
    groupByResponse.loading ||
    (id && taxonomyResponse.loading) ||
    (id && parentResponse.loading)
  ) {
    return <Loader />;
  }

  if (groupByResponse.error || !groupByResponse.data) {
    return <ErrorHandler status={groupByResponse.status} />;
  }

  if (taxonomyResponse.error || (id && !taxonomyResponse.data)) {
    return <ErrorHandler status={taxonomyResponse.status} />;
  }

  if (parentResponse.error || (id && !parentResponse.data)) {
    return <ErrorHandler status={taxonomyResponse.status} />;
  }

  const parentTotal = +(parentResponse?.headers?.['x-total-results'] || 0);

  return (
    <>
      <ul className={cn('no-bullet', styles.groupBy, styles.groupBy__header)}>
        <li className={styles.header}>
          <h3 className={cn('tiny', styles.count)}>UniProtKB Entries</h3>
          <h3 className={cn('tiny', styles.label)}>Taxonomy</h3>
        </li>
        {total && (
          <li className={styles.parent}>
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
              {id && (
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
              )}
            </span>
          </li>
        )}
        {id && taxonomyResponse.data && (
          <li className={styles.parent}>
            <span className={styles.count}>
              <Link
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: `query=${query}${id ? `AND taxonomy_id:${id}` : ''}`,
                }}
              >
                <LongNumber>{parentTotal}</LongNumber>
              </Link>
            </span>
            <span className={styles.label}>
              <Link
                to={generatePath(LocationToPath[Location.TaxonomyEntry], {
                  accession: id,
                })}
              >
                {`${taxonomyResponse.data.scientificName} [${taxonomyResponse.data.taxonId}]`}
              </Link>
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
      <ul className={cn('no-bullet', styles.groupBy, styles.groupBy__first)}>
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
      <h2 className="small">Group by taxonomy</h2>
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