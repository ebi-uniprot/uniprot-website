import { FC, ReactNode, HTMLAttributes, Children } from 'react';
import { Link, useLocation } from 'react-router';
import { ExpandableList, formatLargeNumber } from 'franklin-sites';
import cn from 'classnames';

import styles from './styles/facets.module.scss';

type FacetValue = { label?: ReactNode; value: string; count: number };

export type FacetObject = {
  label?: ReactNode;
  name: string;
  allowMultipleSelection?: boolean;
  values?: FacetValue[];
};

// To hold facets, record of sets
type CustomQueryValue = Record<string, Set<string>>;
// The modified query object, with our custom facet object
export type CustomParsedQuery = Record<string, string | CustomQueryValue>;

/**
 * Takes a search string and parses it, handle facets specifically, keeps them
 * as sets of values
 */
export const parse = (
  string: string,
  queryStringKey = 'facets'
): CustomParsedQuery => {
  const parsed = new URLSearchParams(string);
  const customParsed: CustomParsedQuery = Object.fromEntries(parsed);
  const queryStringFacet = parsed.get(queryStringKey);
  if (!queryStringFacet) {
    return customParsed;
  }
  const facetTokens = queryStringFacet
    .split(',')
    .map((stringTuple) => stringTuple.split(':'));
  const facets: CustomQueryValue = {};
  for (const [name, value] of facetTokens) {
    if (!facets[name]) {
      facets[name] = new Set();
    }
    facets[name].add(value);
  }
  customParsed[queryStringKey] = facets;
  return customParsed;
};

/**
 * Takes a parsed search object (as generated by the previous "parse" function)
 * and generate a search string
 */
export const stringify = (
  query: CustomParsedQuery,
  queryStringKey = 'facets'
): string => {
  const { [queryStringKey]: facets = {}, ...rest } = query;
  const facetString = Object.entries(facets as CustomQueryValue)
    .map(([name, values]) =>
      Array.from(values).map((value) => `${name}:${value}`)
    )
    .flat()
    .join(',');
  const sp = new URLSearchParams(rest as Record<string, string>);
  if (!facetString) {
    return sp.toString();
  }
  sp.set(queryStringKey, facetString);
  return sp.toString();
};

type FacetProps = {
  /**
   * The facet data to be displayed
   */
  data: FacetObject;
  /**
   * Extra components to be added in the "action" area
   */
  extraActions?: ReactNode;
  /**
   * Key with which to add the facets in the querystring (defaults to "facets")
   */
  queryStringKey?: string;
  /**
   * ClickHandler for specific behaviour
   */
  facetClickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Facet: FC<
  React.PropsWithChildren<FacetProps & HTMLAttributes<HTMLDivElement>>
> = ({
  data,
  extraActions,
  queryStringKey = 'facets',
  facetClickHandler,
  ...props
}) => {
  const location = useLocation();
  const search = parse(location.search, queryStringKey);

  if (!data.values?.length) {
    return null;
  }
  const queryField = search[queryStringKey] as CustomQueryValue | undefined;
  return (
    <div {...props}>
      <div className={styles['facet-name']}>{data.label || data.name}</div>
      <ExpandableList extraActions={extraActions}>
        {data.values.map(({ value, label, count }) => {
          const isActive = queryField?.[data.name]?.has(value);
          const facetSet = new Set(
            data.allowMultipleSelection && queryField
              ? queryField[data.name]
              : null
          );
          facetSet[isActive ? 'delete' : 'add'](value);

          const to = {
            ...location,
            search: stringify(
              {
                ...search,
                [queryStringKey]: {
                  ...queryField,
                  [data.name]: facetSet,
                },
              },
              queryStringKey
            ),
          };

          return (
            <Link
              key={`${data.name}_${value}`}
              to={to}
              className={cn({ [styles['facet-active']]: isActive })}
              onClick={facetClickHandler}
            >
              {label || value}
              {` (${formatLargeNumber(count)})`}
            </Link>
          );
        })}
      </ExpandableList>
    </div>
  );
};

type FacetsProps = {
  /**
   * The facet data to be displayed
   */
  data?: FacetObject[];
  /**
   * Extra components to be added in the "action" area, map of <facet name, component>
   */
  extraActionsFor?: Map<string, ReactNode>;
  /**
   * Key with which to add the facets in the querystring (defaults to "facets")
   */
  queryStringKey?: string;
  /**
   * ClickHandler for specific behaviour
   */
  facetClickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Facets: FC<
  React.PropsWithChildren<FacetsProps & HTMLAttributes<HTMLDivElement>>
> = ({
  data,
  extraActionsFor,
  queryStringKey = 'facets',
  children,
  className,
  facetClickHandler,
  ...props
}) => {
  if (!(data?.length || Children.count(children))) {
    return null;
  }

  return (
    <div className={cn(className, styles.facets)} {...props}>
      <ul className="no-bullet">
        {data?.map((facet) =>
          facet.values?.length ? (
            <li key={facet.name}>
              <Facet
                data={facet}
                extraActions={extraActionsFor?.get(facet.name)}
                queryStringKey={queryStringKey}
                facetClickHandler={facetClickHandler}
              />
            </li>
          ) : null
        )}
        {Children.map(children, (child, index) => {
          if (!child) {
            return null;
          }
          return (
            <li
              key={
                (typeof child === 'object' && 'key' in child && child.key) ||
                index
              }
            >
              {child}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
