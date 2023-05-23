/* eslint-disable uniprot-website/use-config-location */
import { useCallback, useState } from 'react';
import { Link, generatePath, useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import {
  Button,
  ExpandableList,
  Loader,
  LongNumber,
  Message,
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

export type GroupByItem = {
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
      icon = <SpinnerIcon height="1rem" className={styles.spinner} />;
    } else if (error) {
      icon = (
        <WarningTriangleIcon
          height="1rem"
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
    <ul className={cn('no-bullet', styles.groupby)}>
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
  id?: string;
  total?: number;
};

const GroupByRoot = ({ query, id, total }: GroupByRootProps) => {
  const location = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));
  const groupByUrl = apiUrls.groupBy('taxonomy', query, id);
  const groupByResponse = useDataApi<GroupByItem[]>(`${groupByUrl}`);
  const parentUrl = id
    ? getAPIQueryUrl({
        query: `${query} AND taxonomy_id:${id}`,
        size: 0,
        facets: null,
      })
    : null;
  const parentResponse = useDataApi<UniProtkbAPIModel>(parentUrl);
  const taxonomyUrl = id
    ? sharedApiUrls.entry(String(id), Namespace.taxonomy, [
        TaxonomyColumn.scientificName,
        TaxonomyColumn.parent,
        TaxonomyColumn.lineage,
      ])
    : null;
  const taxonomyResponse = useDataApi<TaxonomyAPIModel>(taxonomyUrl);
  const childrenUrl = id
    ? getAPIQueryUrl({
        namespace: Namespace.taxonomy,
        query: `parent:${id}`,
        size: 0,
        facets: null,
      })
    : null;
  const childrenResponse = useDataApi<TaxonomyAPIModel>(childrenUrl);

  if (
    groupByResponse.loading ||
    (id && taxonomyResponse.loading) ||
    (id && parentResponse.loading)
  ) {
    return <Loader />;
  }

  console.log(taxonomyResponse);
  // TODO: uncomment as soon as API stops returning 500s for leaf nodes
  // if (groupByResponse.error || !groupByResponse.data) {
  //   return <ErrorHandler status={groupByResponse.status} />;
  // }

  if (taxonomyResponse.error || (id && !taxonomyResponse.data)) {
    return <ErrorHandler status={taxonomyResponse.status} />;
  }

  if (parentResponse.error || (id && !parentResponse.data)) {
    return <ErrorHandler status={taxonomyResponse.status} />;
  }

  if (childrenResponse.error || (id && !childrenResponse.data)) {
    return <ErrorHandler status={childrenResponse.status} />;
  }

  const parentTotal = +(parentResponse?.headers?.['x-total-results'] || 0);
  const hasChildren = Boolean(
    +(childrenResponse?.headers?.['x-total-results'] || 0)
  );
  const parents = Array.from(taxonomyResponse?.data?.lineage || []).reverse();

  let childrenNode;
  if (id && !hasChildren) {
    childrenNode = (
      <Message level="info" className={styles['no-results']}>
        This taxonomy has no children.
      </Message>
    );
  } else if (groupByResponse.data?.length) {
    // TODO: remove optional changing when API fixes 500s (see TODO above)
    childrenNode = (
      <ul className={cn('no-bullet', styles.groupby, styles.groupby__first)}>
        {groupByResponse.data.map((child) => (
          <GroupByNode item={child} query={query} key={child.id} />
        ))}
      </ul>
    );
  } else {
    childrenNode = (
      <Message level="info" className={styles['no-results']}>
        No results found with this combination of taxonomy and query.
      </Message>
    );
  }

  return (
    <div className={styles['groupby-container']}>
      <ul className={cn('no-bullet', styles.groupby, styles.groupby__header)}>
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
              {id ? (
                <Link
                  to={qs.stringifyUrl({
                    url: location.pathname,
                    query: {
                      ...searchParams,
                      parent: undefined,
                    },
                  })}
                >
                  Top-level
                </Link>
              ) : (
                'Top-level'
              )}
            </span>
          </li>
        )}
        {id && taxonomyResponse.data && (
          <>
            {parents.length > 0 && (
              <li className={styles.grandparents}>
                <ExpandableList
                  numberCollapsedItems={0}
                  descriptionString="parents"
                  displayNumberOfHiddenItems
                >
                  {parents.map((p) => p.scientificName)}
                </ExpandableList>
              </li>
            )}
            <li className={styles.parent}>
              <span className={styles.count}>
                <Link
                  to={{
                    pathname: LocationToPath[Location.UniProtKBResults],
                    search: `query=${query}${
                      id ? `AND taxonomy_id:${id}` : ''
                    }`,
                  }}
                >
                  <LongNumber>{parentTotal}</LongNumber>
                </Link>
              </span>
              <span className={styles.label}>
                <span className={styles['active-label']}>
                  {taxonomyResponse.data.scientificName}
                </span>
                <Link
                  to={generatePath(LocationToPath[Location.TaxonomyEntry], {
                    accession: id,
                  })}
                >
                  Entry (ID: {id})
                </Link>
              </span>
            </li>
          </>
        )}
      </ul>
      {childrenNode}
    </div>
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
