import { ReactNode } from 'react';
import { Message } from 'franklin-sites';

import styles from './styles/downtime-warning.module.scss';

const from = new Date('2024-04-01T09:30:00-05:00');
const to = new Date('2024-04-01T10:00:00-05:00');

const TZ = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return <span className={styles.spaced}>({tz} time zone)</span>;
  } catch {
    return null;
  }
};

type Props = {
  children: ReactNode;
};

export const DowntimeWarning = ({ children }: Props) => (
  <Message level="warning">
    Scheduled maintenance will cause {children} to be unavailable at the
    following time:
    <div className={styles.time}>
      {from.toLocaleString()}
      <span className={styles.spaced}>to</span>
      {to.toLocaleString()}
      <TZ />
    </div>
    Please submit jobs before or after this period. In addition, running jobs
    will be interrupted and so will need to be resubmitted.
  </Message>
);

export default DowntimeWarning;
