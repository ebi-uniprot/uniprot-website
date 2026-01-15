import { type LocationDescriptorObject } from 'history';
import { type ReactNode } from 'react';

import CountLinkOrNothing from './CountLinkOrNothing';
import { type StatisticsItem, type TableProps } from './StatisticsPage';
import styles from './styles/statistics-page.module.scss';
import { ReviewedLabel, UnreviewedLabel } from './UniProtKBLabels';
import { frequencySort, merge } from './utils';

type Props = TableProps & {
  header: ReactNode;
  title: ReactNode;
  locationGetter?: (
    name: StatisticsItem['name'],
    reviewed: boolean
  ) => LocationDescriptorObject | null;
};

const FrequencyTable = ({
  uniprotkbData,
  reviewedData,
  unreviewedData,
  header,
  title,
  locationGetter,
}: Props) => {
  const list = merge(
    uniprotkbData.items,
    reviewedData.items,
    unreviewedData.items
  ).sort(frequencySort);

  return (
    <>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>{header}</th>
            <th>UniProtKB</th>
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
            const uniprotkbLocation = locationGetter?.(name, true) || {};
            const reviewedLocation = locationGetter?.(name, true) || {};
            const unreviewedLocation = locationGetter?.(name, false) || {};
            return (
              <tr key={name}>
                <td>{name}</td>
                <td className={styles.end}>
                  <CountLinkOrNothing
                    condition={'search' in uniprotkbLocation}
                    to={uniprotkbLocation}
                  >
                    {statistics.uniprotkb?.entryCount || 0}
                  </CountLinkOrNothing>
                </td>
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
