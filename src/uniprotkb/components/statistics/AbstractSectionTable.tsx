/* eslint-disable react/no-array-index-key */
import { ReactNode } from 'react';

import CountLinkOrNothing from './CountLinkOrNothing';
import { ReviewedLabel, UnreviewedLabel } from './UniProtKBLabels';

import { stringifyQuery } from '../../../shared/utils/url';

import { MergedStatistics } from './utils';
import { LocationToPath, Location } from '../../../app/config/urls';

import styles from './styles/statistics-page.module.scss';

type AbstractSectionTableProps = {
  title: ReactNode;
  tableData: Array<{
    header: ReactNode;
    data: MergedStatistics;
    query?: string;
    accessor?: 'count' | 'entryCount';
  }>;
  excludeUniProtKB?: boolean;
};

const AbstractSectionTable = ({
  title,
  tableData,
  excludeUniProtKB,
}: AbstractSectionTableProps) => (
  <>
    <h3>{title}</h3>
    <table>
      <thead>
        <tr>
          <th>Section</th>
          {tableData.map(({ header }, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!excludeUniProtKB && (
          <tr>
            <td>UniProtKB</td>
            {tableData.map(
              ({ data, query, accessor = 'entryCount' }, index) => (
                <td key={index} className={styles.end}>
                  <CountLinkOrNothing
                    condition={Boolean(query)}
                    to={{
                      pathname: LocationToPath[Location.UniProtKBResults],
                      search: stringifyQuery({ query }),
                    }}
                  >
                    {(data.reviewed?.[accessor] || 0) +
                      (data.unreviewed?.[accessor] || 0)}
                  </CountLinkOrNothing>
                </td>
              )
            )}
          </tr>
        )}
        <tr>
          <td>
            {!excludeUniProtKB && '⮑'} <ReviewedLabel />
          </td>
          {tableData.map(({ data, query, accessor = 'entryCount' }, index) => (
            <td key={index} className={styles.end}>
              <CountLinkOrNothing
                condition={Boolean(query)}
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: stringifyQuery({
                    query: `(reviewed:true)${
                      query === '*' ? '' : ` AND ${query}`
                    }`,
                  }),
                }}
              >
                {data.reviewed?.[accessor] || 0}
              </CountLinkOrNothing>
            </td>
          ))}
        </tr>
        <tr>
          <td>
            {!excludeUniProtKB && '⮑'} <UnreviewedLabel />
          </td>
          {tableData.map(({ data, query, accessor = 'entryCount' }, index) => (
            <td key={index} className={styles.end}>
              <CountLinkOrNothing
                condition={Boolean(query)}
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: stringifyQuery({
                    query: `(reviewed:false)${
                      query === '*' ? '' : ` AND ${query}`
                    }`,
                  }),
                }}
              >
                {data.unreviewed?.[accessor] || 0}
              </CountLinkOrNothing>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </>
);

export default AbstractSectionTable;
