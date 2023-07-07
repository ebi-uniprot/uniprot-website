/* eslint-disable uniprot-website/use-config-location */
import { ReactNode, useCallback, useState } from 'react';
import { Link, generatePath, useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import {
  Button,
  Loader,
  LongNumber,
  Message,
  SpinnerIcon,
  WarningTriangleIcon,
  formatLargeNumber,
} from 'franklin-sites';
import qs from 'query-string';
import { sumBy } from 'lodash-es';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import AutocompleteWrapper, {
  Suggestions,
} from '../../../query-builder/components/AutocompleteWrapper';

import useDataApi from '../../../shared/hooks/useDataApi';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';

import apiUrls, { GroupBy } from '../../config/apiUrls';

import { addMessage } from '../../../messages/state/messagesActions';
import { getParamsFromURL } from '../../utils/resultsUtils';
import {
  getAPIQueryParams,
  getSuggesterUrl,
} from '../../../shared/config/apiUrls';
import { parseQueryString } from '../../../shared/utils/url';
import {
  getGroupBySuggesterUrl,
  getPercentageLabel,
  getGroupBySuggesterTitle,
  groupByToLabel,
  groupByToTerm,
} from './UniProtKBGroupByUtils';

import { LocationToPath, Location } from '../../../app/config/urls';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

import styles from './styles/group-by.module.scss';

const HISTOGRAM_WIDTH = 300;

export type GroupByAPIModel = {
  ancestors: Ancestor[];
  groups: Group[];
};

type Ancestor = {
  id: string;
  label: string;
};

type Group = {
  id: string;
  label: string;
  expandable?: boolean;
  count: number;
};

type UniProtKBNodeSearchLinkProps = {
  id: string;
  label: string;
  groupBy: GroupBy;
  query: string;
  count: number;
};

const UniProtKBNodeSearchLink = ({
  id,
  label,
  groupBy,
  query,
  count,
}: UniProtKBNodeSearchLinkProps) => {
  const groupByLabel = groupByToLabel[groupBy];
  const groupByTerm = groupByToTerm[groupBy];
  // GO parent IDs are in the format GO:0008150 and search endpoint doesn't want the "GO:"
  const groupById = groupBy === 'go' ? id.slice(3) : id;
  return (
    <Link
      to={{
        pathname: LocationToPath[Location.UniProtKBResults],
        search: `query=${query} AND (${groupByTerm}:${groupById})`,
      }}
      title={`UniProtKB search results with ${groupByLabel}: ${label} (ID:${id}) and query:${query}`}
    >
      <LongNumber>{count}</LongNumber>
    </Link>
  );
};

type ParentNodeLinkProps = {
  id?: string;
  label: string;
  url: string;
  searchParams: { [k: string]: string };
  parent?: string;
};

const ParentNodeLink = ({
  label,
  id,
  url,
  searchParams,
  parent,
}: ParentNodeLinkProps) => (
  <Link
    to={qs.stringifyUrl({
      url,
      query: {
        ...searchParams,
        parent,
      },
    })}
    title={`Set parent node to ${label}${id ? `ID:${id}` : ''}`}
  >
    {label}
  </Link>
);

type GroupByAncestorProps = {
  query: string;
  ancestors: Ancestor[];
  count?: number;
  labelWidth?: number;
  children: ReactNode;
  groupBy: GroupBy;
  showDropdownAndCount?: boolean;
};

const GroupByAncestor = ({
  ancestors,
  query,
  count,
  labelWidth,
  children,
  groupBy,
  showDropdownAndCount = false,
}: GroupByAncestorProps) => {
  const location = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));
  const [open, setOpen] = useState(true);
  const [ancestor, ...restAncestors] = ancestors;

  if (!ancestor) {
    return <ul className={cn('no-bullet', styles.groupby)}>{children}</ul>;
  }

  if (!count) {
    return null;
  }

  return (
    <ul className={cn('no-bullet', styles.groupby)}>
      <li className={styles.node}>
        <span className={styles.expand}>
          {showDropdownAndCount && (
            <Button
              variant="secondary"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              ►
            </Button>
          )}
        </span>
        <span className={styles.count}>
          {showDropdownAndCount && (
            <UniProtKBNodeSearchLink
              id={ancestor.id}
              label={ancestor.label}
              groupBy={groupBy}
              query={query}
              count={count}
            />
          )}
        </span>
        <span
          className={styles.label}
          style={labelWidth ? { width: `${labelWidth}ch` } : undefined}
        >
          <ParentNodeLink
            label={ancestor.label}
            id={ancestor.id}
            url={location.pathname}
            searchParams={searchParams}
            parent={ancestor.id}
          />
        </span>
        {open &&
          (restAncestors.length > 0 ? (
            <GroupByAncestor
              ancestors={restAncestors}
              query={query}
              count={count}
              labelWidth={labelWidth}
              groupBy={groupBy}
            >
              {children}
            </GroupByAncestor>
          ) : (
            <ul className={cn('no-bullet', styles.groupby)}>{children}</ul>
          ))}
      </li>
    </ul>
  );
};

type GroupByNodeProps = {
  query: string;
  item: Group;
  labelWidth?: number;
  histogram?: boolean;
  parentTotal?: number;
  groupBy: GroupBy;
};

const GroupByNode = ({
  query,
  item,
  labelWidth,
  histogram,
  parentTotal,
  groupBy,
}: GroupByNodeProps) => {
  const location = useLocation();
  const messagesDispatch = useMessagesDispatch();
  const [open, setOpen] = useState(false);
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));
  const url = open ? apiUrls.groupBy(groupBy, query, item.id) : null;
  const { loading, data, error } = useDataApi<GroupByAPIModel>(url);

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
  if (item.expandable) {
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
  const sumChildren = sumBy(data?.groups, 'count');
  const children = data && open && (
    <GroupByAncestor
      ancestors={data.ancestors}
      query={query}
      labelWidth={labelWidth}
      count={sumChildren}
      groupBy={groupBy}
      showDropdownAndCount={data.ancestors.length === 1}
    >
      {data.groups.map((child) => (
        <GroupByNode
          item={child}
          query={query}
          key={child.id}
          parentTotal={sumChildren}
          groupBy={groupBy}
        />
      ))}
    </GroupByAncestor>
  );

  const proportion = histogram && parentTotal && item.count / parentTotal;
  const percentage = proportion && 100 * proportion;
  const groupByLabel = groupByToLabel[groupBy];

  return (
    <li className={styles.node}>
      <span className={styles.expand}>{icon}</span>
      <span className={styles.count}>
        <UniProtKBNodeSearchLink
          id={item.id}
          label={item.label}
          groupBy={groupBy}
          query={query}
          count={item.count}
        />
      </span>
      <span
        className={styles.label}
        style={labelWidth ? { width: `${labelWidth}ch` } : undefined}
      >
        <ParentNodeLink
          label={item.label}
          id={item.id}
          url={location.pathname}
          searchParams={searchParams}
          parent={item.id}
        />
      </span>
      {proportion && percentage && (
        <span
          title={`Number of UniProtKB search results with ${groupByLabel}: ${
            item.label
          } (ID:${item.id}) and query ${query} is ${formatLargeNumber(
            item.count
          )} which is ${percentage.toFixed(2)}% of all sibling results.`}
        >
          <span
            className={styles.bar}
            style={{
              width: Math.max(HISTOGRAM_WIDTH * proportion, 1),
            }}
          />
          <span className={styles.percentage}>
            {getPercentageLabel(percentage)}
          </span>
        </span>
      )}

      {children}
    </li>
  );
};

type GroupByRootProps = {
  query: string;
  id?: string;
  total?: number;
  groupBy: GroupBy;
};

const GroupByRoot = ({ groupBy, query, id, total }: GroupByRootProps) => {
  const location = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));
  const groupByUrl = apiUrls.groupBy(groupBy, query, id);
  const groupByResponse = useDataApi<GroupByAPIModel>(`${groupByUrl}`);
  // TODO: remove this when backend provides the parent information in the groupby response
  const parentUrl = id
    ? getSuggesterUrl(getGroupBySuggesterUrl(groupBy), id)
    : null;
  const parentResponse = useDataApi<Suggestions>(parentUrl);

  if (groupByResponse.loading || (id && parentResponse.loading)) {
    return <Loader />;
  }

  if (groupByResponse.error || !groupByResponse.data) {
    return <ErrorHandler status={groupByResponse.status} />;
  }

  if (parentResponse.error || (id && !parentResponse.data)) {
    return <ErrorHandler status={parentResponse.status} />;
  }

  const sumChildren = sumBy(groupByResponse.data?.groups, 'count');

  let childrenNode;
  if (id && !sumChildren) {
    childrenNode = (
      <Message level="info" className={styles['no-results']}>
        This {groupByToLabel[groupBy]} node has no children.
      </Message>
    );
  } else if (groupByResponse.data?.groups.length) {
    const labelWidth = Math.max(
      ...groupByResponse.data.groups.map((child) => child.label.length)
    );
    childrenNode = (
      <GroupByAncestor
        ancestors={groupByResponse.data.ancestors}
        query={query}
        labelWidth={labelWidth}
        count={sumChildren || total}
        groupBy={groupBy}
        showDropdownAndCount={groupByResponse.data.ancestors.length === 1}
      >
        {groupByResponse.data.groups.map((child) => (
          <GroupByNode
            item={child}
            query={query}
            key={child.id}
            labelWidth={labelWidth}
            histogram
            parentTotal={sumChildren || total}
            groupBy={groupBy}
          />
        ))}
      </GroupByAncestor>
    );
  } else {
    childrenNode = (
      <Message level="info" className={styles['no-results']}>
        No results found with this combination of {groupBy}, query and facets.
      </Message>
    );
  }

  const groupByLabel = groupByToLabel[groupBy];

  const { value: parentLabel } = parentResponse?.data?.suggestions?.[0] || {};

  return (
    <div className={styles['groupby-container']}>
      <ul className={cn('no-bullet', styles.groupby, styles.groupby__header)}>
        <li className={styles.header}>
          <h3 className={cn('tiny', styles.count)}>UniProtKB Entries</h3>
          <h3 className={cn('tiny', styles.label)}>{groupByLabel}</h3>
        </li>
        {total && (
          <li className={styles.parent}>
            <span className={styles.count}>
              <Link
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: `query=${query}`,
                }}
                title={`UniProtKB search results for query:${query}`}
              >
                <LongNumber>{total}</LongNumber>
              </Link>
            </span>
            <span className={styles.label}>
              {id ? (
                <ParentNodeLink
                  label="Top level"
                  url={location.pathname}
                  searchParams={searchParams}
                />
              ) : (
                <span title="Parent node currently set to top level">
                  Top level
                </span>
              )}
            </span>
          </li>
        )}
        {id && parentLabel && Boolean(sumChildren) && (
          <li className={styles.parent}>
            <span className={styles.count}>
              <UniProtKBNodeSearchLink
                id={id}
                label={parentLabel}
                groupBy={groupBy}
                query={query}
                count={sumChildren}
              />
            </span>
            <span className={styles.label}>
              <span
                className={styles['active-label']}
                title={`Parent node currently set to ${parentLabel} (ID:${id})`}
              >
                {parentLabel}
              </span>
              <Link
                to={generatePath(LocationToPath[Location.TaxonomyEntry], {
                  accession: id,
                })}
                title={`The ${groupByLabel} entry page for ${parentLabel} (ID:${id})`}
              >
                {groupByLabel} ID:{id}
              </Link>
            </span>
          </li>
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
  const { parent, groupBy } = params;

  const handleAutocompleteFormValue = useCallback(
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

  if (!groupBy) {
    return null;
  }

  const groupByLabel = groupByToLabel[groupBy];

  return (
    <>
      <h2 className="small">Group by {groupByLabel}</h2>
      <section className={styles.autocomplete}>
        <AutocompleteWrapper
          placeholder={`Enter ${groupByLabel} name or ID`}
          url={getGroupBySuggesterUrl(groupBy)}
          onSelect={handleAutocompleteFormValue}
          title={getGroupBySuggesterTitle(groupBy)}
          clearOnSelect
        />
      </section>
      <GroupByRoot groupBy={groupBy} query={query} id={parent} total={total} />
    </>
  );
};

export default UniProtKBGroupByResults;
