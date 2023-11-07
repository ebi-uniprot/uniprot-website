import { ReactNode } from 'react';
import { LocationDescriptorObject } from 'history';

import CountLinkOrNothing from './CountLinkOrNothing';

import { frequencySort, merge } from './utils';

import { StatisticsItem, TableProps } from './StatisticsPage';
import { ReviewedLabel, UnreviewedLabel } from './UniProtKBLabels';

import styles from './styles/statistics-page.module.scss';

type Props = TableProps & {
  header: ReactNode;
  title: ReactNode;
  locationGetter?: (
    name: StatisticsItem['name'],
    reviewed: boolean
  ) => LocationDescriptorObject | null;
};

const FrequencyTable = ({
  reviewedData,
  unreviewedData,
  header,
  title,
  locationGetter,
}: Props) => {
  const list = merge(reviewedData.items, unreviewedData.items).sort(
    frequencySort
  );

  return (
    <>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>{header}</th>
            <th>
              <ReviewedLabel />
            </th>
            <th>
              <UnreviewedLabel />
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map(({ name, statistics }) => {
            const reviewedLocation = locationGetter?.(name, true) || {};
            const unreviewedLocation = locationGetter?.(name, false) || {};
            return (
              <tr key={name}>
                <td>{name}</td>
                <td className={styles.end}>
                  <CountLinkOrNothing
                    condition={'search' in reviewedLocation}
                    to={reviewedLocation}
                  >
                    {statistics.reviewed?.entryCount || 0}
                  </CountLinkOrNothing>
                </td>
                <td className={styles.end}>
                  <CountLinkOrNothing
                    condition={'search' in unreviewedLocation}
                    to={unreviewedLocation}
                  >
                    {statistics.unreviewed?.entryCount || 0}
                  </CountLinkOrNothing>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default FrequencyTable;
